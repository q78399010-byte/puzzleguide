const workspaceSnapshot = [
  { label: "Recent session", value: "Block Blast route review" },
  { label: "Saved focus", value: "Clear center first" },
  { label: "Recommended guide", value: "Water Sort safe pours" }
];

const activityFeed = [
  { time: "Today", action: "Viewed Color Wood Jam guide hub" },
  { time: "Today", action: "Checked Screw Jam tray strategy" },
  { time: "Yesterday", action: "Compared Water Sort cleanup notes" },
  { time: "Yesterday", action: "Opened Bus Escape route tips" }
];

const systemStatus = [
  { label: "Static export", value: "Stable" },
  { label: "FAQ schema", value: "Covered" },
  { label: "Guide index", value: "Ready" }
];

const insightSummary = [
  { label: "Common risk", value: "Low space" },
  { label: "Top strategy", value: "Clear center first" },
  { label: "Useful pattern", value: "Hold one buffer" }
];

const intelligencePreview = [
  "Pattern library",
  "Confidence labels",
  "Risk grouping",
  "Strategy summaries"
];

export function ProductOperatingSystem() {
  return (
    <section
      id="product-operating-system"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f7ff_48%,#ffffff_100%)] py-24"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Product Operating System
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Workspace, dashboard, command, insights, and intelligence in one
              static operating view.
            </h2>
          </div>
          <p className="text-base leading-8 text-muted">
            The homepage now presents one product surface with snapshot cards,
            activity, status, insight summaries, and pattern previews.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(232,243,255,0.76),rgba(243,255,250,0.72))] p-7 shadow-card backdrop-blur-xl lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                  Workspace Snapshot
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                  Current puzzle focus.
                </h3>
              </div>
              <span className="w-fit rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
                Static preview
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {workspaceSnapshot.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-bold leading-6 text-ink">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/60 bg-white/75 p-7 shadow-soft backdrop-blur-xl lg:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              System Status
            </p>
            <div className="mt-6 grid gap-4">
              {systemStatus.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-white/60 bg-white/68 px-5 py-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                >
                  <span className="text-sm font-bold text-ink">{item.label}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-mint">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-white/60 bg-white/75 p-7 shadow-soft backdrop-blur-xl lg:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Activity Feed
            </p>
            <div className="mt-6 space-y-4">
              {activityFeed.map((item) => (
                <div
                  key={`${item.time}-${item.action}`}
                  className="rounded-3xl border border-white/60 bg-white/68 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    {item.time}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-ink">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(236,246,255,0.76),rgba(245,255,250,0.72))] p-7 shadow-card backdrop-blur-xl lg:p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                  Insights Summary
                </p>
                <div className="mt-6 grid gap-4">
                  {insightSummary.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-white/60 bg-white/68 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                        {item.label}
                      </p>
                      <p className="mt-3 text-xl font-bold tracking-tight text-ink">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                  Intelligence Preview
                </p>
                <div className="mt-6 grid gap-4">
                  {intelligencePreview.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/68 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
