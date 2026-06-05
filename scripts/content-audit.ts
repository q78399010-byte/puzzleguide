import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type LevelAuditItem = {
  gameSlug: string;
  levelSlug: string;
  levelNumber: number;
  summary?: string;
  steps?: string[];
  tips?: string[];
  faq?: { question: string; answer: string }[];
  relatedLevels?: string[];
};

type MediaAuditItem = {
  gameSlug: string;
  levelNumber: number;
  youtubeEmbedUrl: string | null;
  imageUrl: string | null;
  gifUrl: string | null;
};

type WeakPage = {
  gameSlug: string;
  levelSlug: string;
  pagePath: string;
  missingFields: string[];
};

type ContentAuditReport = {
  totalPages: number;
  descriptionMissing: number;
  walkthroughMissing: number;
  tipsMissing: number;
  faqMissing: number;
  relatedLevelsMissing: number;
  imageMissing: number;
  gifMissing: number;
  youtubeMissing: number;
  pagesWithAllContent: number;
  pagesWithoutAnyMedia: number;
  topWeakestPages: WeakPage[];
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
const publicRoot = path.join(projectRoot, "public");
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

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyArray(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function localPublicFileExists(urlPath: string, requiredPrefix: "/images/" | "/gifs/") {
  const normalizedPath = path.posix.normalize(urlPath);

  if (!normalizedPath.startsWith(requiredPrefix)) {
    return false;
  }

  const resolvedPath = path.resolve(publicRoot, normalizedPath.slice(1));

  if (!resolvedPath.startsWith(`${publicRoot}${path.sep}`)) {
    return false;
  }

  return existsSync(resolvedPath);
}

function hasRenderableMediaUrl(
  url: string | null | undefined,
  requiredPrefix: "/images/" | "/gifs/"
) {
  if (!url) {
    return false;
  }

  if (isHttpsUrl(url)) {
    return true;
  }

  return localPublicFileExists(url, requiredPrefix);
}

function pagePathFor(level: LevelAuditItem) {
  return `/games/${level.gameSlug}/levels/${level.levelSlug}`;
}

function mediaKey(gameSlug: string, levelNumber: number) {
  return `${gameSlug}/level-${levelNumber}`;
}

function findMissingFields(
  level: LevelAuditItem,
  media: MediaAuditItem | undefined
) {
  const missingFields: string[] = [];
  const hasImage = hasRenderableMediaUrl(media?.imageUrl, "/images/");
  const hasGif = hasRenderableMediaUrl(media?.gifUrl, "/gifs/");
  const hasYoutube = isNonEmptyString(media?.youtubeEmbedUrl);

  if (!isNonEmptyString(level.summary)) {
    missingFields.push("description");
  }

  if (!isNonEmptyArray(level.steps)) {
    missingFields.push("walkthrough");
  }

  if (!isNonEmptyArray(level.tips)) {
    missingFields.push("tips");
  }

  if (!isNonEmptyArray(level.faq)) {
    missingFields.push("faq");
  }

  if (!isNonEmptyArray(level.relatedLevels)) {
    missingFields.push("relatedLevels");
  }

  if (!hasImage) {
    missingFields.push("image");
  }

  if (!hasGif) {
    missingFields.push("gif");
  }

  if (!hasYoutube) {
    missingFields.push("youtube");
  }

  return {
    missingFields,
    hasAnyMedia: hasImage || hasGif || hasYoutube
  };
}

function auditContent(
  levels: LevelAuditItem[],
  mediaItems: MediaAuditItem[]
): ContentAuditReport {
  const mediaByLevel = new Map(
    mediaItems.map((media) => [
      mediaKey(media.gameSlug, media.levelNumber),
      media
    ])
  );
  const weakPages: Array<WeakPage & { missingCount: number }> = [];
  const report: ContentAuditReport = {
    totalPages: levels.length,
    descriptionMissing: 0,
    walkthroughMissing: 0,
    tipsMissing: 0,
    faqMissing: 0,
    relatedLevelsMissing: 0,
    imageMissing: 0,
    gifMissing: 0,
    youtubeMissing: 0,
    pagesWithAllContent: 0,
    pagesWithoutAnyMedia: 0,
    topWeakestPages: []
  };

  for (const level of levels) {
    const media = mediaByLevel.get(mediaKey(level.gameSlug, level.levelNumber));
    const { missingFields, hasAnyMedia } = findMissingFields(level, media);

    if (missingFields.includes("description")) {
      report.descriptionMissing += 1;
    }

    if (missingFields.includes("walkthrough")) {
      report.walkthroughMissing += 1;
    }

    if (missingFields.includes("tips")) {
      report.tipsMissing += 1;
    }

    if (missingFields.includes("faq")) {
      report.faqMissing += 1;
    }

    if (missingFields.includes("relatedLevels")) {
      report.relatedLevelsMissing += 1;
    }

    if (missingFields.includes("image")) {
      report.imageMissing += 1;
    }

    if (missingFields.includes("gif")) {
      report.gifMissing += 1;
    }

    if (missingFields.includes("youtube")) {
      report.youtubeMissing += 1;
    }

    if (!hasAnyMedia) {
      report.pagesWithoutAnyMedia += 1;
    }

    if (missingFields.length === 0) {
      report.pagesWithAllContent += 1;
    } else {
      weakPages.push({
        gameSlug: level.gameSlug,
        levelSlug: level.levelSlug,
        pagePath: pagePathFor(level),
        missingFields,
        missingCount: missingFields.length
      });
    }
  }

  report.topWeakestPages = weakPages
    .sort(
      (pageA, pageB) =>
        pageB.missingCount - pageA.missingCount ||
        pageA.gameSlug.localeCompare(pageB.gameSlug) ||
        pageA.levelSlug.localeCompare(pageB.levelSlug)
    )
    .slice(0, 20)
    .map(({ missingCount: _missingCount, ...page }) => page);

  return report;
}

function buildMarkdownReport(report: ContentAuditReport) {
  const weakestPages =
    report.topWeakestPages.length > 0
      ? report.topWeakestPages
          .map(
            (page) =>
              `- ${page.pagePath}: ${page.missingFields.join(", ")}`
          )
          .join("\n")
      : "- None";

  return `# Content Audit

Total Pages: ${report.totalPages}

Description Missing: ${report.descriptionMissing}

Walkthrough Missing: ${report.walkthroughMissing}

Tips Missing: ${report.tipsMissing}

FAQ Missing: ${report.faqMissing}

Related Levels Missing: ${report.relatedLevelsMissing}

Image Missing: ${report.imageMissing}

GIF Missing: ${report.gifMissing}

Youtube Missing: ${report.youtubeMissing}

Pages With All Content: ${report.pagesWithAllContent}

Pages Without Any Media: ${report.pagesWithoutAnyMedia}

Top Weakest Pages:

${weakestPages}
`;
}

async function loadAuditData() {
  registerProjectResolveHooks();

  const [{ levels }, { gameMedia }] = (await Promise.all([
    import("../data/levels"),
    import("../data/game-media")
  ])) as [
    { levels: LevelAuditItem[] },
    { gameMedia: MediaAuditItem[] }
  ];

  return { levels, gameMedia };
}

async function main() {
  const { levels, gameMedia } = await loadAuditData();
  const report = auditContent(levels, gameMedia);

  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(
    path.join(reportsDir, "content-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );
  writeFileSync(
    path.join(reportsDir, "content-audit.md"),
    buildMarkdownReport(report)
  );

  console.log(
    JSON.stringify(
      {
        totalPages: report.totalPages,
        descriptionMissing: report.descriptionMissing,
        walkthroughMissing: report.walkthroughMissing,
        tipsMissing: report.tipsMissing,
        faqMissing: report.faqMissing,
        relatedLevelsMissing: report.relatedLevelsMissing,
        imageMissing: report.imageMissing,
        gifMissing: report.gifMissing,
        youtubeMissing: report.youtubeMissing,
        pagesWithAllContent: report.pagesWithAllContent,
        pagesWithoutAnyMedia: report.pagesWithoutAnyMedia,
        topWeakestPages: report.topWeakestPages.length
      },
      null,
      2
    )
  );
}

await main();
