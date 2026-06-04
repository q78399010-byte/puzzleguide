import {
  generateComparisonContent as generateComparisonTemplate
} from "../scripts/generate-comparison-content";
import {
  generateGuideContent as generateGuideTemplate,
  type GuideContentModule
} from "../scripts/generate-guide-content";
import {
  generateLevelContent as generateLevelTemplate
} from "../scripts/generate-level-content";

export type StandardContentSection = {
  title: string;
  body: string;
  items?: string[];
};

export type StandardContentFaq = {
  question: string;
  answer: string;
};

export type StandardGeneratedContent = {
  title: string;
  description: string;
  sections: StandardContentSection[];
  tips: string[];
  faq: StandardContentFaq[];
  relatedContent: string[];
};

export type GuideContentType =
  | "beginner"
  | "advanced"
  | "hard-levels"
  | "walkthroughs";

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeModule(module: GuideContentModule): StandardGeneratedContent {
  return {
    title: module.title,
    description: module.intro,
    sections: module.sections.map((section) => ({
      title: section.heading,
      body: section.body
    })),
    tips: module.tips,
    faq: module.faq,
    relatedContent: module.relatedGames
  };
}

function programmaticContent(
  gameName: string,
  contentType: "solutions" | "tips" | "walkthroughs"
): StandardGeneratedContent {
  const normalizedGameName = normalize(gameName);
  const labels = {
    solutions: {
      title: `${normalizedGameName} Solutions`,
      description: `${normalizedGameName} solutions with step-by-step puzzle help, common stuck points, tips, and related level walkthroughs.`,
      action: "solve stuck levels",
      section: "Step-by-step Solution"
    },
    tips: {
      title: `${normalizedGameName} Tips and Tricks`,
      description: `${normalizedGameName} tips for better openings, safer move order, fewer mistakes, and cleaner puzzle level progress.`,
      action: "improve level consistency",
      section: "Tips and Tricks"
    },
    walkthroughs: {
      title: `${normalizedGameName} Walkthroughs`,
      description: `${normalizedGameName} walkthrough collection with guide summaries, level strategy, mistakes to avoid, and related puzzle content.`,
      action: "move from strategy to exact level guides",
      section: "Walkthrough Summary"
    }
  }[contentType];

  return {
    title: labels.title,
    description: labels.description,
    sections: [
      {
        title: labels.section,
        body: `Use this ${normalizedGameName} ${contentType} hub to ${labels.action}. The content engine keeps the page structure consistent for SEO while leaving room for richer manual edits later.`
      },
      {
        title: "Common Mistakes",
        body: `Most failed ${normalizedGameName} attempts come from spending temporary space too early, ignoring the main blocker, or rushing the final sequence.`
      },
      {
        title: "Related Levels",
        body: `Future pages can connect this ${contentType} module to exact ${normalizedGameName} level walkthroughs.`
      }
    ],
    tips: [
      "Start by identifying the move that creates the most useful space.",
      "Delay risky moves until the final route is visible.",
      "Use related level pages when the same blocker pattern repeats."
    ],
    faq: [
      {
        question: `How is this ${normalizedGameName} ${contentType} content organized?`,
        answer:
          "It is organized around practical walkthrough summaries, common stuck points, related levels, and game-specific guide links."
      },
      {
        question: `Can this content be used for ${normalizedGameName} SEO pages?`,
        answer:
          "Yes. It returns a standard object that future static pages can render consistently."
      }
    ],
    relatedContent: [
      `${normalizedGameName} beginner guide`,
      `${normalizedGameName} hard levels`,
      `${normalizedGameName} walkthroughs`
    ]
  };
}

export function generateLevelContent(
  gameName: string,
  level: number | string
): StandardGeneratedContent {
  const content = generateLevelTemplate(gameName, level);

  return {
    title: content.title,
    description: content.summary,
    sections: [
      {
        title: "Walkthrough Summary",
        body: content.walkthroughSummary
      },
      {
        title: "Step-by-step Solution",
        body: "Follow these static template steps to keep the level stable.",
        items: content.steps
      },
      {
        title: "Common Mistakes",
        body: "Avoid the mistakes that usually block the final solution route.",
        items: content.commonMistakes
      }
    ],
    tips: content.tips,
    faq: content.faq,
    relatedContent: content.relatedLevels
  };
}

export function generateGuideContent(
  gameName: string,
  guideType: GuideContentType = "beginner"
): StandardGeneratedContent {
  const content = generateGuideTemplate(gameName);
  const moduleByType: Record<GuideContentType, GuideContentModule> = {
    beginner: content.beginnerGuide,
    advanced: content.advancedStrategy,
    "hard-levels": content.hardLevelsGuide,
    walkthroughs: content.walkthroughCollection
  };

  return normalizeModule(moduleByType[guideType]);
}

export function generateComparisonContent(
  gameA: string,
  gameB: string
): StandardGeneratedContent {
  const content = generateComparisonTemplate(gameA, gameB);
  const comparisonBlocks = [
    content.difficultyComparison,
    content.gameplayComparison,
    content.bestForBeginners,
    content.bestForAdvancedPlayers
  ];

  return {
    title: content.title,
    description: content.summary,
    sections: [
      ...comparisonBlocks.map((block) => ({
        title: block.heading,
        body: `${block.summary} ${block.gameA} ${block.gameB} ${block.verdict}`,
        items: block.points
      })),
      {
        title: "Which one should you play?",
        body: content.winnerSummary
      }
    ],
    tips: comparisonBlocks.flatMap((block) => block.points).slice(0, 6),
    faq: content.faq,
    relatedContent: content.relatedGames
  };
}

export function generateSolutionContent(gameName: string): StandardGeneratedContent {
  return programmaticContent(gameName, "solutions");
}

export function generateTipsContent(gameName: string): StandardGeneratedContent {
  return programmaticContent(gameName, "tips");
}

export function generateWalkthroughContent(
  gameName: string
): StandardGeneratedContent {
  return programmaticContent(gameName, "walkthroughs");
}
