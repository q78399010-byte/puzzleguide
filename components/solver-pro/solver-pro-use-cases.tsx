import { SolverProBadge } from "@/components/solver-pro/solver-pro-badge";

const useCases = [
  "Block Blast",
  "Screw Jam",
  "Goods Sort",
  "Water Sort",
  "Bus Escape",
  "Hexa Sort"
];

const badges = [
  "Free Preview",
  "No Account Needed",
  "Static Demo",
  "AI Planned"
];

export function SolverProUseCases() {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Use Cases
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Built around popular puzzle workflows.
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <SolverProBadge key={badge} label={badge} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((game) => (
          <article
            key={game}
            className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/75 to-sky-50/70 p-5 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h4 className="text-base font-bold text-ink">{game}</h4>
            <p className="mt-2 text-sm leading-6 text-muted">
              Preview planning, board signals, and strategy summaries for this
              solver workflow.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
