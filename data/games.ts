import { categories } from "@/data/categories";

export type GameDifficulty = "Easy" | "Medium" | "Hard" | "Expert";

export type Game = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  seoIntro: string;
  imagePlaceholder: string;
  difficulty: GameDifficulty;
  totalLevels: number;
  guideCount: number;
  updatedAt: string;
  popularity: number;
  color: string;
  tags: string[];
  beginnerTips: string[];
  advancedStrategy: string[];
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  relatedGames: string[];
};

type GameSpec = Omit<
  Game,
  | "category"
  | "categoryName"
  | "imagePlaceholder"
  | "beginnerTips"
  | "advancedStrategy"
  | "commonMistakes"
  | "faq"
>;

const categoryName = (slug: string) =>
  categories.find((category) => category.slug === slug)?.name ?? "Puzzle";

const tipsByCategory: Record<
  string,
  {
    beginnerTips: string[];
    advancedStrategy: string[];
    commonMistakes: string[];
  }
> = {
  "wood-puzzle": {
    beginnerTips: [
      "Open the board by moving pieces that already have a clear exit.",
      "Keep one reserve lane available until the final group is ready.",
      "Clear small pieces only when they improve movement for a larger blocker."
    ],
    advancedStrategy: [
      "Plan around the largest object because it controls most late-game space.",
      "Use reserve pockets to stage pieces in the order they will exit.",
      "Delay central blockers until both side lanes can absorb short moves."
    ],
    commonMistakes: [
      "Filling the best reserve lane with a piece that cannot finish the level.",
      "Moving the center stack before the large blocker has an exit path.",
      "Clearing easy pieces while leaving the final group boxed in."
    ]
  },
  sorting: {
    beginnerTips: [
      "Choose one anchor color or item type and build it cleanly.",
      "Keep one container or lane open as temporary working space.",
      "Move single layers only when they have a clear destination."
    ],
    advancedStrategy: [
      "Use temporary storage only for pieces that can move again soon.",
      "Finish one color or item group before starting the final cleanup cycle.",
      "Avoid breaking completed groups unless it unlocks multiple moves."
    ],
    commonMistakes: [
      "Using every empty space too early.",
      "Moving rare colors or items without a destination stack.",
      "Breaking completed groups and creating extra mixed layers."
    ]
  },
  mechanical: {
    beginnerTips: [
      "Clear outside blockers before triggering the center chain.",
      "Check the second move in a chain, not only the first move.",
      "Keep enough tray or lane space before starting repeated pieces."
    ],
    advancedStrategy: [
      "Predict which panel, route, or chain opens after each move.",
      "Delay middle blockers until the pieces above them can move.",
      "Use capacity and path direction as the main constraints."
    ],
    commonMistakes: [
      "Starting from the center before the outside lanes are clear.",
      "Filling limited space with unmatched pieces.",
      "Opening a hidden blocker before its supporting pieces are free."
    ]
  },
  block: {
    beginnerTips: [
      "Keep the center open for awkward shapes.",
      "Place large pieces near edges unless they complete a line.",
      "Think one piece ahead before chasing a quick clear."
    ],
    advancedStrategy: [
      "Prepare row and column clears at the same time.",
      "Use corners to hold square pieces without splitting the board.",
      "Avoid narrow pockets that cannot fit future shapes."
    ],
    commonMistakes: [
      "Dropping large shapes in the center too early.",
      "Splitting the board into isolated pockets.",
      "Clearing one line while leaving no space for the next piece."
    ]
  }
};

const gameSpecs: GameSpec[] = [
  {
    slug: "color-wood-jam",
    name: "Color Wood Jam",
    categorySlug: "wood-puzzle",
    description:
      "Move colored wood blocks into matching slots with compact walkthrough notes for common stuck levels.",
    shortDescription: "Color-matching wood block puzzle with level-by-level solutions.",
    longDescription:
      "Color Wood Jam is a spatial puzzle game about clearing layered wooden blocks in the right order. PuzzleMaster tracks important levels, move priorities, trap patterns, and practical tips for players who need a clean solution instead of a long video.",
    seoIntro:
      "Find Color Wood Jam walkthroughs, solution notes, level guide entries, and tips for difficult wood block stages.",
    difficulty: "Hard",
    totalLevels: 1850,
    guideCount: 620,
    updatedAt: "2026-06-02",
    popularity: 98,
    color: "#2f6f4e",
    tags: ["Wood blocks", "Color match", "Stuck levels"],
    relatedGames: ["screw-jam", "block-blast", "magic-sort", "water-sort"]
  },
  {
    slug: "arrows-go",
    name: "Arrow Away",
    categorySlug: "mechanical",
    description:
      "Trace arrow movement chains, unlock blocked routes, and solve direction-based puzzle boards.",
    shortDescription: "Direction and path-planning puzzle with arrow chain logic.",
    longDescription:
      "Arrow Away focuses on direction planning. A single wrong release can block the board, so each guide highlights safe first moves, pressure points, and the order that keeps lanes open.",
    seoIntro:
      "Browse Arrow Away walkthroughs, level guide pages, solutions, and quick tips for arrow path puzzles.",
    difficulty: "Medium",
    totalLevels: 1200,
    guideCount: 350,
    updatedAt: "2026-06-01",
    popularity: 86,
    color: "#2457a6",
    tags: ["Arrows", "Pathing", "Direction puzzle"],
    relatedGames: ["screw-jam", "traffic-escape", "color-wood-jam", "parking-jam"]
  },
  {
    slug: "screw-jam",
    name: "Screw Jam",
    categorySlug: "mechanical",
    description:
      "Plan screw removal order, avoid locked panels, and clear boards with limited tray space.",
    shortDescription: "Screw removal puzzle with tray limits and hidden blockers.",
    longDescription:
      "Screw Jam levels are built around order, tray capacity, and hidden blockers. PuzzleMaster guides focus on which screws to remove first, when to wait, and how to keep spare slots open.",
    seoIntro:
      "Use Screw Jam solutions, walkthroughs, level guide notes, and tips to clear difficult screw puzzle levels.",
    difficulty: "Hard",
    totalLevels: 1600,
    guideCount: 510,
    updatedAt: "2026-05-31",
    popularity: 93,
    color: "#6b5d35",
    tags: ["Screws", "Tray space", "Order planning"],
    relatedGames: ["wood-nuts-and-bolts", "nuts-and-bolts", "arrows-go", "color-wood-jam"]
  },
  {
    slug: "magic-sort",
    name: "Magic Sort",
    categorySlug: "sorting",
    description:
      "Sort magical items and colors with simple step sequences for crowded bottle-style boards.",
    shortDescription: "Relaxing sorting puzzle with storage and color strategy.",
    longDescription:
      "Magic Sort mixes color sorting with special containers and locked positions. Guides explain temporary storage choices, color priority, and late-board cleanup.",
    seoIntro:
      "Find Magic Sort walkthroughs, solution routes, level guide content, and sorting tips for hard levels.",
    difficulty: "Medium",
    totalLevels: 980,
    guideCount: 275,
    updatedAt: "2026-05-30",
    popularity: 79,
    color: "#7a3d8a",
    tags: ["Sorting", "Colors", "Storage"],
    relatedGames: ["water-sort", "ball-sort-puzzle", "goods-sort", "hexa-sort"]
  },
  {
    slug: "block-blast",
    name: "Block Blast",
    categorySlug: "block",
    description:
      "Improve board control, clear rows and columns, and learn placement patterns for high scores.",
    shortDescription: "Block placement puzzle focused on board control and clears.",
    longDescription:
      "Block Blast is a board management puzzle where the safest move is often the one that preserves future space. PuzzleMaster covers placement discipline, combo setup, and risky shapes.",
    seoIntro:
      "Read Block Blast tips, walkthrough-style strategy guides, solution ideas, and level guide notes for board clearing.",
    difficulty: "Medium",
    totalLevels: 700,
    guideCount: 190,
    updatedAt: "2026-05-29",
    popularity: 82,
    color: "#c26b2f",
    tags: ["Blocks", "Board control", "Combos"],
    relatedGames: ["hexa-sort", "tile-match", "match-factory", "color-wood-jam"]
  },
  {
    slug: "water-sort",
    name: "Water Sort",
    categorySlug: "sorting",
    description:
      "Solve water color sorting levels with safe transfers, empty bottle use, and cleanup patterns.",
    shortDescription: "Bottle sorting puzzle with color transfers and empty-space planning.",
    longDescription:
      "Water Sort rewards patient organization. Each walkthrough identifies anchor colors, empty bottle timing, and the transfer order that prevents late-game deadlocks.",
    seoIntro:
      "Browse Water Sort walkthroughs, bottle puzzle solutions, level guide pages, and practical tips.",
    difficulty: "Easy",
    totalLevels: 1400,
    guideCount: 430,
    updatedAt: "2026-05-28",
    popularity: 88,
    color: "#167c91",
    tags: ["Water sort", "Bottles", "Color puzzle"],
    relatedGames: ["magic-sort", "ball-sort-puzzle", "sort-it-out", "goods-sort"]
  },
  {
    slug: "wood-nuts-and-bolts",
    name: "Wood Nuts & Bolts",
    categorySlug: "mechanical",
    description:
      "Unscrew wood panels, free blocked plates, and solve nut-and-bolt boards in the right order.",
    shortDescription: "Wood screw puzzle with plates, bolts, and ordered removal.",
    longDescription:
      "Wood Nuts & Bolts combines tactile wood panels with mechanical planning. Guides focus on safe removal order, hidden plate movement, and tray space discipline.",
    seoIntro:
      "Find Wood Nuts & Bolts walkthroughs, level guides, solutions, and tips for tricky screw puzzle stages.",
    difficulty: "Hard",
    totalLevels: 1200,
    guideCount: 240,
    updatedAt: "2026-06-03",
    popularity: 84,
    color: "#8a6b3d",
    tags: ["Wood screws", "Bolts", "Mechanical puzzle"],
    relatedGames: ["screw-jam", "nuts-and-bolts", "color-wood-jam", "rope-puzzle"]
  },
  {
    slug: "nuts-and-bolts",
    name: "Nuts And Bolts",
    categorySlug: "mechanical",
    description:
      "Remove bolts, open plates, and solve mechanical puzzles with tight move order constraints.",
    shortDescription: "Classic nuts-and-bolts puzzle with ordered plate clearing.",
    longDescription:
      "Nuts And Bolts is about careful sequencing. PuzzleMaster pages explain which bolts to remove first and which panels should stay locked until space opens.",
    seoIntro:
      "Read Nuts And Bolts solutions, walkthroughs, level guide notes, and mechanical puzzle tips.",
    difficulty: "Medium",
    totalLevels: 1100,
    guideCount: 220,
    updatedAt: "2026-06-03",
    popularity: 81,
    color: "#5f6f80",
    tags: ["Nuts", "Bolts", "Plates"],
    relatedGames: ["wood-nuts-and-bolts", "screw-jam", "arrows-go", "rope-puzzle"]
  },
  {
    slug: "parking-jam",
    name: "Parking Jam",
    categorySlug: "mechanical",
    description:
      "Unblock crowded parking lots by moving vehicles in the correct order.",
    shortDescription: "Traffic clearing puzzle with cars, exits, and route planning.",
    longDescription:
      "Parking Jam turns each board into a compact traffic puzzle. Guides highlight exit order, blocked vehicles, and common mistakes that create gridlock.",
    seoIntro:
      "Browse Parking Jam walkthroughs, car puzzle solutions, level guide pages, and tips.",
    difficulty: "Medium",
    totalLevels: 1500,
    guideCount: 310,
    updatedAt: "2026-06-03",
    popularity: 87,
    color: "#d05b3f",
    tags: ["Cars", "Traffic", "Parking"],
    relatedGames: ["traffic-escape", "bus-jam", "jam-puzzle", "arrows-go"]
  },
  {
    slug: "bus-jam",
    name: "Bus Jam",
    categorySlug: "mechanical",
    description:
      "Match passengers, clear bus queues, and solve traffic jam boards with limited space.",
    shortDescription: "Bus and passenger sorting puzzle with crowded lanes.",
    longDescription:
      "Bus Jam mixes traffic routing with queue management. PuzzleMaster covers passenger priority, lane timing, and board cleanup.",
    seoIntro:
      "Find Bus Jam walkthroughs, solutions, level guides, and tips for crowded traffic puzzle levels.",
    difficulty: "Hard",
    totalLevels: 900,
    guideCount: 180,
    updatedAt: "2026-06-03",
    popularity: 80,
    color: "#1f7a8c",
    tags: ["Bus", "Traffic", "Queue"],
    relatedGames: ["parking-jam", "traffic-escape", "jam-puzzle", "goods-sort"]
  },
  {
    slug: "goods-sort",
    name: "Goods Sort",
    categorySlug: "sorting",
    description:
      "Sort goods on shelves, group matching items, and clear packed boards efficiently.",
    shortDescription: "Shelf sorting puzzle with goods, items, and match groups.",
    longDescription:
      "Goods Sort is a relaxing sorting game about shelf space and item grouping. Guides explain which shelves to open and how to avoid mixed late-board layouts.",
    seoIntro:
      "Use Goods Sort walkthroughs, shelf puzzle solutions, level guides, and sorting tips.",
    difficulty: "Easy",
    totalLevels: 1000,
    guideCount: 210,
    updatedAt: "2026-06-03",
    popularity: 78,
    color: "#b85c7a",
    tags: ["Goods", "Shelves", "Sorting"],
    relatedGames: ["magic-sort", "water-sort", "sort-it-out", "match-factory"]
  },
  {
    slug: "ball-sort-puzzle",
    name: "Ball Sort Puzzle",
    categorySlug: "sorting",
    description:
      "Sort colored balls into matching tubes with clean move sequences and empty tube planning.",
    shortDescription: "Ball sorting puzzle with tubes, colors, and storage strategy.",
    longDescription:
      "Ball Sort Puzzle rewards patient color planning. Each guide focuses on anchor colors, empty tube timing, and deadlock prevention.",
    seoIntro:
      "Browse Ball Sort Puzzle walkthroughs, solutions, level guide pages, and sorting tips.",
    difficulty: "Easy",
    totalLevels: 2000,
    guideCount: 520,
    updatedAt: "2026-06-03",
    popularity: 90,
    color: "#219ebc",
    tags: ["Ball sort", "Tubes", "Colors"],
    relatedGames: ["water-sort", "magic-sort", "sort-it-out", "goods-sort"]
  },
  {
    slug: "hexa-sort",
    name: "Hexa Sort",
    categorySlug: "block",
    description:
      "Stack and sort hex tiles while managing board space and color groups.",
    shortDescription: "Hex tile sorting puzzle with stacking and board planning.",
    longDescription:
      "Hexa Sort mixes tile stacking with board management. Guides explain placement order, merge timing, and how to keep space open.",
    seoIntro:
      "Find Hexa Sort walkthroughs, level guides, solution notes, and tips for hex tile puzzles.",
    difficulty: "Medium",
    totalLevels: 1200,
    guideCount: 260,
    updatedAt: "2026-06-03",
    popularity: 83,
    color: "#7d5fff",
    tags: ["Hex tiles", "Sorting", "Stacking"],
    relatedGames: ["block-blast", "tile-match", "magic-sort", "match-factory"]
  },
  {
    slug: "tile-match",
    name: "Tile Match",
    categorySlug: "block",
    description:
      "Match tiles, clear layered boards, and plan moves around limited tray space.",
    shortDescription: "Tile matching puzzle with layers, trays, and matching order.",
    longDescription:
      "Tile Match is about recognizing safe matches and preserving tray capacity. PuzzleMaster guides focus on layer priority and late-board cleanup.",
    seoIntro:
      "Read Tile Match walkthroughs, level guide pages, solutions, and tile matching tips.",
    difficulty: "Easy",
    totalLevels: 1800,
    guideCount: 390,
    updatedAt: "2026-06-03",
    popularity: 85,
    color: "#4d908e",
    tags: ["Tiles", "Matching", "Tray"],
    relatedGames: ["match-factory", "block-blast", "hexa-sort", "goods-sort"]
  },
  {
    slug: "match-factory",
    name: "Match Factory",
    categorySlug: "sorting",
    description:
      "Find matching objects in crowded scenes and clear sets with careful search order.",
    shortDescription: "Object matching puzzle with crowded boards and set clearing.",
    longDescription:
      "Match Factory combines object search with match planning. Guides highlight item priority, hidden objects, and efficient cleanup routes.",
    seoIntro:
      "Find Match Factory walkthroughs, matching puzzle solutions, level guides, and tips.",
    difficulty: "Medium",
    totalLevels: 950,
    guideCount: 205,
    updatedAt: "2026-06-03",
    popularity: 77,
    color: "#a44a3f",
    tags: ["Matching", "Objects", "Factory"],
    relatedGames: ["tile-match", "goods-sort", "block-blast", "hexa-sort"]
  },
  {
    slug: "brain-test",
    name: "Brain Test",
    categorySlug: "mechanical",
    description:
      "Solve tricky brain teasers, hidden logic puzzles, and surprising level challenges.",
    shortDescription: "Brain teaser puzzle with trick questions and level solutions.",
    longDescription:
      "Brain Test focuses on lateral thinking and unexpected solutions. PuzzleMaster pages explain the trick behind each level without unnecessary filler.",
    seoIntro:
      "Browse Brain Test walkthroughs, brain teaser solutions, level guides, and puzzle tips.",
    difficulty: "Medium",
    totalLevels: 600,
    guideCount: 160,
    updatedAt: "2026-06-03",
    popularity: 89,
    color: "#3a86ff",
    tags: ["Brain teaser", "Logic", "Trick levels"],
    relatedGames: ["traffic-escape", "rope-puzzle", "arrows-go", "jam-puzzle"]
  },
  {
    slug: "traffic-escape",
    name: "Traffic Escape",
    categorySlug: "mechanical",
    description:
      "Guide cars through crowded roads and escape traffic jams with route planning.",
    shortDescription: "Traffic puzzle with cars, roads, and escape routes.",
    longDescription:
      "Traffic Escape is a route-planning puzzle where early car order determines the final board state. Guides focus on lane priority and exit timing.",
    seoIntro:
      "Use Traffic Escape walkthroughs, level solutions, route guides, and tips for traffic puzzle stages.",
    difficulty: "Medium",
    totalLevels: 1300,
    guideCount: 300,
    updatedAt: "2026-06-03",
    popularity: 86,
    color: "#f77f00",
    tags: ["Traffic", "Cars", "Escape"],
    relatedGames: ["parking-jam", "bus-jam", "jam-puzzle", "arrows-go"]
  },
  {
    slug: "jam-puzzle",
    name: "Jam Puzzle",
    categorySlug: "mechanical",
    description:
      "Clear jammed boards by moving blocked pieces, vehicles, and objects in order.",
    shortDescription: "General jam-clearing puzzle with stuck boards and ordered moves.",
    longDescription:
      "Jam Puzzle covers the core stuck-board loop: find the main blocker, open a lane, and resolve the final group. Guides are structured for fast level lookup.",
    seoIntro:
      "Read Jam Puzzle walkthroughs, stuck level solutions, level guides, and practical tips.",
    difficulty: "Hard",
    totalLevels: 1000,
    guideCount: 230,
    updatedAt: "2026-06-03",
    popularity: 79,
    color: "#6a994e",
    tags: ["Jam", "Blocked boards", "Moves"],
    relatedGames: ["parking-jam", "bus-jam", "traffic-escape", "color-wood-jam"]
  },
  {
    slug: "sort-it-out",
    name: "Sort It Out",
    categorySlug: "sorting",
    description:
      "Sort mixed items into clean groups with simple, relaxing puzzle logic.",
    shortDescription: "Relaxing item sorting puzzle with clean grouping goals.",
    longDescription:
      "Sort It Out is built for players who enjoy organized boards and calm sorting challenges. Guides explain grouping order and storage choices.",
    seoIntro:
      "Browse Sort It Out walkthroughs, level guides, solutions, and relaxing sorting tips.",
    difficulty: "Easy",
    totalLevels: 850,
    guideCount: 170,
    updatedAt: "2026-06-03",
    popularity: 74,
    color: "#43aa8b",
    tags: ["Sorting", "Relaxing", "Items"],
    relatedGames: ["water-sort", "ball-sort-puzzle", "goods-sort", "magic-sort"]
  },
  {
    slug: "rope-puzzle",
    name: "Rope Puzzle",
    categorySlug: "mechanical",
    description:
      "Untangle ropes, free pins, and solve path puzzles with careful order planning.",
    shortDescription: "Rope untangling puzzle with pins, paths, and blockers.",
    longDescription:
      "Rope Puzzle is about reading constraints before pulling. PuzzleMaster guides identify which rope or pin should move first and which path should stay reserved.",
    seoIntro:
      "Find Rope Puzzle walkthroughs, rope untangling solutions, level guide notes, and tips.",
    difficulty: "Medium",
    totalLevels: 900,
    guideCount: 185,
    updatedAt: "2026-06-03",
    popularity: 76,
    color: "#8e7dbe",
    tags: ["Ropes", "Pins", "Untangle"],
    relatedGames: ["brain-test", "arrows-go", "nuts-and-bolts", "screw-jam"]
  },
  {
    slug: "unblock-me",
    name: "Unblock Me",
    categorySlug: "wood-puzzle",
    description:
      "Slide blocks through tight spaces and clear the target piece with precise move order.",
    shortDescription: "Sliding block puzzle with exits, blockers, and compact solutions.",
    longDescription:
      "Unblock Me focuses on classic sliding block logic. PuzzleMaster guides highlight which blocker to move first, how to preserve lanes, and when to restart a failed route.",
    seoIntro:
      "Find Unblock Me walkthroughs, sliding block solutions, level guides, and tips for stuck boards.",
    difficulty: "Medium",
    totalLevels: 1400,
    guideCount: 260,
    updatedAt: "2026-06-03",
    popularity: 82,
    color: "#9b6a3c",
    tags: ["Sliding blocks", "Unblock", "Logic"],
    relatedGames: ["color-wood-jam", "jam-puzzle", "block-blast", "parking-jam"]
  },
  {
    slug: "pull-the-pin",
    name: "Pull the Pin",
    categorySlug: "mechanical",
    description:
      "Pull pins in the right order, avoid traps, and route objects safely through each puzzle.",
    shortDescription: "Pin puzzle with traps, routes, and order-based solutions.",
    longDescription:
      "Pull the Pin levels reward careful order planning. Guides explain which pin should move first and which hazards must stay blocked.",
    seoIntro:
      "Browse Pull the Pin walkthroughs, pin puzzle solutions, level guides, and tips.",
    difficulty: "Medium",
    totalLevels: 1000,
    guideCount: 210,
    updatedAt: "2026-06-03",
    popularity: 80,
    color: "#d89c2b",
    tags: ["Pins", "Traps", "Route"],
    relatedGames: ["pin-rescue", "rope-puzzle", "brain-test", "traffic-escape"]
  },
  {
    slug: "pin-rescue",
    name: "Pin Rescue",
    categorySlug: "mechanical",
    description:
      "Solve rescue puzzles by pulling pins, avoiding hazards, and opening safe paths.",
    shortDescription: "Rescue logic puzzle with pins, hazards, and safe route planning.",
    longDescription:
      "Pin Rescue uses pin order, hazards, and rescue goals to create compact logic puzzles. PuzzleMaster guides focus on safe path timing and trap avoidance.",
    seoIntro:
      "Find Pin Rescue walkthroughs, rescue puzzle solutions, level guides, and common stuck level tips.",
    difficulty: "Medium",
    totalLevels: 900,
    guideCount: 190,
    updatedAt: "2026-06-03",
    popularity: 75,
    color: "#e76f51",
    tags: ["Pins", "Rescue", "Hazards"],
    relatedGames: ["pull-the-pin", "rope-puzzle", "brain-test", "arrows-go"]
  },
  {
    slug: "tangle-master",
    name: "Tangle Master",
    categorySlug: "mechanical",
    description:
      "Untangle ropes and cords by moving anchors in the correct sequence.",
    shortDescription: "Tangle-solving puzzle with ropes, anchors, and move order.",
    longDescription:
      "Tangle Master asks players to read overlapping paths before moving anchors. Guides explain which line to free first and how to avoid making the tangle worse.",
    seoIntro:
      "Read Tangle Master walkthroughs, untangle puzzle solutions, level guides, and tips.",
    difficulty: "Hard",
    totalLevels: 950,
    guideCount: 205,
    updatedAt: "2026-06-03",
    popularity: 78,
    color: "#6d597a",
    tags: ["Tangle", "Ropes", "Anchors"],
    relatedGames: ["rope-puzzle", "pin-rescue", "arrows-go", "nuts-and-bolts"]
  },
  {
    slug: "cube-sort",
    name: "Cube Sort",
    categorySlug: "sorting",
    description:
      "Sort cubes by color and stack order while managing limited board space.",
    shortDescription: "Cube sorting puzzle with stacks, colors, and storage planning.",
    longDescription:
      "Cube Sort combines color grouping with stack management. PuzzleMaster guides show how to choose anchor colors and avoid late-board deadlocks.",
    seoIntro:
      "Browse Cube Sort walkthroughs, cube puzzle solutions, level guides, and sorting tips.",
    difficulty: "Medium",
    totalLevels: 1000,
    guideCount: 215,
    updatedAt: "2026-06-03",
    popularity: 77,
    color: "#577590",
    tags: ["Cubes", "Sorting", "Stacks"],
    relatedGames: ["hexa-sort", "magic-sort", "ball-sort-puzzle", "sort-it-out"]
  },
  {
    slug: "match-tile-3d",
    name: "Match Tile 3D",
    categorySlug: "block",
    description:
      "Find matching 3D objects, clear sets, and manage crowded tray space.",
    shortDescription: "3D tile matching puzzle with objects, sets, and tray limits.",
    longDescription:
      "Match Tile 3D is a search and matching puzzle where object priority matters. Guides focus on visible matches, hidden items, and tray safety.",
    seoIntro:
      "Find Match Tile 3D walkthroughs, matching solutions, level guide pages, and tips.",
    difficulty: "Medium",
    totalLevels: 1300,
    guideCount: 280,
    updatedAt: "2026-06-03",
    popularity: 84,
    color: "#bc6c25",
    tags: ["3D match", "Objects", "Tray"],
    relatedGames: ["tile-match", "match-factory", "goods-sort", "block-blast"]
  },
  {
    slug: "triple-match",
    name: "Triple Match",
    categorySlug: "sorting",
    description:
      "Match three identical objects, clear crowded boards, and avoid filling the tray.",
    shortDescription: "Triple matching puzzle with sets, objects, and tray discipline.",
    longDescription:
      "Triple Match levels are about selecting safe object groups before the tray fills. PuzzleMaster guides highlight match priority and cleanup order.",
    seoIntro:
      "Browse Triple Match walkthroughs, triple matching solutions, level guides, and tips.",
    difficulty: "Easy",
    totalLevels: 1100,
    guideCount: 230,
    updatedAt: "2026-06-03",
    popularity: 79,
    color: "#f28482",
    tags: ["Triple match", "Objects", "Tray"],
    relatedGames: ["match-tile-3d", "match-factory", "tile-match", "goods-sort"]
  },
  {
    slug: "tangram-puzzle",
    name: "Tangram Puzzle",
    categorySlug: "block",
    description:
      "Fit geometric pieces into silhouettes with spatial reasoning and shape planning.",
    shortDescription: "Shape-fitting puzzle with tangrams, silhouettes, and board logic.",
    longDescription:
      "Tangram Puzzle rewards visual planning and shape rotation. Guides explain how to place anchor pieces and finish tight corners.",
    seoIntro:
      "Read Tangram Puzzle walkthroughs, shape puzzle solutions, level guides, and tips.",
    difficulty: "Medium",
    totalLevels: 800,
    guideCount: 165,
    updatedAt: "2026-06-03",
    popularity: 73,
    color: "#277da1",
    tags: ["Tangram", "Shapes", "Spatial"],
    relatedGames: ["block-blast", "hexa-sort", "unblock-me", "tile-match"]
  },
  {
    slug: "mahjong-match",
    name: "Mahjong Match",
    categorySlug: "block",
    description:
      "Match open mahjong tiles, clear layered boards, and plan around locked pieces.",
    shortDescription: "Mahjong tile matching puzzle with layers and open-tile logic.",
    longDescription:
      "Mahjong Match focuses on tile availability and layer order. PuzzleMaster guides explain safe matches and late-board cleanup.",
    seoIntro:
      "Find Mahjong Match walkthroughs, mahjong puzzle solutions, level guide pages, and tips.",
    difficulty: "Easy",
    totalLevels: 1200,
    guideCount: 255,
    updatedAt: "2026-06-03",
    popularity: 81,
    color: "#2a9d8f",
    tags: ["Mahjong", "Tiles", "Matching"],
    relatedGames: ["tile-match", "match-tile-3d", "triple-match", "goods-sort"]
  },
  {
    slug: "word-connect",
    name: "Word Connect",
    categorySlug: "mechanical",
    description:
      "Connect letters, solve word boards, and unlock puzzle levels with pattern recognition.",
    shortDescription: "Word puzzle with letter connections, hints, and level solutions.",
    longDescription:
      "Word Connect is a word puzzle built around pattern recognition and hidden combinations. PuzzleMaster pages provide clue-style walkthroughs and level tips.",
    seoIntro:
      "Browse Word Connect walkthroughs, word puzzle solutions, level guides, and tips.",
    difficulty: "Easy",
    totalLevels: 2000,
    guideCount: 420,
    updatedAt: "2026-06-03",
    popularity: 85,
    color: "#3d405b",
    tags: ["Words", "Letters", "Connections"],
    relatedGames: ["brain-test", "tangram-puzzle", "tile-match", "sort-it-out"]
  }
];

export const colorWoodJamFaq = [
  {
    question: "How do I beat difficult levels?",
    answer:
      "Start by opening the center lane, then move the largest blockers before clearing small pieces that do not improve the exit path."
  },
  {
    question: "What should I move first?",
    answer:
      "Move the piece that creates the most future space, not the piece that is easiest to clear immediately."
  },
  {
    question: "What causes dead ends?",
    answer:
      "Dead ends usually happen when reserve space is filled too early or a blocker is moved before its exit lane is ready."
  },
  {
    question: "Are there multiple solutions?",
    answer:
      "Yes. Many Color Wood Jam boards can be solved with more than one route, but the safest routes preserve space and delay risky moves."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow a clean three-step pattern before checking full walkthroughs."
  }
];

export const screwJamFaq = [
  {
    question: "How do I beat hard Screw Jam levels?",
    answer:
      "Check tray capacity first, then remove blockers before key screws so the board opens without filling every slot."
  },
  {
    question: "What should I unscrew first?",
    answer:
      "Unscrew the piece that creates tray space or unlocks a blocker, not the screw that is easiest to remove visually."
  },
  {
    question: "Why does my tray get stuck?",
    answer:
      "The tray usually gets stuck when colors are removed out of order or every empty slot is filled before the next match can clear."
  },
  {
    question: "Are there multiple screw orders?",
    answer:
      "Yes. Many boards allow more than one screw order, but safer routes keep one tray slot open and delay mismatched screws."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow tray capacity, blocker, screw order, and open-slot checks."
  }
];

export const goodsSortFaq = [
  {
    question: "How do I beat hard Goods Sort levels?",
    answer:
      "Open shelf space first, group the most crowded item type, and delay mixed shelves until a clean match is available."
  },
  {
    question: "What should I sort first?",
    answer:
      "Sort the item group that frees the most shelf space, not the item that is easiest to move immediately."
  },
  {
    question: "Why do shelves get stuck?",
    answer:
      "Shelves usually get stuck when mixed items fill every open lane before a matching group can clear."
  },
  {
    question: "Are there multiple sorting orders?",
    answer:
      "Yes. Many Goods Sort boards allow more than one order, but safer routes keep one shelf lane open for temporary storage."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow shelf space, item grouping, and cleanup checks."
  }
];

export const waterSortFaq = [
  {
    question: "How do I beat hard Water Sort levels?",
    answer:
      "Keep an empty bottle available, build one anchor color first, and avoid moving mixed layers without a clear destination."
  },
  {
    question: "What color should I sort first?",
    answer:
      "Start with the color that already has the largest clean stack, because it creates the safest anchor for later pours."
  },
  {
    question: "Why do bottles get stuck?",
    answer:
      "Bottles usually get stuck when every empty space is used too early or a rare color is split across too many bottles."
  },
  {
    question: "Are there multiple pour orders?",
    answer:
      "Yes. Many Water Sort boards allow more than one pour order, but safer routes preserve one empty bottle for temporary storage."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow empty bottle, anchor color, and final cleanup checks."
  }
];

export const parkingJamFaq = [
  {
    question: "How do I beat hard Parking Jam levels?",
    answer:
      "Clear the exit lane first, move blocking cars before short moves, and keep one empty space available for long vehicles."
  },
  {
    question: "What car should I move first?",
    answer:
      "Move the car that opens the exit lane or frees multiple blocked cars, not the car that is easiest to slide immediately."
  },
  {
    question: "Why do cars get trapped?",
    answer:
      "Cars get trapped when empty spaces are filled too early or long vehicles are moved before their escape path is open."
  },
  {
    question: "Are there multiple exit orders?",
    answer:
      "Yes. Many Parking Jam lots allow more than one exit order, but safer routes clear blockers first and preserve escape paths."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow exit lane, blocker, long vehicle, and final route checks."
  }
];

export const arrowAwayFaq = [
  {
    question: "How do I solve hard Arrow Away levels?",
    answer:
      "Start with free arrows, clear the outer layer, and create movement space before removing blocked center arrows."
  },
  {
    question: "Which arrow should I remove first?",
    answer:
      "Remove the arrow that already points into open space or unlocks several other arrows, not the arrow that only looks closest."
  },
  {
    question: "Why do arrows become blocked?",
    answer:
      "Arrows become blocked when exits are closed too early or directional chains are removed before the surrounding layer has opened."
  },
  {
    question: "Are there multiple solutions?",
    answer:
      "Yes. Many Arrow Away boards allow more than one solution, but safer routes remove free arrows first and preserve exit space."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow free arrow, outer layer, movement space, and cleanup checks."
  }
];

export const hexaSortFaq = [
  {
    question: "How do I solve hard Hexa Sort levels?",
    answer:
      "Build one clean anchor stack, keep board space open, and merge matching colors before isolated tiles trap the layout."
  },
  {
    question: "Which hex tile should I place first?",
    answer:
      "Place the tile that extends a clean stack or creates a merge, not the tile that only fills the nearest open cell."
  },
  {
    question: "Why do Hexa Sort boards get stuck?",
    answer:
      "Boards get stuck when mixed stacks fill every open space or isolated tiles block the final merge route."
  },
  {
    question: "Are there multiple merge orders?",
    answer:
      "Yes. Many Hexa Sort boards allow more than one merge order, but safer routes preserve space and complete one color group at a time."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow anchor stack, board space, merge timing, and cleanup checks."
  }
];

export const ballSortPuzzleFaq = [
  {
    question: "How do I solve hard Ball Sort levels?",
    answer:
      "Keep one tube empty, build one anchor color first, and avoid moving rare colors without a clear destination."
  },
  {
    question: "Which ball color should I sort first?",
    answer:
      "Start with the color that already has the largest clean stack because it creates the safest anchor for later transfers."
  },
  {
    question: "Why do Ball Sort tubes get stuck?",
    answer:
      "Tubes usually get stuck when every empty space is used too early or rare colors are split across too many tubes."
  },
  {
    question: "Are there multiple transfer orders?",
    answer:
      "Yes. Many Ball Sort boards allow more than one transfer order, but safer routes preserve one empty tube for temporary storage."
  },
  {
    question: "Can I use Solver?",
    answer:
      "Yes. Use the static Solver v2 preview on this page to follow empty tube, anchor color, rare color, and cleanup checks."
  }
];

function gameFaq(spec: GameSpec) {
  const defaultFaq = [
    {
      question: `How do I find ${spec.name} walkthroughs?`,
      answer: `Search by exact level number or browse the ${spec.name} game hub for walkthroughs, solutions, level guides, and tips.`
    },
    {
      question: `Is ${spec.name} good for beginners?`,
      answer: `${spec.name} is rated ${spec.difficulty.toLowerCase()} on PuzzleMaster. Beginners should start with easier levels and use related walkthroughs when the board gets crowded.`
    }
  ];

  if (spec.slug === "color-wood-jam") {
    return [...defaultFaq, ...colorWoodJamFaq];
  }

  if (spec.slug === "screw-jam") {
    return [...defaultFaq, ...screwJamFaq];
  }

  if (spec.slug === "goods-sort") {
    return [...defaultFaq, ...goodsSortFaq];
  }

  if (spec.slug === "water-sort") {
    return [...defaultFaq, ...waterSortFaq];
  }

  if (spec.slug === "parking-jam") {
    return [...defaultFaq, ...parkingJamFaq];
  }

  if (spec.slug === "arrows-go" || spec.slug === "arrow-away") {
    return [...defaultFaq, ...arrowAwayFaq];
  }

  if (spec.slug === "hexa-sort") {
    return [...defaultFaq, ...hexaSortFaq];
  }

  if (spec.slug === "ball-sort-puzzle") {
    return [...defaultFaq, ...ballSortPuzzleFaq];
  }

  return defaultFaq;
}

export const games: Game[] = gameSpecs.map((spec) => {
  const category = categoryName(spec.categorySlug);
  const template = tipsByCategory[spec.categorySlug] ?? tipsByCategory.mechanical;

  return {
    ...spec,
    category,
    categoryName: category,
    imagePlaceholder: `/images/games/${spec.slug}.png`,
    beginnerTips: template.beginnerTips,
    advancedStrategy: template.advancedStrategy,
    commonMistakes: template.commonMistakes,
    faq: gameFaq(spec)
  };
});
