import { CommunityCard } from "@/components/community/community-card";
import { communityTopGames } from "@/data/community-data";

export function CommunityTopGames() {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/72 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Top Games
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Popular puzzle hubs
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          The Community Matrix highlights games players return to for strategy,
          walkthroughs, and discovery.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {communityTopGames.map((game, index) => (
          <CommunityCard key={game.title} item={game} index={index} />
        ))}
      </div>
    </section>
  );
}
