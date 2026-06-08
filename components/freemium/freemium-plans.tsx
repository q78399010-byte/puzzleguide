import { FreemiumCard } from "@/components/freemium/freemium-card";
import { freemiumHero, freemiumPlans } from "@/data/freemium-data";

export function FreemiumPlans() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Freemium Matrix
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            {freemiumHero.title}
            <span className="block bg-gradient-to-r from-action via-sky-500 to-violet-500 bg-clip-text text-transparent">
              {freemiumHero.titleAccent}
            </span>
          </h2>
        </div>
        <div className="max-w-xl lg:justify-self-end">
          <p className="text-lg leading-8 text-muted sm:text-xl">
            {freemiumHero.subtitle}
          </p>
          <p className="mt-3 text-base leading-7 text-muted">
            {freemiumHero.description}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {freemiumPlans.map((plan) => (
          <FreemiumCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}
