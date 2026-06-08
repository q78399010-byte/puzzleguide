import { homeFeatures } from "@/components/home/home-data";

export function HomeFeatureCards() {
  return (
    <section className="container-page py-20">
      <div className="grid gap-5 md:grid-cols-3">
        {homeFeatures.map((feature, index) => (
          <article
            key={feature.title}
            className="group flex h-full flex-col rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-violet-500 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
                <span className="text-sm font-semibold">0{index + 1}</span>
              </div>
              <span className="h-2 w-12 rounded-full bg-gradient-to-r from-action/40 via-sky-400/40 to-violet-400/40 transition-all duration-300 group-hover:w-16" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink transition-all duration-300 group-hover:translate-x-0.5">
              {feature.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
