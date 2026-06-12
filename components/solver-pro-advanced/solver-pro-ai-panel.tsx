export function SolverProAiPanel() {
  return (
    <section className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-sky-50/80 to-emerald-50/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            AI Solver Preview
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Preview how future AI-assisted puzzle solving may work.
          </h3>
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-muted">
          Planned
        </span>
      </div>

      <div className="mt-6 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-sm shadow-slate-900/5">
        <p className="text-sm font-bold text-ink">
          Static preview only. No AI is running.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          This panel is a local product mockup for future assisted solving
          workflows. It does not call AI services, analyze screenshots, or send
          puzzle data anywhere.
        </p>
      </div>
    </section>
  );
}
