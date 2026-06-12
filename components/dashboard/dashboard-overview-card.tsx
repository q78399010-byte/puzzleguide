import type { DashboardMetric } from "@/components/dashboard/dashboard-data";

type DashboardOverviewCardProps = {
  metrics: DashboardMetric[];
};

export function DashboardOverviewCard({ metrics }: DashboardOverviewCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Overview
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Solver Dashboard
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {metric.label}
            </p>
            <p className="mt-3 text-3xl font-black tracking-tight text-ink">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
