const changes = [
  { phase: "Phase 3.8", title: "Pseudo Analyzer" },
  { phase: "Phase 4.1", title: "Solver Pro Preview" },
  { phase: "Phase 4.2", title: "History + Stats" },
  { phase: "Phase 4.3", title: "Feature Grid" },
  { phase: "Phase 4.4", title: "Testimonials + Use Cases" },
  { phase: "Phase 4.5", title: "Integrations + Vision" }
];

export function SolverProChangelog() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Changelog
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Solver Pro build history.
      </h3>

      <div className="mt-6 grid gap-3">
        {changes.map((change) => (
          <article
            key={change.phase}
            className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-action">
              {change.phase}
            </span>
            <h4 className="text-sm font-bold text-ink">{change.title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}
