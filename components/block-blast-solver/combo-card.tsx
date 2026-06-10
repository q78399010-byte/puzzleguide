type ComboCardProps = {
  value?: string;
};

export function ComboCard({ value = "72%" }: ComboCardProps) {
  return (
    <article className="rounded-3xl border border-white/55 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
        Combo Chance
      </p>
      <p className="mt-4 text-4xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted">
        A clean setup can create back-to-back clears on the next turn.
      </p>
    </article>
  );
}
