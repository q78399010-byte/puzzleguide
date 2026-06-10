import { SearchBox } from "@/components/search-box";

export function SolverHero() {
  return (
    <section className="rounded-3xl border border-white/55 bg-[linear-gradient(135deg,#ffffff_0%,#f3f7ff_48%,#eef4ff_100%)] p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            New Tool
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Block Blast Solver
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Upload a screenshot, inspect the board, and read a static move suggestion
            before you spend another attempt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Static prototype", "No login", "No AI"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 max-w-2xl">
            <SearchBox placeholder="Search Block Blast levels or tips" buttonLabel="Search" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            What it does
          </p>
          <div className="mt-4 grid gap-4">
            {[
              "Reads a static board preview",
              "Highlights the safest next move",
              "Shows combo chance and danger level"
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
