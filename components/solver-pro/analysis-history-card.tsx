type AnalysisHistoryCardProps = {
  game: string;
  time: string;
};

export function AnalysisHistoryCard({ game, time }: AnalysisHistoryCardProps) {
  return (
    <article className="group flex items-center justify-between gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-xs font-black text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
          {game.slice(0, 1)}
        </span>
        <div>
          <h4 className="text-sm font-bold text-ink">{game}</h4>
          <p className="mt-1 text-xs font-medium text-muted">{time}</p>
        </div>
      </div>

      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-action">
        Static
      </span>
    </article>
  );
}
