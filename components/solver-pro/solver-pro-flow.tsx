type SolverProFlowProps = {
  steps: string[];
};

export function SolverProFlow({ steps }: SolverProFlowProps) {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Solver Pro Flow
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-3xl border border-sky-100 bg-sky-50/60 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-mint text-xs font-black text-white shadow-lg shadow-blue-500/20">
              {index + 1}
            </span>
            <p className="mt-4 text-base font-bold text-ink">{step}</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              Static preview step only.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
