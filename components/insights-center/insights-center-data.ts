export type ConfidenceTrend = {
  game: string;
  value: number;
};

export type SolverInsight = {
  label: string;
  value: string;
};

export const topStrategies = [
  "Clear center first",
  "Keep one bottle empty",
  "Group matching items",
  "Remove blockers first"
];

export const confidenceTrends: ConfidenceTrend[] = [
  { game: "Block Blast", value: 76 },
  { game: "Goods Sort", value: 81 },
  { game: "Water Sort", value: 74 },
  { game: "Hexa Sort", value: 79 }
];

export const riskPatterns = [
  "Low space",
  "Blocked lane",
  "Dead end",
  "Limited tray"
];

export const solverInsights: SolverInsight[] = [
  { label: "Most analyzed game", value: "Block Blast" },
  { label: "Most common strategy", value: "Clear center first" },
  { label: "Average confidence", value: "76%" }
];

export const weeklyHighlights = [
  "100k Preview Sessions",
  "563k Strategies Suggested",
  "93% Success Rate"
];
