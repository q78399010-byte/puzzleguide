export type ComparisonContentFaq = {
  question: string;
  answer: string;
};

export type ComparisonContentBlock = {
  heading: string;
  summary: string;
  gameA: string;
  gameB: string;
  verdict: string;
  points: string[];
};

export type GeneratedComparisonContent = {
  title: string;
  summary: string;
  difficultyComparison: ComparisonContentBlock;
  gameplayComparison: ComparisonContentBlock;
  bestForBeginners: ComparisonContentBlock;
  bestForAdvancedPlayers: ComparisonContentBlock;
  winnerSummary: string;
  faq: ComparisonContentFaq[];
  relatedGames: string[];
};

type GameProfile = {
  keywords: string[];
  label: string;
  difficulty: "Easy" | "Medium" | "Hard";
  mechanic: string;
  gameplay: string;
  beginnerFit: string;
  advancedFit: string;
  strength: string;
  relatedGames: string[];
};

const difficultyRank = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

const gameProfiles: GameProfile[] = [
  {
    keywords: ["color wood", "wood jam", "wood block", "wood puzzle", "unblock"],
    label: "wood movement puzzle",
    difficulty: "Hard",
    mechanic: "spatial planning, color routing, and limited board space",
    gameplay:
      "Players move wood pieces through tight lanes while preserving the final escape route.",
    beginnerFit:
      "good for beginners who already enjoy level-based puzzle solving and do not mind restarts",
    advancedFit:
      "strong for advanced players who want exact move order, blockers, and stuck-level walkthrough demand",
    strength: "precise level solving and satisfying board cleanup",
    relatedGames: ["Screw Jam", "Block Blast", "Wood Nuts & Bolts", "Parking Jam"]
  },
  {
    keywords: ["screw", "nuts", "bolts", "pin", "rope", "tangle"],
    label: "mechanical order puzzle",
    difficulty: "Hard",
    mechanic: "strict move order, hidden blockers, and mechanical chain reactions",
    gameplay:
      "Players remove screws, pins, ropes, or panels in the right sequence before space runs out.",
    beginnerFit:
      "better for beginners who like obvious physical rules but can handle a strict sequence",
    advancedFit:
      "excellent for advanced players because one early mistake can block the whole board",
    strength: "hard mechanical planning and clear walkthrough value",
    relatedGames: ["Color Wood Jam", "Nuts And Bolts", "Rope Puzzle", "Arrows GO"]
  },
  {
    keywords: ["water", "sort", "ball", "goods", "magic", "cube", "sort it"],
    label: "sorting puzzle",
    difficulty: "Medium",
    mechanic: "color grouping, temporary storage, and safe transfer planning",
    gameplay:
      "Players group colors or items into clean containers while keeping enough temporary space open.",
    beginnerFit:
      "one of the better starting points for beginners because the rules are readable and repeatable",
    advancedFit:
      "useful for advanced players when later levels reduce storage and punish careless pours",
    strength: "relaxing progression and easy-to-scan solution logic",
    relatedGames: ["Water Sort", "Magic Sort", "Ball Sort Puzzle", "Goods Sort"]
  },
  {
    keywords: ["block blast", "hexa", "block puzzle", "blocks"],
    label: "block placement puzzle",
    difficulty: "Medium",
    mechanic: "shape placement, open-space control, and board cleanup",
    gameplay:
      "Players place shapes to clear lines, protect open zones, and keep the board playable.",
    beginnerFit:
      "friendly for beginners who prefer repeatable board strategy over exact level solutions",
    advancedFit:
      "good for advanced players who want long-run planning, score pressure, and space optimization",
    strength: "replay value and clean board-control strategy",
    relatedGames: ["Color Wood Jam", "Magic Sort", "Tile Match", "Hexa Sort"]
  },
  {
    keywords: ["parking", "traffic", "bus", "jam puzzle", "escape"],
    label: "traffic routing puzzle",
    difficulty: "Medium",
    mechanic: "lane clearing, route sequencing, and exit planning",
    gameplay:
      "Players open crowded lanes and move vehicles or objects in the correct route order.",
    beginnerFit:
      "easy to understand for beginners because the main goal is usually visible from the start",
    advancedFit:
      "solid for advanced players when crowded boards require two or three chained lane clears",
    strength: "visible objectives and satisfying route cleanup",
    relatedGames: ["Parking Jam", "Bus Jam", "Traffic Escape", "Arrows GO"]
  },
  {
    keywords: ["match", "tile", "mahjong", "factory", "triple"],
    label: "matching puzzle",
    difficulty: "Medium",
    mechanic: "tray capacity, layered boards, and safe match selection",
    gameplay:
      "Players reveal objects or tiles gradually while preventing the tray from filling with mixed items.",
    beginnerFit:
      "good for beginners who like visible matches and simple short-term goals",
    advancedFit:
      "better for advanced players when layered boards hide critical matches under clutter",
    strength: "quick recognition, layered cleanup, and collection-style progression",
    relatedGames: ["Tile Match", "Match Factory", "Mahjong Match", "Block Blast"]
  },
  {
    keywords: ["brain", "test", "word", "connect", "tangram", "logic"],
    label: "logic puzzle",
    difficulty: "Medium",
    mechanic: "rule discovery, pattern reading, and non-obvious solutions",
    gameplay:
      "Players solve each level by identifying the hidden rule, trick, or pattern behind the objective.",
    beginnerFit:
      "works for beginners who enjoy short puzzles and are comfortable testing assumptions",
    advancedFit:
      "valuable for advanced players when later levels rely on unusual rules or lateral thinking",
    strength: "variety, surprise solutions, and strong guide intent",
    relatedGames: ["Brain Test", "Word Connect", "Tangram Puzzle", "Rope Puzzle"]
  }
];

const fallbackProfile: GameProfile = {
  keywords: [],
  label: "level-based puzzle",
  difficulty: "Medium",
  mechanic: "level planning, blocker control, and step-by-step puzzle solving",
  gameplay:
    "Players study the board, find the main constraint, and solve levels through careful move order.",
  beginnerFit:
    "reasonable for beginners if they use walkthroughs when the first difficult levels appear",
  advancedFit:
    "useful for advanced players who want structured level guides and comparison pages",
  strength: "clear level progression and walkthrough coverage",
  relatedGames: ["Color Wood Jam", "Screw Jam", "Water Sort", "Block Blast"]
};

const exactDifficulty: Record<string, GameProfile["difficulty"]> = {
  "water sort": "Easy",
  "ball sort puzzle": "Easy",
  "color wood jam": "Hard",
  "screw jam": "Hard",
  "wood nuts & bolts": "Hard",
  "nuts and bolts": "Hard",
  "block blast": "Medium",
  "arrows go": "Medium",
  "magic sort": "Medium"
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function matchProfile(gameName: string): GameProfile {
  const normalizedName = gameName.toLowerCase();
  const matchedProfile =
    gameProfiles.find((profile) =>
      profile.keywords.some((keyword) => normalizedName.includes(keyword))
    ) ?? fallbackProfile;
  const overrideDifficulty = exactDifficulty[normalizedName];

  if (!overrideDifficulty) {
    return matchedProfile;
  }

  return {
    ...matchedProfile,
    difficulty: overrideDifficulty
  };
}

function easierGame(
  gameA: string,
  profileA: GameProfile,
  gameB: string,
  profileB: GameProfile
) {
  if (difficultyRank[profileA.difficulty] === difficultyRank[profileB.difficulty]) {
    return "both games";
  }

  return difficultyRank[profileA.difficulty] < difficultyRank[profileB.difficulty]
    ? gameA
    : gameB;
}

function harderGame(
  gameA: string,
  profileA: GameProfile,
  gameB: string,
  profileB: GameProfile
) {
  if (difficultyRank[profileA.difficulty] === difficultyRank[profileB.difficulty]) {
    return "both games";
  }

  return difficultyRank[profileA.difficulty] > difficultyRank[profileB.difficulty]
    ? gameA
    : gameB;
}

function uniqueRelatedGames(gameA: string, gameB: string, profiles: GameProfile[]) {
  const excluded = new Set([gameA.toLowerCase(), gameB.toLowerCase()]);
  const relatedGames = profiles.flatMap((profile) => profile.relatedGames);
  const unique: string[] = [];

  for (const relatedGame of relatedGames) {
    const key = relatedGame.toLowerCase();

    if (!excluded.has(key) && !unique.some((value) => value.toLowerCase() === key)) {
      unique.push(relatedGame);
    }
  }

  return unique.slice(0, 6);
}

function buildFaq(
  gameA: string,
  profileA: GameProfile,
  gameB: string,
  profileB: GameProfile
): ComparisonContentFaq[] {
  const beginnerPick = easierGame(gameA, profileA, gameB, profileB);
  const advancedPick = harderGame(gameA, profileA, gameB, profileB);

  return [
    {
      question: `Which is easier, ${gameA} or ${gameB}?`,
      answer:
        beginnerPick === "both games"
          ? `${gameA} and ${gameB} have similar difficulty. Choose based on whether you prefer ${profileA.label} mechanics or ${profileB.label} mechanics.`
          : `${beginnerPick} is usually easier because its early levels are more forgiving for new players.`
    },
    {
      question: `Which game is better for advanced players?`,
      answer:
        advancedPick === "both games"
          ? `Both games can work for advanced players, but ${gameA} focuses on ${profileA.mechanic}, while ${gameB} focuses on ${profileB.mechanic}.`
          : `${advancedPick} is usually the stronger advanced choice because its levels create stricter planning pressure.`
    },
    {
      question: `Do ${gameA} and ${gameB} need walkthroughs?`,
      answer:
        "Yes. Both games can benefit from walkthroughs, especially when a level has hidden blockers, limited space, or a strict final sequence."
    },
    {
      question: "Is this comparison generated with an AI API?",
      answer:
        "No. This comparison content is generated from static templates and rule-based game mechanics."
    }
  ];
}

export function generateComparisonContent(
  gameA: string,
  gameB: string
): GeneratedComparisonContent {
  const normalizedGameA = normalize(gameA);
  const normalizedGameB = normalize(gameB);
  const profileA = matchProfile(normalizedGameA);
  const profileB = matchProfile(normalizedGameB);
  const beginnerPick = easierGame(normalizedGameA, profileA, normalizedGameB, profileB);
  const advancedPick = harderGame(normalizedGameA, profileA, normalizedGameB, profileB);
  const sameDifficulty =
    difficultyRank[profileA.difficulty] === difficultyRank[profileB.difficulty];

  const winnerSummary = sameDifficulty
    ? `Choose ${normalizedGameA} if you prefer ${profileA.strength}; choose ${normalizedGameB} if you prefer ${profileB.strength}.`
    : `${beginnerPick} is the easier starting point, while ${advancedPick} is the better pick for players who want a tougher puzzle challenge.`;

  return {
    title: `${normalizedGameA} vs ${normalizedGameB}: Which Puzzle Game Is Better?`,
    summary: `${normalizedGameA} is a ${profileA.label} built around ${profileA.mechanic}. ${normalizedGameB} is a ${profileB.label} built around ${profileB.mechanic}. This comparison helps players choose by difficulty, gameplay style, beginner value, advanced challenge, and walkthrough demand.`,
    difficultyComparison: {
      heading: "Difficulty Comparison",
      summary: `${normalizedGameA} is rated ${profileA.difficulty}, while ${normalizedGameB} is rated ${profileB.difficulty}.`,
      gameA: `${normalizedGameA}: ${profileA.difficulty}`,
      gameB: `${normalizedGameB}: ${profileB.difficulty}`,
      verdict: sameDifficulty
        ? "Both games sit in a similar difficulty range, so the better choice depends on mechanic preference."
        : `${beginnerPick} is easier to start, while ${advancedPick} should feel more demanding over time.`,
      points: [
        `${normalizedGameA} difficulty comes from ${profileA.mechanic}.`,
        `${normalizedGameB} difficulty comes from ${profileB.mechanic}.`,
        "Harder levels usually need a step-by-step walkthrough when early moves remove the final solution path."
      ]
    },
    gameplayComparison: {
      heading: "Gameplay Comparison",
      summary: `${normalizedGameA} and ${normalizedGameB} solve different puzzle moods and player intents.`,
      gameA: `${normalizedGameA}: ${profileA.gameplay}`,
      gameB: `${normalizedGameB}: ${profileB.gameplay}`,
      verdict: `Pick ${normalizedGameA} for ${profileA.strength}; pick ${normalizedGameB} for ${profileB.strength}.`,
      points: [
        `${normalizedGameA} works best when players understand ${profileA.mechanic}.`,
        `${normalizedGameB} works best when players understand ${profileB.mechanic}.`,
        "Both formats can support game hubs, solution pages, tips pages, and level walkthrough collections."
      ]
    },
    bestForBeginners: {
      heading: "Best For Beginners",
      summary:
        beginnerPick === "both games"
          ? `Both ${normalizedGameA} and ${normalizedGameB} can work for beginners if players follow safe opening moves.`
          : `${beginnerPick} is the more beginner-friendly choice in this comparison.`,
      gameA: `${normalizedGameA}: ${profileA.beginnerFit}.`,
      gameB: `${normalizedGameB}: ${profileB.beginnerFit}.`,
      verdict:
        beginnerPick === "both games"
          ? "Beginners should choose based on the mechanic they understand faster."
          : `Beginners should start with ${beginnerPick}, then move to the harder game when they want more pressure.`,
      points: [
        "Beginner-friendly puzzle games have readable goals and forgiving early levels.",
        "A good starter game still needs tips when storage, lanes, or blockers become strict.",
        "Players should use walkthroughs when the same level fails after several attempts."
      ]
    },
    bestForAdvancedPlayers: {
      heading: "Best For Advanced Players",
      summary:
        advancedPick === "both games"
          ? `${normalizedGameA} and ${normalizedGameB} both offer enough depth for advanced players.`
          : `${advancedPick} is usually the better advanced-player choice.`,
      gameA: `${normalizedGameA}: ${profileA.advancedFit}.`,
      gameB: `${normalizedGameB}: ${profileB.advancedFit}.`,
      verdict:
        advancedPick === "both games"
          ? "Advanced players should choose the game with the mechanic they want to master."
          : `Advanced players should try ${advancedPick} when they want stricter sequencing and harder stuck levels.`,
      points: [
        "Advanced puzzle value comes from delayed consequences, not only from crowded boards.",
        "The best hard levels make the final three moves matter as much as the opening.",
        "Comparison pages should connect players to exact level guides when they need solutions."
      ]
    },
    winnerSummary,
    faq: buildFaq(normalizedGameA, profileA, normalizedGameB, profileB),
    relatedGames: uniqueRelatedGames(normalizedGameA, normalizedGameB, [
      profileA,
      profileB
    ])
  };
}
