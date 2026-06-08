import type { ProgrammaticType } from "@/data/programmatic";

export type FaqItem = {
  question: string;
  answer: string;
};

export const collectionsIndexFaq: FaqItem[] = [
  {
    question: "What are puzzle game collections?",
    answer:
      "Collections group related puzzle games by theme, difficulty, gameplay style, or search intent."
  },
  {
    question: "How are these games selected?",
    answer:
      "Games are selected using static category data, popularity signals, related game links, and walkthrough coverage."
  },
  {
    question: "Do collections include walkthroughs?",
    answer:
      "Yes. Each collection links to game hubs where players can browse walkthroughs and level guides."
  },
  {
    question: "Which collection should beginners start with?",
    answer:
      "Top Puzzle Games for Beginners and Best Relaxing Puzzle Games are the easiest starting points."
  }
];

export const compareIndexFaq: FaqItem[] = [
  {
    question: "How do you compare puzzle games?",
    answer:
      "PuzzleMaster compares games using static signals such as difficulty, gameplay style, level design, replay value, and walkthrough coverage."
  },
  {
    question: "Which puzzle game is easier?",
    answer:
      "Sorting games such as Water Sort and Ball Sort Puzzle are usually easier for beginners than hard mechanical games."
  },
  {
    question: "Which puzzle game has more levels?",
    answer:
      "Level counts vary by game, but PuzzleMaster game hubs include total level estimates and indexed walkthrough pages."
  },
  {
    question: "Which puzzle game is best for beginners?",
    answer:
      "Water Sort, Ball Sort Puzzle, Sort It Out, Goods Sort, and Tile Match are good beginner-friendly options."
  }
];

export const discoverFaq: FaqItem[] = [
  {
    question: "How do I find similar puzzle games?",
    answer:
      "Start with a game you already like, then browse related games by mechanics such as sorting, blocks, traffic, screws, or wood puzzles."
  },
  {
    question: "Which puzzle games are best for beginners?",
    answer:
      "Water Sort, Ball Sort Puzzle, Sort It Out, Goods Sort, and Tile Match are good beginner-friendly starting points."
  },
  {
    question: "What are the most popular puzzle games?",
    answer:
      "Color Wood Jam, Screw Jam, Water Sort, Parking Jam, Brain Test, and Ball Sort Puzzle are strong discovery hubs on PuzzleMaster."
  },
  {
    question: "Are these games free to play?",
    answer:
      "Most games in this discovery index are commonly distributed as mobile puzzle games with free-to-play models, but availability can vary by store and region."
  }
];

export const guideHubFaq: FaqItem[] = [
  {
    question: "What is the PuzzleMaster Guide Hub?",
    answer:
      "The Guide Hub links to beginner guides, advanced strategy guides, hard level guides, and walkthrough collections for every PuzzleMaster game."
  },
  {
    question: "Are guide pages static?",
    answer:
      "Yes. Guide pages are statically generated for SEO discovery and fast browsing."
  }
];

export const tipsIndexFaq: FaqItem[] = [
  {
    question: "What are PuzzleMaster tips pages?",
    answer:
      "Tips pages collect beginner advice, advanced strategy, common mistakes, and related level links for each puzzle game."
  }
];

export const solutionsIndexFaq: FaqItem[] = [
  {
    question: "What are PuzzleMaster solution pages?",
    answer:
      "Solution pages group game-specific walkthrough summaries, step-by-step solution notes, tips, common mistakes, and related levels."
  }
];

export const walkthroughsIndexFaq: FaqItem[] = [
  {
    question: "What are PuzzleMaster walkthrough pages?",
    answer:
      "Walkthrough pages connect game strategy, level guide links, solution notes, tips, common mistakes, and related levels."
  }
];

export function guideDetailFaq(gameName: string): FaqItem[] {
  return [
    {
      question: `What is included in this ${gameName} guide?`,
      answer:
        "The guide includes a walkthrough summary, step planning, tips, common mistakes, related levels, and links to PuzzleMaster game pages."
    },
    {
      question: `Is this guide useful for ${gameName} hard levels?`,
      answer:
        "Yes. The guide explains safe openings, blocker timing, and related hard levels when players need exact move order."
    }
  ];
}

export function programmaticGameFaq(
  gameName: string,
  pageType: ProgrammaticType
): FaqItem[] {
  return [
    {
      question: `Does this page include ${gameName} level guides?`,
      answer:
        "Yes. It links to related level pages with static walkthroughs, tips, common mistakes, and FAQ content."
    },
    {
      question: `How do I use this ${gameName} ${pageType.slug} page?`,
      answer:
        "Start with the walkthrough summary, review common mistakes, then open a related level guide for exact step-by-step help."
    }
  ];
}
