import { profileBadges } from "@/data/profile-data";

export function ProfileBadges() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
        Badges
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Achievement badges
      </h2>
      <div className="mt-8 flex flex-wrap gap-4">
        {profileBadges.map((badge) => (
          <div
            key={badge}
            className="group flex h-28 w-28 items-center justify-center rounded-full border border-white/60 bg-white/80 p-4 text-center shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="text-sm font-semibold leading-5 text-ink transition-colors duration-300 group-hover:text-action">
              {badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
