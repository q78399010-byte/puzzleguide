import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type Finding = {
  id?: string;
  file?: string;
  reason: string;
};

type VideoMatrixItem = {
  id: string;
  status: string;
  notes: string;
};

const currentFile = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(currentFile);
const projectRoot = path.resolve(scriptsDir, "..");
const reportsDir = path.join(projectRoot, "reports");
const sourceRoots = [
  path.join(projectRoot, "components", "video"),
  path.join(projectRoot, "data", "video-data.ts")
];
const { videoItems } = (await import(
  pathToFileURL(path.join(projectRoot, "data", "video-data.ts")).href
)) as { videoItems: VideoMatrixItem[] };

const embedPatterns = [
  /<iframe/i,
  /youtube/i,
  /youtu\.be/i,
  /vimeo/i,
  /\bembed\b/i
];

const fakePlayButtonPatterns = [
  /watch now/i,
  /play video/i,
  /play button/i,
  /aria-label=["']play/i,
  /[\u25b6\u25b7\u25ba]/
];

function collectSourceFiles(target: string): string[] {
  if (!existsSync(target)) {
    return [];
  }

  const stats = statSync(target);

  if (stats.isFile()) {
    return [target];
  }

  return readdirSync(target).flatMap((entry) => {
    const entryPath = path.join(target, entry);
    const entryStats = statSync(entryPath);

    if (entryStats.isDirectory()) {
      return collectSourceFiles(entryPath);
    }

    if (entryPath.endsWith(".ts") || entryPath.endsWith(".tsx")) {
      return [entryPath];
    }

    return [];
  });
}

function relativeFile(filePath: string) {
  return path.relative(projectRoot, filePath).replace(/\\/g, "/");
}

function matchesAny(value: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(value));
}

function findSourceMatches(patterns: RegExp[]) {
  const files = sourceRoots.flatMap(collectSourceFiles);

  return files.flatMap((file) => {
    const source = readFileSync(file, "utf8");

    if (!matchesAny(source, patterns)) {
      return [];
    }

    return [
      {
        file: relativeFile(file),
        reason: "Source contains a disallowed video embed or fake playback signal."
      }
    ];
  });
}

const unauthorizedItemDetails: Finding[] = videoItems.flatMap((item) => {
  const findings: Finding[] = [];
  const itemText = JSON.stringify(item);

  if (item.status !== "coming-soon") {
    findings.push({
      id: item.id,
      reason: "Video item status is not coming-soon."
    });
  }

  if (!item.notes.includes("No third-party video added.")) {
    findings.push({
      id: item.id,
      reason: "Video item does not explicitly state that no third-party video was added."
    });
  }

  if (/https?:\/\//i.test(itemText)) {
    findings.push({
      id: item.id,
      reason: "Video item contains an external URL."
    });
  }

  return findings;
});

const embedFindings: Finding[] = [
  ...videoItems
    .filter((item) => matchesAny(JSON.stringify(item), embedPatterns))
    .map((item) => ({
      id: item.id,
      reason: "Video item contains an embed-related field or value."
    })),
  ...findSourceMatches(embedPatterns)
];

const fakePlayButtonFindings: Finding[] = findSourceMatches(fakePlayButtonPatterns);

const report = {
  totalVideoItems: videoItems.length,
  comingSoonItems: videoItems.filter((item) => item.status === "coming-soon").length,
  unauthorizedItems: unauthorizedItemDetails.length,
  itemsWithEmbeds: embedFindings.length,
  itemsWithFakePlayButtons: fakePlayButtonFindings.length,
  unauthorizedItemDetails,
  embedFindings,
  fakePlayButtonFindings
};

mkdirSync(reportsDir, { recursive: true });
writeFileSync(
  path.join(reportsDir, "video-matrix-audit.json"),
  `${JSON.stringify(report, null, 2)}\n`
);

const markdown = [
  "# Video Matrix Audit",
  "",
  `- Total Video Items: ${report.totalVideoItems}`,
  `- Coming Soon Items: ${report.comingSoonItems}`,
  `- Unauthorized Items: ${report.unauthorizedItems}`,
  `- Items With Embeds: ${report.itemsWithEmbeds}`,
  `- Items With Fake Play Buttons: ${report.itemsWithFakePlayButtons}`,
  "",
  "## Unauthorized Item Details",
  "",
  ...(
    unauthorizedItemDetails.length > 0
      ? unauthorizedItemDetails.map((item) => `- ${item.id}: ${item.reason}`)
      : ["None"]
  ),
  "",
  "## Embed Findings",
  "",
  ...(
    embedFindings.length > 0
      ? embedFindings.map((item) => `- ${item.id ?? item.file}: ${item.reason}`)
      : ["None"]
  ),
  "",
  "## Fake Play Button Findings",
  "",
  ...(
    fakePlayButtonFindings.length > 0
      ? fakePlayButtonFindings.map(
          (item) => `- ${item.file}: ${item.reason}`
        )
      : ["None"]
  )
].join("\n");

writeFileSync(
  path.join(reportsDir, "video-matrix-audit.md"),
  `${markdown}\n`
);

console.log(
  `Video matrix audit: ${report.totalVideoItems} items, ${report.unauthorizedItems} unauthorized, ${report.itemsWithEmbeds} embeds, ${report.itemsWithFakePlayButtons} fake play buttons.`
);

if (
  report.unauthorizedItems > 0 ||
  report.itemsWithEmbeds > 0 ||
  report.itemsWithFakePlayButtons > 0
) {
  process.exitCode = 1;
}
