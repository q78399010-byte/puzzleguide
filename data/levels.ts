import { games } from "@/data/games";

export type LevelGuide = {
  slug: string;
  levelSlug: string;
  gameSlug: string;
  gameName: string;
  levelNumber: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  updatedAt: string;
  views: number;
  summary: string;
  steps: string[];
  tips: string[];
  commonMistakes: string[];
  faq: { question: string; answer: string }[];
  relatedLevels: string[];
};

const originalLevelNumbersByGame: Record<string, number[]> = {
  "color-wood-jam": [
    12, 24, 36, 45, 58, 72, 88, 96, 110, 124, 137, 145, 158, 172, 188, 204,
    219, 233, 245, 260, 276, 291, 306, 322, 337, 351, 368, 389, 412, 430
  ],
  "arrows-go": [
    15, 28, 39, 52, 66, 72, 84, 99, 116, 128, 142, 158, 173, 189, 204, 219,
    231, 245, 260, 277, 291, 305, 318, 335, 349, 366, 382, 398, 415, 432
  ],
  "screw-jam": [
    18, 31, 44, 54, 68, 79, 91, 108, 122, 137, 151, 168, 184, 197, 210, 228,
    245, 260, 276, 294, 311, 333, 349, 365, 382, 401, 420, 438, 455, 472
  ],
  "magic-sort": [
    10, 21, 32, 46, 58, 67, 82, 96, 101, 118, 130, 144, 159, 174, 188, 199,
    213, 228, 240, 245, 256, 271, 286, 301, 318, 333, 348, 362, 379, 395
  ],
  "block-blast": [
    25, 38, 49, 60, 74, 88, 95, 109, 116, 130, 146, 162, 175, 190, 204, 220,
    234, 245, 258, 272, 285, 300, 318, 336, 349, 360, 378, 392, 410, 428
  ],
  "water-sort": [
    14, 27, 41, 49, 64, 78, 83, 97, 108, 121, 136, 152, 170, 184, 199, 213,
    225, 238, 245, 260, 274, 288, 302, 316, 329, 344, 361, 376, 390, 407
  ]
};

const defaultLevelNumbers = [
  15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240,
  255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450,
  465, 480, 495, 510, 525, 540, 555, 570, 585, 600
];

const difficulties: LevelGuide["difficulty"][] = [
  "Easy",
  "Medium",
  "Medium",
  "Hard",
  "Hard",
  "Expert",
  "Hard",
  "Expert",
  "Medium",
  "Hard"
];

const updatedDates = [
  "2026-06-03",
  "2026-06-02",
  "2026-06-01",
  "2026-05-31",
  "2026-05-30",
  "2026-05-29",
  "2026-05-28",
  "2026-05-27",
  "2026-05-26",
  "2026-05-25"
];

const templatesByCategory: Record<
  string,
  {
    steps: string[];
    tips: string[];
    mistakes: string[];
  }
> = {
  "wood-puzzle": {
    steps: [
      "Free the largest piece that already has a matching exit lane.",
      "Move the two smallest matching pieces into the side lane before touching the center stack.",
      "Keep one open pocket near the lower edge so the final group has room to slide.",
      "Clear the blocked color last after the main lane has been opened."
    ],
    tips: [
      "Use the first move to create space, not to chase an immediate clear.",
      "Treat the lower pocket as a reserve lane for the final group.",
      "Move the smaller matching piece first when two pieces share the same color."
    ],
    mistakes: [
      "Moving the center stack too early and closing the lower escape lane.",
      "Clearing a small piece before checking whether the large piece can still turn.",
      "Using the reserve pocket for a piece that does not finish the board."
    ]
  },
  sorting: {
    steps: [
      "Choose one anchor color or item group and build it cleanly.",
      "Keep one empty space available as temporary storage.",
      "Move single layers only when they complete or unlock a matching group.",
      "Use the final empty slot to merge the last two groups."
    ],
    tips: [
      "Build one clean group before sorting rare items.",
      "Use temporary storage only for pieces that can move again soon.",
      "Do not break a completed group unless it unlocks two other moves."
    ],
    mistakes: [
      "Using every empty space too early.",
      "Moving rare items around without a destination.",
      "Breaking completed groups and creating extra mixed layers."
    ]
  },
  mechanical: {
    steps: [
      "Clear the outside blockers first to create safe lanes around the board.",
      "Do not trigger the center chain until the main path is open.",
      "Use the short blocker group to break the hidden lock.",
      "Finish by clearing the longest path in one controlled sequence."
    ],
    tips: [
      "Count available space before starting repeated pieces.",
      "Watch the second move in the chain, not only the first.",
      "Keep one side lane open so the center group has a clean exit."
    ],
    mistakes: [
      "Starting with the center chain and blocking both side lanes.",
      "Releasing a long piece before the short blocker has moved.",
      "Ignoring hidden locks that stop the final sequence."
    ]
  },
  block: {
    steps: [
      "Place large pieces along the edge to preserve the center of the board.",
      "Set up a row or group clear before committing square pieces.",
      "Avoid splitting the open area into two small pockets.",
      "Use the final awkward shape to trigger the cleanup move."
    ],
    tips: [
      "Keep the center open for awkward shapes.",
      "Prefer moves that prepare two clears at once.",
      "Save square pieces for corners unless they complete a line."
    ],
    mistakes: [
      "Breaking the board into isolated pockets.",
      "Dropping large pieces in the center without a clear plan.",
      "Chasing one quick clear while leaving no space for the next piece."
    ]
  }
};

export const levels: LevelGuide[] = games.flatMap((game) => {
  const numbers = originalLevelNumbersByGame[game.slug] ?? defaultLevelNumbers;
  const content = templatesByCategory[game.categorySlug] ?? templatesByCategory.mechanical;

  return numbers.map((levelNumber, index) => {
    const slug = `level-${levelNumber}`;
    const relatedLevels = numbers
      .filter((candidate) => candidate !== levelNumber)
      .sort(
        (a, b) =>
          Math.abs(a - levelNumber) - Math.abs(b - levelNumber) || a - b
      )
      .slice(0, 4)
      .map((candidate) => `level-${candidate}`);

    return {
      slug,
      levelSlug: slug,
      gameSlug: game.slug,
      gameName: game.name,
      levelNumber,
      title: `${game.name} Level ${levelNumber} Walkthrough`,
      difficulty: difficulties[index % difficulties.length] ?? "Medium",
      updatedAt: updatedDates[index % updatedDates.length] ?? "2026-05-25",
      views: 18400 + game.popularity * 130 + levelNumber * 49 + index * 720,
      summary: `${game.name} Level ${levelNumber} walkthrough with a direct solution path, level guide notes, pro tips, and common mistakes for stuck players.`,
      steps: content.steps.map((step, stepIndex) =>
        stepIndex === 0
          ? `${step} This opening keeps Level ${levelNumber} stable.`
          : step
      ),
      tips: content.tips.map(
        (tip) => `${tip} Apply this before committing a move on Level ${levelNumber}.`
      ),
      commonMistakes: content.mistakes,
      faq: [
        {
          question: `What is the best opening for ${game.name} Level ${levelNumber}?`,
          answer:
            "Use the first move to create space or unlock a safe lane, then follow the main sequence before clearing the final blocked group."
        },
        {
          question: `Why do players get stuck on ${game.name} Level ${levelNumber}?`,
          answer:
            "Most failed attempts close a reserve lane too early or spend temporary space before the final sequence is ready."
        },
        {
          question: `Does this ${game.name} Level ${levelNumber} guide include tips?`,
          answer:
            "Yes. The guide includes a walkthrough summary, step-by-step solution, pro tips, common mistakes, FAQ, and related levels."
        }
      ],
      relatedLevels
    };
  });
});
