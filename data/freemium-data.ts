export const freemiumHero = {
  title: "Free to Start.",
  titleAccent: "Upgrade When You Need More.",
  subtitle: "Everything you need to solve puzzles.",
  description: "Unlock more tools when you're ready."
};

export type FreemiumPlan = {
  name: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  badge?: string;
};

export const freemiumPlans: FreemiumPlan[] = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Walkthroughs",
      "FAQ",
      "Basic Solver",
      "Basic Helper",
      "Unlimited Access"
    ],
    cta: "Start Free",
    href: "/games"
  },
  {
    name: "One-Time Pack",
    price: "$5",
    features: [
      "Advanced Solver",
      "Save History",
      "Ad-Free",
      "Share Card",
      "Priority Updates"
    ],
    cta: "Unlock",
    href: "#freemium",
    badge: "Most Popular"
  },
  {
    name: "Premium",
    price: "$9/month",
    features: [
      "Unlimited Solver",
      "Advanced Planner",
      "Template Library",
      "Profile Features",
      "Future AI Tools"
    ],
    cta: "Go Premium",
    href: "#freemium"
  }
];

export const freemiumStats = [
  { value: "1400+", label: "Walkthroughs" },
  { value: "30+", label: "Games" },
  { value: "100K+", label: "Players" },
  { value: "24/7", label: "Access" }
];

export const freemiumFaq = [
  {
    question: "Why is PuzzleGuide free?",
    answer:
      "PuzzleGuide starts free so players can access walkthroughs, FAQ, and basic solving help without payment."
  },
  {
    question: "What does Premium include?",
    answer:
      "Premium is a static plan concept for advanced solver access, planning tools, templates, profile features, and future tool upgrades."
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. The freemium model is designed so players can start free and upgrade only when they need more tools."
  },
  {
    question: "Will AI tools be added?",
    answer:
      "Future AI tools may be added later, but this static version does not connect to AI services."
  },
  {
    question: "Do I need an account?",
    answer:
      "No. This static version does not require an account, database, checkout, or subscription."
  }
];
