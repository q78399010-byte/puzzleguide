export type ProgrammaticType = {
  slug: "solutions" | "tips" | "walkthroughs";
  singular: "Solution" | "Tips" | "Walkthrough";
  title: string;
  description: string;
  heading: string;
};

export const programmaticTypes: ProgrammaticType[] = [
  {
    slug: "solutions",
    singular: "Solution",
    title: "Puzzle Game Solutions",
    heading: "Puzzle Game Solutions",
    description:
      "Static solution pages for puzzle games with step-by-step help, related levels, and common mistakes."
  },
  {
    slug: "tips",
    singular: "Tips",
    title: "Puzzle Game Tips",
    heading: "Puzzle Game Tips",
    description:
      "Practical tips and tricks for puzzle games, including beginner advice, advanced strategy, and stuck-level help."
  },
  {
    slug: "walkthroughs",
    singular: "Walkthrough",
    title: "Puzzle Game Walkthroughs",
    heading: "Puzzle Game Walkthroughs",
    description:
      "Walkthrough hubs for puzzle games with summaries, level guides, solution steps, and related pages."
  }
];
