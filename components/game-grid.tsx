import type { Game } from "@/data/games";
import { GameCard } from "@/components/game-card";

type GameGridProps = {
  games: Game[];
  compact?: boolean;
};

export function GameGrid({ games, compact = false }: GameGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.slug} game={game} compact={compact} />
      ))}
    </div>
  );
}
