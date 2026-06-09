const solverSteps = [
  { label: "Step 1", title: "Open shelf space" },
  { label: "Step 2", title: "Group crowded items" },
  { label: "Step 3", title: "Clear matching shelves" },
  { label: "Step 4", title: "Keep one lane open" }
];

const solverStats = [
  { label: "Difficulty", value: "Medium" },
  { label: "Moves", value: "20" },
  { label: "Estimated Time", value: "3 min" },
  { label: "Success Rate", value: "69%" }
];

export function GoodsSortSolver() {
  return (
    <section className="mt-8 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Solver v2
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Static solver preview
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            A simple four-step solving pattern for Goods Sort boards. This is
            static guidance and does not connect to player data or live game
            state.
          </p>
        </div>

        <div className="grid gap-4">
          {solverSteps.map((step) => (
            <article
              key={step.label}
              className="group rounded-3xl border border-white/55 bg-white/82 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white hover:shadow-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
                {step.label}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                {step.title}
              </h3>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solverStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-white/55 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </p>
            <p className="mt-4 text-4xl font-bold tracking-tight text-ink">
              {stat.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
