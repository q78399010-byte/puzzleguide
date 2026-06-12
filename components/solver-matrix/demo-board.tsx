import type { SolverPreview } from "@/components/solver-matrix/solver-matrix-data";

type DemoBoardProps = {
  preview: SolverPreview;
};

function EmptyCell() {
  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-sm" />
  );
}

function BlockCell({ cell }: { cell: string }) {
  if (!cell) {
    return <EmptyCell />;
  }

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-white to-violet-100 text-sm font-black text-ink shadow-sm">
      {cell}
    </div>
  );
}

function ScrewCell({ cell }: { cell: string }) {
  if (!cell) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-sky-200 bg-white/65 shadow-sm">
        <span className="h-2 w-8 rounded-full bg-sky-100" />
      </div>
    );
  }

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-gradient-to-br from-white to-sky-100 shadow-sm">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-action to-violet-500 text-[11px] font-black text-white shadow-lg shadow-blue-500/20">
        {cell}
      </span>
    </div>
  );
}

function GoodsCell({ cell }: { cell: string }) {
  return (
    <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
      <span className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-sky-100" />
      {cell ? (
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-violet-100 text-sm font-black text-ink shadow-sm">
          {cell}
        </span>
      ) : (
        <span className="h-8 w-8 rounded-xl border border-dashed border-sky-200" />
      )}
    </div>
  );
}

function WaterCell({ cell }: { cell: string }) {
  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/75 shadow-sm">
      <span className="flex h-11 w-7 items-end justify-center rounded-b-2xl rounded-t-lg border-2 border-sky-200 bg-white p-1">
        {cell ? (
          <span className="flex h-7 w-full items-center justify-center rounded-b-xl rounded-t-md bg-gradient-to-t from-action to-sky-300 text-[10px] font-black text-white">
            {cell}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function BusCell({ cell }: { cell: string }) {
  if (!cell) {
    return <EmptyCell />;
  }

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
      <span className="flex h-8 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-action via-sky-500 to-violet-500 text-xs font-black text-white shadow-lg shadow-blue-500/20">
        {cell}
      </span>
    </div>
  );
}

function HexaCell({ cell }: { cell: string }) {
  if (!cell) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-sm">
        <span
          className="h-9 w-10 border border-dashed border-sky-200 bg-sky-50"
          style={{
            clipPath:
              "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)"
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
      <span
        className="flex h-10 w-11 items-center justify-center bg-gradient-to-br from-sky-100 to-violet-200 text-xs font-black text-ink shadow-sm"
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
  cell
}: {
  boardType: SolverPreview["boardType"];
  cell: string;
}) {
  if (boardType === "screw-jam") {
    return <ScrewCell cell={cell} />;
  }

  if (boardType === "goods-sort") {
    return <GoodsCell cell={cell} />;
  }

  if (boardType === "water-sort") {
    return <WaterCell cell={cell} />;
  }

  if (boardType === "bus-escape") {
    return <BusCell cell={cell} />;
  }

  if (boardType === "hexa-sort") {
    return <HexaCell cell={cell} />;
  }

  return <BlockCell cell={cell} />;
}

export function DemoBoard({ preview }: DemoBoardProps) {
  return (
    <section className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/70 p-4 shadow-inner shadow-white/70">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
          Board Preview
        </p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-muted shadow-sm">
          Demo
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        {preview.boardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((cell, cellIndex) => (
              <BoardCell
                key={`${rowIndex}-${cellIndex}`}
                boardType={preview.boardType}
                cell={cell}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
