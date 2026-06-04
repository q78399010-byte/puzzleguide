import { collections } from "@/data/collections";
import { comparisons } from "@/data/comparisons";
import { games } from "@/data/games";

export function getRecommendedGames(gameSlug: string, limit = 4) {
  const game = games.find((candidate) => candidate.slug === gameSlug);

  if (!game) {
    return [];
  }

  return game.relatedGames
    .map((slug) => games.find((candidate) => candidate.slug === slug))
    .filter((candidate) => candidate !== undefined)
    .slice(0, limit);
}

export function getTrendingDiscoveryGames(limit = 6) {
  return [...games].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getComparisonBySlug(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export function getGamesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => games.find((game) => game.slug === slug))
    .filter((game) => game !== undefined);
}

export function getRelatedCollections(slugs: string[], limit = 4) {
  return slugs
    .map((slug) => getCollectionBySlug(slug))
    .filter((collection) => collection !== undefined)
    .slice(0, limit);
}

export function getRelatedComparisons(slugs: string[], limit = 4) {
  return slugs
    .map((slug) => getComparisonBySlug(slug))
    .filter((comparison) => comparison !== undefined)
    .slice(0, limit);
}
