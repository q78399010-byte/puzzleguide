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
  file?: string;
  reason: string;
};

type CommunityCard = {
  title: string;
  label: string;
  description: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const currentFile = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(currentFile);
const projectRoot = path.resolve(scriptsDir, "..");
const reportsDir = path.join(projectRoot, "reports");
const appCommunityRoute = path.join(projectRoot, "app", "community");
const appPagePath = path.join(projectRoot, "app", "page.tsx");
const communityDataPath = path.join(projectRoot, "data", "community-data.ts");
const communityComponentsDir = path.join(projectRoot, "components", "community");

const {
  communityAchievements,
  communityCards,
  communityFaq,
  communityTopGames
} = (await import(pathToFileURL(communityDataPath).href)) as {
  communityAchievements: string[];
  communityCards: CommunityCard[];
  communityFaq: FaqItem[];
  communityTopGames: CommunityCard[];
};

const expectedTopGames = [
  "Color Wood Jam",
  "Screw Jam",
  "Water Sort",
  "Bus Escape",
  "Parking Jam",
  "Goods Sort"
];

const expectedAchievements = [
  "First Solver",
  "Board Master",
  "Puzzle Explorer",
  "Speed Runner",
  "Strategist",
  "Collector"
];

const expectedFaqQuestions = [
  "What is Puzzle Community?",
  "Do I need an account?",
  "Can I share achievements?",
  "Will comments be added?",
  "Is Community free?"
];

const disallowedPatterns = [
  {
    label: "database integration",
    pattern: /\b(prisma|mongoose|mongodb|supabase|firebase|createClient)\b/i
  },
  {
    label: "login or user system",
    pattern: /\b(next-auth|authjs|signIn|signOut|getServerSession|useSession)\b/i
  },
  {
    label: "comment system implementation",
    pattern: /\b(CommentForm|commentsApi|commentSchema|moderationQueue)\b/i
  },
  {
    label: "chat implementation",
    pattern: /\b(ChatRoom|chatMessage|socket\.io|websocket)\b/i
  },
  {
    label: "AI integration",
    pattern: /\b(openai|anthropic|gemini|ai-sdk|generateText|streamText)\b/i
  },
  {
    label: "paid checkout",
    pattern: /\b(stripe|checkout|paymentIntent|subscription)\b/i
  },
  {
    label: "leaderboard implementation",
    pattern: /\bLeaderboard\b/
  }
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

function hasSameItems(actual: string[], expected: string[]) {
  return (
    actual.length === expected.length &&
    expected.every((item) => actual.includes(item))
  );
}

const appPageSource = readFileSync(appPagePath, "utf8");
const homepageSectionMounted =
  appPageSource.includes('id="community"') &&
  appPageSource.includes("<CommunityHero") &&
  appPageSource.includes("<CommunityCta");
const communityRouteAdded = existsSync(appCommunityRoute);
const sourceFiles = [
  appPagePath,
  communityDataPath,
  ...collectSourceFiles(communityComponentsDir)
];

const disallowedIntegrations: Finding[] = sourceFiles.flatMap((file) => {
  const source = readFileSync(file, "utf8");

  return disallowedPatterns
    .filter(({ pattern }) => pattern.test(source))
    .map(({ label }) => ({
      file: relativeFile(file),
      reason: `Source contains ${label}.`
    }));
});

const findings: Finding[] = [];

if (communityCards.length !== 3) {
  findings.push({ reason: "Community card count should be 3." });
}

if (!hasSameItems(communityTopGames.map((game) => game.title), expectedTopGames)) {
  findings.push({ reason: "Top game list does not match the required titles." });
}

if (!hasSameItems(communityAchievements, expectedAchievements)) {
  findings.push({
    reason: "Achievement badge list does not match the required titles."
  });
}

if (!hasSameItems(communityFaq.map((item) => item.question), expectedFaqQuestions)) {
  findings.push({
    reason: "FAQ question list does not match the required questions."
  });
}

if (!homepageSectionMounted) {
  findings.push({ reason: "Homepage #community section is not mounted." });
}

if (communityRouteAdded) {
  findings.push({ reason: "Unexpected /community route directory exists." });
}

if (disallowedIntegrations.length > 0) {
  findings.push({
    reason: "Community source contains disallowed integration code."
  });
}

const report = {
  status: findings.length === 0 ? "normal" : "needs-attention",
  allNormal: findings.length === 0,
  communityCards: communityCards.length,
  achievementBadges: communityAchievements.length,
  topGames: communityTopGames.length,
  faqItems: communityFaq.length,
  homepageSectionMounted,
  communityRouteAdded,
  disallowedIntegrations: disallowedIntegrations.length,
  findings,
  disallowedIntegrationDetails: disallowedIntegrations
};

mkdirSync(reportsDir, { recursive: true });
writeFileSync(
  path.join(reportsDir, "community-audit.json"),
  `${JSON.stringify(report, null, 2)}\n`
);

const markdown = [
  "# Community Matrix Audit",
  "",
  `- Status: ${report.status}`,
  `- Community Cards: ${report.communityCards}`,
  `- Achievement Badges: ${report.achievementBadges}`,
  `- Top Games: ${report.topGames}`,
  `- FAQ Items: ${report.faqItems}`,
  `- Homepage Section Mounted: ${report.homepageSectionMounted ? "Yes" : "No"}`,
  `- Community Route Added: ${report.communityRouteAdded ? "Yes" : "No"}`,
  `- Disallowed Integrations: ${report.disallowedIntegrations}`,
  "",
  "## Findings",
  "",
  ...(findings.length > 0
    ? findings.map((finding) => `- ${finding.file ?? "community"}: ${finding.reason}`)
    : ["None"]),
  "",
  "## Disallowed Integration Details",
  "",
  ...(disallowedIntegrations.length > 0
    ? disallowedIntegrations.map(
        (finding) => `- ${finding.file}: ${finding.reason}`
      )
    : ["None"])
].join("\n");

writeFileSync(path.join(reportsDir, "community-audit.md"), `${markdown}\n`);

console.log(
  `Community audit: ${report.communityCards} cards, ${report.achievementBadges} badges, ${report.topGames} top games, ${report.faqItems} FAQ items, status ${report.status}.`
);

if (findings.length > 0) {
  process.exitCode = 1;
}
