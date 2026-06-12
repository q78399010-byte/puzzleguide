type SolverProBadgeProps = {
  label: string;
};

export function SolverProBadge({ label }: SolverProBadgeProps) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-bold text-ink shadow-sm shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
      {label}
    </span>
  );
}
