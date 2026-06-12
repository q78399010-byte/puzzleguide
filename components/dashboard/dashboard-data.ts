export type DashboardMetric = {
  label: string;
  value: string;
};

export type SolverProgress = {
  label: string;
  value: number;
};

export type ActivityItem = {
  time: string;
  action: string;
};

export const overviewMetrics: DashboardMetric[] = [
  { label: "Active Solvers", value: "6" },
  { label: "Preview Sessions", value: "124,521" },
  { label: "Strategies Suggested", value: "563,820" },
  { label: "Success Rate", value: "93%" }
];

export const solverProgress: SolverProgress[] = [
  { label: "Block Blast Solver", value: 72 },
  { label: "Goods Sort Solver", value: 81 },
  { label: "Water Sort Solver", value: 76 },
  { label: "Bus Escape Solver", value: 69 },
  { label: "Hexa Sort Solver", value: 74 }
];

export const trendingGames = [
  "Block Blast",
  "Goods Sort",
  "Water Sort",
  "Hexa Sort",
  "Bus Escape"
];

export const achievements = [
  "100k Sessions",
  "Top Solver",
  "Early Preview",
  "Static Demo"
];

export const activityFeed: ActivityItem[] = [
  { time: "Today", action: "Previewed Block Blast Solver" },
  { time: "Today", action: "Viewed Goods Sort Guide" },
  { time: "Yesterday", action: "Explored Solver Pro" },
  { time: "Yesterday", action: "Opened Workspace" }
];
