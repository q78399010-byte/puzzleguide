const analyzerCards = [
  {
    solver: "Block Blast",
    label: "Grid",
    board: ["B1", "B1", "", "C2", "", "D3", "D3", "", "E4"],
    focus: "Clear the center lane",
    risk: "Medium",
    nextMove: "Save open space for a wider placement."
  },
  {
    solver: "Screw Jam",
    label: "Tray",
    board: ["R1", "", "B2", "Y3", "G4", "", "P5", "P5", ""],
    focus: "Remove paired blockers",
    risk: "Medium",
    nextMove: "Keep one tray slot open before the next color."
  },
  {
    solver: "Water Sort",
    label: "Bottle",
    board: ["R", "B", "G", "", "R", "B", "", "P", "Y"],
    focus: "Build one clean stack",
    risk: "Low",
    nextMove: "Use the empty bottle as a temporary buffer."
  },
  {
    solver: "Goods Sort",
    label: "Shelf",
    board: ["A", "A", "", "C", "B", "C", "", "D", "D"],
    focus: "Group matching items",
    risk: "Low",
    nextMove: "Move C items together before filling the shelf."
  },
  {
    solver: "Bus Escape",
    label: "Route",
    board: ["N", "", "E", "W", "B", "E", "", "S", "X"],
    focus: "Open the exit path",
    risk: "High",
    nextMove: "Free the middle lane before moving the bus."
  },
  {
    solver: "Hexa Sort",
    label: "Hex",
    board: ["H1", "", "H2", "H3", "H1", "", "H5", "H5", "H4"],
    focus: "Anchor adjacent colors",
    risk: "Medium",
    nextMove: "Match the center color before expanding."
  }
];

const pseudoAnalyzerSteps = [
  "Static board snapshot",
  "Pattern summary",
  "Risk label",
  "Suggested next move"
];

export function CoreAnalyzer() {
  return (
    <section
      id="core-analyzer"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_52%,#ffffff_100%)] py-24"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Core Analyzer
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Solver Matrix and Pseudo Analyzer in one compact view.
            </h2>
          </div>
          <p className="text-base leading-8 text-muted">
            Static board previews, puzzle signals, and next-move notes are
            grouped into one analyzer surface for the core game types.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {analyzerCards.map((card) => (
              <article
                key={card.solver}
                className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
                      {card.label} analyzer
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                      {card.solver}
                    </h3>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-3 py-1 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
                    {card.risk}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {card.board.map((cell, index) => (
                    <div
                      key={`${card.solver}-${index}`}
                      className={`flex aspect-square items-center justify-center rounded-2xl border text-xs font-bold shadow-inner ${
                        cell
                          ? "border-white/70 bg-gradient-to-br from-sky-100 via-white to-emerald-50 text-ink"
                          : "border-slate-100 bg-white/55 text-slate-300"
                      }`}
                    >
                      {cell || "-"}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-white/65 bg-white/60 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
                  <p className="text-sm font-bold text-ink">{card.focus}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {card.nextMove}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-3xl border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(230,242,255,0.74),rgba(241,255,249,0.72))] p-7 shadow-card backdrop-blur-xl lg:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Pseudo Analyzer
            </p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Static analysis flow for written guides.
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              The analyzer preview uses fixed board states and written guidance
              only. It does not process player files or connect to live services.
            </p>

            <div className="mt-8 space-y-4">
              {pseudoAnalyzerSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/68 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-ink">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/65 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Summary
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
                6 solver previews, 24 static signals.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
