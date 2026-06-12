type SolverFeaturePillProps = {
  label: string;
};

export function SolverFeaturePill({ label }: SolverFeaturePillProps) {
  return (
    <span className="inline-flex rounded-full border border-sky-100 bg-white/75 px-3 py-1 text-xs font-bold text-muted shadow-sm shadow-slate-900/5 transition-all duration-300 group-hover:border-sky-200 group-hover:bg-sky-50/80 group-hover:text-action">
      {label}
    </span>
  );
}
