export const communityHero = {
  title: "Puzzle Community",
  subtitle: "Join thousands of puzzle players around the world.",
  description:
    "Share strategies, discover new games, and celebrate achievements."
};

export type CommunityCard = {
  title: string;
  label: string;
  description: string;
  href: string;
};

export const communityCards: CommunityCard[] = [
  {
    title: "Strategy Sharing",
    label: "Strategies",
    description: "Compare routes, move orders, and written walkthrough notes.",
    href: "/walkthroughs"
  },
  {
    title: "Game Discovery",
    label: "Discovery",
    description: "Find puzzle games by category, difficulty, and play style.",
    href: "/games"
  },
  {
    title: "Achievement Moments",
    label: "Badges",
    description: "Celebrate solver milestones with lightweight badge themes.",
    href: "#community-achievements"
  }
];

export const communityStats = [
  { value: "100K+", label: "Players" },
  { value: "30+", label: "Games" },
  { value: "1400+", label: "Walkthroughs" },
  { value: "24/7", label: "Free Access" }
];

export const communityTopGames: CommunityCard[] = [
  {
    title: "Color Wood Jam",
    label: "Wood Puzzle",
    description: "Plan exits, blockers, and compact color routes.",
    href: "/games/color-wood-jam"
  },
  {
    title: "Screw Jam",
    label: "Mechanical",
    description: "Solve tray limits, screw order, and hidden blockers.",
    href: "/games/screw-jam"
  },
  {
    title: "Water Sort",
    label: "Sorting",
    description: "Build clean color stacks with fewer wasted moves.",
    href: "/games/water-sort"
  },
  {
    title: "Bus Escape",
    label: "Traffic",
    description: "Explore route-planning puzzles and escape-style guides.",
    href: "/games"
  },
  {
    title: "Parking Jam",
    label: "Traffic",
    description: "Clear tight boards by opening exits in the right order.",
    href: "/games/parking-jam"
  },
  {
    title: "Goods Sort",
    label: "Sorting",
    description: "Group shelves, match item sets, and keep lanes open.",
    href: "/games/goods-sort"
  }
];

export const communityAchievements = [
  "First Solver",
  "Board Master",
  "Puzzle Explorer",
  "Speed Runner",
  "Strategist",
  "Collector"
];

export const communityFaq = [
  {
    question: "What is Puzzle Community?",
    answer:
      "Puzzle Community is a static homepage section for strategy themes, popular games, achievement badges, and free walkthrough discovery."
  },
  {
    question: "Do I need an account?",
    answer:
      "No. This Community Matrix works without accounts, sign-in, user profiles, or a connected database."
  },
  {
    question: "Can I share achievements?",
    answer:
      "Yes. The badge themes are designed as lightweight achievement ideas players can reference when celebrating puzzle progress."
  },
  {
    question: "Will comments be added?",
    answer:
      "Comments are not part of this version. Future discussion features would need separate moderation and product work."
  },
  {
    question: "Is Community free?",
    answer:
      "Yes. Community links point to free puzzle pages, game hubs, and written walkthroughs."
  }
];
