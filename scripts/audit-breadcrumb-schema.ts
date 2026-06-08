import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type ExpectedBreadcrumbPage = {
  route: string;
  breadcrumbs: BreadcrumbItem[];
};

type MissingBreadcrumbPage = {
  route: string;
  reason: string;
};

type InvalidBreadcrumbItem = {
  route: string;
  index: number;
  reason: string;
};

type ResolveHookResult = {
  url: string;
  shortCircuit?: boolean;
};

type ResolveHookContext = {
  parentURL?: string;
};

type ModuleWithHooks = {
  registerHooks?: (hooks: {
    resolve: (
      specifier: string,
      context: ResolveHookContext,
      nextResolve: (
        specifier: string,
        context: ResolveHookContext
      ) => ResolveHookResult
    ) => ResolveHookResult;
  }) => void;
};

const currentFile = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(currentFile);
const projectRoot = path.resolve(scriptsDir, "..");
const outDir = path.join(projectRoot, "out");
const reportsDir = path.join(projectRoot, "reports");
const siteUrl = "https://www.puzzleguide.org";

function registerProjectResolveHooks() {
  const require = createRequire(import.meta.url);
  const moduleApi = require("node:module") as ModuleWithHooks;

  moduleApi.registerHooks?.({
    resolve(specifier, context, nextResolve) {
      const resolvedLocalFile = resolveLocalFile(specifier, context.parentURL);

      if (resolvedLocalFile) {
        return {
          url: pathToFileURL(resolvedLocalFile).href,
          shortCircuit: true
        };
      }

      return nextResolve(specifier, context);
    }
  });
}

function resolveLocalFile(specifier: string, parentURL?: string) {
  if (specifier.startsWith("node:")) {
    return null;
  }

  if (specifier.startsWith("@/")) {
    return resolveExistingTypeScriptFile(path.join(projectRoot, specifier.slice(2)));
  }

  if (!specifier.startsWith(".")) {
    return null;
  }

  const parentDir = parentURL
    ? path.dirname(fileURLToPath(parentURL))
    : projectRoot;

  return resolveExistingTypeScriptFile(path.resolve(parentDir, specifier));
}

function resolveExistingTypeScriptFile(basePath: string) {
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx")
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function absoluteUrl(value: string) {
  if (value.startsWith("https://")) {
    return value.endsWith("/") ? value : `${value}/`;
  }

  const route = value.startsWith("/") ? value : `/${value}`;

  if (route === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${route.replace(/\/$/, "")}/`;
}

function routeToHtmlPath(route: string) {
  if (route === "/") {
    return path.join(outDir, "index.html");
  }

  return path.join(outDir, route.replace(/^\/|\/$/g, ""), "index.html");
}

function collectHtmlFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir).flatMap((entry) => {
    const entryPath = path.join(dir, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      if (entry === "_next") {
        return [];
      }

      return collectHtmlFiles(entryPath);
    }

    const relativePath = path.relative(outDir, entryPath).replace(/\\/g, "/");

    if (
      !entryPath.endsWith(".html") ||
      relativePath === "404.html" ||
      relativePath === "404/index.html"
    ) {
      return [];
    }

    return [entryPath];
  });
}

function extractJsonLdScripts(html: string) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);
}

function collectBreadcrumbNodes(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectBreadcrumbNodes(item));
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const node = value as Record<string, unknown>;
  const type = node["@type"];
  const ownNodes =
    type === "BreadcrumbList" ||
    (Array.isArray(type) && type.includes("BreadcrumbList"))
      ? [node]
      : [];
  const graphNodes = Array.isArray(node["@graph"])
    ? collectBreadcrumbNodes(node["@graph"])
    : [];

  return [...ownNodes, ...graphNodes];
}

function parseBreadcrumbNodes(
  route: string,
  html: string,
  invalidBreadcrumbItems: InvalidBreadcrumbItem[]
) {
  const nodes: Record<string, unknown>[] = [];

  extractJsonLdScripts(html).forEach((raw, scriptIndex) => {
    try {
      nodes.push(...collectBreadcrumbNodes(JSON.parse(raw)));
    } catch {
      invalidBreadcrumbItems.push({
        route,
        index: scriptIndex,
        reason: "JSON-LD script is not valid JSON"
      });
    }
  });

  return nodes;
}

function normalizeSchemaItems(
  route: string,
  nodes: Record<string, unknown>[],
  invalidBreadcrumbItems: InvalidBreadcrumbItem[]
) {
  return nodes.map((node, nodeIndex) => {
    if (node["@context"] !== "https://schema.org") {
      invalidBreadcrumbItems.push({
        route,
        index: nodeIndex,
        reason: "BreadcrumbList schema is missing https://schema.org context"
      });
    }

    const elements = node.itemListElement;

    if (!Array.isArray(elements) || elements.length === 0) {
      invalidBreadcrumbItems.push({
        route,
        index: nodeIndex,
        reason: "BreadcrumbList itemListElement is missing or empty"
      });
      return [];
    }

    return elements.map((element, itemIndex) => {
      const item = element as Record<string, unknown>;
      const position = item.position;
      const name = typeof item.name === "string" ? item.name.trim() : "";
      const itemUrl = typeof item.item === "string" ? item.item.trim() : "";

      if (
        item["@type"] !== "ListItem" ||
        position !== itemIndex + 1 ||
        !name ||
        !itemUrl.startsWith("https://www.puzzleguide.org/")
      ) {
        invalidBreadcrumbItems.push({
          route,
          index: itemIndex,
          reason: "Breadcrumb list item is missing type, position, name, or absolute item URL"
        });
      }

      return {
        name,
        item: itemUrl
      };
    });
  });
}

function breadcrumbsMatch(actual: BreadcrumbItem[], expected: BreadcrumbItem[]) {
  if (actual.length !== expected.length) {
    return false;
  }

  return expected.every(
    (expectedItem, index) =>
      actual[index]?.name === expectedItem.name &&
      actual[index]?.item === absoluteUrl(expectedItem.item)
  );
}

function addPage(
  pages: ExpectedBreadcrumbPage[],
  route: string,
  breadcrumbs: BreadcrumbItem[]
) {
  pages.push({
    route,
    breadcrumbs
  });
}

function programmaticLabel(gameName: string, slug: string) {
  if (slug === "tips") {
    return `${gameName} Tips`;
  }

  if (slug === "solutions") {
    return `${gameName} Solutions`;
  }

  return `${gameName} Walkthroughs`;
}

async function main() {
  registerProjectResolveHooks();

  const [{ routes }, data, categoriesData, levelsData, collectionsData, comparisonsData, guidesData, programmaticData] =
    await Promise.all([
      import("../lib/routes"),
      import("../lib/data"),
      import("../data/categories"),
      import("../data/levels"),
      import("../data/collections"),
      import("../data/comparisons"),
      import("../data/guides"),
      import("../data/programmatic")
    ]);

  const games = data.getAllGames();
  const pages: ExpectedBreadcrumbPage[] = [];

  addPage(pages, routes.home, [{ name: "Home", item: routes.home }]);
  addPage(pages, "/about", [
    { name: "Home", item: routes.home },
    { name: "About", item: "/about" }
  ]);
  addPage(pages, "/contact", [
    { name: "Home", item: routes.home },
    { name: "Contact", item: "/contact" }
  ]);
  addPage(pages, "/disclaimer", [
    { name: "Home", item: routes.home },
    { name: "Disclaimer", item: "/disclaimer" }
  ]);
  addPage(pages, "/privacy-policy", [
    { name: "Home", item: routes.home },
    { name: "Privacy Policy", item: "/privacy-policy" }
  ]);
  addPage(pages, "/search", [
    { name: "Home", item: routes.home },
    { name: "Search", item: "/search" }
  ]);
  addPage(pages, routes.solver, [
    { name: "Home", item: routes.home },
    { name: "Solver", item: routes.solver }
  ]);
  addPage(pages, "/terms", [
    { name: "Home", item: routes.home },
    { name: "Terms of Use", item: "/terms" }
  ]);
  addPage(pages, routes.discover, [
    { name: "Home", item: routes.home },
    { name: "Discover", item: routes.discover }
  ]);
  addPage(pages, routes.games, [
    { name: "Home", item: routes.home },
    { name: "Games", item: routes.games }
  ]);
  addPage(pages, routes.collections, [
    { name: "Home", item: routes.home },
    { name: "Collections", item: routes.collections }
  ]);
  addPage(pages, routes.compare, [
    { name: "Home", item: routes.home },
    { name: "Compare", item: routes.compare }
  ]);
  addPage(pages, routes.guide, [
    { name: "Home", item: routes.home },
    { name: "Guide", item: routes.guide }
  ]);
  addPage(pages, routes.solutions, [
    { name: "Home", item: routes.home },
    { name: "Solutions", item: routes.solutions }
  ]);
  addPage(pages, routes.tips, [
    { name: "Home", item: routes.home },
    { name: "Tips", item: routes.tips }
  ]);
  addPage(pages, routes.walkthroughs, [
    { name: "Home", item: routes.home },
    { name: "Walkthroughs", item: routes.walkthroughs }
  ]);

  categoriesData.categories.forEach((category) =>
    addPage(pages, routes.category(category.slug), [
      { name: "Home", item: routes.home },
      { name: "Games", item: routes.games },
      { name: category.name, item: routes.category(category.slug) }
    ])
  );

  games.forEach((game) =>
    addPage(pages, routes.game(game.slug), [
      { name: "Home", item: routes.home },
      { name: "Games", item: routes.games },
      { name: game.name, item: routes.game(game.slug) }
    ])
  );

  levelsData.levels.forEach((level) => {
    const game = data.getGameBySlug(level.gameSlug);

    if (!game) {
      return;
    }

    addPage(pages, routes.level(level.gameSlug, level.levelSlug), [
      { name: "Home", item: routes.home },
      { name: "Games", item: routes.games },
      { name: game.name, item: routes.game(game.slug) },
      {
        name: `Level ${level.levelNumber}`,
        item: routes.level(level.gameSlug, level.levelSlug)
      }
    ]);
  });

  collectionsData.collections.forEach((collection) =>
    addPage(pages, routes.collection(collection.slug), [
      { name: "Home", item: routes.home },
      { name: "Collections", item: routes.collections },
      { name: collection.title, item: routes.collection(collection.slug) }
    ])
  );

  comparisonsData.comparisons.forEach((comparison) =>
    addPage(pages, routes.comparison(comparison.slug), [
      { name: "Home", item: routes.home },
      { name: "Compare", item: routes.compare },
      { name: comparison.title, item: routes.comparison(comparison.slug) }
    ])
  );

  games.forEach((game) => {
    guidesData.guideTypes.forEach((guideType) => {
      const guideSlug = guidesData.buildGuideSlug(game.slug, guideType.slug);

      addPage(pages, routes.guideDetail(guideSlug), [
        { name: "Home", item: routes.home },
        { name: "Guide", item: routes.guide },
        {
          name: guidesData.guideTitle(game, guideType),
          item: routes.guideDetail(guideSlug)
        }
      ]);
    });
  });

  games.forEach((game) => {
    programmaticData.programmaticTypes.forEach((pageType) => {
      const parent =
        pageType.slug === "solutions"
          ? { name: "Solutions", item: routes.solutions }
          : pageType.slug === "tips"
            ? { name: "Tips", item: routes.tips }
            : { name: "Walkthroughs", item: routes.walkthroughs };
      const route =
        pageType.slug === "solutions"
          ? routes.solution(game.slug)
          : pageType.slug === "tips"
            ? routes.tip(game.slug)
            : routes.walkthrough(game.slug);

      addPage(pages, route, [
        { name: "Home", item: routes.home },
        parent,
        { name: programmaticLabel(game.name, pageType.slug), item: route }
      ]);
    });
  });

  const invalidBreadcrumbItemDetails: InvalidBreadcrumbItem[] = [];
  const missingBreadcrumbSchemaPages: MissingBreadcrumbPage[] = [];
  let pagesWithBreadcrumbSchema = 0;

  pages.forEach((page) => {
    const htmlPath = routeToHtmlPath(page.route);

    if (!existsSync(htmlPath)) {
      missingBreadcrumbSchemaPages.push({
        route: page.route,
        reason: "Exported HTML file is missing"
      });
      return;
    }

    const html = readFileSync(htmlPath, "utf8");
    const nodes = parseBreadcrumbNodes(
      page.route,
      html,
      invalidBreadcrumbItemDetails
    );

    if (nodes.length === 0) {
      missingBreadcrumbSchemaPages.push({
        route: page.route,
        reason: "No BreadcrumbList JSON-LD schema found"
      });
      return;
    }

    const normalizedItems = normalizeSchemaItems(
      page.route,
      nodes,
      invalidBreadcrumbItemDetails
    );
    const hasExpectedBreadcrumb = normalizedItems.some((items) =>
      breadcrumbsMatch(items, page.breadcrumbs)
    );

    if (!hasExpectedBreadcrumb) {
      missingBreadcrumbSchemaPages.push({
        route: page.route,
        reason: "BreadcrumbList schema does not match expected route hierarchy"
      });
      return;
    }

    pagesWithBreadcrumbSchema += 1;
  });

  const totalPages = collectHtmlFiles(outDir).length;
  const report = {
    totalPages,
    pagesWithBreadcrumbSchema,
    pagesMissingBreadcrumbSchema: missingBreadcrumbSchemaPages.length,
    invalidBreadcrumbItems: invalidBreadcrumbItemDetails.length,
    missingBreadcrumbSchemaPages,
    invalidBreadcrumbItemDetails
  };

  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(
    path.join(reportsDir, "breadcrumb-schema-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );

  const markdown = [
    "# Breadcrumb Schema Audit",
    "",
    `- Total Pages: ${report.totalPages}`,
    `- Pages With Breadcrumb Schema: ${report.pagesWithBreadcrumbSchema}`,
    `- Pages Missing Breadcrumb Schema: ${report.pagesMissingBreadcrumbSchema}`,
    `- Invalid Breadcrumb Items: ${report.invalidBreadcrumbItems}`,
    "",
    "## Missing Breadcrumb Schema Pages",
    "",
    ...(
      missingBreadcrumbSchemaPages.length > 0
        ? missingBreadcrumbSchemaPages.map(
            (item) => `- ${item.route}: ${item.reason}`
          )
        : ["None"]
    ),
    "",
    "## Invalid Breadcrumb Items",
    "",
    ...(
      invalidBreadcrumbItemDetails.length > 0
        ? invalidBreadcrumbItemDetails.map(
            (item) => `- ${item.route} (#${item.index}): ${item.reason}`
          )
        : ["None"]
    )
  ].join("\n");

  writeFileSync(
    path.join(reportsDir, "breadcrumb-schema-audit.md"),
    `${markdown}\n`
  );

  console.log(
    `Breadcrumb schema audit: ${report.pagesWithBreadcrumbSchema}/${report.totalPages} pages covered, ${report.invalidBreadcrumbItems} invalid breadcrumb items.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
