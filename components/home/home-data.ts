export type HomeGameCard = {
  title: string;
  slug: string;
  description: string;
  accent: string;
  label: string;
};

export const homeHeroChips = [
  "Color Wood Jam",
  "Screw Jam",
  "Water Sort",
  "Ball Sort"
];

export const homeStats = [
  { value: "1400+", label: "Walkthroughs" },
  { value: "30+", label: "Puzzle Games" },
  { value: "100K+", label: "Monthly Players" },
  { value: "24/7", label: "Free Access" }
];

export const homeFeatures = [
  {
    title: "Step-by-Step Walkthroughs",
    description:
      "Clear move orders, practical board reads, and direct guidance for the levels that keep players stuck."
  },
  {
    title: "Popular Puzzle Games",
    description:
      "Fast access to the most searched puzzle hubs with walkthrough collections, tips, and related levels."
  },
  {
    title: "Tips & Strategies",
    description:
      "Short, useful strategy notes for openings, cleanup, and the mistakes that usually cost a run."
  }
];

export const homePopularGames: HomeGameCard[] = [
  {
    title: "Color Wood Jam",
    slug: "color-wood-jam",
    description:
      "Wood block board clears with written guides for stuck levels, blockers, and lane planning.",
    accent: "from-sky-400 via-cyan-300 to-white",
    label: "CW"
  },
  {
    title: "Screw Jam",
    slug: "screw-jam",
    description:
      "Screw removal order, tray capacity, and solution routes for cramped mechanical boards.",
    accent: "from-indigo-500 via-violet-300 to-white",
    label: "SJ"
  },
  {
    title: "Water Sort",
    slug: "water-sort",
    description:
      "Bottle sorting help with safe pours, empty space timing, and clean color groupings.",
    accent: "from-cyan-400 via-blue-300 to-white",
    label: "WS"
  },
  {
    title: "Ball Sort",
    slug: "ball-sort-puzzle",
    description:
      "Tube sorting support with color anchors, sequencing, and late-board cleanup.",
    accent: "from-blue-500 via-indigo-300 to-white",
    label: "BS"
  },
  {
    title: "Hexa Sort",
    slug: "hexa-sort",
    description:
      "Hex tile grouping, stack planning, and route choices for dense tile layouts.",
    accent: "from-violet-500 via-fuchsia-300 to-white",
    label: "HS"
  },
  {
    title: "Goods Sort",
    slug: "goods-sort",
    description:
      "Shelf sorting and item grouping guidance for cleaner category-based boards.",
    accent: "from-emerald-500 via-teal-300 to-white",
    label: "GS"
  },
  {
    title: "Bus Escape",
    slug: "bus-jam",
    description:
      "Traffic and queue clearing walkthroughs for crowded bus boards and tight exits.",
    accent: "from-orange-400 via-amber-200 to-white",
    label: "BE"
  },
  {
    title: "Arrow Away",
    slug: "arrows-go",
    description:
      "Direction puzzles and arrow chain logic for levels where one move changes the route.",
    accent: "from-sky-500 via-blue-300 to-white",
    label: "AA"
  },
  {
    title: "Parking Jam",
    slug: "parking-jam",
    description:
      "Vehicle routing, exit order, and space management for cluttered parking boards.",
    accent: "from-stone-500 via-slate-300 to-white",
    label: "PJ"
  }
];

export const homeTimeline = [
  {
    step: "Step 1",
    title: "Search level",
    description: "Type a game name or a level number and jump straight to the relevant walkthrough."
  },
  {
    step: "Step 2",
    title: "Read walkthrough",
    description: "Follow the move order, learn the board logic, and use the hints that reduce retries."
  },
  {
    step: "Step 3",
    title: "Pass the level",
    description: "Apply the route, clear the board, and move on without needing a long video."
  }
];

export const homeFaq = [
  {
    question: "Is PuzzleMaster free to use?",
    answer:
      "Yes. The walkthrough index, game pages, and guide collections are open without registration."
  },
  {
    question: "Which games are covered?",
    answer:
      "Popular puzzle games like Color Wood Jam, Screw Jam, Water Sort, Ball Sort, Hexa Sort, and more."
  },
  {
    question: "Can I search by level number?",
    answer:
      "Yes. Search by game name and level number to find the closest walkthrough or guide page."
  },
  {
    question: "Are the walkthroughs step by step?",
    answer:
      "The guides are written around move order, board state, and the safest next move rather than broad tips."
  },
  {
    question: "Do you cover hard or late-game levels?",
    answer:
      "Yes. The library includes difficult levels, common traps, and cleanup routes for stuck boards."
  },
  {
    question: "What if I only know the mechanic?",
    answer:
      "Use the game hubs, category pages, and guide collections to narrow the board type before searching."
  }
];
