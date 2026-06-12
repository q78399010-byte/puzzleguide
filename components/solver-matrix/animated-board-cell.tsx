import type { ReactNode } from "react";

type AnimatedBoardCellProps = {
  isHighlighted: boolean;
  children: ReactNode;
};

export function AnimatedBoardCell({
  isHighlighted,
  children
}: AnimatedBoardCellProps) {
  return (
    <div
      className={[
        "relative rounded-2xl transition-all duration-300",
        isHighlighted
          ? "scale-[1.03] ring-4 ring-blue-200/80 shadow-xl shadow-blue-500/20"
          : ""
      ].join(" ")}
    >
      {isHighlighted ? (
        <span className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-action via-sky-400 to-violet-400 opacity-30 blur-sm animate-pulse" />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
