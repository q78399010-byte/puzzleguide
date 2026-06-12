export type SolverProCard = {
  title: string;
  description: string;
  status: "Coming soon" | "Preview";
};

export type SolverProFaqItem = {
  question: string;
  answer: string;
};

export const solverProCards: SolverProCard[] = [
  {
    title: "Screenshot Analysis",
    description:
      "Preview how future tools may read puzzle boards from screenshots.",
    status: "Coming soon"
  },
  {
    title: "Move Planner",
    description: "Plan possible moves before getting stuck.",
    status: "Preview"
  },
  {
    title: "Risk Detector",
    description: "Spot dead ends, blocked lanes, and low-space states.",
    status: "Preview"
  },
  {
    title: "Strategy Generator",
    description:
      "Turn board state into step-by-step solving guidance.",
    status: "Coming soon"
  }
];

export const solverProFlow = [
  "Upload Screenshot",
  "Detect Board State",
  "Calculate Best Move",
  "Generate Strategy"
];

export const solverProLockup = [
  "Free Preview",
  "Static Demo",
  "No Account Needed",
  "AI Planned"
];

export const solverProFaq: SolverProFaqItem[] = [
  {
    question: "What is Solver Pro?",
    answer:
      "Solver Pro is currently a static preview of a future puzzle solving workflow. It shows how screenshot review, move planning, risk detection, and strategy guidance may fit together."
  },
  {
    question: "Does Solver Pro use AI today?",
    answer:
      "No. This preview does not call AI services or any external model. It is a static interface demo with placeholder states."
  },
  {
    question: "Can I upload real screenshots?",
    answer:
      "No real upload is performed in this preview. The screenshot steps are visual placeholders and do not open a file picker or send files anywhere."
  },
  {
    question: "Will advanced solvers be paid?",
    answer:
      "There is no paid solver in this static preview. Future versions may support advanced solver workflows, but this section does not include pricing, accounts, or checkout."
  },
  {
    question: "Which games will be supported?",
    answer:
      "The preview is designed around the existing Solver Matrix games first. Future versions may support more advanced solvers for compatible puzzle boards."
  }
];
