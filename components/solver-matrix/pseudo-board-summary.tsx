import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

type PseudoBoardSummaryProps = {
  preview: SolverPreview;
};

const dangerStyles: Record<SolverPreview["dangerLevel"], string> = {
  Low: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50/80 text-amber-700",
  High: "border-rose-200 bg-rose-50/80 text-rose-700"
};

const dangerText: Record<SolverPreview["dangerLevel"], string> = {
  Low: "Low",
  Medium: "Medium",
  High: "High"
};

export function PseudoBoardSummary({ preview }: PseudoBoardSummaryProps) {
  return (
    <section className="mt-5 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
        Board State
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/60 bg-sky-50/55 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {preview.boardState.label}
          </p>
          <p className="mt-3 text-lg font-bold tracking-tight text-ink">
            {preview.boardState.value}
          </p>
        </div>

        <div
          className={[
            "rounded-3xl border p-4 shadow-sm",
            dangerStyles[preview.dangerLevel]
          ].join(" ")}
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">
            Risk
          </p>
          <p className="mt-3 text-lg font-bold tracking-tight text-current">
            {dangerText[preview.dangerLevel]}
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-sky-50/55 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Recommended focus
          </p>
          <p className="mt-3 text-lg font-bold tracking-tight text-ink">
            {preview.boardState.focus}
          </p>
        </div>
      </div>
    </section>
  );
}
