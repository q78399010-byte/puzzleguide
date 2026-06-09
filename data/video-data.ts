export const videoHero = {
  title: "Video Walkthroughs",
  subtitle: "Watch quick puzzle walkthrough previews before you play.",
  description: "Short visual guides for popular puzzle levels."
};

export const videoPreview = {
  title: "Color Wood Jam Level 245",
  label: "Walkthrough Preview",
  steps: [
    { label: "Step 1", text: "Clear center lane" },
    { label: "Step 2", text: "Move blockers first" },
    { label: "Step 3", text: "Open exit path" }
  ],
  details: ["Preview", "2 min", "Beginner", "No video added yet"]
};

export type VideoMatrixItem = {
  id: string;
  gameSlug: string;
  gameName: string;
  levelNumber: number;
  title: string;
  status: "coming-soon";
  duration: string;
  type: "Walkthrough";
  pagePath: string;
  notes: string;
};

export const videoItems: VideoMatrixItem[] = [
  {
    id: "color-wood-jam-level-245",
    gameSlug: "color-wood-jam",
    gameName: "Color Wood Jam",
    levelNumber: 245,
    title: "Color Wood Jam Level 245",
    status: "coming-soon",
    duration: "2 min",
    type: "Walkthrough",
    pagePath: "/games/color-wood-jam/levels/level-245",
    notes: "Visual walkthrough planned. No third-party video added."
  },
  {
    id: "screw-jam-level-311",
    gameSlug: "screw-jam",
    gameName: "Screw Jam",
    levelNumber: 311,
    title: "Screw Jam Level 311",
    status: "coming-soon",
    duration: "2 min",
    type: "Walkthrough",
    pagePath: "/games/screw-jam/levels/level-311",
    notes: "Visual walkthrough planned. No third-party video added."
  },
  {
    id: "water-sort-level-245",
    gameSlug: "water-sort",
    gameName: "Water Sort",
    levelNumber: 245,
    title: "Water Sort Level 245",
    status: "coming-soon",
    duration: "2 min",
    type: "Walkthrough",
    pagePath: "/games/water-sort/levels/level-245",
    notes: "Visual walkthrough planned. No third-party video added."
  },
  {
    id: "ball-sort-puzzle-level-600",
    gameSlug: "ball-sort-puzzle",
    gameName: "Ball Sort Puzzle",
    levelNumber: 600,
    title: "Ball Sort Puzzle Level 600",
    status: "coming-soon",
    duration: "2 min",
    type: "Walkthrough",
    pagePath: "/games/ball-sort-puzzle/levels/level-600",
    notes: "Visual walkthrough planned. No third-party video added."
  },
  {
    id: "bus-escape-level-88",
    gameSlug: "bus-escape",
    gameName: "Bus Escape",
    levelNumber: 88,
    title: "Bus Escape Level 88",
    status: "coming-soon",
    duration: "2 min",
    type: "Walkthrough",
    pagePath: "/games",
    notes: "Visual walkthrough planned. No third-party video added."
  },
  {
    id: "parking-jam-level-465",
    gameSlug: "parking-jam",
    gameName: "Parking Jam",
    levelNumber: 465,
    title: "Parking Jam Level 465",
    status: "coming-soon",
    duration: "2 min",
    type: "Walkthrough",
    pagePath: "/games/parking-jam/levels/level-465",
    notes: "Visual walkthrough planned. No third-party video added."
  }
];

export const videoFaq = [
  {
    question: "Why are video walkthroughs useful?",
    answer:
      "The current Video Matrix is a preview section that shows how short visual walkthroughs could support written puzzle guides."
  },
  {
    question: "Are the videos free?",
    answer:
      "The current preview section is free. Future owned or authorized videos and GIF guides can be added without changing access to written walkthroughs."
  },
  {
    question: "Do you use third-party videos?",
    answer:
      "No. This static preview does not use unauthorized third-party videos, embeds, iframes, or downloaded media."
  },
  {
    question: "Will GIF guides be added?",
    answer:
      "GIF guides may be added later, but only as owned or authorized media that clearly supports the written walkthrough."
  },
  {
    question: "Can I still use written walkthroughs?",
    answer:
      "Yes. Written walkthroughs remain the main guide format, and the Video Matrix is only a preview for future owned or authorized visual guides."
  }
];
