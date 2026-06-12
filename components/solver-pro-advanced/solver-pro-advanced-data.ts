export type AdvancedMetric = {
  label: string;
  value: string;
  percent: number;
};

export type UserInsight = {
  label: string;
  value: string;
};

export type AnalyticsCard = {
  label: string;
  value: string;
};

export const advancedMetrics: AdvancedMetric[] = [
  { label: "Analysis accuracy", value: "92%", percent: 92 },
  { label: "Move confidence", value: "76%", percent: 76 },
  { label: "Risk detection", value: "81%", percent: 81 },
  { label: "Strategy clarity", value: "88%", percent: 88 }
];

export const userInsights: UserInsight[] = [
  { label: "Most analyzed game", value: "Block Blast" },
  { label: "Common risk", value: "Low space" },
  { label: "Popular strategy", value: "Clear center first" },
  { label: "Frequent action", value: "Try Preview" }
];

export const analyticsCards: AnalyticsCard[] = [
  { label: "Preview sessions", value: "124,521" },
  { label: "Strategies generated", value: "563,820" },
  { label: "Average confidence", value: "76%" },
  { label: "Supported solvers", value: "6" }
];

export const previewFeedback = [
  "Feels like a real puzzle assistant.",
  "Great for planning moves before getting stuck.",
  "Excited for future AI tools."
];
