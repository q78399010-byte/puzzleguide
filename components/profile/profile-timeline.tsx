import { profileTimeline } from "@/data/profile-data";

export function ProfileTimeline() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
        Timeline
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
        Puzzle journey
      </h2>
      <div className="mt-8 grid gap-6">
        {profileTimeline.map((item, index) => (
          <div key={`${item.title}-${index}`} className="grid grid-cols-[auto_1fr] gap-5">
            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-violet-500 text-xs font-semibold text-white shadow-lg shadow-blue-500/20">
                {item.year}
              </span>
              {index < profileTimeline.length - 1 ? (
                <span className="mt-3 h-10 w-px bg-gradient-to-b from-action/40 to-transparent" />
              ) : null}
            </div>
            <div className="rounded-3xl border border-white/50 bg-white/80 p-5 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
