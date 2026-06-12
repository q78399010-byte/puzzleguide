type RiskPatternsCardProps = {
  patterns: string[];
};

export function RiskPatternsCard({ patterns }: RiskPatternsCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Risk Patterns
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Common puzzle warning signs.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {patterns.map((pattern) => (
          <article
            key={pattern}
            className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/75 to-amber-50/70 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <h4 className="text-sm font-bold text-ink">{pattern}</h4>
            <p className="mt-2 text-xs leading-5 text-muted">
              Static risk insight
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
