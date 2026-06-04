type AdSlotProps = {
  className?: string;
};

export function AdSlot({ className = "" }: AdSlotProps) {
  return (
    <aside
      className={`rounded-2xl border border-dashed border-line bg-paper p-5 text-center ${className}`}
      aria-label="Advertisement"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
        Advertisement
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        Your puzzle game or tool could be here.
      </p>
    </aside>
  );
}
