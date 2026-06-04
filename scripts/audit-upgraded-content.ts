import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type AuditFaq = {
  question: string;
  answer: string;
};

type UpgradedTopLevelContent = {
  title?: string;
  metaDescription?: string;
  walkthroughSummary?: string;
  steps?: string[];
  proTips?: string[];
  commonMistakes?: string[];
  faq?: AuditFaq[];
  relatedLevels?: string[];
  relatedGames?: string[];
  beginnerAdvice?: string[];
  advancedStrategy?: string[];
};

type UpgradedTopLevelBatchItem = {
  gameName: string;
  gameSlug: string;
  levelNumber: number;
  pagePath: string;
  priority: number;
  views: number;
  content: UpgradedTopLevelContent;
};

type AuditIssue = {
  pagePath: string;
  gameName: string;
  levelNumber: number;
  issues: string[];
};

type DuplicateWarning = {
  phrase: string;
  count: number;
};

type ContentAuditReport = {
  totalItems: number;
  passedItems: number;
  warningItems: number;
  failedItems: number;
  duplicateWarnings: DuplicateWarning[];
  seoWarnings: AuditIssue[];
  samplesToReview: AuditIssue[];
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
const requiredContentFields = [
  "title",
  "metaDescription",
  "walkthroughSummary",
  "steps",
  "proTips",
  "commonMistakes",
  "faq",
  "relatedLevels",
  "relatedGames",
  "beginnerAdvice",
  "advancedStrategy"
] as const;

const trackedDuplicatePhrases = [
  "This walkthrough provides",
  "Use careful planning",
  "Avoid random moves",
  "Step-by-step guidance"
];

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

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function stringLength(value: unknown) {
  return typeof value === "string" ? normalize(value).length : 0;
}

function arrayLength(value: unknown) {
  return Array.isArray(value) ? value.length : 0;
}

function joinedLength(value: unknown) {
  return Array.isArray(value) ? normalize(value.join(" ")).length : 0;
}

function isNonEmptyArray(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

function flattenedContentText(item: UpgradedTopLevelBatchItem) {
  const content = item.content;

  return [
    content.title,
    content.metaDescription,
    content.walkthroughSummary,
    ...(content.steps ?? []),
    ...(content.proTips ?? []),
    ...(content.commonMistakes ?? []),
    ...(content.faq ?? []).flatMap((faq) => [faq.question, faq.answer]),
    ...(content.relatedLevels ?? []),
    ...(content.relatedGames ?? []),
    ...(content.beginnerAdvice ?? []),
    ...(content.advancedStrategy ?? [])
  ]
    .filter(Boolean)
    .join(" ");
}

function missingFields(content: UpgradedTopLevelContent) {
  return requiredContentFields.filter((field) => {
    const value = content[field];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return !value;
  });
}

function lengthWarnings(content: UpgradedTopLevelContent) {
  const warnings: string[] = [];
  const titleLength = stringLength(content.title);
  const metaLength = stringLength(content.metaDescription);

  if (titleLength < 30 || titleLength > 80) {
    warnings.push(`title length ${titleLength} is outside 30-80 chars`);
  }

  if (metaLength < 100 || metaLength > 170) {
    warnings.push(`metaDescription length ${metaLength} is outside 100-170 chars`);
  }

  if (stringLength(content.walkthroughSummary) < 80) {
    warnings.push("walkthroughSummary is shorter than 80 chars");
  }

  if (arrayLength(content.steps) < 4) {
    warnings.push("steps has fewer than 4 items");
  }

  if (arrayLength(content.proTips) < 3) {
    warnings.push("proTips has fewer than 3 items");
  }

  if (arrayLength(content.commonMistakes) < 3) {
    warnings.push("commonMistakes has fewer than 3 items");
  }

  if (arrayLength(content.faq) < 3) {
    warnings.push("faq has fewer than 3 items");
  }

  if (arrayLength(content.relatedLevels) < 3) {
    warnings.push("relatedLevels has fewer than 3 items");
  }

  if (arrayLength(content.relatedGames) < 2) {
    warnings.push("relatedGames has fewer than 2 items");
  }

  if (joinedLength(content.beginnerAdvice) < 80) {
    warnings.push("beginnerAdvice is shorter than 80 chars");
  }

  if (joinedLength(content.advancedStrategy) < 80) {
    warnings.push("advancedStrategy is shorter than 80 chars");
  }

  return warnings;
}

function seoWarnings(item: UpgradedTopLevelBatchItem) {
  const warnings: string[] = [];
  const content = item.content;
  const title = content.title ?? "";
  const metaDescription = content.metaDescription ?? "";

  if (!title.toLowerCase().includes(item.gameName.toLowerCase())) {
    warnings.push("title does not include game name");
  }

  if (!/\blevel\b/i.test(title)) {
    warnings.push("title does not include Level");
  }

  if (!/\b(walkthrough|solution)\b/i.test(metaDescription)) {
    warnings.push("metaDescription does not include walkthrough or solution");
  }

  if (!isNonEmptyArray(content.faq)) {
    warnings.push("faq is empty");
  }

  if (!isNonEmptyArray(content.relatedLevels)) {
    warnings.push("relatedLevels is empty");
  }

  if (!isNonEmptyArray(content.relatedGames)) {
    warnings.push("relatedGames is empty");
  }

  return warnings;
}

function duplicateWarnings(items: UpgradedTopLevelBatchItem[]) {
  const phraseCounts = new Map<string, number>();

  for (const phrase of trackedDuplicatePhrases) {
    const lowerPhrase = phrase.toLowerCase();
    const count = items.filter((item) =>
      flattenedContentText(item).toLowerCase().includes(lowerPhrase)
    ).length;

    phraseCounts.set(phrase, count);
  }

  for (const sentence of repeatedSentences(items)) {
    phraseCounts.set(sentence.phrase, sentence.count);
  }

  return [...phraseCounts.entries()]
    .filter(([, count]) => count > 20)
    .map(([phrase, count]) => ({ phrase, count }))
    .sort((a, b) => b.count - a.count || a.phrase.localeCompare(b.phrase));
}

function repeatedSentences(items: UpgradedTopLevelBatchItem[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const seenInItem = new Set<string>();
    const sentences = flattenedContentText(item)
      .split(/[.!?]/)
      .map((sentence) => normalize(sentence))
      .filter((sentence) => sentence.length >= 28);

    for (const sentence of sentences) {
      const key = sentence.toLowerCase();

      if (!seenInItem.has(key)) {
        counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
        seenInItem.add(key);
      }
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 20)
    .map(([phrase, count]) => ({ phrase, count }));
}

function auditItems(items: UpgradedTopLevelBatchItem[]): ContentAuditReport {
  const failed: AuditIssue[] = [];
  const warnings: AuditIssue[] = [];
  const seo: AuditIssue[] = [];

  for (const item of items) {
    const missing = missingFields(item.content);
    const lengthIssues = lengthWarnings(item.content);
    const seoIssues = seoWarnings(item);

    if (missing.length > 0) {
      failed.push({
        pagePath: item.pagePath,
        gameName: item.gameName,
        levelNumber: item.levelNumber,
        issues: missing.map((field) => `missing required field: ${field}`)
      });
    }

    if (lengthIssues.length > 0) {
      warnings.push({
        pagePath: item.pagePath,
        gameName: item.gameName,
        levelNumber: item.levelNumber,
        issues: lengthIssues
      });
    }

    if (seoIssues.length > 0) {
      seo.push({
        pagePath: item.pagePath,
        gameName: item.gameName,
        levelNumber: item.levelNumber,
        issues: seoIssues
      });
    }
  }

  const duplicate = duplicateWarnings(items);
  const sampleMap = new Map<string, AuditIssue>();

  for (const issue of [...failed, ...warnings, ...seo]) {
    if (!sampleMap.has(issue.pagePath)) {
      sampleMap.set(issue.pagePath, issue);
    }
  }

  const warningPageCount = new Set([
    ...warnings.map((issue) => issue.pagePath),
    ...seo.map((issue) => issue.pagePath)
  ]).size;

  return {
    totalItems: items.length,
    passedItems:
      items.length - new Set([...failed, ...warnings, ...seo].map((issue) => issue.pagePath)).size,
    warningItems: warningPageCount,
    failedItems: failed.length,
    duplicateWarnings: duplicate,
    seoWarnings: seo,
    samplesToReview: [...sampleMap.values()].slice(0, 20)
  };
}

function markdownList(items: string[]) {
  return items.length > 0
    ? items.map((item) => `- ${item}`).join("\n")
    : "- None";
}

function issueList(items: AuditIssue[]) {
  return items.length > 0
    ? items
        .slice(0, 20)
        .map(
          (item) =>
            `- ${item.pagePath} (${item.gameName} Level ${item.levelNumber}): ${item.issues.join("; ")}`
        )
        .join("\n")
    : "- None";
}

function buildMarkdownReport(report: ContentAuditReport) {
  return `# PuzzleMaster Top100 Content Audit

## Summary

- Total items: ${report.totalItems}
- Passed items: ${report.passedItems}
- Warning items: ${report.warningItems}
- Failed items: ${report.failedItems}
- Duplicate warnings: ${report.duplicateWarnings.length}
- SEO warning pages: ${report.seoWarnings.length}

## Passed

- ${report.passedItems} items passed without field, length, or SEO warnings.

## Warnings

${issueList(report.samplesToReview.filter((item) => item.issues.length > 0))}

## Failed

${
  report.failedItems > 0
    ? issueList(report.samplesToReview.filter((item) =>
        item.issues.some((issue) => issue.startsWith("missing required field"))
      ))
    : "- None"
}

## Duplicate Phrases

${markdownList(
  report.duplicateWarnings.map(
    (item) => `${item.phrase} (${item.count} appearances across Top100)`
  )
)}

## SEO Issues

${issueList(report.seoWarnings)}

## Recommended Manual Review Pages

${issueList(report.samplesToReview)}
`;
}

async function loadUpgradeBatch() {
  registerProjectResolveHooks();

  const module = (await import("./upgrade-page-content")) as {
    generateTop100LevelUpgradeBatch: () => UpgradedTopLevelBatchItem[];
  };

  return module.generateTop100LevelUpgradeBatch();
}

async function main() {
  const items = await loadUpgradeBatch();
  const report = auditItems(items);
  const reportsDir = path.join(projectRoot, "reports");

  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(
    path.join(reportsDir, "content-audit-top100.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );
  writeFileSync(
    path.join(reportsDir, "content-audit-top100.md"),
    buildMarkdownReport(report)
  );

  console.log(
    JSON.stringify(
      {
        totalItems: report.totalItems,
        passedItems: report.passedItems,
        warningItems: report.warningItems,
        failedItems: report.failedItems,
        duplicateWarnings: report.duplicateWarnings.length,
        seoWarnings: report.seoWarnings.length
      },
      null,
      2
    )
  );
}

await main();
