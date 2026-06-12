import type { SolverProCard as SolverProCardData } from "@/components/solver-pro/solver-pro-data";

type SolverProCardProps = {
  card: SolverProCardData;
};

export function SolverProCard({ card }: SolverProCardProps) {
  const isPreview = card.status === "Preview";

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
          {card.title.slice(0, 1)}
        </div>
        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-bold shadow-sm",
            isPreview
              ? "bg-emerald-50 text-emerald-700"
              : "bg-sky-50 text-action"
          ].join(" ")}
        >
          {card.status}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">
        {card.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
        {card.description}
      </p>
    </article>
  );
}
