import { profileStats } from "@/data/profile-data";

export function ProfileStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {profileStats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-violet-500 shadow-lg shadow-blue-500/20">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="h-1.5 w-14 rounded-full bg-gradient-to-r from-action/30 via-sky-300/30 to-violet-300/30" />
          </div>
          <p className="text-4xl font-bold tracking-tight text-ink">
            {stat.value}
          </p>
          <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}
