import { solverMatrixPreviews } from "@/components/solver-matrix/solver-matrix-data";
import { SolverPreviewCard } from "@/components/solver-matrix/solver-preview-card";

export function SolverMatrixSection() {
  return (
    <section id="solver-matrix">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Solver Matrix
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Static solver previews for popular puzzle boards
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            A unified homepage preview section with static board states, mock
            move guidance, and responsive cards for six puzzle solvers.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {solverMatrixPreviews.map((preview) => (
            <SolverPreviewCard key={preview.gameName} preview={preview} />
          ))}
        </div>
      </div>
    </section>
  );
}
