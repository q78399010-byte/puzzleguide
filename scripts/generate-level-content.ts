import {
  buildCommonMistakes,
  buildFaq,
  buildProTips,
  buildStepSequence,
  buildWalkthroughSummary,
  type VariationContext
} from "./optimize-content-variation";

export type LevelContentFaq = {
  question: string;
  answer: string;
};

export type GeneratedLevelContent = {
  title: string;
  summary: string;
  walkthroughSummary: string;
  steps: string[];
  tips: string[];
  commonMistakes: string[];
  faq: LevelContentFaq[];
  relatedLevels: string[];
};

type LevelPattern = {
  keywords: string[];
  mechanic: string;
  opening: string;
  blocker: string;
  cleanup: string;
  mistake: string;
};

const levelPatterns: LevelPattern[] = [
  {
    keywords: ["wood", "block", "unblock", "color wood"],
    mechanic: "space management and ordered block movement",
    opening: "Open the safest side lane before moving the largest blocker.",
    blocker: "Keep the reserve pocket clear until the main color group can move.",
    cleanup: "Slide the final group only after the matching exit lane is open.",
    mistake: "closing the lower escape lane too early"
  },
  {
    keywords: ["sort", "water", "ball", "goods", "cube", "magic"],
    mechanic: "sorting, grouping, and temporary storage",
    opening: "Build one clean color or item group before touching rare pieces.",
    blocker: "Use the empty slot as temporary storage, not as a permanent dump.",
    cleanup: "Merge the final groups after every mixed container has a destination.",
    mistake: "using every empty space before the final merge"
  },
  {
    keywords: ["screw", "nuts", "bolts", "pin", "rope", "tangle"],
    mechanic: "mechanical blockers and strict move order",
    opening: "Remove outside blockers before triggering the center chain.",
    blocker: "Watch which plate, screw, pin, or rope opens after each move.",
    cleanup: "Finish with the longest mechanical chain once both side lanes are free.",
    mistake: "starting the center sequence before hidden blockers are released"
  },
  {
    keywords: ["parking", "traffic", "bus", "jam"],
    mechanic: "route planning and lane clearing",
    opening: "Open the exit lane before moving crowded center pieces.",
    blocker: "Move short vehicles or objects first when they unlock two routes.",
    cleanup: "Clear the final route in one controlled sequence.",
    mistake: "freeing the wrong lane and creating a gridlock"
  },
  {
    keywords: ["match", "tile", "mahjong", "factory", "triple"],
    mechanic: "matching, tray control, and layered board cleanup",
    opening: "Take safe visible matches before opening deeper layers.",
    blocker: "Keep tray space available for repeated or hidden objects.",
    cleanup: "Clear layered matches only when the tray can absorb the next reveal.",
    mistake: "opening too many mixed layers at once"
  }
];

const fallbackPattern: LevelPattern = {
  keywords: [],
  mechanic: "level planning, blocker control, and step-by-step puzzle solving",
  opening: "Start with the safest move that creates space or reveals the main path.",
  blocker: "Protect one backup move while you inspect the main blocker.",
  cleanup: "Use the final sequence only after the board has enough working space.",
  mistake: "committing early moves before the final route is visible"
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeLevel(value: number | string) {
  const rawValue = String(value).trim();
  const matchedNumber = rawValue.match(/\d+/)?.[0];
  const cleanedLevel = rawValue.replace(/^level[-\s]*/i, "");

  if (matchedNumber) {
    return matchedNumber;
  }

  return cleanedLevel || "1";
}

function matchPattern(gameName: string) {
  const normalizedName = gameName.toLowerCase();

  return (
    levelPatterns.find((pattern) =>
      pattern.keywords.some((keyword) => normalizedName.includes(keyword))
    ) ?? fallbackPattern
  );
}

function relatedLevels(levelNumber: string) {
  const numericLevel = Number(levelNumber);

  if (!Number.isFinite(numericLevel) || numericLevel <= 0) {
    return ["level-12", "level-24", "level-36", "level-45"];
  }

  return [numericLevel - 15, numericLevel + 15, numericLevel + 30, numericLevel + 45]
    .filter((candidate) => candidate > 0)
    .map((candidate) => `level-${candidate}`)
    .slice(0, 4);
}

export function generateLevelContent(
  gameName: string,
  level: number | string
): GeneratedLevelContent {
  const normalizedGameName = normalize(gameName);
  const levelNumber = normalizeLevel(level);
  const pattern = matchPattern(normalizedGameName);
  const variationContext: VariationContext = {
    gameName: normalizedGameName,
    levelNumber,
    mechanic: pattern.mechanic,
    opening: pattern.opening,
    blocker: pattern.blocker,
    cleanup: pattern.cleanup,
    mistake: pattern.mistake
  };

  return {
    title: `${normalizedGameName} Level ${levelNumber} Walkthrough`,
    summary: `${normalizedGameName} Level ${levelNumber} is a ${pattern.mechanic} puzzle. For ${normalizedGameName} Level ${levelNumber}, protect working space, identify the main blocker, and finish with a controlled cleanup sequence.`,
    walkthroughSummary: buildWalkthroughSummary(variationContext),
    steps: buildStepSequence(variationContext),
    tips: buildProTips(variationContext),
    commonMistakes: buildCommonMistakes(variationContext),
    faq: buildFaq(variationContext),
    relatedLevels: relatedLevels(levelNumber)
  };
}
