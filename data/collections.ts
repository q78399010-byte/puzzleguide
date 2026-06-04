export type GameCollection = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  games: string[];
  keywords: string[];
  estimatedGuidesCount: number;
  bestFor: string[];
  faq: { question: string; answer: string }[];
  relatedCollections: string[];
};

const defaultFaq = (title: string) => [
  {
    question: `What is included in ${title}?`,
    answer:
      "Each collection links to related game hubs, walkthrough pages, level guides, and practical tips on PuzzleMaster."
  },
  {
    question: "Do these collections include level guides?",
    answer:
      "Yes. The collections point users toward games that have static walkthrough hubs and level-by-level guide pages."
  },
  {
    question: "How should beginners use this list?",
    answer:
      "Start with lower difficulty games, then use related collections and walkthrough pages when a level gets difficult."
  }
];

export const collections: GameCollection[] = [
  {
    slug: "best-puzzle-games-2026",
    title: "Best Puzzle Games 2026",
    description:
      "A broad list of popular puzzle games with walkthrough hubs, level guides, and replay-friendly mechanics.",
    intro:
      "Explore the best puzzle games to play in 2026, from relaxing sorting puzzles to hard level-based brain teasers.",
    games: ["color-wood-jam", "screw-jam", "water-sort", "block-blast", "parking-jam"],
    keywords: ["best puzzle games", "popular puzzle games", "puzzle walkthroughs"],
    estimatedGuidesCount: 2200,
    bestFor: ["General puzzle fans", "Walkthrough search", "High replay value"],
    faq: defaultFaq("Best Puzzle Games 2026"),
    relatedCollections: ["best-sorting-puzzle-games", "hardest-puzzle-levels"]
  },
  {
    slug: "best-sorting-puzzle-games",
    title: "Best Sorting Puzzle Games",
    description:
      "Sorting games for players who enjoy organizing colors, goods, balls, and item groups.",
    intro:
      "Sorting puzzle games are relaxing but can become surprisingly strategic when storage space is limited.",
    games: ["water-sort", "magic-sort", "ball-sort-puzzle", "goods-sort", "sort-it-out"],
    keywords: ["sorting puzzle games", "relaxing puzzle games", "level guides"],
    estimatedGuidesCount: 1600,
    bestFor: ["Relaxing play", "Color sorting", "Beginner-friendly puzzles"],
    faq: defaultFaq("Best Sorting Puzzle Games"),
    relatedCollections: ["best-relaxing-puzzle-games", "games-like-water-sort"]
  },
  {
    slug: "best-wood-puzzle-games",
    title: "Best Wood Puzzle Games",
    description:
      "Wood puzzle games built around blocks, screws, bolts, boards, and tactile puzzle movement.",
    intro:
      "Wood puzzle games combine a calm visual style with move-order challenges and satisfying board cleanup.",
    games: ["color-wood-jam", "wood-nuts-and-bolts", "nuts-and-bolts", "screw-jam", "jam-puzzle"],
    keywords: ["wood puzzle games", "wood block puzzle", "screw puzzle walkthroughs"],
    estimatedGuidesCount: 1450,
    bestFor: ["Wood puzzle fans", "Mechanical planning", "Hard stuck levels"],
    faq: defaultFaq("Best Wood Puzzle Games"),
    relatedCollections: ["games-like-color-wood-jam", "games-like-screw-jam"]
  },
  {
    slug: "best-block-puzzle-games",
    title: "Best Block Puzzle Games",
    description:
      "Block and tile puzzle games with placement strategy, board control, and level guide coverage.",
    intro:
      "Block puzzle games reward spacing, shape planning, and strong board control across many levels.",
    games: ["block-blast", "hexa-sort", "tile-match", "match-factory", "color-wood-jam"],
    keywords: ["block puzzle games", "tile puzzle", "board control"],
    estimatedGuidesCount: 1200,
    bestFor: ["Board strategy", "Tile matching", "Replay value"],
    faq: defaultFaq("Best Block Puzzle Games"),
    relatedCollections: ["best-puzzle-games-2026", "best-brain-training-games"]
  },
  {
    slug: "best-relaxing-puzzle-games",
    title: "Best Relaxing Puzzle Games",
    description:
      "Calm puzzle games for sorting, matching, organizing, and solving without heavy pressure.",
    intro:
      "Relaxing puzzle games are ideal for daily play, but the best ones still offer meaningful level progression.",
    games: ["water-sort", "sort-it-out", "goods-sort", "magic-sort", "tile-match"],
    keywords: ["relaxing puzzle games", "calm puzzle games", "sorting games"],
    estimatedGuidesCount: 1380,
    bestFor: ["Casual play", "Low pressure", "Daily puzzle sessions"],
    faq: defaultFaq("Best Relaxing Puzzle Games"),
    relatedCollections: ["best-sorting-puzzle-games", "top-puzzle-games-for-beginners"]
  },
  {
    slug: "hardest-puzzle-levels",
    title: "Hardest Puzzle Levels",
    description:
      "A collection for players looking for difficult puzzle levels, hard walkthroughs, and stuck-level help.",
    intro:
      "Hard levels usually combine limited space, hidden blockers, or move sequences that fail late if opened incorrectly.",
    games: ["screw-jam", "color-wood-jam", "jam-puzzle", "bus-jam", "wood-nuts-and-bolts"],
    keywords: ["hardest puzzle levels", "stuck levels", "hard walkthroughs"],
    estimatedGuidesCount: 1750,
    bestFor: ["Advanced players", "Difficult levels", "Exact move order"],
    faq: defaultFaq("Hardest Puzzle Levels"),
    relatedCollections: ["games-like-screw-jam", "most-popular-puzzle-walkthroughs"]
  },
  {
    slug: "best-brain-training-games",
    title: "Best Brain Training Games",
    description:
      "Brain training games that use logic, planning, trick answers, and route solving.",
    intro:
      "Brain training puzzle games are useful for players who enjoy reasoning, path planning, and surprising solutions.",
    games: ["brain-test", "arrows-go", "traffic-escape", "rope-puzzle", "parking-jam"],
    keywords: ["brain training games", "logic puzzles", "brain teaser walkthroughs"],
    estimatedGuidesCount: 1180,
    bestFor: ["Logic practice", "Trick levels", "Path planning"],
    faq: defaultFaq("Best Brain Training Games"),
    relatedCollections: ["best-puzzle-games-2026", "hardest-puzzle-levels"]
  },
  {
    slug: "games-like-color-wood-jam",
    title: "Games Like Color Wood Jam",
    description:
      "Similar games for Color Wood Jam players who want wood puzzles, sorting, block movement, and stuck-level guides.",
    intro:
      "If you like Color Wood Jam, try games that combine spatial movement with color grouping and order planning.",
    games: ["screw-jam", "block-blast", "magic-sort", "water-sort", "wood-nuts-and-bolts"],
    keywords: ["games like Color Wood Jam", "similar puzzle games", "wood puzzle guides"],
    estimatedGuidesCount: 1540,
    bestFor: ["Color Wood Jam fans", "Similar mechanics", "Level walkthroughs"],
    faq: defaultFaq("Games Like Color Wood Jam"),
    relatedCollections: ["best-wood-puzzle-games", "best-puzzle-games-2026"]
  },
  {
    slug: "games-like-water-sort",
    title: "Games Like Water Sort",
    description:
      "Similar games for Water Sort players who want sorting, color logic, relaxing boards, and level guides.",
    intro:
      "Water Sort fans usually enjoy games that combine calm visuals with strict temporary-space planning.",
    games: ["magic-sort", "ball-sort-puzzle", "sort-it-out", "goods-sort", "hexa-sort"],
    keywords: ["games like Water Sort", "sorting games", "relaxing puzzle games"],
    estimatedGuidesCount: 1490,
    bestFor: ["Water Sort fans", "Color sorting", "Relaxing strategy"],
    faq: defaultFaq("Games Like Water Sort"),
    relatedCollections: ["best-sorting-puzzle-games", "best-relaxing-puzzle-games"]
  },
  {
    slug: "games-like-screw-jam",
    title: "Games Like Screw Jam",
    description:
      "Similar games for Screw Jam players who enjoy nuts, bolts, panels, hidden blockers, and hard puzzle levels.",
    intro:
      "Screw Jam players often enjoy mechanical puzzles where tray space and hidden blockers decide the correct move order.",
    games: ["wood-nuts-and-bolts", "nuts-and-bolts", "arrows-go", "color-wood-jam", "rope-puzzle"],
    keywords: ["games like Screw Jam", "screw puzzle games", "mechanical puzzle walkthroughs"],
    estimatedGuidesCount: 1360,
    bestFor: ["Screw puzzle fans", "Mechanical planning", "Hard levels"],
    faq: defaultFaq("Games Like Screw Jam"),
    relatedCollections: ["best-wood-puzzle-games", "hardest-puzzle-levels"]
  },
  {
    slug: "top-puzzle-games-for-beginners",
    title: "Top Puzzle Games for Beginners",
    description:
      "Beginner-friendly puzzle games with clear mechanics, relaxing pacing, and accessible walkthrough pages.",
    intro:
      "Beginner puzzle games should explain themselves quickly while still offering deeper level progression later.",
    games: ["water-sort", "ball-sort-puzzle", "sort-it-out", "tile-match", "goods-sort"],
    keywords: ["puzzle games for beginners", "easy puzzle games", "beginner walkthroughs"],
    estimatedGuidesCount: 1320,
    bestFor: ["New players", "Relaxed pacing", "Easy level guides"],
    faq: defaultFaq("Top Puzzle Games for Beginners"),
    relatedCollections: ["best-relaxing-puzzle-games", "best-sorting-puzzle-games"]
  },
  {
    slug: "most-popular-puzzle-walkthroughs",
    title: "Most Popular Puzzle Walkthroughs",
    description:
      "Popular walkthrough hubs and high-demand level guides for frequently searched puzzle games.",
    intro:
      "The most popular puzzle walkthroughs usually cover games with many levels, frequent stuck points, and fast search demand.",
    games: ["color-wood-jam", "screw-jam", "water-sort", "parking-jam", "brain-test"],
    keywords: ["popular puzzle walkthroughs", "level guides", "puzzle solutions"],
    estimatedGuidesCount: 2100,
    bestFor: ["Search demand", "Stuck levels", "Walkthrough discovery"],
    faq: defaultFaq("Most Popular Puzzle Walkthroughs"),
    relatedCollections: ["best-puzzle-games-2026", "hardest-puzzle-levels"]
  }
];
