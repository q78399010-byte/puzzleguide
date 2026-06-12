import { AnimatedScoreMeter } from "@/components/solver-matrix/animated-score-meter";
import type { DemoStatus } from "@/components/solver-matrix/demo-result-panel";

type AnimatedStepIndicatorProps = {
  label: string;
  value: string;
  status: DemoStatus;
  index: number;
};

function dangerClass(value: string) {
  if (value === "Low") {
    return "border-emerald-200 bg-emerald-50/75 text-emerald-700";
  }

  if (value === "Medium") {
    return "border-amber-200 bg-amber-50/80 text-amber-700";
  }

  if (value === "High") {
    return "border-rose-200 bg-rose-50/80 text-rose-700";
  }

  return "border-white/60 bg-sky-50/55 text-ink";
}

export function AnimatedStepIndicator({
  label,
  value,
  status,
  index
}: AnimatedStepIndicatorProps) {
  const isCombo = label === "Combo Chance";
  const isDanger = label === "Danger Level";
  const isNextStrategy = label === "Next Strategy";
  const hasResult = status === "result";
  const isVisible = status !== "loading";

  return (
    <div
      className={[
        "rounded-3xl border p-4 shadow-sm transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        isDanger ? dangerClass(value) : "border-white/60 bg-sky-50/55 text-ink",
        isNextStrategy && hasResult ? "shadow-lg shadow-blue-500/10" : ""
      ].join(" ")}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-3 text-lg font-bold tracking-tight">
        {isCombo ? (
          <AnimatedScoreMeter active={hasResult} value={value} />
        ) : hasResult ? (
          value
        ) : (
          "Run preview"
        )}
      </p>
    </div>
  );
}
