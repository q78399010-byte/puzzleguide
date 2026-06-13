const featureGrid = [
  {
    title: "Move Planning",
    description:
      "Preview the next useful move with board focus, risk, and cleanup notes."
  },
  {
    title: "Risk Reading",
    description:
      "Call out low space, blocked paths, crowded trays, and late-board traps."
  },
  {
    title: "Strategy Notes",
    description:
      "Convert puzzle states into short written guidance players can follow."
  },
  {
    title: "Game Coverage",
    description:
      "Support the core solver set from block, sort, route, tray, and hex boards."
  }
];

const metrics = [
  { value: "6", label: "Core solver types" },
  { value: "24", label: "Static guide signals" },
  { value: "5", label: "Use case groups" },
  { value: "4", label: "Roadmap previews" }
];

const useCases = [
  "Find a safer opening move",
  "Recover a crowded board",
  "Compare solver patterns",
  "Plan a cleaner finish",
  "Choose the right guide type"
];

const testimonials = [
  {
    quote: "The short risk labels make it easier to decide what to read first.",
    name: "Daily puzzle player"
  },
  {
    quote: "The solver cards feel direct enough for quick stuck-level checks.",
    name: "Guide reader"
  }
];

const roadmap = [
  "More board examples",
  "Cleaner route summaries",
  "Expanded game coverage",
  "Stronger written tips"
];

export function SolverSuite() {
  return (
    <section
      id="solver-suite"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f6fff9_46%,#ffffff_100%)] py-24"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Solver Suite
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Solver Pro and advanced previews, simplified into one suite.
            </h2>
          </div>
          <p className="text-base leading-8 text-muted">
            Feature cards, proof points, use cases, reader notes, and roadmap
            items now live in one static product section.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur-xl"
            >
              <p className="text-4xl font-bold tracking-tight text-ink">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {featureGrid.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-white/60 bg-white/75 p-7 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {feature.title.slice(0, 1)}
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-6">
            <section className="rounded-3xl border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(235,246,255,0.74),rgba(245,255,250,0.7))] p-7 shadow-card backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                Use Cases
              </p>
              <div className="mt-6 grid gap-3">
                {useCases.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/60 bg-white/68 px-5 py-4 text-sm font-bold text-ink shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/60 bg-white/75 p-7 shadow-soft backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                Reader Notes
              </p>
              <div className="mt-6 grid gap-4">
                {testimonials.map((item) => (
                  <figure
                    key={item.name}
                    className="rounded-3xl border border-white/60 bg-white/68 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                  >
                    <blockquote className="text-sm font-semibold leading-7 text-ink">
                      {item.quote}
                    </blockquote>
                    <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                      {item.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-white/60 bg-white/75 p-7 shadow-soft backdrop-blur-xl lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                Roadmap Preview
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                Focused improvements for written solver guidance.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[520px]">
              {roadmap.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gradient-to-r from-action/10 via-sky-100 to-emerald-100 px-4 py-3 text-center text-sm font-bold text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
