import type { AnalyticsCard } from "@/components/solver-pro-advanced/solver-pro-advanced-data";

type SolverProAnalyticsCardProps = {
  card: AnalyticsCard;
};

export function SolverProAnalyticsCard({ card }: SolverProAnalyticsCardProps) {
  return (
    <article className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {card.label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-tight text-ink">
        {card.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        Static demo data for the advanced preview layer.
      </p>
    </article>
  );
}
