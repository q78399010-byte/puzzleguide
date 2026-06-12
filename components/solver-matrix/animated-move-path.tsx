import type { DemoStatus } from "@/components/solver-matrix/demo-result-panel";
import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

type AnimatedMovePathProps = {
  boardType: SolverPreview["boardType"];
  status: DemoStatus;
};

const pathStyles: Record<
  SolverPreview["boardType"],
  { line: string; arrow: string; label: string }
> = {
  "block-blast": {
    line: "left-[12%] top-[20%] h-[58%] w-[62%] rounded-3xl border-2 border-dashed border-action/35",
    arrow: "right-[15%] top-[42%]",
    label: "place"
  },
  "screw-jam": {
    line: "left-[13%] top-[18%] h-[42%] w-[24%] rounded-full border-2 border-dashed border-action/40",
    arrow: "left-[31%] top-[12%]",
    label: "lift"
  },
  "goods-sort": {
    line: "right-[12%] top-[18%] h-[38%] w-[42%] rounded-3xl border-2 border-dashed border-action/35",
    arrow: "right-[29%] top-[12%]",
    label: "swap"
  },
  "water-sort": {
    line: "right-[10%] top-[10%] h-[48%] w-[23%] rounded-full border-2 border-dashed border-action/35",
    arrow: "right-[17%] top-[18%]",
    label: "hold"
  },
  "bus-escape": {
    line: "right-[6%] top-[12%] h-[76%] w-[36%] rounded-r-3xl border-r-4 border-t-4 border-b-4 border-action/40",
    arrow: "right-[2%] top-[43%]",
    label: "exit"
  },
  "hexa-sort": {
    line: "left-[15%] top-[18%] h-[65%] w-[58%] rounded-3xl border-2 border-dashed border-action/35",
    arrow: "left-[58%] top-[58%]",
    label: "link"
  }
};

export function AnimatedMovePath({ boardType, status }: AnimatedMovePathProps) {
  const isVisible =
    status === "scanning" ||
    status === "detecting" ||
    status === "calculating" ||
    status === "preparing" ||
    status === "result";
  const style = pathStyles[boardType];

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 z-20 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      ].join(" ")}
    >
      <span
        className={[
          "absolute bg-action/5 shadow-lg shadow-blue-500/10 transition-transform duration-500",
          isVisible ? "scale-100" : "scale-95",
          style.line
        ].join(" ")}
      />
      <span
        className={[
          "absolute flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-action to-mint text-sm font-black text-white shadow-lg shadow-blue-500/20 animate-pulse",
          style.arrow
        ].join(" ")}
      >
        &gt;
      </span>
      <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-action shadow-sm">
        {style.label}
      </span>
    </div>
  );
}
