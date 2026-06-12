export function SolverProVision() {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 via-sky-50/80 to-emerald-50/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Vision
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Building the future puzzle assistant.
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Puzzle Solver Pro is designed as a safe preview-first experience
            that may evolve into a complete puzzle analysis platform in the
            future.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-slate-900/5">
          <p className="text-sm font-bold text-ink">Preview-first principles</p>
          <div className="mt-4 grid gap-2">
            {["Static today", "No real upload", "No account needed"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-muted shadow-sm"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
