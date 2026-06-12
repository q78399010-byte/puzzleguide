import {
  advancedMetrics,
  analyticsCards,
  previewFeedback,
  userInsights
} from "@/components/solver-pro-advanced/solver-pro-advanced-data";
import { SolverProAiPanel } from "@/components/solver-pro-advanced/solver-pro-ai-panel";
import { SolverProAnalyticsCard } from "@/components/solver-pro-advanced/solver-pro-analytics-card";
import { SolverProFeedback } from "@/components/solver-pro-advanced/solver-pro-feedback";
import { SolverProMetricsChart } from "@/components/solver-pro-advanced/solver-pro-metrics-chart";
import { SolverProUserInsights } from "@/components/solver-pro-advanced/solver-pro-user-insights";

export function SolverProAdvancedSection() {
  return (
    <section id="solver-pro-advanced" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Solver Pro Advanced Modules
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Advanced solver previews for planning, confidence, and insights.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Explore static advanced modules for AI planning concepts, metrics,
              user insights, analytics, and demo feedback.
            </p>
          </div>
          <a
            href="#solver-pro-advanced"
            className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-gradient-to-r from-action to-mint px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            View Advanced Preview
          </a>
        </div>

        <div className="mt-8">
          <SolverProAiPanel />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <SolverProMetricsChart metrics={advancedMetrics} />
          <SolverProUserInsights insights={userInsights} />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {analyticsCards.map((card) => (
            <SolverProAnalyticsCard key={card.label} card={card} />
          ))}
        </div>

        <div className="mt-8">
          <SolverProFeedback feedback={previewFeedback} />
        </div>
      </div>
    </section>
  );
}
