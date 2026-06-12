import type { SolverProRoadmapItem } from "@/components/solver-pro/solver-pro-data";

type SolverProRoadmapProps = {
  items: SolverProRoadmapItem[];
};

const statusStyle: Record<SolverProRoadmapItem["status"], string> = {
  已完成: "bg-emerald-50 text-emerald-700",
  进行中: "bg-sky-50 text-action",
  下一步: "bg-amber-50 text-amber-700",
  未来: "bg-slate-100 text-muted"
};

export function SolverProRoadmap({ items }: SolverProRoadmapProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Roadmap
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Solver Pro roadmap
      </h3>

      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <article
            key={item.label}
            className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-xs font-black text-white shadow-lg shadow-blue-500/20">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-ink">{item.label}</h4>
              <p className="mt-1 text-xs text-muted">Static roadmap item</p>
            </div>
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-bold",
                statusStyle[item.status] ?? "bg-slate-100 text-muted"
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
