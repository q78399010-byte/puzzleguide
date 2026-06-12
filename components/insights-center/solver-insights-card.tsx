import type { SolverInsight } from "@/components/insights-center/insights-center-data";

type SolverInsightsCardProps = {
  insights: SolverInsight[];
};

export function SolverInsightsCard({ insights }: SolverInsightsCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Solver Insights
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Weekly solver snapshot.
      </h3>

      <div className="mt-6 grid gap-3">
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
