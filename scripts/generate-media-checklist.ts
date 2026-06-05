import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type MediaTemplateItem = {
  gameSlug: string;
  levelNumber: number;
  levelSlug: string;
  pagePath: string;
  recommendedImagePath: string;
  recommendedGifPath: string;
  youtubeEmbedUrl: string | null;
  sourceType: string;
  status: string;
  notes: string;
};

type ChecklistItem = {
  pagePath: string;
  gameSlug: string;
  levelNumber: number;
  levelSlug: string;
  recommendedImagePath: string;
  recommendedGifPath: string;
  youtubeEmbedStatus: "waiting" | "ready";
  sourceType: string;
  status: string;
  nextMediaNeeded: string[];
  notes: string;
};

type ChecklistReport = {
  totalItems: number;
  waitingItems: number;
  readyYoutubeEmbeds: number;
  items: ChecklistItem[];
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

function youtubeEmbedStatus(item: MediaTemplateItem) {
  return item.youtubeEmbedUrl ? "ready" : "waiting";
}

function nextMediaNeeded(item: MediaTemplateItem) {
  const needed = [
    `Owned screenshot at ${item.recommendedImagePath}`,
    `Owned GIF at ${item.recommendedGifPath}`
  ];

  if (!item.youtubeEmbedUrl) {
    needed.push("Authorized YouTube embed URL, if an official or permitted video exists");
  }

  return needed;
}

function buildChecklist(items: MediaTemplateItem[]): ChecklistReport {
  const checklistItems = items.map((item) => ({
    pagePath: item.pagePath,
    gameSlug: item.gameSlug,
    levelNumber: item.levelNumber,
    levelSlug: item.levelSlug,
    recommendedImagePath: item.recommendedImagePath,
    recommendedGifPath: item.recommendedGifPath,
    youtubeEmbedStatus: youtubeEmbedStatus(item),
    sourceType: item.sourceType,
    status: item.status,
    nextMediaNeeded: nextMediaNeeded(item),
    notes: item.notes
  })) satisfies ChecklistItem[];

  return {
    totalItems: checklistItems.length,
    waitingItems: checklistItems.filter((item) => item.status.includes("waiting"))
      .length,
    readyYoutubeEmbeds: checklistItems.filter(
      (item) => item.youtubeEmbedStatus === "ready"
    ).length,
    items: checklistItems
  };
}

function markdownList(items: string[]) {
  return items.map((item) => `  - ${item}`).join("\n");
}

function buildMarkdownReport(report: ChecklistReport) {
  const rows = report.items
    .map(
      (item) => `## ${item.pagePath}

- Recommended image path: ${item.recommendedImagePath}
- Recommended GIF path: ${item.recommendedGifPath}
- YouTube embed status: ${item.youtubeEmbedStatus}
- Source type: ${item.sourceType}
- Status: ${item.status}
- Next media needed:
${markdownList(item.nextMediaNeeded)}
- Notes: ${item.notes}`
    )
    .join("\n\n");

  return `# PuzzleGuide Top5 Media Checklist

## Summary

- Total items: ${report.totalItems}
- Waiting items: ${report.waitingItems}
- Ready YouTube embeds: ${report.readyYoutubeEmbeds}

${rows}
`;
}

async function loadTemplate() {
  registerProjectResolveHooks();

  const module = (await import("../data/top5-media-template")) as {
    top5MediaTemplate: MediaTemplateItem[];
  };

  return module.top5MediaTemplate;
}

async function main() {
  const template = await loadTemplate();
  const report = buildChecklist(template);

  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(
    path.join(reportsDir, "top5-media-checklist.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );
  writeFileSync(
    path.join(reportsDir, "top5-media-checklist.md"),
    buildMarkdownReport(report)
  );

  console.log(
    JSON.stringify(
      {
        totalItems: report.totalItems,
        waitingItems: report.waitingItems,
        readyYoutubeEmbeds: report.readyYoutubeEmbeds
      },
      null,
      2
    )
  );
}

await main();
