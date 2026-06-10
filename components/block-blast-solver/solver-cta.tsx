export function SolverCta() {
  return (
    <section className="rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_52%,#7c3aed_100%)] p-6 text-white shadow-2xl shadow-blue-500/20 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            Ready
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Use the solver prototype on your next Block Blast board.
          </h3>
        </div>
        <button
          type="button"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Try Solver
        </button>
      </div>
    </section>
  );
}
