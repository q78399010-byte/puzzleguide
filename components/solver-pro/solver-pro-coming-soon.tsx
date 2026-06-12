const comingSoonItems = [
  "Screenshot Recognition",
  "Advanced Planning",
  "Multi-step Strategy",
  "AI-assisted Solver"
];

export function SolverProComingSoon() {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 via-sky-50/80 to-emerald-50/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Coming Soon
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Future Solver Pro capabilities.
          </h3>
        </div>
        <span className="w-fit rounded-full bg-gradient-to-r from-action to-mint px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
          Preview roadmap
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {comingSoonItems.map((item) => (
          <article
            key={item}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <h4 className="text-sm font-bold text-ink">{item}</h4>
            <p className="mt-3 w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-muted">
              Coming Soon
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
