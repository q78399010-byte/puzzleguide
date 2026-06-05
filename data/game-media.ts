export type GameMediaSourceType = "none" | "own" | "youtube" | "placeholder";

export type GameMedia = {
  gameSlug: string;
  levelNumber: number;
  youtubeEmbedUrl: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  gifUrl: string | null;
  sourceType: GameMediaSourceType;
};

export const gameMedia: GameMedia[] = [
  {
    gameSlug: "color-wood-jam",
    levelNumber: 245,
    youtubeEmbedUrl: null,
    imageUrl: "/images/levels/color-wood-jam-level-245.webp",
    imageAlt: "Color Wood Jam Level 245 visual guide",
    gifUrl: null,
    sourceType: "none"
  },
  {
    gameSlug: "screw-jam",
    levelNumber: 311,
    youtubeEmbedUrl: null,
    imageUrl: "/images/levels/screw-jam-level-311.webp",
    imageAlt: "Screw Jam Level 311 visual guide",
    gifUrl: null,
    sourceType: "none"
  },
  {
    gameSlug: "water-sort",
    levelNumber: 245,
    youtubeEmbedUrl: null,
    imageUrl: "/images/levels/water-sort-level-245.webp",
    imageAlt: "Water Sort Level 245 visual guide",
    gifUrl: null,
    sourceType: "none"
  },
  {
    gameSlug: "parking-jam",
    levelNumber: 465,
    youtubeEmbedUrl: null,
    imageUrl: "/images/levels/parking-jam-level-465.webp",
    imageAlt: "Parking Jam Level 465 visual guide",
    gifUrl: null,
    sourceType: "none"
  },
  {
    gameSlug: "ball-sort-puzzle",
    levelNumber: 600,
    youtubeEmbedUrl: null,
    imageUrl: "/images/levels/ball-sort-puzzle-level-600.webp",
    imageAlt: "Ball Sort Puzzle Level 600 visual guide",
    gifUrl: null,
    sourceType: "none"
  }
];

export function getGameMedia(gameSlug: string, levelNumber: number) {
  return gameMedia.find(
    (media) => media.gameSlug === gameSlug && media.levelNumber === levelNumber
  );
}
