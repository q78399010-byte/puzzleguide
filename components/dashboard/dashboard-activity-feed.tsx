import type { ActivityItem } from "@/components/dashboard/dashboard-data";

type DashboardActivityFeedProps = {
  feed: ActivityItem[];
};

export function DashboardActivityFeed({ feed }: DashboardActivityFeedProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Activity Feed
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Recent static activity.
      </h3>

      <div className="mt-6 grid gap-3">
        {feed.map((item) => (
          <article
            key={`${item.time}-${item.action}`}
            className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {item.time}
            </p>
            <h4 className="mt-2 text-sm font-bold text-ink">{item.action}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}
