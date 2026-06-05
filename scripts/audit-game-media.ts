import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type GameMediaRecord = {
  gameSlug?: unknown;
  levelNumber?: unknown;
  youtubeEmbedUrl?: unknown;
  imageUrl?: unknown;
  imageAlt?: unknown;
  gifUrl?: unknown;
  sourceType?: unknown;
};

type AuditItem = {
  key: string;
  gameSlug: string | null;
  levelNumber: number | null;
  status: "valid" | "warning" | "failed";
  warnings: string[];
  issues: string[];
};

type UrlIssue = {
  key: string;
  gameSlug: string | null;
  levelNumber: number | null;
  value: string;
  reason: string;
};

type FieldIssue = {
  key: string;
  gameSlug: string | null;
  levelNumber: number | null;
  field: string;
  reason: string;
};

type MediaAuditReport = {
  totalItems: number;
  validItems: number;
  warningItems: number;
  failedItems: number;
  missingMediaItems: AuditItem[];
  invalidYoutubeUrls: UrlIssue[];
  invalidImageUrls: UrlIssue[];
  invalidGifUrls: UrlIssue[];
  invalidSourceTypes: FieldIssue[];
  fieldIssues: FieldIssue[];
  recommendations: string[];
  items: AuditItem[];
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
const publicRoot = path.join(projectRoot, "public");
const requiredFields = [
  "gameSlug",
  "levelNumber",
  "youtubeEmbedUrl",
  "imageUrl",
  "imageAlt",
  "gifUrl",
  "sourceType"
] as const;
const allowedSourceTypes = new Set(["none", "own", "youtube", "placeholder"]);

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

function hasOwnField(item: GameMediaRecord, field: string) {
  return Object.prototype.hasOwnProperty.call(item, field);
}

function normalizedString(value: unknown) {
  return typeof value === "string" ? value.trim() : null;
}

function keyFor(item: GameMediaRecord, index: number) {
  const gameSlug = normalizedString(item.gameSlug);
  const levelNumber =
    typeof item.levelNumber === "number" && Number.isFinite(item.levelNumber)
      ? item.levelNumber
      : null;

  if (gameSlug && levelNumber !== null) {
    return `${gameSlug}/level-${levelNumber}`;
  }

  return `item-${index + 1}`;
}

function isValidYoutubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const pathParts = url.pathname.split("/").filter(Boolean);

    return (
      url.protocol === "https:" &&
      url.hostname === "www.youtube.com" &&
      pathParts.length === 2 &&
      pathParts[0] === "embed" &&
      /^[A-Za-z0-9_-]+$/.test(pathParts[1])
    );
  } catch {
    return false;
  }
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isValidImageUrl(value: string) {
  return isHttpsUrl(value) || value.startsWith("/images/");
}

function isValidGifUrl(value: string) {
  return isHttpsUrl(value) || value.startsWith("/gifs/");
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

function buildFieldIssue(
  item: GameMediaRecord,
  index: number,
  field: string,
  reason: string
): FieldIssue {
  return {
    key: keyFor(item, index),
    gameSlug: normalizedString(item.gameSlug),
    levelNumber:
      typeof item.levelNumber === "number" && Number.isFinite(item.levelNumber)
        ? item.levelNumber
        : null,
    field,
    reason
  };
}

function buildUrlIssue(
  item: GameMediaRecord,
  index: number,
  value: string,
  reason: string
): UrlIssue {
  return {
    key: keyFor(item, index),
    gameSlug: normalizedString(item.gameSlug),
    levelNumber:
      typeof item.levelNumber === "number" && Number.isFinite(item.levelNumber)
        ? item.levelNumber
        : null,
    value,
    reason
  };
}

function isPresentUrl(value: unknown) {
  if (value === null || value === undefined) {
    return false;
  }

  return typeof value === "string" ? value.trim().length > 0 : true;
}

function auditGameMedia(items: GameMediaRecord[]): MediaAuditReport {
  const auditItems: AuditItem[] = [];
  const missingMediaItems: AuditItem[] = [];
  const invalidYoutubeUrls: UrlIssue[] = [];
  const invalidImageUrls: UrlIssue[] = [];
  const invalidGifUrls: UrlIssue[] = [];
  const invalidSourceTypes: FieldIssue[] = [];
  const fieldIssues: FieldIssue[] = [];

  items.forEach((item, index) => {
    const issues: string[] = [];
    const warnings: string[] = [];
    const key = keyFor(item, index);
    const gameSlug = normalizedString(item.gameSlug);
    const levelNumber =
      typeof item.levelNumber === "number" && Number.isFinite(item.levelNumber)
        ? item.levelNumber
        : null;

    for (const field of requiredFields) {
      if (!hasOwnField(item, field)) {
        const issue = buildFieldIssue(item, index, field, "missing required field");
        fieldIssues.push(issue);
        issues.push(`${field}: ${issue.reason}`);
      }
    }

    if (!gameSlug) {
      const issue = buildFieldIssue(
        item,
        index,
        "gameSlug",
        "gameSlug must be a non-empty string"
      );
      fieldIssues.push(issue);
      issues.push(`${issue.field}: ${issue.reason}`);
    }

    if (
      typeof item.levelNumber !== "number" ||
      !Number.isInteger(item.levelNumber) ||
      item.levelNumber <= 0
    ) {
      const issue = buildFieldIssue(
        item,
        index,
        "levelNumber",
        "levelNumber must be a positive integer"
      );
      fieldIssues.push(issue);
      issues.push(`${issue.field}: ${issue.reason}`);
    }

    if (
      typeof item.sourceType !== "string" ||
      !allowedSourceTypes.has(item.sourceType)
    ) {
      const issue = buildFieldIssue(
        item,
        index,
        "sourceType",
        "sourceType must be one of: none, own, youtube, placeholder"
      );
      invalidSourceTypes.push(issue);
      issues.push(`${issue.field}: ${issue.reason}`);
    }

    const youtubeEmbedUrl = normalizedString(item.youtubeEmbedUrl);
    const imageUrl = normalizedString(item.imageUrl);
    const gifUrl = normalizedString(item.gifUrl);
    let hasRenderableMedia = false;

    if (isPresentUrl(item.youtubeEmbedUrl)) {
      if (!youtubeEmbedUrl || !isValidYoutubeEmbedUrl(youtubeEmbedUrl)) {
        const issue = buildUrlIssue(
          item,
          index,
          String(item.youtubeEmbedUrl),
          "youtubeEmbedUrl must match https://www.youtube.com/embed/{videoId}"
        );
        invalidYoutubeUrls.push(issue);
        issues.push(`youtubeEmbedUrl: ${issue.reason}`);
      } else {
        hasRenderableMedia = true;
      }
    }

    if (isPresentUrl(item.imageUrl)) {
      if (!imageUrl || !isValidImageUrl(imageUrl)) {
        const issue = buildUrlIssue(
          item,
          index,
          String(item.imageUrl),
          "imageUrl must be an https URL or a site-local /images/ path"
        );
        invalidImageUrls.push(issue);
        issues.push(`imageUrl: ${issue.reason}`);
      } else if (
        imageUrl.startsWith("/images/") &&
        !localPublicFileExists(imageUrl, "/images/")
      ) {
        warnings.push("imageUrl points to a site-local file that does not exist yet");
      } else {
        hasRenderableMedia = true;
      }
    }

    if (isPresentUrl(item.gifUrl)) {
      if (!gifUrl || !isValidGifUrl(gifUrl)) {
        const issue = buildUrlIssue(
          item,
          index,
          String(item.gifUrl),
          "gifUrl must be an https URL or a site-local /gifs/ path"
        );
        invalidGifUrls.push(issue);
        issues.push(`gifUrl: ${issue.reason}`);
      } else if (
        gifUrl.startsWith("/gifs/") &&
        !localPublicFileExists(gifUrl, "/gifs/")
      ) {
        warnings.push("gifUrl points to a site-local file that does not exist yet");
      } else {
        hasRenderableMedia = true;
      }
    }

    if (imageUrl && !normalizedString(item.imageAlt)) {
      warnings.push("imageUrl is present but imageAlt is empty");
    }

    if (!hasRenderableMedia) {
      warnings.push("no renderable media is present for this item");
    }

    const status =
      issues.length > 0 ? "failed" : warnings.length > 0 ? "warning" : "valid";
    const auditItem = {
      key,
      gameSlug,
      levelNumber,
      status,
      warnings,
      issues
    } satisfies AuditItem;

    auditItems.push(auditItem);

    if (warnings.some((warning) => warning.includes("no renderable media"))) {
      missingMediaItems.push(auditItem);
    }
  });

  const failedItems = auditItems.filter((item) => item.status === "failed").length;
  const warningItems = auditItems.filter((item) => item.status === "warning").length;
  const validItems = auditItems.filter((item) => item.status === "valid").length;

  return {
    totalItems: items.length,
    validItems,
    warningItems,
    failedItems,
    missingMediaItems,
    invalidYoutubeUrls,
    invalidImageUrls,
    invalidGifUrls,
    invalidSourceTypes,
    fieldIssues,
    recommendations: buildRecommendations({
      failedItems,
      missingMediaItems,
      invalidYoutubeUrls,
      invalidImageUrls,
      invalidGifUrls,
      invalidSourceTypes,
      fieldIssues
    }),
    items: auditItems
  };
}

function buildRecommendations(report: Pick<
  MediaAuditReport,
  | "failedItems"
  | "missingMediaItems"
  | "invalidYoutubeUrls"
  | "invalidImageUrls"
  | "invalidGifUrls"
  | "invalidSourceTypes"
  | "fieldIssues"
>) {
  const recommendations: string[] = [];

  if (report.fieldIssues.length > 0) {
    recommendations.push("Complete all required media fields before publishing.");
  }

  if (report.invalidYoutubeUrls.length > 0) {
    recommendations.push(
      "Use only YouTube embed URLs in the form https://www.youtube.com/embed/{videoId}."
    );
  }

  if (report.invalidImageUrls.length > 0) {
    recommendations.push("Use only https image URLs or site-local /images/ paths.");
  }

  if (report.invalidGifUrls.length > 0) {
    recommendations.push("Use only https GIF URLs or site-local /gifs/ paths.");
  }

  if (report.invalidSourceTypes.length > 0) {
    recommendations.push("Set sourceType to one of: none, own, youtube, placeholder.");
  }

  if (report.missingMediaItems.length > 0) {
    recommendations.push(
      "Add verified own media files under public/images/levels or public/gifs/levels, or keep media hidden until files exist."
    );
  }

  if (report.failedItems === 0) {
    recommendations.push("No blocking media schema issues were found.");
  }

  return recommendations;
}

function markdownList(items: string[]) {
  return items.length > 0
    ? items.map((item) => `- ${item}`).join("\n")
    : "- None";
}

function auditItemList(items: AuditItem[]) {
  return items.length > 0
    ? items
        .map((item) => {
          const details = [...item.issues, ...item.warnings].join("; ");
          return `- ${item.key}: ${details}`;
        })
        .join("\n")
    : "- None";
}

function urlIssueList(items: UrlIssue[]) {
  return items.length > 0
    ? items
        .map((item) => `- ${item.key}: ${item.value} (${item.reason})`)
        .join("\n")
    : "- None";
}

function fieldIssueList(items: FieldIssue[]) {
  return items.length > 0
    ? items
        .map((item) => `- ${item.key}: ${item.field} (${item.reason})`)
        .join("\n")
    : "- None";
}

function buildMarkdownReport(report: MediaAuditReport) {
  return `# PuzzleGuide Game Media Audit

## Summary

- Total items: ${report.totalItems}
- Valid items: ${report.validItems}
- Warning items: ${report.warningItems}
- Failed items: ${report.failedItems}
- Missing media items: ${report.missingMediaItems.length}
- Invalid YouTube URLs: ${report.invalidYoutubeUrls.length}
- Invalid image URLs: ${report.invalidImageUrls.length}
- Invalid GIF URLs: ${report.invalidGifUrls.length}

## Missing Media Items

${auditItemList(report.missingMediaItems)}

## Invalid YouTube URLs

${urlIssueList(report.invalidYoutubeUrls)}

## Invalid Image URLs

${urlIssueList(report.invalidImageUrls)}

## Invalid GIF URLs

${urlIssueList(report.invalidGifUrls)}

## Invalid Source Types

${fieldIssueList(report.invalidSourceTypes)}

## Field Issues

${fieldIssueList(report.fieldIssues)}

## Recommendations

${markdownList(report.recommendations)}
`;
}

async function loadGameMedia() {
  registerProjectResolveHooks();

  const module = (await import("../data/game-media")) as {
    gameMedia: GameMediaRecord[];
  };

  return module.gameMedia;
}

async function main() {
  const items = await loadGameMedia();
  const report = auditGameMedia(items);

  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(
    path.join(reportsDir, "game-media-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );
  writeFileSync(
    path.join(reportsDir, "game-media-audit.md"),
    buildMarkdownReport(report)
  );

  console.log(
    JSON.stringify(
      {
        totalItems: report.totalItems,
        validItems: report.validItems,
        warningItems: report.warningItems,
        failedItems: report.failedItems,
        missingMediaItems: report.missingMediaItems.length,
        invalidYoutubeUrls: report.invalidYoutubeUrls.length,
        invalidImageUrls: report.invalidImageUrls.length,
        invalidGifUrls: report.invalidGifUrls.length
      },
      null,
      2
    )
  );

  if (report.failedItems > 0) {
    process.exitCode = 1;
  }
}

await main();
