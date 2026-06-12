import type { RoadmapProgress } from "@/components/command-center/command-center-data";

type RoadmapProgressCardProps = {
  items: RoadmapProgress[];
};

const statusStyle: Record<RoadmapProgress["status"], string> = {
  Complete: "bg-emerald-50 text-emerald-700",
  "In Progress": "bg-sky-50 text-action",
  Planned: "bg-slate-100 text-muted"
};

export function RoadmapProgressCard({ items }: RoadmapProgressCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Roadmap Progress
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Product roadmap status.
      </h3>

      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <article
            key={item.label}
            className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-xs font-black text-white shadow-lg shadow-blue-500/20">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-ink">{item.label}</h4>
            </div>
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-bold",
                statusStyle[item.status]
              ].join(" ")}
            >
              {item.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
