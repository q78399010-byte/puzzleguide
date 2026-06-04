export type GameComparison = {
  slug: string;
  gameA: string;
  gameB: string;
  title: string;
  summary: string;
  difficultyA: string;
  difficultyB: string;
  gameplayA: string;
  gameplayB: string;
  bestForA: string;
  bestForB: string;
  winnerSummary: string;
  relatedComparisons: string[];
  faq: { question: string; answer: string }[];
};

function comparisonFaq(gameA: string, gameB: string) {
  return [
    {
      question: `Which is easier, ${gameA} or ${gameB}?`,
      answer:
        "The easier game depends on whether you prefer sorting, board control, traffic routing, or mechanical move-order puzzles."
    },
    {
      question: `Do both games have walkthroughs?`,
      answer:
        "Yes. PuzzleMaster provides static game hubs and level guide pages for both games in this comparison."
    },
    {
      question: "Which game should beginners start with?",
      answer:
        "Beginners should choose the game with simpler early levels and use walkthrough pages when difficulty increases."
    }
  ];
}

export const comparisons: GameComparison[] = [
  {
    slug: "color-wood-jam-vs-screw-jam",
    gameA: "color-wood-jam",
    gameB: "screw-jam",
    title: "Color Wood Jam vs Screw Jam: Which Puzzle Game Is Better?",
    summary:
      "Color Wood Jam is more spatial and color-focused, while Screw Jam is more mechanical and order-driven.",
    difficultyA: "Hard",
    difficultyB: "Hard",
    gameplayA: "Move colored wood blocks into matching exits while preserving reserve space.",
    gameplayB: "Remove screws and panels in the right order while managing tray capacity.",
    bestForA: "Players who like wood block movement and color grouping.",
    bestForB: "Players who like mechanical blockers and strict move order.",
    winnerSummary:
      "Choose Color Wood Jam for spatial color puzzles and Screw Jam for mechanical planning.",
    relatedComparisons: ["color-wood-jam-vs-water-sort", "screw-jam-vs-arrows-go"],
    faq: comparisonFaq("Color Wood Jam", "Screw Jam")
  },
  {
    slug: "color-wood-jam-vs-water-sort",
    gameA: "color-wood-jam",
    gameB: "water-sort",
    title: "Color Wood Jam vs Water Sort: Which Puzzle Game Is Better?",
    summary:
      "Color Wood Jam is a harder spatial puzzle, while Water Sort is calmer and more beginner-friendly.",
    difficultyA: "Hard",
    difficultyB: "Easy",
    gameplayA: "Slide wood pieces into matching exits with limited space.",
    gameplayB: "Pour colors between bottles while preserving empty working space.",
    bestForA: "Players who want hard stuck levels and spatial planning.",
    bestForB: "Players who want relaxing sorting and clean color logic.",
    winnerSummary:
      "Choose Water Sort for relaxation and Color Wood Jam for a deeper challenge.",
    relatedComparisons: ["water-sort-vs-magic-sort", "color-wood-jam-vs-block-blast"],
    faq: comparisonFaq("Color Wood Jam", "Water Sort")
  },
  {
    slug: "color-wood-jam-vs-block-blast",
    gameA: "color-wood-jam",
    gameB: "block-blast",
    title: "Color Wood Jam vs Block Blast: Which Puzzle Game Is Better?",
    summary:
      "Color Wood Jam focuses on level solutions, while Block Blast focuses on board control and replay value.",
    difficultyA: "Hard",
    difficultyB: "Medium",
    gameplayA: "Clear colored wood pieces in a correct order.",
    gameplayB: "Place block shapes to clear rows, columns, and open space.",
    bestForA: "Players who like exact level walkthroughs.",
    bestForB: "Players who like repeatable board strategy.",
    winnerSummary:
      "Choose Color Wood Jam for level-by-level solutions and Block Blast for replayable placement strategy.",
    relatedComparisons: ["magic-sort-vs-block-blast", "block-blast-vs-water-sort"],
    faq: comparisonFaq("Color Wood Jam", "Block Blast")
  },
  {
    slug: "screw-jam-vs-arrows-go",
    gameA: "screw-jam",
    gameB: "arrows-go",
    title: "Screw Jam vs Arrows GO: Which Puzzle Game Is Better?",
    summary:
      "Screw Jam uses tray and panel constraints, while Arrows GO uses direction chains and path logic.",
    difficultyA: "Hard",
    difficultyB: "Medium",
    gameplayA: "Remove screws in the right sequence.",
    gameplayB: "Release arrows in safe paths without blocking chains.",
    bestForA: "Mechanical puzzle fans.",
    bestForB: "Direction and path-planning fans.",
    winnerSummary:
      "Choose Screw Jam for tougher mechanical puzzles and Arrows GO for path logic.",
    relatedComparisons: ["arrows-go-vs-color-wood-jam", "screw-jam-vs-magic-sort"],
    faq: comparisonFaq("Screw Jam", "Arrows GO")
  },
  {
    slug: "screw-jam-vs-magic-sort",
    gameA: "screw-jam",
    gameB: "magic-sort",
    title: "Screw Jam vs Magic Sort: Which Puzzle Game Is Better?",
    summary:
      "Screw Jam is stricter and more mechanical, while Magic Sort is calmer and storage-based.",
    difficultyA: "Hard",
    difficultyB: "Medium",
    gameplayA: "Unlock panels by removing screws in sequence.",
    gameplayB: "Sort colors and items using temporary containers.",
    bestForA: "Players who want harder levels.",
    bestForB: "Players who want relaxed sorting strategy.",
    winnerSummary:
      "Choose Screw Jam for challenge and Magic Sort for approachable sorting.",
    relatedComparisons: ["water-sort-vs-magic-sort", "color-wood-jam-vs-screw-jam"],
    faq: comparisonFaq("Screw Jam", "Magic Sort")
  },
  {
    slug: "water-sort-vs-magic-sort",
    gameA: "water-sort",
    gameB: "magic-sort",
    title: "Water Sort vs Magic Sort: Which Puzzle Game Is Better?",
    summary:
      "Both are sorting games, but Water Sort is simpler while Magic Sort adds more varied storage challenges.",
    difficultyA: "Easy",
    difficultyB: "Medium",
    gameplayA: "Pour colored layers between bottles.",
    gameplayB: "Sort magical items and colors with limited containers.",
    bestForA: "Beginners and relaxing play.",
    bestForB: "Players who want sorting with more variety.",
    winnerSummary:
      "Choose Water Sort for simplicity and Magic Sort for deeper sorting boards.",
    relatedComparisons: ["block-blast-vs-water-sort", "screw-jam-vs-magic-sort"],
    faq: comparisonFaq("Water Sort", "Magic Sort")
  },
  {
    slug: "block-blast-vs-water-sort",
    gameA: "block-blast",
    gameB: "water-sort",
    title: "Block Blast vs Water Sort: Which Puzzle Game Is Better?",
    summary:
      "Block Blast is about placement and space, while Water Sort is about color order and empty bottles.",
    difficultyA: "Medium",
    difficultyB: "Easy",
    gameplayA: "Place shapes to clear rows and columns.",
    gameplayB: "Sort colors by pouring between bottles.",
    bestForA: "Players who like board control.",
    bestForB: "Players who like calming color sorting.",
    winnerSummary:
      "Choose Block Blast for strategy and Water Sort for relaxation.",
    relatedComparisons: ["color-wood-jam-vs-block-blast", "water-sort-vs-magic-sort"],
    faq: comparisonFaq("Block Blast", "Water Sort")
  },
  {
    slug: "block-blast-vs-screw-jam",
    gameA: "block-blast",
    gameB: "screw-jam",
    title: "Block Blast vs Screw Jam: Which Puzzle Game Is Better?",
    summary:
      "Block Blast is replayable and score-friendly, while Screw Jam is level-based and more exact.",
    difficultyA: "Medium",
    difficultyB: "Hard",
    gameplayA: "Control board space with block placements.",
    gameplayB: "Solve screw panels with strict move order.",
    bestForA: "Replay value and board strategy.",
    bestForB: "Hard level walkthroughs.",
    winnerSummary:
      "Choose Block Blast for repeatable play and Screw Jam for hard level solutions.",
    relatedComparisons: ["color-wood-jam-vs-screw-jam", "magic-sort-vs-block-blast"],
    faq: comparisonFaq("Block Blast", "Screw Jam")
  },
  {
    slug: "arrows-go-vs-color-wood-jam",
    gameA: "arrows-go",
    gameB: "color-wood-jam",
    title: "Arrows GO vs Color Wood Jam: Which Puzzle Game Is Better?",
    summary:
      "Arrows GO is about path direction, while Color Wood Jam is about spatial color movement.",
    difficultyA: "Medium",
    difficultyB: "Hard",
    gameplayA: "Release arrows without blocking chained paths.",
    gameplayB: "Move colored wood pieces toward matching exits.",
    bestForA: "Path and direction puzzles.",
    bestForB: "Hard spatial puzzle levels.",
    winnerSummary:
      "Choose Arrows GO for path logic and Color Wood Jam for tougher spatial boards.",
    relatedComparisons: ["screw-jam-vs-arrows-go", "color-wood-jam-vs-block-blast"],
    faq: comparisonFaq("Arrows GO", "Color Wood Jam")
  },
  {
    slug: "magic-sort-vs-block-blast",
    gameA: "magic-sort",
    gameB: "block-blast",
    title: "Magic Sort vs Block Blast: Which Puzzle Game Is Better?",
    summary:
      "Magic Sort is storage-based and relaxing, while Block Blast is placement-based and replayable.",
    difficultyA: "Medium",
    difficultyB: "Medium",
    gameplayA: "Sort colors and items with limited containers.",
    gameplayB: "Place block shapes to preserve board space.",
    bestForA: "Sorting fans.",
    bestForB: "Board strategy fans.",
    winnerSummary:
      "Choose Magic Sort for sorting and Block Blast for placement strategy.",
    relatedComparisons: ["block-blast-vs-water-sort", "screw-jam-vs-magic-sort"],
    faq: comparisonFaq("Magic Sort", "Block Blast")
  }
];
