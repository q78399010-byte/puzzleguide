const rows = [
  {
    feature: "Planning",
    guidePages: "Basic tips",
    solverMatrix: "Preview",
    solverPro: "Advanced preview"
  },
  {
    feature: "History",
    guidePages: "No",
    solverMatrix: "No",
    solverPro: "Demo history"
  },
  {
    feature: "Stats",
    guidePages: "No",
    solverMatrix: "No",
    solverPro: "Demo stats"
  },
  {
    feature: "Board Preview",
    guidePages: "No",
    solverMatrix: "Yes",
    solverPro: "Yes"
  },
  {
    feature: "Pseudo Analysis",
    guidePages: "No",
    solverMatrix: "Yes",
    solverPro: "Yes"
  },
  {
    feature: "Future AI",
    guidePages: "No",
    solverMatrix: "Planned",
    solverPro: "Planned"
  }
];

export function SolverProComparisonTable() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Comparison Table
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Guide pages, Solver Matrix, and Solver Pro.
      </h3>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-white/70 bg-white/80 shadow-sm">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-4 bg-gradient-to-r from-sky-50 via-white to-emerald-50 text-xs font-black uppercase tracking-[0.12em] text-ink">
            <div className="p-3 sm:p-4">Feature</div>
            <div className="p-3 sm:p-4">Guide pages</div>
            <div className="p-3 sm:p-4">Solver Matrix</div>
            <div className="p-3 sm:p-4">Solver Pro</div>
          </div>

          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-4 border-t border-slate-100 text-xs text-muted sm:text-sm"
            >
              <div className="p-3 font-bold text-ink sm:p-4">
                {row.feature}
              </div>
              <div className="p-3 sm:p-4">{row.guidePages}</div>
              <div className="p-3 sm:p-4">{row.solverMatrix}</div>
              <div className="p-3 font-semibold text-action sm:p-4">
                {row.solverPro}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
