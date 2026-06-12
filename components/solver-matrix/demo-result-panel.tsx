import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

export type DemoStatus = "idle" | "loading" | "result";

type DemoResultPanelProps = {
  preview: SolverPreview;
  status: DemoStatus;
};

export function DemoResultPanel({ preview, status }: DemoResultPanelProps) {
  const details = [
    { label: "Best Move", value: preview.bestMove },
    { label: "Combo Chance", value: preview.comboChance },
    { label: "Danger Level", value: preview.dangerLevel },
    { label: "Next Strategy", value: preview.nextStrategy }
  ];

  if (status === "loading") {
    return (
      <section className="mt-5 rounded-3xl border border-sky-100 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
          Suggested Strategy
        </p>
        <div className="mt-4 flex items-center gap-3 text-sm font-bold text-ink">
          <span className="h-3 w-3 animate-pulse rounded-full bg-action shadow-lg shadow-blue-500/30" />
          Analyzing board...
        </div>
      </section>
    );
  }

  return (
    <section className="mt-5 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
          Suggested Strategy
        </p>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-action shadow-sm">
          {status === "result" ? preview.animationLabel : "Static demo"}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="rounded-3xl border border-white/60 bg-sky-50/55 p-4 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {detail.label}
            </p>
            <p className="mt-3 text-lg font-bold tracking-tight text-ink">
              {status === "result" ? detail.value : "Run preview"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
