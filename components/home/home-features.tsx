import { homeFeatures } from "@/components/home/home-data";

export function HomeFeatureCards() {
  return (
    <section className="container-page py-32">
      <div className="grid gap-8 md:grid-cols-3">
        {homeFeatures.map((feature, index) => (
          <article
            key={feature.title}
            className="group rounded-3xl border border-white/40 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-action">
                0{index + 1}
              </span>
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-action to-violet-500 transition-transform duration-300 group-hover:scale-125" />
            </div>
            <h2 className="mt-8 text-2xl font-semibold tracking-tight text-ink transition-all duration-300 group-hover:translate-x-0.5">
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
