import { DailyInsights } from "@/components/workspace/daily-insights";
import { FavoritesCard } from "@/components/workspace/favorites-card";
import { RecentSessionCard } from "@/components/workspace/recent-session-card";
import { RecommendedSolvers } from "@/components/workspace/recommended-solvers";
import {
  dailyInsights,
  favorites,
  recentSessions,
  recommendedSolvers
} from "@/components/workspace/workspace-data";

export function WorkspaceSection() {
  return (
    <section id="workspace-mode" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Workspace Mode
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              A personal puzzle solving workspace preview.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Review recent sessions, favorite solvers, recommended previews,
              and daily insights from static local demo data.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-sky-50/80 to-emerald-50/70 p-5 shadow-lg shadow-slate-900/5">
            <p className="text-sm font-bold text-ink">Static workspace only</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              No login, database, real upload, or saved user data is connected.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Recent Sessions
          </p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {recentSessions.map((session) => (
              <RecentSessionCard key={session.game} session={session} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <FavoritesCard favorites={favorites} />
          <RecommendedSolvers solvers={recommendedSolvers} />
        </div>

        <div className="mt-8">
          <DailyInsights insights={dailyInsights} />
        </div>
      </div>
    </section>
  );
}
