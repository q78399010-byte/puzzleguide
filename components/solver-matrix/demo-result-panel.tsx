import { AnimatedStepIndicator } from "@/components/solver-matrix/animated-step-indicator";
import { PseudoAnalyzerStatus } from "@/components/solver-matrix/pseudo-analyzer-status";
import { PseudoBoardSummary } from "@/components/solver-matrix/pseudo-board-summary";
import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

export type DemoStatus =
  | "idle"
  | "uploaded"
  | "scanning"
  | "detecting"
  | "calculating"
  | "preparing"
  | "result";

type DemoResultPanelProps = {
  preview: SolverPreview;
  status: DemoStatus;
};

export function DemoResultPanel({ preview, status }: DemoResultPanelProps) {
  const details = [
    { label: "Best Move", value: preview.bestMove },
    { label: "Combo Chance", value: preview.comboChance },
    { label: "Danger Level", value: preview.dangerLevel },
    { label: "Suggested Strategy", value: preview.nextStrategy }
  ];

  const hasResult = status === "result";
  const isAnalyzing =
    status === "scanning" ||
    status === "detecting" ||
    status === "calculating" ||
    status === "preparing";

  return (
    <section className="mt-5 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
          Suggested Strategy
        </p>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-action shadow-sm">
          {hasResult ? preview.animationLabel : "Pseudo analyzer"}
        </span>
      </div>

      {status === "uploaded" ? (
        <div className="mt-4 rounded-3xl border border-sky-100 bg-sky-50/70 p-4 text-sm font-bold text-ink">
          Screenshot added locally. Ready to analyze.
        </div>
      ) : null}

      {isAnalyzing ? <PseudoAnalyzerStatus phase={status} /> : null}

      {hasResult ? (
        <>
          <PseudoBoardSummary preview={preview} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {details.map((detail, index) => (
              <AnimatedStepIndicator
                key={detail.label}
                label={detail.label}
                value={detail.value}
                status={status}
                index={index}
              />
            ))}
          </div>
        </>
      ) : null}

      <p className="mt-5 text-xs font-medium leading-5 text-muted">
        Static preview. No real upload or AI analysis is performed.
      </p>
    </section>
  );
}
