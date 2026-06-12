import type { SolverProFeature } from "@/components/solver-pro/solver-pro-data";
import { SolverProFeatureCard } from "@/components/solver-pro/solver-pro-feature-card";

type SolverProFeatureGridProps = {
  features: SolverProFeature[];
};

export function SolverProFeatureGrid({ features }: SolverProFeatureGridProps) {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Advanced Feature Preview
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Solver Pro capability map
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          Static product concepts for future solving workflows.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <SolverProFeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
