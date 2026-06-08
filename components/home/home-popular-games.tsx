import Link from "next/link";
import { homePopularGames } from "@/components/home/home-data";
import { routes } from "@/lib/routes";

export function HomePopularGames() {
  return (
    <section className="container-page py-24">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Popular Games
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Jump into the boards players search most.
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {homePopularGames.map((game) => (
          <Link
            key={game.slug}
            href={routes.game(game.slug)}
            className="group flex h-full flex-col rounded-2xl border border-white/50 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white hover:shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${game.accent} text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-transform duration-300 group-hover:scale-105`}>
                {game.label}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-ink transition-all duration-300 group-hover:text-action">
                  {game.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                  {game.description}
                </p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <span className="text-sm font-medium text-slate-500">View guide</span>
              <span className="rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:shadow-xl">
                View guide
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
