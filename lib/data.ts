import { categories } from "@/data/categories";
import { games } from "@/data/games";
import { levels } from "@/data/levels";

export function getAllGames() {
  return games;
}

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getGamesByCategory(categorySlug: string) {
  return games.filter((game) => game.categorySlug === categorySlug);
}

export function getLevelsByGame(gameSlug: string) {
  return levels
    .filter((level) => level.gameSlug === gameSlug)
    .sort((a, b) => b.levelNumber - a.levelNumber);
}

export function getLevelBySlug(gameSlug: string, levelSlug: string) {
  return levels.find(
    (level) =>
      level.gameSlug === gameSlug &&
      (level.levelSlug === levelSlug || level.slug === levelSlug)
  );
}

export function getLatestLevels(limit = 8) {
  return [...levels]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export function getPopularLevels(limit = 8, gameSlug?: string) {
  return [...levels]
    .filter((level) => (gameSlug ? level.gameSlug === gameSlug : true))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getTrendingLevels(limit = 8) {
  return [...levels]
    .sort((a, b) => {
      const dateScore = b.updatedAt.localeCompare(a.updatedAt);

      if (dateScore !== 0) {
        return dateScore;
      }

      return b.views - a.views;
    })
    .slice(0, limit);
}

export function getRelatedGames(gameSlug: string, limit = 3) {
  const game = getGameBySlug(gameSlug);
  if (!game) {
    return [];
  }

  const explicitRelated = game.relatedGames
    .map((slug) => getGameBySlug(slug))
    .filter((candidate) => candidate !== undefined);

  if (explicitRelated.length) {
    return explicitRelated.slice(0, limit);
  }

  return games
    .filter((candidate) => candidate.slug !== gameSlug)
    .sort((a, b) => {
      if (a.categorySlug === game.categorySlug && b.categorySlug !== game.categorySlug) {
        return -1;
      }

      if (b.categorySlug === game.categorySlug && a.categorySlug !== game.categorySlug) {
        return 1;
      }

      return b.popularity - a.popularity;
    })
    .slice(0, limit);
}

export function getRelatedLevels(gameSlug: string, levelNumber: number, limit = 4) {
  const currentLevel = levels.find(
    (level) => level.gameSlug === gameSlug && level.levelNumber === levelNumber
  );

  if (currentLevel?.relatedLevels.length) {
    return currentLevel.relatedLevels
      .map((slug) => getLevelBySlug(gameSlug, slug))
      .filter((level) => level !== undefined)
      .slice(0, limit);
  }

  return getLevelsByGame(gameSlug)
    .filter((level) => level.levelNumber !== levelNumber)
    .sort(
      (a, b) =>
        Math.abs(a.levelNumber - levelNumber) -
        Math.abs(b.levelNumber - levelNumber)
    )
    .slice(0, limit);
}
