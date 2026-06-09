const games = ["Color Wood Jam", "Goods Sort", "Screw Jam", "Water Sort"];

const rows = [
  {
    label: "Difficulty",
    values: ["Hard", "Medium", "Hard", "Easy"]
  },
  {
    label: "Relaxation",
    values: ["Medium", "High", "Low", "High"]
  },
  {
    label: "Strategy",
    values: ["Spatial exits", "Sorting space", "Mechanical order", "Color storage"]
  },
  {
    label: "Learning Curve",
    values: ["Moderate", "Easy", "Steep", "Easy"]
  },
  {
    label: "Average Session",
    values: ["2 min", "3 min", "2 min", "3 min"]
  }
];

export function ColorWoodJamCompare() {
  return (
    <section className="mt-8 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Compare
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Color Wood Jam vs Goods Sort vs Screw Jam vs Water Sort
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Use this quick comparison to choose between spatial wood puzzles,
          mechanical blockers, and relaxing sorting boards.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/55 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead className="bg-paper/80 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="p-4 text-ink">Metric</th>
              {games.map((game) => (
                <th key={game} className="p-4 text-ink">
                  {game}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line/60">
                <th className="p-4 font-bold text-ink">{row.label}</th>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.label}-${games[index]}`}
                    className="p-4 text-muted"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
