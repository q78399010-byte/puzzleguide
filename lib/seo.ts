import type { Metadata } from "next";
import type { Game } from "@/data/games";
import type { LevelGuide } from "@/data/levels";
import { routes } from "@/lib/routes";

const siteName = "PuzzleMaster";

export function gameMetadata(game: Game): Metadata {
  const title = `${game.name} Walkthrough, Levels & Tips | ${siteName}`;
  const tagText = game.tags.slice(0, 3).join(", ");
  const description = `${game.name} ${game.categoryName} walkthrough hub for ${tagText}. Find solution pages, level guide notes, tips, and common stuck level help for ${game.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: routes.game(game.slug)
    },
    openGraph: {
      title,
      description,
      url: routes.game(game.slug),
      type: "article"
    }
  };
}

export function levelMetadata(level: LevelGuide): Metadata {
  const title = `${level.gameName} Level ${level.levelNumber} Solution & Walkthrough | ${siteName}`;
  const description = `${level.gameName} Level ${level.levelNumber} walkthrough and solution for ${level.difficulty.toLowerCase()} difficulty. Read the step-by-step level guide, pro tips, common mistakes, FAQ, and related levels.`;

  return {
    title,
    description,
    alternates: {
      canonical: routes.level(level.gameSlug, level.levelSlug)
    },
    openGraph: {
      title,
      description,
      url: routes.level(level.gameSlug, level.levelSlug),
      type: "article"
    }
  };
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00Z`));
}
