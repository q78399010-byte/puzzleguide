import { AnimatedStepIndicator } from "@/components/solver-matrix/animated-step-indicator";
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

  const hasResult = status === "result";

  return (
    <section className="mt-5 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
          Suggested Strategy
        </p>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-action shadow-sm">
          {hasResult ? preview.animationLabel : "Static demo"}
        </span>
      </div>

      {status === "loading" ? (
        <div className="mt-4 flex items-center gap-3 rounded-3xl border border-sky-100 bg-sky-50/70 p-4 text-sm font-bold text-ink">
          <span className="h-3 w-3 animate-pulse rounded-full bg-action shadow-lg shadow-blue-500/30" />
          Analyzing board...
        </div>
      ) : null}

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
    </section>
  );
}
