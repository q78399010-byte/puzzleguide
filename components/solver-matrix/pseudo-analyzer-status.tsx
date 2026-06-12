type PseudoAnalyzerStatusProps = {
  phase: "scanning" | "detecting" | "calculating" | "preparing";
};

const phases = [
  "Scanning board...",
  "Detecting puzzle state...",
  "Calculating best move...",
  "Preparing strategy..."
] as const;

export function PseudoAnalyzerStatus({ phase }: PseudoAnalyzerStatusProps) {
  const currentIndex = phases.findIndex((item) => {
    if (phase === "scanning") {
      return item === phases[0];
    }
    if (phase === "detecting") {
      return item === phases[1];
    }
    if (phase === "calculating") {
      return item === phases[2];
    }
    return item === phases[3];
  });

  return (
    <section className="mt-5 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
        Analyzer
      </p>

      <div className="mt-4 grid gap-3">
        {phases.map((item, index) => (
          <div
            key={item}
            className={[
              "flex items-center gap-3 rounded-3xl border p-4 transition-all duration-300",
              index <= currentIndex
                ? "border-sky-100 bg-sky-50/70 text-ink"
                : "border-white/60 bg-white/70 text-muted"
            ].join(" ")}
          >
            <span
              className={[
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "animate-pulse bg-action shadow-lg shadow-blue-500/30"
                  : index < currentIndex
                    ? "bg-emerald-500"
                    : "bg-slate-300"
              ].join(" ")}
            />
            <span className="text-sm font-bold">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
