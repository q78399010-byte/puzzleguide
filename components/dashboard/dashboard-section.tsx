import { DashboardAchievements } from "@/components/dashboard/dashboard-achievements";
import { DashboardActivityFeed } from "@/components/dashboard/dashboard-activity-feed";
import {
  achievements,
  activityFeed,
  overviewMetrics,
  solverProgress,
  trendingGames
} from "@/components/dashboard/dashboard-data";
import { DashboardOverviewCard } from "@/components/dashboard/dashboard-overview-card";
import { DashboardProgressCard } from "@/components/dashboard/dashboard-progress-card";
import { DashboardTrendingGames } from "@/components/dashboard/dashboard-trending-games";

export function DashboardSection() {
  return (
    <section id="dashboard-mode" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Dashboard Mode
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Track solver previews from one dashboard.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Review static solver metrics, progress, trending games,
              achievements, and recent activity without any account or
              database.
            </p>
          </div>
          <span className="w-fit rounded-full bg-gradient-to-r from-action to-mint px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
            Static dashboard
          </span>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <DashboardOverviewCard metrics={overviewMetrics} />
          <DashboardProgressCard progress={solverProgress} />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <DashboardTrendingGames games={trendingGames} />
          <DashboardAchievements achievements={achievements} />
        </div>

        <div className="mt-8">
          <DashboardActivityFeed feed={activityFeed} />
        </div>
      </div>
    </section>
  );
}
