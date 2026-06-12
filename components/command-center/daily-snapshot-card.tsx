import type { SnapshotMetric } from "@/components/command-center/command-center-data";

type DailySnapshotCardProps = {
  metrics: SnapshotMetric[];
};

export function DailySnapshotCard({ metrics }: DailySnapshotCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Daily Snapshot
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Preview command metrics.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/75 to-sky-50/70 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
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
