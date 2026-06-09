import { communityAchievements } from "@/data/community-data";

export function CommunityAchievements() {
  return (
    <section
      id="community-achievements"
      className="rounded-3xl border border-white/55 bg-white/72 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Achievements
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Badge board
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Static badge themes for celebrating progress across puzzle games.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        {communityAchievements.map((achievement) => (
          <div
            key={achievement}
            className="group flex h-32 w-32 items-center justify-center rounded-full border border-white/60 bg-white/80 p-5 text-center shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl"
          >
            <span className="text-sm font-semibold leading-5 text-ink transition-colors duration-300 group-hover:text-action">
              {achievement}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
