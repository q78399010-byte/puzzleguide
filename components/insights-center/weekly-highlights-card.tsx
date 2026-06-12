type WeeklyHighlightsCardProps = {
  highlights: string[];
};

export function WeeklyHighlightsCard({
  highlights
}: WeeklyHighlightsCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Weekly Highlights
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Preview momentum.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {highlights.map((highlight) => (
          <article
            key={highlight}
            className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-sky-50/80 to-emerald-50/70 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <h4 className="text-lg font-black text-ink">{highlight}</h4>
            <p className="mt-2 text-xs leading-5 text-muted">
              Static weekly highlight
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
