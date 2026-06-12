import {
  dailySnapshot,
  popularGames,
  roadmapProgress,
  solverHealth,
  systemStatus
} from "@/components/command-center/command-center-data";
import { DailySnapshotCard } from "@/components/command-center/daily-snapshot-card";
import { PopularGamesCard } from "@/components/command-center/popular-games-card";
import { RoadmapProgressCard } from "@/components/command-center/roadmap-progress-card";
import { SolverHealthCard } from "@/components/command-center/solver-health-card";
import { SystemStatusCard } from "@/components/command-center/system-status-card";

export function CommandCenterSection() {
  return (
    <section id="command-center" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Command Center
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Monitor the Solver Pro preview ecosystem.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Review static system status, solver health, popular games, daily
              snapshot metrics, and roadmap progress in one command view.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-sky-50/80 to-emerald-50/70 p-5 shadow-lg shadow-slate-900/5">
            <p className="text-sm font-bold text-ink">Static command mode</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              All values are preview data with no AI, database, account, or real
              upload connected.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <SystemStatusCard statuses={systemStatus} />
          <SolverHealthCard solvers={solverHealth} />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <DailySnapshotCard metrics={dailySnapshot} />
          <PopularGamesCard games={popularGames} />
        </div>

        <div className="mt-8">
          <RoadmapProgressCard items={roadmapProgress} />
        </div>
      </div>
    </section>
  );
}
