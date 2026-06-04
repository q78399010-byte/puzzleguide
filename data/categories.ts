export type GameCategory = {
  slug: string;
  name: string;
  description: string;
};

export const categories: GameCategory[] = [
  {
    slug: "wood-puzzle",
    name: "Wood Puzzle",
    description: "Wood block, tray, and packing puzzle games with level-by-level solutions."
  },
  {
    slug: "sorting",
    name: "Sorting",
    description: "Bottle, color, and item sorting games with practical move guides."
  },
  {
    slug: "mechanical",
    name: "Mechanical",
    description: "Screws, pins, arrows, and movement puzzles with careful step planning."
  },
  {
    slug: "block",
    name: "Block Puzzle",
    description: "Block clearing and board management games for high score and level play."
  }
];
