const boardRows = [
  ["R", "B", "G", ""],
  ["R", "B", "G", ""],
  ["Y", "R", "", "P"],
  ["Y", "B", "P", "G"]
];

const solverStats = [
  {
    label: "Best Move",
    value: "Pour red to tube 4",
    text: "Move the top red into the empty tube to unlock yellow."
  },
  {
    label: "Combo Chance",
    value: "61%",
    text: "A clean red stack opens a second pour into the blue tube."
  },
  {
    label: "Danger Level",
    value: "Medium",
    text: "Only one full empty tube remains for temporary storage."
  },
  {
    label: "Next Strategy",
    value: "Build red stack",
    text: "Finish red before touching the mixed green and purple tube."
  }
];

export function WaterSortSolverPreview() {
  return (
    <article className="flex h-full flex-col rounded-xl border border-white/55 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            Water Sort Solver Preview
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
            Tube stack route
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            Static mock data for a four-color pour setup.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-action via-sky-500 to-violet-500 px-5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Upload Screenshot
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50/70 p-4 shadow-inner shadow-white/70">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
            Board Preview
          </p>
          <span className="rounded-xl bg-white px-3 py-1 text-xs font-bold text-muted shadow-sm">
            Static
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {boardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map((cell, cellIndex) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={[
                    "flex aspect-square items-center justify-center rounded-xl border text-sm font-black shadow-sm",
                    cell
                      ? "border-sky-200 bg-gradient-to-br from-white via-sky-100 to-violet-100 text-ink"
                      : "border-white/80 bg-white/70 text-slate-300"
                  ].join(" ")}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid flex-1 gap-3 sm:grid-cols-2">
        {solverStats.map((stat) => (
          <section
            key={stat.label}
            className="rounded-xl border border-white/60 bg-white/82 p-4 shadow shadow-slate-900/5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
              {stat.label}
            </p>
            <p className="mt-3 text-xl font-bold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{stat.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
