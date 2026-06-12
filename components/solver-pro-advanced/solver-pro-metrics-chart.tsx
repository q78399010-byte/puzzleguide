import type { AdvancedMetric } from "@/components/solver-pro-advanced/solver-pro-advanced-data";

type SolverProMetricsChartProps = {
  metrics: AdvancedMetric[];
};

export function SolverProMetricsChart({ metrics }: SolverProMetricsChartProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Metrics Chart
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Advanced preview quality signals.
      </h3>

      <div className="mt-6 grid gap-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-ink">
                {metric.label}
              </span>
              <span className="text-sm font-black text-action">
                {metric.value}
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-action via-sky-500 to-mint"
                style={{ width: `${metric.percent}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
