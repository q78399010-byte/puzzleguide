type AdSlotProps = {
  className?: string;
};

export function AdSlot({ className = "" }: AdSlotProps) {
  return (
    <aside
      className={`rounded-3xl border border-dashed border-white/70 bg-white/60 p-8 text-center shadow-lg shadow-slate-900/5 backdrop-blur-xl ${className}`}
      aria-label="Advertisement"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
        Advertisement
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        Your puzzle game or tool could be here.
      </p>
    </aside>
  );
}
