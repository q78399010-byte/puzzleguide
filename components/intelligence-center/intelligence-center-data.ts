export type ConfidenceMapItem = {
  game: string;
  value: number;
};

export type FutureFeature = {
  label: string;
  status: "Planned";
};

export const solverSignals = [
  "Healthy",
  "Preview Active",
  "Static Analysis Enabled"
];

export const strategyLibrary = [
  "Clear center first",
  "Keep one bottle empty",
  "Group matching items",
  "Remove blockers first"
];

export const confidenceMap: ConfidenceMapItem[] = [
  { game: "Block Blast", value: 76 },
  { game: "Goods Sort", value: 81 },
  { game: "Water Sort", value: 74 },
  { game: "Hexa Sort", value: 79 }
];

export const commonMistakes = [
  "Low space",
  "Blocked lane",
  "Dead end",
  "Wrong order"
];

export const futureFeatures: FutureFeature[] = [
  { label: "AI Assistant", status: "Planned" },
  { label: "Screenshot Recognition", status: "Planned" },
  { label: "Advanced Planner", status: "Planned" },
  { label: "Multi-step Solver", status: "Planned" }
];
