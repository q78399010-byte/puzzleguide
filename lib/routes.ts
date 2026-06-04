export const routes = {
  home: "/",
  games: "/games",
  guides: "/games",
  discover: "/discover",
  collections: "/collections",
  compare: "/compare",
  solver: "/solver",
  guide: "/guide",
  solutions: "/solutions",
  tips: "/tips",
  walkthroughs: "/walkthroughs",
  search: "/search",
  game: (gameSlug: string) => `/games/${gameSlug}`,
  level: (gameSlug: string, levelSlug: string) =>
    `/games/${gameSlug}/levels/${levelSlug}`,
  category: (categorySlug: string) => `/categories/${categorySlug}`,
  collection: (collectionSlug: string) => `/collections/${collectionSlug}`,
  comparison: (compareSlug: string) => `/compare/${compareSlug}`,
  guideDetail: (guideSlug: string) => `/guide/${guideSlug}`,
  solution: (gameSlug: string) => `/solutions/${gameSlug}`,
  tip: (gameSlug: string) => `/tips/${gameSlug}`,
  walkthrough: (gameSlug: string) => `/walkthroughs/${gameSlug}`
};
