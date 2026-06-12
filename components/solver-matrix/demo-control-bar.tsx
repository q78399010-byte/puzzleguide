type DemoControlBarProps = {
  gameName: string;
  isActive: boolean;
  isLoading: boolean;
  onTryPreview: () => void;
};

export function DemoControlBar({
  gameName,
  isActive,
  isLoading,
  onTryPreview
}: DemoControlBarProps) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <span className="inline-flex h-12 items-center justify-center rounded-full border border-sky-100 bg-white/80 px-5 text-sm font-bold text-action shadow-lg shadow-slate-900/5">
        Upload Screenshot
      </span>

      <button
        type="button"
        aria-pressed={isActive}
        aria-label={`Try static preview for ${gameName}`}
        disabled={isLoading}
        onClick={onTryPreview}
        className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
      >
        {isLoading ? "Analyzing..." : "Try Preview"}
      </button>
    </div>
  );
}
