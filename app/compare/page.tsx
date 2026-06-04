import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/data/comparisons";
import { getGamesBySlugs } from "@/lib/discovery";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Compare Puzzle Games by Difficulty, Gameplay & Levels | PuzzleMaster",
  description:
    "Compare popular puzzle games by difficulty, gameplay, level design, replay value, and walkthrough availability on PuzzleMaster.",
  alternates: {
    canonical: routes.compare
  },
  openGraph: {
    title: "Compare Puzzle Games | PuzzleMaster",
    description:
      "Puzzle game comparisons by difficulty, gameplay, levels, replay value, and walkthrough coverage.",
    type: "website"
  }
};

const faq = [
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

export default function ComparePage() {
  return (
    <main className="container-page py-10">
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            Compare
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Compare Puzzle Games
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            Compare popular puzzle games by difficulty, gameplay, level design,
            replay value, and walkthrough availability.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {comparisons.map((comparison) => {
          const [gameA, gameB] = getGamesBySlugs([comparison.gameA, comparison.gameB]);

          return (
            <Link
              key={comparison.slug}
              href={routes.comparison(comparison.slug)}
              className="content-card block p-5 transition hover:-translate-y-1 hover:shadow-card"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
                {comparison.difficultyA} vs {comparison.difficultyB}
              </p>
              <h2 className="mt-3 text-xl font-black text-ink">
                {gameA?.name} vs {gameB?.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{comparison.summary}</p>
              <div className="mt-4 grid gap-2 text-sm text-muted">
                <div>
                  <span className="font-bold text-ink">Best for: </span>
                  {comparison.bestForA}
                </div>
                <div>
                  <span className="font-bold text-ink">Also compare: </span>
                  {comparison.bestForB}
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Compare puzzle games before you play</h2>
        <p className="mt-4 leading-8 text-muted">
          PuzzleMaster comparison pages help players compare puzzle games by
          difficulty, gameplay, level design, and walkthrough availability. A good
          comparison should explain whether a game is relaxing or difficult, whether
          it depends on exact level solutions or repeatable board strategy, and how
          easy it is to find level guides when a player gets stuck. These comparison
          hubs are designed for search intent around compare puzzle games, best
          puzzle game, puzzle game difficulty, and puzzle game walkthroughs.
        </p>
      </section>

      <section className="mt-10 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4">
          {faq.map((item) => (
            <details key={item.question} className="rounded-2xl border border-line p-4">
              <summary className="cursor-pointer font-black text-ink">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
