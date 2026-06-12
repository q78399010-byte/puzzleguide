type SolverProLockupProps = {
  items: string[];
};

export function SolverProLockup({ items }: SolverProLockupProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-bold text-ink shadow-lg shadow-slate-900/5 backdrop-blur-xl"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
