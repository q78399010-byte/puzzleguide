import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

type SolverPreviewCardProps = {
  preview: SolverPreview;
};

export function SolverPreviewCard({ preview }: SolverPreviewCardProps) {
  const details = [
    { label: "Best Move", value: preview.bestMove },
    { label: "Combo Chance", value: preview.comboChance },
    { label: "Danger Level", value: preview.dangerLevel },
    { label: "Next Strategy", value: preview.nextStrategy }
  ];

  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/55 bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            {preview.solverName}
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {preview.gameName}
          </h3>
        </div>

        <button
          type="button"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 px-5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Upload Screenshot
        </button>
      </div>

      <section className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/70 p-4 shadow-inner shadow-white/70">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
            Board Preview
          </p>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-muted shadow-sm">
            Static
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {preview.boardRows.map((row, rowIndex) => (
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
      </section>

      <div className="mt-5 grid flex-1 gap-3 sm:grid-cols-2">
        {details.map((detail) => (
          <section
            key={detail.label}
            className="rounded-3xl border border-white/60 bg-white/82 p-4 shadow-lg shadow-slate-900/5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
              {detail.label}
            </p>
            <p className="mt-3 text-xl font-bold tracking-tight text-ink">
              {detail.value}
            </p>
          </section>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        Try Preview
      </button>
    </article>
  );
}
