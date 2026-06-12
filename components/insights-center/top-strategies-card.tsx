type TopStrategiesCardProps = {
  strategies: string[];
};

export function TopStrategiesCard({ strategies }: TopStrategiesCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Top Strategies
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Most used solving patterns.
      </h3>

      <div className="mt-6 grid gap-3">
        {strategies.map((strategy, index) => (
          <article
            key={strategy}
            className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-xs font-black text-white shadow-lg shadow-blue-500/20">
              {index + 1}
            </span>
            <span className="text-sm font-bold text-ink">{strategy}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
