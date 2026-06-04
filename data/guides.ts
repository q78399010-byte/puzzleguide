import type { Game } from "@/data/games";

export type GuideType = {
  slug: "beginner" | "advanced" | "hard-levels" | "walkthroughs";
  title: string;
  hubTitle: string;
  description: string;
};

export const guideTypes: GuideType[] = [
  {
    slug: "beginner",
    title: "Beginner Guide",
    hubTitle: "Beginner Guides",
    description:
      "Starter-friendly puzzle guides with opening moves, basic mistakes, and easy level planning."
  },
  {
    slug: "advanced",
    title: "Advanced Strategy Guide",
    hubTitle: "Advanced Strategy Guides",
    description:
      "Advanced puzzle strategy pages focused on hard blockers, planning depth, and late-level cleanup."
  },
  {
    slug: "hard-levels",
    title: "Hard Level Guide",
    hubTitle: "Hard Level Guides",
    description:
      "Hard-level guide pages for difficult boards, stuck levels, and exact move-order walkthroughs."
  },
  {
    slug: "walkthroughs",
    title: "Walkthrough Collection",
    hubTitle: "Level Walkthrough Collections",
    description:
      "Walkthrough collection pages that connect game hubs, related levels, tips, and solution paths."
  }
];

export function buildGuideSlug(gameSlug: string, guideTypeSlug: GuideType["slug"]) {
  return `${gameSlug}-${guideTypeSlug}`;
}

export function parseGuideSlug(guideSlug: string) {
  const guideType = [...guideTypes]
    .sort((a, b) => b.slug.length - a.slug.length)
    .find((type) => guideSlug.endsWith(`-${type.slug}`));

  if (!guideType) {
    return undefined;
  }

  return {
    gameSlug: guideSlug.slice(0, -guideType.slug.length - 1),
    guideType
  };
}

export function guideTitle(game: Game, guideType: GuideType) {
  if (guideType.slug === "beginner") {
    return `Beginner Guide: ${game.name} Levels`;
  }

  if (guideType.slug === "advanced") {
    return `Advanced Strategy Guide: ${game.name}`;
  }

  if (guideType.slug === "hard-levels") {
    return `${game.name} Hard Level Guide`;
  }

  return `${game.name} Walkthrough Collection`;
}
