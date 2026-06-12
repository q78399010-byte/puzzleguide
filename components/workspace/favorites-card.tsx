type FavoritesCardProps = {
  favorites: string[];
};

export function FavoritesCard({ favorites }: FavoritesCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Favorites
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Quick access puzzle picks.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {favorites.map((favorite) => (
          <article
            key={favorite}
            className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <h4 className="text-sm font-bold text-ink">{favorite}</h4>
            <p className="mt-2 text-xs leading-5 text-muted">
              Saved static workspace item
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
