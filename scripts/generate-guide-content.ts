export type GuideContentSection = {
  heading: string;
  body: string;
};

export type GuideContentFaq = {
  question: string;
  answer: string;
};

export type GuideContentModule = {
  title: string;
  intro: string;
  sections: GuideContentSection[];
  tips: string[];
  faq: GuideContentFaq[];
  relatedGames: string[];
};

export type GeneratedGuideContent = {
  beginnerGuide: GuideContentModule;
  advancedStrategy: GuideContentModule;
  hardLevelsGuide: GuideContentModule;
  walkthroughCollection: GuideContentModule;
};

type GamePattern = {
  keywords: string[];
  mechanic: string;
  relatedGames: string[];
  beginnerFocus: string;
  advancedFocus: string;
  hardLevelFocus: string;
};

const gamePatterns: GamePattern[] = [
  {
    keywords: ["wood", "block", "unblock", "color wood"],
    mechanic: "space management and ordered block movement",
    relatedGames: ["Screw Jam", "Block Blast", "Wood Nuts & Bolts", "Unblock Me"],
    beginnerFocus: "clear the safest lane before moving the largest blocker",
    advancedFocus: "preserve reserve space while planning two or three moves ahead",
    hardLevelFocus: "late-board locks caused by closing the only escape lane"
  },
  {
    keywords: ["sort", "water", "ball", "goods", "cube", "magic"],
    mechanic: "sorting, grouping, and temporary storage",
    relatedGames: ["Water Sort", "Magic Sort", "Ball Sort Puzzle", "Goods Sort"],
    beginnerFocus: "build one clean group before moving rare colors or items",
    advancedFocus: "use temporary storage only when the piece can move again soon",
    hardLevelFocus: "deadlocks caused by filling every empty container too early"
  },
  {
    keywords: ["screw", "nuts", "bolts", "pin", "rope", "tangle"],
    mechanic: "mechanical blockers and strict move order",
    relatedGames: ["Screw Jam", "Nuts And Bolts", "Rope Puzzle", "Pull the Pin"],
    beginnerFocus: "remove outside blockers before triggering the center chain",
    advancedFocus: "predict which plate, pin, or rope opens after each move",
    hardLevelFocus: "hidden blockers that punish early center moves"
  },
  {
    keywords: ["parking", "traffic", "bus", "jam"],
    mechanic: "route planning and lane clearing",
    relatedGames: ["Parking Jam", "Traffic Escape", "Bus Jam", "Jam Puzzle"],
    beginnerFocus: "open the exit lane before moving crowded center pieces",
    advancedFocus: "sequence short moves so the final vehicle or object can leave",
    hardLevelFocus: "gridlocks caused by freeing the wrong lane first"
  },
  {
    keywords: ["match", "tile", "mahjong", "factory", "triple"],
    mechanic: "matching, tray control, and layered board cleanup",
    relatedGames: ["Tile Match", "Match Factory", "Match Tile 3D", "Mahjong Match"],
    beginnerFocus: "take safe visible matches before opening deeper layers",
    advancedFocus: "keep tray capacity open for hidden or repeated objects",
    hardLevelFocus: "tray overload caused by opening too many mixed layers"
  },
  {
    keywords: ["brain", "word", "test", "connect", "tangram"],
    mechanic: "logic, pattern recognition, and non-obvious solutions",
    relatedGames: ["Brain Test", "Word Connect", "Tangram Puzzle", "Rope Puzzle"],
    beginnerFocus: "look for the rule behind the puzzle before trying random moves",
    advancedFocus: "test assumptions and identify the hidden constraint",
    hardLevelFocus: "trick solutions that require reading the objective differently"
  }
];

const fallbackPattern: GamePattern = {
  keywords: [],
  mechanic: "level planning, blocker control, and step-by-step puzzle solving",
  relatedGames: ["Color Wood Jam", "Screw Jam", "Water Sort", "Block Blast"],
  beginnerFocus: "start with the safest move and keep temporary space open",
  advancedFocus: "plan the final sequence before committing early moves",
  hardLevelFocus: "failed openings that remove the space needed for cleanup"
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function matchPattern(gameName: string) {
  const normalizedName = gameName.toLowerCase();

  return (
    gamePatterns.find((pattern) =>
      pattern.keywords.some((keyword) => normalizedName.includes(keyword))
    ) ?? fallbackPattern
  );
}

function uniqueRelatedGames(gameName: string, relatedGames: string[]) {
  const normalizedName = gameName.toLowerCase();

  return relatedGames
    .filter((relatedGame) => relatedGame.toLowerCase() !== normalizedName)
    .slice(0, 4);
}

function baseFaq(gameName: string, guideLabel: string): GuideContentFaq[] {
  return [
    {
      question: `Is this ${gameName} ${guideLabel} generated with AI?`,
      answer:
        "No. This content is generated from reusable static templates and rule-based game mechanics."
    },
    {
      question: `Can I use this ${gameName} guide for hard levels?`,
      answer:
        "Yes. Use the guide to understand the main blocker, common mistakes, and which related levels to inspect next."
    },
    {
      question: `Does this ${gameName} guide replace level walkthroughs?`,
      answer:
        "No. It is a guide hub module that should link users toward exact level walkthrough pages when available."
    }
  ];
}

function buildModule(
  gameName: string,
  pattern: GamePattern,
  key: "beginner" | "advanced" | "hard" | "walkthrough"
): GuideContentModule {
  const relatedGames = uniqueRelatedGames(gameName, pattern.relatedGames);

  if (key === "beginner") {
    return {
      title: `Beginner Guide: ${gameName} Levels`,
      intro: `${gameName} is easier to learn when you understand its core mechanic: ${pattern.mechanic}. This beginner guide focuses on safe openings, simple planning, and avoiding early mistakes.`,
      sections: [
        {
          heading: "Start with the safest move",
          body: `For ${gameName}, the first move should usually create space or unlock a safe path. Do not chase the fastest clear if it closes the board.`
        },
        {
          heading: "Understand the main blocker",
          body: `Look for the piece, lane, container, or rule that controls the rest of the level. Most beginner failures happen when this blocker is ignored.`
        },
        {
          heading: "Use related levels for practice",
          body: `After learning the opening pattern, compare nearby levels to see how ${gameName} repeats its puzzle logic with small changes.`
        }
      ],
      tips: [
        `Focus on this beginner rule: ${pattern.beginnerFocus}.`,
        "Keep one backup move available before committing to the center of the board.",
        "Restart early if the first sequence removes all useful space."
      ],
      faq: baseFaq(gameName, "beginner guide"),
      relatedGames
    };
  }

  if (key === "advanced") {
    return {
      title: `Advanced Strategy Guide: ${gameName}`,
      intro: `Advanced ${gameName} play is about reading future constraints before they appear. The best strategy is to protect space, predict blockers, and delay risky moves until the cleanup route is clear.`,
      sections: [
        {
          heading: "Plan the final board state",
          body: `Before making a tempting move in ${gameName}, ask what the final three moves need. This prevents late-board locks.`
        },
        {
          heading: "Control temporary space",
          body: `Temporary space is not spare space. It is a tool for staging the final solution path.`
        },
        {
          heading: "Read chain reactions",
          body: `Advanced levels often shift after one move. Track what opens, what closes, and what must wait.`
        }
      ],
      tips: [
        `Use this advanced rule: ${pattern.advancedFocus}.`,
        "Delay the obvious clear when it would damage the final route.",
        "Prioritize moves that unlock two future options instead of one."
      ],
      faq: baseFaq(gameName, "advanced strategy guide"),
      relatedGames
    };
  }

  if (key === "hard") {
    return {
      title: `${gameName} Hard Level Guide`,
      intro: `Hard ${gameName} levels usually fail because one early decision removes the final solution route. This guide focuses on stuck levels, hard blockers, and repeatable recovery patterns.`,
      sections: [
        {
          heading: "Identify the failure point",
          body: `When a ${gameName} hard level fails, trace the board back to the move that removed space, blocked a lane, or mixed the wrong group.`
        },
        {
          heading: "Protect the cleanup route",
          body: "The cleanup route is often more important than the first clear. Preserve it until the final sequence is ready."
        },
        {
          heading: "Use exact walkthroughs when needed",
          body: "If a hard level repeats the same lock, move from this guide into a level-specific walkthrough."
        }
      ],
      tips: [
        `Watch for this hard-level trap: ${pattern.hardLevelFocus}.`,
        "Do not trust a move just because it clears something immediately.",
        "Compare related hard levels to learn repeated blocker patterns."
      ],
      faq: baseFaq(gameName, "hard level guide"),
      relatedGames
    };
  }

  return {
    title: `${gameName} Walkthrough Collection`,
    intro: `This ${gameName} walkthrough collection is designed to connect broad strategy with exact level pages. Use it to move from game-level advice into step-by-step walkthroughs.`,
    sections: [
      {
        heading: "Walkthrough Summary",
        body: `${gameName} walkthroughs should explain the opening move, the main blocker, the safest cleanup path, and the mistake that causes most failed attempts.`
      },
      {
        heading: "Level Guide Structure",
        body: "A useful level guide should include steps, tips, common mistakes, FAQ, and related levels."
      },
      {
        heading: "Related Game Discovery",
        body: "Players who enjoy one puzzle pattern often benefit from related games with similar mechanics."
      }
    ],
    tips: [
      "Start with the game hub, then open exact level pages when needed.",
      "Use walkthrough collections to find repeated level patterns.",
      "Compare similar games when you want a different puzzle style."
    ],
    faq: baseFaq(gameName, "walkthrough collection"),
    relatedGames
  };
}

export function generateGuideContent(gameName: string): GeneratedGuideContent {
  const normalizedGameName = normalize(gameName);
  const pattern = matchPattern(normalizedGameName);

  return {
    beginnerGuide: buildModule(normalizedGameName, pattern, "beginner"),
    advancedStrategy: buildModule(normalizedGameName, pattern, "advanced"),
    hardLevelsGuide: buildModule(normalizedGameName, pattern, "hard"),
    walkthroughCollection: buildModule(normalizedGameName, pattern, "walkthrough")
  };
}
