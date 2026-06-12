import { DemoBoard } from "@/components/solver-matrix/demo-board";
import { DemoControlBar } from "@/components/solver-matrix/demo-control-bar";
import {
  DemoResultPanel,
  type DemoStatus
} from "@/components/solver-matrix/demo-result-panel";
import { SolverFeaturePill } from "@/components/solver-matrix/solver-feature-pill";
import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

type SolverPreviewCardProps = {
  preview: SolverPreview;
  isActive: boolean;
  status: DemoStatus;
  onTryPreview: () => void;
};

export function SolverPreviewCard({
  preview,
  isActive,
  status,
  onTryPreview
}: SolverPreviewCardProps) {
  return (
    <article
      className={[
        "group flex h-full flex-col rounded-3xl border bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:p-6",
        isActive
          ? "border-action/70 ring-4 ring-blue-100/80 shadow-2xl shadow-blue-500/10"
          : "border-white/55"
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            {preview.solverName}
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {preview.gameName}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {preview.featurePills.map((feature) => (
              <SolverFeaturePill key={feature} label={feature} />
            ))}
          </div>
        </div>

        <span className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 px-4 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
          Demo Mode
        </span>
      </div>

      <DemoBoard preview={preview} status={status} />
      <div className="flex-1">
        <DemoResultPanel preview={preview} status={status} />
      </div>
      <DemoControlBar
        gameName={preview.gameName}
        isActive={isActive}
        isLoading={status === "loading"}
        onTryPreview={onTryPreview}
      />
    </article>
  );
}
