type SolverStatCardProps = {
  label: string;
  value: string;
};

export function SolverStatCard({ label, value }: SolverStatCardProps) {
  return (
    <article className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-4 text-4xl font-bold tracking-tight text-ink">
        {value}
      </p>
    </article>
  );
}
