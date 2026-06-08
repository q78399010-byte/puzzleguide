import { homeStats } from "@/components/home/home-data";

export function HomeStats() {
  return (
    <section className="container-page py-32">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {homeStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-white/40 bg-white/65 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-2xl"
          >
            <div className="h-2 w-12 rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500" />
            <p className="mt-8 text-5xl font-bold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-3 text-sm font-medium text-muted">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
