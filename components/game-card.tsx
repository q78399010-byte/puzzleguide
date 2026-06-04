import Link from "next/link";
import type { Game } from "@/data/games";
import { routes } from "@/lib/routes";

type GameCardProps = {
  game: Game;
  compact?: boolean;
};

export function GameCard({ game, compact = false }: GameCardProps) {
  return (
    <Link
      href={routes.game(game.slug)}
      className="group content-card block overflow-hidden transition hover:-translate-y-1 hover:shadow-card"
    >
      <div
        className={`game-art ${compact ? "h-24" : "h-36"}`}
        style={{
          background: `linear-gradient(135deg, ${game.color}, #eef4fb 145%)`
        }}
      >
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink">
          {game.categoryName}
        </div>
        <div className="absolute bottom-5 right-5 text-right text-4xl font-black text-white/90">
          {game.name.slice(0, 1)}
        </div>
      </div>
      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-black text-ink group-hover:text-action">
            {game.name}
          </h3>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-mint">
            {game.popularity}
          </span>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
          {game.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-muted">
          <span>{game.guideCount} guides</span>
          <span>-</span>
          <span>{game.totalLevels}+ levels</span>
        </div>
      </div>
    </Link>
  );
}
