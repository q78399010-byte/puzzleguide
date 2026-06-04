import { games, type Game } from "../data/games";
import { levels, type LevelGuide } from "../data/levels";
import {
  generateGuideContent,
  generateLevelContent,
  type StandardGeneratedContent
} from "../lib/content-generator";
import {
  buildAdvancedStrategy,
  buildBeginnerAdvice,
  type VariationContext
} from "./optimize-content-variation";

export type UpgradedTopLevelContent = {
  title: string;
  metaDescription: string;
  walkthroughSummary: string;
  steps: string[];
  proTips: string[];
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  relatedLevels: string[];
  relatedGames: string[];
  beginnerAdvice: string[];
  advancedStrategy: string[];
};

export type UpgradedTopLevelBatchItem = {
  gameName: string;
  gameSlug: string;
  levelNumber: number;
  pagePath: string;
  priority: number;
  views: number;
  content: UpgradedTopLevelContent;
};

export type TopLevelBatchOptions = {
  limit?: number;
  offset?: number;
  gameName?: string;
};

export const upgradeBatchPresets = {
  top10: 10,
  top20: 20,
  top100: 100,
  top300: 300,
  top500: 500
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeLevelNumber(value: number | string) {
  const matchedNumber = String(value).match(/\d+/)?.[0];

  return matchedNumber ? Number(matchedNumber) : 1;
}

function unique(items: string[]) {
  const values: string[] = [];

  for (const item of items) {
    const normalizedItem = normalize(item);
    const key = normalizedItem.toLowerCase();

    if (normalizedItem && !values.some((value) => value.toLowerCase() === key)) {
      values.push(normalizedItem);
    }
  }

  return values;
}

function metaDescription(value: string) {
  const cleanedValue = normalize(value);

  if (cleanedValue.length <= 158) {
    return cleanedValue;
  }

  return `${cleanedValue.slice(0, 155).replace(/\s+\S*$/, "")}...`;
}

function getSection(content: StandardGeneratedContent, title: string) {
  return content.sections.find(
    (section) => section.title.toLowerCase() === title.toLowerCase()
  );
}

function getSectionItems(
  content: StandardGeneratedContent,
  title: string,
  fallback: string[] = []
) {
  const section = getSection(content, title);

  return section?.items?.length ? section.items : fallback;
}

function findGameByName(gameName: string) {
  const normalizedGameName = normalize(gameName).toLowerCase();

  return games.find(
    (game) =>
      game.name.toLowerCase() === normalizedGameName ||
      game.slug.toLowerCase() === normalizedGameName
  );
}

function findLevel(game: Game, levelNumber: number) {
  return levels.find(
    (level) => level.gameSlug === game.slug && level.levelNumber === levelNumber
  );
}

function relatedGameNames(game: Game, guideRelatedContent: string[]) {
  const relatedFromGame = game.relatedGames
    .map((slug) => games.find((candidate) => candidate.slug === slug)?.name)
    .filter((name): name is string => Boolean(name));

  return unique([...relatedFromGame, ...guideRelatedContent]).slice(0, 6);
}

function levelPath(game: Game, level: LevelGuide | undefined, levelNumber: number) {
  return `/games/${game.slug}/levels/${level?.levelSlug ?? `level-${levelNumber}`}`;
}

export function generateUpgradedLevelContent(
  gameName: string,
  levelNumber: number | string
): UpgradedTopLevelContent {
  const game =
    findGameByName(gameName) ??
    ({
      name: normalize(gameName),
      slug: normalize(gameName).toLowerCase().replace(/\s+/g, "-"),
      relatedGames: [],
      beginnerTips: [],
      advancedStrategy: [],
      commonMistakes: []
    } as Pick<
      Game,
      | "name"
      | "slug"
      | "relatedGames"
      | "beginnerTips"
      | "advancedStrategy"
      | "commonMistakes"
    > as Game);
  const normalizedLevelNumber = normalizeLevelNumber(levelNumber);
  const existingLevel = findLevel(game, normalizedLevelNumber);
  const levelContent = generateLevelContent(game.name, normalizedLevelNumber);
  const beginnerGuide = generateGuideContent(game.name, "beginner");
  const walkthroughSection = getSection(levelContent, "Walkthrough Summary");
  const steps = getSectionItems(levelContent, "Step-by-step Solution", [
    ...(existingLevel?.steps ?? [])
  ]);
  const commonMistakes = getSectionItems(levelContent, "Common Mistakes", [
    ...(existingLevel?.commonMistakes ?? [])
  ]);
  const variationContext: VariationContext = {
    gameName: game.name,
    levelNumber: String(normalizedLevelNumber),
    mechanic: `${game.categoryName?.toLowerCase() ?? "puzzle"} planning`,
    opening: `Create safe working space before forcing the main clear in ${game.name} Level ${normalizedLevelNumber}.`,
    blocker: `Identify the route or piece that limits progress in ${game.name} Level ${normalizedLevelNumber}.`,
    cleanup: `finish the final sequence once ${game.name} Level ${normalizedLevelNumber} has enough open space.`,
    mistake: "spending the reserve move too early"
  };

  return {
    title: `${game.name} Level ${normalizedLevelNumber} Solution & Walkthrough`,
    metaDescription: metaDescription(
      `${game.name} Level ${normalizedLevelNumber} walkthrough and solution with safe steps, pro tips, common mistakes, FAQ, and related levels for stuck players.`
    ),
    walkthroughSummary:
      walkthroughSection?.body ??
      existingLevel?.summary ??
      `${game.name} Level ${normalizedLevelNumber} walkthrough with practical solution notes.`,
    steps,
    proTips: unique(levelContent.tips).slice(0, 7),
    commonMistakes: unique(commonMistakes).slice(0, 7),
    faq: uniqueFaq(levelContent.faq).slice(0, 6),
    relatedLevels: unique([
      ...(existingLevel?.relatedLevels ?? []),
      ...levelContent.relatedContent
    ]).slice(0, 6),
    relatedGames: relatedGameNames(game, beginnerGuide.relatedContent),
    beginnerAdvice: buildBeginnerAdvice(variationContext),
    advancedStrategy: buildAdvancedStrategy(variationContext)
  };
}

function uniqueFaq(items: { question: string; answer: string }[]) {
  const values: { question: string; answer: string }[] = [];

  for (const item of items) {
    const question = normalize(item.question);
    const answer = normalize(item.answer);

    if (
      question &&
      answer &&
      !values.some((value) => value.question.toLowerCase() === question.toLowerCase())
    ) {
      values.push({ question, answer });
    }
  }

  return values;
}

export function getTopLevels({
  limit = upgradeBatchPresets.top100,
  offset = 0,
  gameName
}: TopLevelBatchOptions = {}) {
  const targetGame = gameName ? findGameByName(gameName) : undefined;
  const candidateLevels = targetGame
    ? levels.filter((level) => level.gameSlug === targetGame.slug)
    : levels;

  return [...candidateLevels]
    .sort((levelA, levelB) => levelB.views - levelA.views)
    .slice(offset, offset + limit);
}

export function generateTopLevelUpgradeBatch(
  options: TopLevelBatchOptions = {}
): UpgradedTopLevelBatchItem[] {
  return getTopLevels(options).map((level, index) => {
    const game = games.find((candidate) => candidate.slug === level.gameSlug);

    if (!game) {
      throw new Error(`Missing game for level: ${level.gameSlug}/${level.levelSlug}`);
    }

    return {
      gameName: game.name,
      gameSlug: game.slug,
      levelNumber: level.levelNumber,
      pagePath: levelPath(game, level, level.levelNumber),
      priority: (options.offset ?? 0) + index + 1,
      views: level.views,
      content: generateUpgradedLevelContent(game.name, level.levelNumber)
    };
  });
}

export function generateTop100LevelUpgradeBatch() {
  return generateTopLevelUpgradeBatch({ limit: upgradeBatchPresets.top100 });
}

export function generateTop300LevelUpgradeBatch() {
  return generateTopLevelUpgradeBatch({ limit: upgradeBatchPresets.top300 });
}

export function generateTop500LevelUpgradeBatch() {
  return generateTopLevelUpgradeBatch({ limit: upgradeBatchPresets.top500 });
}

export function generateTopLevelUpgradeJson(options: TopLevelBatchOptions = {}) {
  return JSON.stringify(generateTopLevelUpgradeBatch(options), null, 2);
}

function cliLimit(value: string | undefined) {
  if (!value) {
    return upgradeBatchPresets.top20;
  }

  const preset =
    upgradeBatchPresets[value as keyof typeof upgradeBatchPresets] ??
    Number(value.replace(/^top/i, ""));

  return Number.isFinite(preset) && preset > 0 ? preset : upgradeBatchPresets.top20;
}

function isDirectScriptRun() {
  const scriptPath = process.argv[1]?.replace(/\\/g, "/") ?? "";

  return (
    scriptPath.endsWith("/scripts/upgrade-page-content.ts") ||
    scriptPath.endsWith("/scripts/upgrade-page-content.js")
  );
}

if (isDirectScriptRun()) {
  const [, , limitArg, gameNameArg] = process.argv;

  console.log(
    generateTopLevelUpgradeJson({
      limit: cliLimit(limitArg),
      gameName: gameNameArg
    })
  );
}
