import { AnalysisHistoryCard } from "@/components/solver-pro/analysis-history-card";

const historyItems = [
  { game: "Block Blast", time: "2 min ago" },
  { game: "Goods Sort", time: "7 min ago" },
  { game: "Screw Jam", time: "15 min ago" },
  { game: "Bus Escape", time: "1 hour ago" },
  { game: "Water Sort", time: "Today" },
  { game: "Hexa Sort", time: "Today" }
];

export function SolverHistory() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Recent Analysis
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Static analysis history
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          Fake activity data for the Solver Pro preview. No account or saved
          history is connected.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {historyItems.map((item) => (
          <AnalysisHistoryCard
            key={`${item.game}-${item.time}`}
            game={item.game}
            time={item.time}
          />
        ))}
      </div>
    </section>
  );
}
