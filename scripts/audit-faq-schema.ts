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

type FaqItem = {
  question: string;
  answer: string;
};

type ExpectedFaqPage = {
  route: string;
  source: string;
  faq: FaqItem[];
};

type InvalidFaqItem = {
  route: string;
  source: string;
  index: number;
  reason: string;
};

type MissingSchemaPage = {
  route: string;
  source: string;
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

function isValidFaqItem(item: FaqItem) {
  return item.question.trim().length > 0 && item.answer.trim().length > 0;
}

function normalizeFaq(faq: FaqItem[] | undefined) {
  return (faq ?? []).filter(isValidFaqItem);
}

function extractJsonLdScripts(html: string) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);
}

function collectFaqNodes(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectFaqNodes(item));
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const node = value as Record<string, unknown>;
  const type = node["@type"];
  const ownNodes =
    type === "FAQPage" || (Array.isArray(type) && type.includes("FAQPage"))
      ? [node]
      : [];
  const graphNodes = Array.isArray(node["@graph"])
    ? collectFaqNodes(node["@graph"])
    : [];

  return [...ownNodes, ...graphNodes];
}

function parseFaqSchemaNodes(
  route: string,
  html: string,
  invalidFaqItems: InvalidFaqItem[]
) {
  const nodes: Record<string, unknown>[] = [];

  extractJsonLdScripts(html).forEach((raw, scriptIndex) => {
    try {
      nodes.push(...collectFaqNodes(JSON.parse(raw)));
    } catch {
      invalidFaqItems.push({
        route,
        source: "json-ld",
        index: scriptIndex,
        reason: "JSON-LD script is not valid JSON"
      });
    }
  });

  return nodes;
}

function extractValidQuestionsFromSchema(
  route: string,
  nodes: Record<string, unknown>[],
  invalidFaqItems: InvalidFaqItem[]
) {
  const questions: string[] = [];

  nodes.forEach((node, nodeIndex) => {
    if (node["@context"] !== "https://schema.org") {
      invalidFaqItems.push({
        route,
        source: "json-ld",
        index: nodeIndex,
        reason: "FAQPage schema is missing https://schema.org context"
      });
    }

    const mainEntity = node.mainEntity;

    if (!Array.isArray(mainEntity) || mainEntity.length === 0) {
      invalidFaqItems.push({
        route,
        source: "json-ld",
        index: nodeIndex,
        reason: "FAQPage mainEntity is missing or empty"
      });
      return;
    }

    mainEntity.forEach((item, itemIndex) => {
      const question = item as Record<string, unknown>;
      const acceptedAnswer = question.acceptedAnswer as Record<string, unknown>;
      const name = typeof question.name === "string" ? question.name.trim() : "";
      const text =
        acceptedAnswer && typeof acceptedAnswer.text === "string"
          ? acceptedAnswer.text.trim()
          : "";

      if (question["@type"] !== "Question" || !name) {
        invalidFaqItems.push({
          route,
          source: "json-ld",
          index: itemIndex,
          reason: "FAQ item is missing Question type or name"
        });
        return;
      }

      if (!acceptedAnswer || acceptedAnswer["@type"] !== "Answer" || !text) {
        invalidFaqItems.push({
          route,
          source: "json-ld",
          index: itemIndex,
          reason: "FAQ item is missing acceptedAnswer Answer text"
        });
        return;
      }

      questions.push(name);
    });
  });

  return questions;
}

function addExpectedPage(
  pages: Map<string, ExpectedFaqPage>,
  route: string,
  source: string,
  faq: FaqItem[] | undefined
) {
  if (!faq || faq.length === 0) {
    return;
  }

  pages.set(route, {
    route,
    source,
    faq
  });
}

async function main() {
  registerProjectResolveHooks();

  const [{ routes }, { homeFaq }, data, levelsData, topLevelContent, collectionsData, comparisonsData, guidesData, programmaticData, faqPages, profileData, freemiumData, videoData, communityData] =
    await Promise.all([
      import("../lib/routes"),
      import("../components/home/home-data"),
      import("../lib/data"),
      import("../data/levels"),
      import("../data/top-level-content"),
      import("../data/collections"),
      import("../data/comparisons"),
      import("../data/guides"),
      import("../data/programmatic"),
      import("../data/faq-pages"),
      import("../data/profile-data"),
      import("../data/freemium-data"),
      import("../data/video-data"),
      import("../data/community-data")
    ]);

  const games = data.getAllGames();
  const pages = new Map<string, ExpectedFaqPage>();

  addExpectedPage(
    pages,
    routes.home,
    "homeFaq+profileFaq+freemiumFaq+videoFaq+communityFaq",
    [
      ...homeFaq,
      ...profileData.profileFaq,
      ...freemiumData.freemiumFaq,
      ...videoData.videoFaq,
      ...communityData.communityFaq
    ]
  );
  games.forEach((game) => addExpectedPage(pages, routes.game(game.slug), "game.faq", game.faq));
  levelsData.levels.forEach((level) => {
    const featuredManualContent = topLevelContent.getFeaturedLevelManualContent(
      level.gameSlug,
      level.levelSlug
    );
    const topManualContent = topLevelContent.getTopLevelManualContent(
      level.gameSlug,
      level.levelSlug
    );
    const pageFaq = featuredManualContent?.faq ?? topManualContent?.faq ?? level.faq;
    const source =
      featuredManualContent || topManualContent
        ? "manualLevelContent.faq"
        : "level.faq";

    addExpectedPage(
      pages,
      routes.level(level.gameSlug, level.levelSlug),
      source,
      pageFaq
    );
  });

  addExpectedPage(pages, routes.guide, "guideHubFaq", faqPages.guideHubFaq);
  games.forEach((game) => {
    guidesData.guideTypes.forEach((guideType) => {
      addExpectedPage(
        pages,
        routes.guideDetail(guidesData.buildGuideSlug(game.slug, guideType.slug)),
        "guideDetailFaq",
        faqPages.guideDetailFaq(game.name)
      );
    });
  });

  addExpectedPage(pages, routes.tips, "tipsIndexFaq", faqPages.tipsIndexFaq);
  addExpectedPage(
    pages,
    routes.solutions,
    "solutionsIndexFaq",
    faqPages.solutionsIndexFaq
  );
  addExpectedPage(
    pages,
    routes.walkthroughs,
    "walkthroughsIndexFaq",
    faqPages.walkthroughsIndexFaq
  );

  games.forEach((game) => {
    programmaticData.programmaticTypes.forEach((pageType) => {
      const route =
        pageType.slug === "solutions"
          ? routes.solution(game.slug)
          : pageType.slug === "tips"
            ? routes.tip(game.slug)
            : routes.walkthrough(game.slug);

      addExpectedPage(
        pages,
        route,
        "programmaticGameFaq",
        faqPages.programmaticGameFaq(game.name, pageType)
      );
    });
  });

  addExpectedPage(
    pages,
    routes.collections,
    "collectionsIndexFaq",
    faqPages.collectionsIndexFaq
  );
  collectionsData.collections.forEach((collection) =>
    addExpectedPage(
      pages,
      routes.collection(collection.slug),
      "collection.faq",
      collection.faq
    )
  );

  addExpectedPage(pages, routes.compare, "compareIndexFaq", faqPages.compareIndexFaq);
  comparisonsData.comparisons.forEach((comparison) =>
    addExpectedPage(
      pages,
      routes.comparison(comparison.slug),
      "comparison.faq",
      comparison.faq
    )
  );

  addExpectedPage(pages, routes.discover, "discoverFaq", faqPages.discoverFaq);

  const invalidFaqItems: InvalidFaqItem[] = [];
  const missingFaqSchemaPages: MissingSchemaPage[] = [];
  let pagesWithFaqSchema = 0;

  const expectedPages = [...pages.values()];

  expectedPages.forEach((page) => {
    page.faq.forEach((item, index) => {
      if (!isValidFaqItem(item)) {
        invalidFaqItems.push({
          route: page.route,
          source: page.source,
          index,
          reason: "FAQ source item is missing question or answer"
        });
      }
    });

    const htmlPath = routeToHtmlPath(page.route);
    const sourceQuestions = normalizeFaq(page.faq).map((item) => item.question);

    if (!existsSync(htmlPath)) {
      missingFaqSchemaPages.push({
        route: page.route,
        source: page.source,
        reason: "Exported HTML file is missing"
      });
      return;
    }

    const html = readFileSync(htmlPath, "utf8");
    const faqNodes = parseFaqSchemaNodes(page.route, html, invalidFaqItems);

    if (faqNodes.length === 0) {
      missingFaqSchemaPages.push({
        route: page.route,
        source: page.source,
        reason: "No FAQPage JSON-LD schema found"
      });
      return;
    }

    const schemaQuestions = extractValidQuestionsFromSchema(
      page.route,
      faqNodes,
      invalidFaqItems
    );
    const missingQuestions = sourceQuestions.filter(
      (question) => !schemaQuestions.includes(question)
    );

    if (missingQuestions.length > 0) {
      missingFaqSchemaPages.push({
        route: page.route,
        source: page.source,
        reason: `FAQPage schema is missing ${missingQuestions.length} source question(s)`
      });
      return;
    }

    pagesWithFaqSchema += 1;
  });

  const report = {
    totalPages: collectHtmlFiles(outDir).length,
    pagesWithFaq: expectedPages.length,
    pagesWithFaqSchema,
    pagesMissingFaqSchema: missingFaqSchemaPages.length,
    invalidFaqItems: invalidFaqItems.length,
    missingFaqSchemaPages,
    invalidFaqItemDetails: invalidFaqItems
  };

  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(
    path.join(reportsDir, "faq-schema-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );

  const markdown = [
    "# FAQ Schema Audit",
    "",
    `- Total Pages: ${report.totalPages}`,
    `- Pages With FAQ: ${report.pagesWithFaq}`,
    `- Pages With FAQ Schema: ${report.pagesWithFaqSchema}`,
    `- Pages Missing FAQ Schema: ${report.pagesMissingFaqSchema}`,
    `- Invalid FAQ Items: ${report.invalidFaqItems}`,
    "",
    "## Missing FAQ Schema Pages",
    "",
    ...(
      missingFaqSchemaPages.length > 0
        ? missingFaqSchemaPages.map(
            (item) => `- ${item.route} (${item.source}): ${item.reason}`
          )
        : ["None"]
    ),
    "",
    "## Invalid FAQ Items",
    "",
    ...(
      invalidFaqItems.length > 0
        ? invalidFaqItems.map(
            (item) =>
              `- ${item.route} (${item.source} #${item.index}): ${item.reason}`
          )
        : ["None"]
    )
  ].join("\n");

  writeFileSync(path.join(reportsDir, "faq-schema-audit.md"), `${markdown}\n`);

  console.log(
    `FAQ schema audit: ${report.pagesWithFaqSchema}/${report.pagesWithFaq} pages covered, ${report.invalidFaqItems} invalid FAQ items.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
