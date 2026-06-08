import type { FreemiumPlan } from "@/data/freemium-data";

type FreemiumCardProps = {
  plan: FreemiumPlan;
};

export function FreemiumCard({ plan }: FreemiumCardProps) {
  return (
    <article className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-white/50 to-sky-100/60 p-px shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-full rounded-3xl border border-white/60 bg-white/80 p-7 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/90">
        <div className="flex min-h-8 items-center justify-between gap-3">
          <h3 className="text-2xl font-bold tracking-tight text-ink">
            {plan.name}
          </h3>
          {plan.badge ? (
            <span className="rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-500/20">
              {plan.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-7 text-5xl font-bold tracking-tight text-ink">
          {plan.price}
        </p>

        <ul className="mt-8 grid gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm font-medium text-muted">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-action/10 text-action">
                <span className="h-2 w-2 rounded-full bg-action" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <a
          href={plan.href}
          className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30"
        >
          {plan.cta}
        </a>
      </div>
    </article>
  );
}
