export type RecentSession = {
  game: string;
  time: string;
  confidence: string;
  risk: "Low" | "Medium";
};

export type DailyInsight = {
  label: string;
  value: string;
};

export const recentSessions: RecentSession[] = [
  {
    game: "Block Blast",
    time: "Today",
    confidence: "72% confidence",
    risk: "Medium"
  },
  {
    game: "Goods Sort",
    time: "Today",
    confidence: "81% confidence",
    risk: "Low"
  },
  {
    game: "Water Sort",
    time: "Yesterday",
    confidence: "76% confidence",
    risk: "Low"
  }
];

export const favorites = [
  "Block Blast",
  "Goods Sort",
  "Water Sort",
  "Bus Escape"
];

export const recommendedSolvers = [
  "Block Blast Solver",
  "Goods Sort Solver",
  "Hexa Sort Solver",
  "Screw Jam Solver"
];

export const dailyInsights: DailyInsight[] = [
  { label: "Most common risk", value: "Low space" },
  { label: "Popular strategy", value: "Clear center first" },
  { label: "Most analyzed game", value: "Block Blast" },
  { label: "Average confidence", value: "76%" }
];
