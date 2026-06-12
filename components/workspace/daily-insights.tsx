import type { DailyInsight } from "@/components/workspace/workspace-data";

type DailyInsightsProps = {
  insights: DailyInsight[];
};

export function DailyInsights({ insights }: DailyInsightsProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Daily Insights
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Static workspace signals.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.label}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {insight.label}
            </p>
            <p className="mt-3 text-lg font-black text-ink">
              {insight.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
