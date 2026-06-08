import { homeStats } from "@/components/home/home-data";

export function HomeStats() {
  return (
    <section className="container-page py-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homeStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-white/40 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-action via-sky-500 to-violet-500 shadow-lg shadow-blue-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-action/30 via-sky-300/30 to-violet-300/30" />
            </div>
            <p className="mt-6 text-4xl font-bold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
