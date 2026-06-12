import type { ConfidenceTrend } from "@/components/insights-center/insights-center-data";

type ConfidenceTrendsCardProps = {
  trends: ConfidenceTrend[];
};

export function ConfidenceTrendsCard({ trends }: ConfidenceTrendsCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Confidence Trends
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Static solver confidence.
      </h3>

      <div className="mt-6 grid gap-4">
        {trends.map((trend) => (
          <article
            key={trend.game}
            className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-ink">{trend.game}</span>
              <span className="text-sm font-black text-action">
                {trend.value}%
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-action via-sky-500 to-mint"
                style={{ width: `${trend.value}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
