const releaseRoadmap = [
  { stage: "Current", title: "Solver Pro" },
  { stage: "Next", title: "Advanced Planner" },
  { stage: "Future", title: "AI Assistant" }
];

const stageStyle: Record<string, string> = {
  Current: "from-action to-mint",
  Next: "from-amber-400 to-orange-400",
  Future: "from-slate-500 to-slate-700"
};

export function SolverProReleaseRoadmap() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Release Roadmap
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Planned product direction.
      </h3>

      <div className="mt-6 grid gap-3">
        {releaseRoadmap.map((item, index) => (
          <article
            key={item.stage}
            className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xs font-black text-white shadow-lg",
                stageStyle[item.stage] ?? "from-slate-500 to-slate-700"
              ].join(" ")}
            >
              {index + 1}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                {item.stage}
              </p>
              <h4 className="mt-1 text-sm font-bold text-ink">{item.title}</h4>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
