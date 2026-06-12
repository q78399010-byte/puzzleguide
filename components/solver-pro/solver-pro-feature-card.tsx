import type { SolverProFeature } from "@/components/solver-pro/solver-pro-data";

type SolverProFeatureCardProps = {
  feature: SolverProFeature;
};

export function SolverProFeatureCard({ feature }: SolverProFeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
        {feature.title.slice(0, 1)}
      </span>
      <h4 className="mt-5 text-xl font-bold tracking-tight text-ink">
        {feature.title}
      </h4>
      <p className="mt-3 text-sm leading-6 text-muted">
        {feature.description}
      </p>
    </article>
  );
}
