import type { SolverHealth } from "@/components/command-center/command-center-data";

type SolverHealthCardProps = {
  solvers: SolverHealth[];
};

export function SolverHealthCard({ solvers }: SolverHealthCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Solver Health
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Static solver availability.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {solvers.map((solver) => (
          <article
            key={solver.name}
            className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <h4 className="text-sm font-bold text-ink">{solver.name}</h4>
            <p className="mt-3 w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {solver.status}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
