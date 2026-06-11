const tips = [
  "Clear the bus lane first",
  "Move side blockers before buses",
  "Keep one escape space open",
  "Avoid trapping long vehicles",
  "Plan the exit order",
  "Use short moves carefully",
  "Restart early if lanes lock"
];

export function BusEscapeTips() {
  return (
    <section className="mt-8 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Tips
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Seven lane-safe moves
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Use these before checking a full solution. Hard Bus Escape boards are
          easier when exit lanes, side blockers, and long vehicles are planned
          together.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        {tips.map((tip, index) => (
          <article
            key={tip}
            className="group rounded-3xl border border-white/55 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white hover:shadow-2xl xl:min-h-44"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-bold leading-6 text-ink">{tip}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
