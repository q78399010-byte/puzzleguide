import { ConfidenceTrendsCard } from "@/components/insights-center/confidence-trends-card";
import {
  confidenceTrends,
  riskPatterns,
  solverInsights,
  topStrategies,
  weeklyHighlights
} from "@/components/insights-center/insights-center-data";
import { RiskPatternsCard } from "@/components/insights-center/risk-patterns-card";
import { SolverInsightsCard } from "@/components/insights-center/solver-insights-card";
import { TopStrategiesCard } from "@/components/insights-center/top-strategies-card";
import { WeeklyHighlightsCard } from "@/components/insights-center/weekly-highlights-card";

export function InsightsCenterSection() {
  return (
    <section id="insights-center" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Insights Center
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Strategy and risk insights for solver previews.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Explore static strategy trends, confidence bars, risk patterns,
              solver summaries, and weekly highlights from preview activity.
            </p>
          </div>
          <span className="w-fit rounded-full bg-gradient-to-r from-action to-mint px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
            Static insights
          </span>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <TopStrategiesCard strategies={topStrategies} />
          <ConfidenceTrendsCard trends={confidenceTrends} />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <RiskPatternsCard patterns={riskPatterns} />
          <SolverInsightsCard insights={solverInsights} />
        </div>

        <div className="mt-8">
          <WeeklyHighlightsCard highlights={weeklyHighlights} />
        </div>
      </div>
    </section>
  );
}
