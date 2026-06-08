import { homeTimeline } from "@/components/home/home-data";

export function HomeHowItWorks() {
  return (
    <section className="relative isolate overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(59,130,246,0.06),rgba(255,255,255,0.95),rgba(139,92,246,0.08))]" />
      <div className="container-page">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            How It Works
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Three clear moves from search to solved board.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {homeTimeline.map((item, index) => (
            <article
              key={item.step}
              className="relative rounded-2xl border border-white/40 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
                    {item.step}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-action/50 via-slate-200 to-transparent" />
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                    <span className="block h-1.5 w-1.5 rounded-full bg-action" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
                </div>
                <p className="text-base leading-7 text-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
