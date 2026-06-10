type StrategyCardProps = {
  value?: string;
};

export function StrategyCard({ value = "Create space in the center" }: StrategyCardProps) {
  return (
    <article className="rounded-3xl border border-white/55 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
        Next Strategy
      </p>
      <p className="mt-4 text-2xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted">
        Open the middle so the next shape has more than one landing option.
      </p>
    </article>
  );
}
