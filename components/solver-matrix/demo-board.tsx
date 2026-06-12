import { AnimatedBoardCell } from "@/components/solver-matrix/animated-board-cell";
import { AnimatedMovePath } from "@/components/solver-matrix/animated-move-path";
import type { DemoStatus } from "@/components/solver-matrix/demo-result-panel";
import { SolverAnimationBadge } from "@/components/solver-matrix/solver-animation-badge";
import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

type DemoBoardProps = {
  preview: SolverPreview;
  phase: DemoStatus;
};

function isHighlighted(
  highlightCells: SolverPreview["highlightCells"],
  rowIndex: number,
  cellIndex: number
) {
  return highlightCells.some(
    ([highlightRow, highlightCell]) =>
      highlightRow === rowIndex && highlightCell === cellIndex
  );
}

function BlockCell({ cell, isActive }: { cell: string; isActive: boolean }) {
  if (!cell) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-sky-200 bg-white/70 shadow-sm">
        {isActive ? (
          <span className="h-8 w-8 animate-pulse rounded-xl bg-gradient-to-br from-action/30 to-violet-400/30" />
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={[
        "flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-white to-violet-100 text-sm font-black text-ink shadow-sm",
        isActive ? "animate-pulse" : ""
      ].join(" ")}
    >
      <span className={isActive ? "animate-pulse" : ""}>{cell}</span>
    </div>
  );
}

function ScrewCell({ cell, isActive }: { cell: string; isActive: boolean }) {
  if (!cell) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-sky-200 bg-white/65 shadow-sm">
        <span className="h-2 w-8 rounded-full bg-sky-100" />
      </div>
    );
  }

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-gradient-to-br from-white to-sky-100 shadow-sm">
      <span
        className={[
          "relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-action to-violet-500 text-[11px] font-black text-white shadow-lg shadow-blue-500/20",
          isActive ? "rotate-12 animate-pulse" : ""
        ].join(" ")}
      >
        <span className="absolute inset-2 rounded-full border border-white/55" />
        {cell}
      </span>
    </div>
  );
}

function GoodsCell({ cell, isActive }: { cell: string; isActive: boolean }) {
  return (
    <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
      <span className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-sky-100" />
      <span className="absolute left-2 right-2 top-2 h-1 rounded-full bg-slate-100" />
      {cell ? (
        <span
          className={[
            "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-violet-100 text-sm font-black text-ink shadow-sm",
            isActive ? "translate-x-1 animate-pulse" : ""
          ].join(" ")}
        >
          {cell}
        </span>
      ) : (
        <span className="h-8 w-8 rounded-xl border border-dashed border-sky-200" />
      )}
    </div>
  );
}

function WaterCell({ cell, isActive }: { cell: string; isActive: boolean }) {
  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/75 shadow-sm">
      <span className="flex h-12 w-8 items-end justify-center overflow-hidden rounded-b-2xl rounded-t-lg border-2 border-sky-200 bg-white p-1">
        {cell ? (
          <span
            className={[
              "flex w-full items-center justify-center rounded-b-xl rounded-t-md bg-gradient-to-t from-action via-sky-400 to-violet-300 text-[10px] font-black text-white transition-all duration-500",
              isActive ? "h-10 animate-pulse" : "h-7"
            ].join(" ")}
          >
            {cell}
          </span>
        ) : (
          <span className={isActive ? "h-2 w-full rounded-full bg-sky-100" : ""} />
        )}
      </span>
    </div>
  );
}

function BusCell({ cell, isActive }: { cell: string; isActive: boolean }) {
  if (!cell) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-sky-200 bg-white/70 shadow-sm">
        {isActive ? (
          <span className="h-3 w-10 animate-pulse rounded-full bg-gradient-to-r from-action/40 to-mint/40" />
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
      <span
        className={[
          "flex h-8 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-action via-sky-500 to-violet-500 text-xs font-black text-white shadow-lg shadow-blue-500/20",
          isActive ? "translate-x-1 animate-pulse" : ""
        ].join(" ")}
      >
        {cell}
      </span>
    </div>
  );
}

function HexaCell({ cell, isActive }: { cell: string; isActive: boolean }) {
  const hexClass = [
    "flex h-10 w-11 items-center justify-center text-xs font-black shadow-sm transition-all duration-300",
    cell
      ? "bg-gradient-to-br from-sky-100 to-violet-200 text-ink"
      : "border border-dashed border-sky-200 bg-sky-50",
    isActive ? "scale-110 animate-pulse" : ""
  ].join(" ");

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
      <span
        className={hexClass}
        style={{
          clipPath:
            "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)"
        }}
      >
        {cell}
      </span>
    </div>
  );
}

function BoardCell({
  boardType,
  cell,
  isActive
}: {
  boardType: SolverPreview["boardType"];
  cell: string;
  isActive: boolean;
}) {
  if (boardType === "screw-jam") {
    return <ScrewCell cell={cell} isActive={isActive} />;
  }

  if (boardType === "goods-sort") {
    return <GoodsCell cell={cell} isActive={isActive} />;
  }

  if (boardType === "water-sort") {
    return <WaterCell cell={cell} isActive={isActive} />;
  }

  if (boardType === "bus-escape") {
    return <BusCell cell={cell} isActive={isActive} />;
  }

  if (boardType === "hexa-sort") {
    return <HexaCell cell={cell} isActive={isActive} />;
  }

  return <BlockCell cell={cell} isActive={isActive} />;
}

export function DemoBoard({ preview, phase }: DemoBoardProps) {
  const showAnimation =
    phase === "scanning" ||
    phase === "detecting" ||
    phase === "calculating" ||
    phase === "preparing" ||
    phase === "result";

  return (
    <section className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/70 p-4 shadow-inner shadow-white/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
          Board Preview
        </p>
        <SolverAnimationBadge
          label={phase === "uploaded" ? "Screenshot ready" : preview.animationLabel}
          isActive={showAnimation}
        />
      </div>

      <div className="relative mt-4 overflow-hidden rounded-3xl">
        <div className="relative z-10 grid gap-2">
          {preview.boardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map((cell, cellIndex) => {
                const isCellActive =
                  showAnimation &&
                  isHighlighted(preview.highlightCells, rowIndex, cellIndex);

                return (
                  <AnimatedBoardCell
                    key={`${rowIndex}-${cellIndex}`}
                    delayIndex={rowIndex + cellIndex}
                    isHighlighted={isCellActive}
                  >
                    <BoardCell
                      boardType={preview.boardType}
                      cell={cell}
                      isActive={isCellActive}
                    />
                  </AnimatedBoardCell>
                );
              })}
            </div>
          ))}
        </div>
        <AnimatedMovePath boardType={preview.boardType} status={phase} />
      </div>
    </section>
  );
}
