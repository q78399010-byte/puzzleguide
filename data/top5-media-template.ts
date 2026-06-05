export type Top5MediaTemplateItem = {
  gameSlug: string;
  levelNumber: number;
  levelSlug: string;
  pagePath: string;
  recommendedImagePath: string;
  recommendedGifPath: string;
  youtubeEmbedUrl: string | null;
  sourceType: "none" | "own" | "youtube" | "placeholder";
  status: "waiting-for-owned-or-authorized-media";
  notes: string;
};

export const top5MediaTemplate: Top5MediaTemplateItem[] = [
  {
    gameSlug: "color-wood-jam",
    levelNumber: 245,
    levelSlug: "level-245",
    pagePath: "/games/color-wood-jam/levels/level-245",
    recommendedImagePath: "/images/levels/color-wood-jam-level-245.webp",
    recommendedGifPath: "/gifs/levels/color-wood-jam-level-245.gif",
    youtubeEmbedUrl: null,
    sourceType: "none",
    status: "waiting-for-owned-or-authorized-media",
    notes: "Add only owned screenshots, owned GIFs, or authorized YouTube embed URLs."
  },
  {
    gameSlug: "screw-jam",
    levelNumber: 311,
    levelSlug: "level-311",
    pagePath: "/games/screw-jam/levels/level-311",
    recommendedImagePath: "/images/levels/screw-jam-level-311.webp",
    recommendedGifPath: "/gifs/levels/screw-jam-level-311.gif",
    youtubeEmbedUrl: null,
    sourceType: "none",
    status: "waiting-for-owned-or-authorized-media",
    notes: "Add only owned screenshots, owned GIFs, or authorized YouTube embed URLs."
  },
  {
    gameSlug: "water-sort",
    levelNumber: 245,
    levelSlug: "level-245",
    pagePath: "/games/water-sort/levels/level-245",
    recommendedImagePath: "/images/levels/water-sort-level-245.webp",
    recommendedGifPath: "/gifs/levels/water-sort-level-245.gif",
    youtubeEmbedUrl: null,
    sourceType: "none",
    status: "waiting-for-owned-or-authorized-media",
    notes: "Add only owned screenshots, owned GIFs, or authorized YouTube embed URLs."
  },
  {
    gameSlug: "parking-jam",
    levelNumber: 465,
    levelSlug: "level-465",
    pagePath: "/games/parking-jam/levels/level-465",
    recommendedImagePath: "/images/levels/parking-jam-level-465.webp",
    recommendedGifPath: "/gifs/levels/parking-jam-level-465.gif",
    youtubeEmbedUrl: null,
    sourceType: "none",
    status: "waiting-for-owned-or-authorized-media",
    notes: "Add only owned screenshots, owned GIFs, or authorized YouTube embed URLs."
  },
  {
    gameSlug: "ball-sort-puzzle",
    levelNumber: 600,
    levelSlug: "level-600",
    pagePath: "/games/ball-sort-puzzle/levels/level-600",
    recommendedImagePath: "/images/levels/ball-sort-puzzle-level-600.webp",
    recommendedGifPath: "/gifs/levels/ball-sort-puzzle-level-600.gif",
    youtubeEmbedUrl: null,
    sourceType: "none",
    status: "waiting-for-owned-or-authorized-media",
    notes: "Add only owned screenshots, owned GIFs, or authorized YouTube embed URLs."
  }
];
