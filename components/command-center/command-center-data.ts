export type SolverHealth = {
  name: string;
  status: "Healthy";
};

export type SnapshotMetric = {
  label: string;
  value: string;
};

export type RoadmapProgress = {
  label: string;
  status: "Complete" | "In Progress" | "Planned";
};

export const systemStatus = [
  "All systems operational",
  "Preview mode enabled",
  "Static analysis active"
];

export const solverHealth: SolverHealth[] = [
  { name: "Block Blast", status: "Healthy" },
  { name: "Goods Sort", status: "Healthy" },
  { name: "Water Sort", status: "Healthy" },
  { name: "Hexa Sort", status: "Healthy" }
];

export const popularGames = [
  "Block Blast",
  "Goods Sort",
  "Water Sort",
  "Hexa Sort",
  "Bus Escape"
];

export const dailySnapshot: SnapshotMetric[] = [
  { label: "Preview sessions", value: "124,521" },
  { label: "Strategies", value: "563,820" },
  { label: "Average confidence", value: "76%" }
];

export const roadmapProgress: RoadmapProgress[] = [
  { label: "Phase 5", status: "Complete" },
  { label: "Phase 6", status: "In Progress" },
  { label: "AI Assistant", status: "Planned" }
];
