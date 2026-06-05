import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { comparisons } from "@/data/comparisons";
import { games } from "@/data/games";
import { buildGuideSlug, guideTypes } from "@/data/guides";
import { levels } from "@/data/levels";
import { routes } from "@/lib/routes";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puzzleguide.org";

function absolute(path: string) {
  return `${siteUrl}${path}`;
}

const foundationRoutes = [
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absolute(routes.home),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: absolute(routes.games),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: absolute(routes.discover),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: absolute(routes.collections),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: absolute(routes.compare),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: absolute(routes.solver),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: absolute(routes.guide),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.84
    },
    {
      url: absolute(routes.solutions),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.82
    },
    {
      url: absolute(routes.tips),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.82
    },
    {
      url: absolute(routes.walkthroughs),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "weekly",
      priority: 0.82
    },
    ...foundationRoutes.map((path) => ({
      url: absolute(path),
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly" as const,
      priority: 0.55
    }))
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absolute(routes.category(category.slug)),
    lastModified: new Date("2026-06-03"),
    changeFrequency: "weekly",
    priority: 0.7
  }));

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: absolute(routes.game(game.slug)),
    lastModified: new Date(`${game.updatedAt}T00:00:00Z`),
    changeFrequency: "daily",
    priority: 0.85
  }));

  const levelRoutes: MetadataRoute.Sitemap = levels.map((level) => ({
    url: absolute(routes.level(level.gameSlug, level.levelSlug)),
    lastModified: new Date(`${level.updatedAt}T00:00:00Z`),
    changeFrequency: "weekly",
    priority: 0.75
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: absolute(routes.collection(collection.slug)),
    lastModified: new Date("2026-06-03"),
    changeFrequency: "monthly",
    priority: 0.78
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: absolute(routes.comparison(comparison.slug)),
    lastModified: new Date("2026-06-03"),
    changeFrequency: "monthly",
    priority: 0.78
  }));

  const guideRoutes: MetadataRoute.Sitemap = games.flatMap((game) =>
    guideTypes.map((guideType) => ({
      url: absolute(routes.guideDetail(buildGuideSlug(game.slug, guideType.slug))),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.76
    }))
  );

  const programmaticRoutes: MetadataRoute.Sitemap = games.flatMap((game) => [
    {
      url: absolute(routes.solution(game.slug)),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.76
    },
    {
      url: absolute(routes.tip(game.slug)),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.76
    },
    {
      url: absolute(routes.walkthrough(game.slug)),
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.76
    }
  ]);

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...gameRoutes,
    ...levelRoutes,
    ...collectionRoutes,
    ...comparisonRoutes,
    ...guideRoutes,
    ...programmaticRoutes
  ];
}
