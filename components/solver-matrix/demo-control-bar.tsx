import { PseudoUploadZone } from "@/components/solver-matrix/pseudo-upload-zone";
import type { DemoStatus } from "@/components/solver-matrix/demo-result-panel";

type DemoControlBarProps = {
  gameName: string;
  phase: DemoStatus;
  uploaded: boolean;
  onUpload: () => void;
  onAnalyze: () => void;
};

export function DemoControlBar({
  gameName,
  phase,
  uploaded,
  onUpload,
  onAnalyze
}: DemoControlBarProps) {
  const isAnalyzing =
    phase === "scanning" ||
    phase === "detecting" ||
    phase === "calculating" ||
    phase === "preparing";

  return (
    <div className="mt-5 grid gap-3">
      <PseudoUploadZone uploaded={uploaded} onUpload={onUpload} />

      <button
        type="button"
        aria-label={`Analyze ${gameName} board`}
        disabled={!uploaded || isAnalyzing}
        onClick={onAnalyze}
        className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Board"}
      </button>
    </div>
  );
}
