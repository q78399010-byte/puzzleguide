const plans = ["Free Preview", "Solver Pro", "AI Solver"];

export function SolverProPricingPreview() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Pricing Preview
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Product tiers are preview-only.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {plans.map((plan) => (
          <article
            key={plan}
            className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/75 to-sky-50/70 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-base font-bold text-ink">{plan}</h4>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-muted">
                Preview only
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Static product concept with no checkout, account, or paid access.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
