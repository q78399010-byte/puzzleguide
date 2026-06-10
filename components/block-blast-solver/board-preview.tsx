const rows = [
  ["", "■", "■", ""],
  ["■", "■", "", ""],
  ["", "", "■", "■"],
  ["■", "", "", "■"]
];

export function BoardPreview() {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Board Preview
          </p>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
            Static board snapshot
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          The preview below is fake data used to shape the layout and highlight the
          move pattern.
        </p>
      </div>

      <div className="mt-6 grid gap-2 rounded-3xl bg-slate-900/5 p-4 sm:p-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={[
                  "flex aspect-square items-center justify-center rounded-xl border text-lg font-black shadow-sm transition duration-300",
                  cell
                    ? "border-sky-200 bg-gradient-to-br from-sky-100 to-violet-100 text-slate-800"
                    : "border-slate-200 bg-white text-slate-300"
                ].join(" ")}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
