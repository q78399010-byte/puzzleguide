import { videoHero, videoPreview } from "@/data/video-data";

export function VideoPreview() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Video Matrix
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            {videoHero.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted sm:text-xl">
            {videoHero.subtitle}
          </p>
          <p className="mt-3 text-base leading-7 text-muted">
            {videoHero.description}
          </p>
        </div>

        <article className="relative isolate overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.18),transparent_18rem),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.16),transparent_18rem)]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
                {videoPreview.label}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                {videoPreview.title}
              </h3>
            </div>
            <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Preview planned
            </span>
          </div>

          <div className="mt-7 grid gap-3">
            {videoPreview.steps.map((step) => (
              <div
                key={step.label}
                className="rounded-3xl border border-white/50 bg-white/80 p-4 shadow-lg shadow-slate-900/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {step.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {videoPreview.details.map((detail) => (
              <div
                key={detail}
                className="rounded-2xl border border-white/50 bg-white/75 px-4 py-3 text-sm font-semibold text-muted"
              >
                {detail}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
