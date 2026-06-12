type RecommendedSolversProps = {
  solvers: string[];
};

export function RecommendedSolvers({ solvers }: RecommendedSolversProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Recommended Solvers
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Based on preview activity
      </h3>

      <div className="mt-6 grid gap-3">
        {solvers.map((solver) => (
          <article
            key={solver}
            className="flex items-center justify-between gap-3 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="text-sm font-bold text-ink">{solver}</span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-action">
              Preview
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
