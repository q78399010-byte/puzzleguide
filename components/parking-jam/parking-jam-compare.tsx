const games = ["Parking Jam", "Bus Escape", "Goods Sort", "Water Sort"];

const rows = [
  {
    label: "Difficulty",
    values: ["Medium", "Hard", "Medium", "Easy"]
  },
  {
    label: "Relaxation",
    values: ["Medium", "Low", "High", "High"]
  },
  {
    label: "Strategy",
    values: ["Exit order", "Traffic lanes", "Shelf grouping", "Color storage"]
  },
  {
    label: "Learning Curve",
    values: ["Moderate", "Steep", "Easy", "Easy"]
  },
  {
    label: "Average Session",
    values: ["3 min", "3 min", "3 min", "3 min"]
  }
];

export function ParkingJamCompare() {
  return (
    <section className="mt-8 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Compare
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Parking Jam vs Bus Escape vs Goods Sort vs Water Sort
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Use this quick comparison to choose between exit-order traffic puzzles,
          bus lane pressure, shelf sorting, and relaxing color storage.
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
