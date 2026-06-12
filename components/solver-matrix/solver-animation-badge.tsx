type SolverAnimationBadgeProps = {
  label: string;
  isActive: boolean;
};

export function SolverAnimationBadge({
  label,
  isActive
}: SolverAnimationBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-all duration-300",
        isActive
          ? "bg-gradient-to-r from-action via-sky-500 to-violet-500 text-white shadow-blue-500/20"
          : "bg-white text-muted"
      ].join(" ")}
    >
      {label}
    </span>
  );
}
