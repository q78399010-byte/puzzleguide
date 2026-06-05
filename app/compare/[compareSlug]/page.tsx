import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameGrid } from "@/components/game-grid";
import { comparisons } from "@/data/comparisons";
import {
  getComparisonBySlug,
  getGamesBySlugs,
  getRelatedComparisons
} from "@/lib/discovery";
import { routes } from "@/lib/routes";

export const dynamicParams = false;

type CompareDetailPageProps = {
  params: Promise<{
    compareSlug: string;
  }>;
};

export function generateStaticParams() {
  return comparisons.map((comparison) => ({
    compareSlug: comparison.slug
  }));
}

export async function generateMetadata({
  params
}: CompareDetailPageProps): Promise<Metadata> {
  const { compareSlug } = await params;
  const comparison = getComparisonBySlug(compareSlug);

  if (!comparison) {
    return {
      title: "Comparison Not Found | PuzzleMaster"
    };
  }

  const [gameA, gameB] = getGamesBySlugs([comparison.gameA, comparison.gameB]);
  const title = `${gameA?.name} vs ${gameB?.name}: Difficulty, Gameplay & Levels | PuzzleMaster`;
  const description = `Compare ${gameA?.name} and ${gameB?.name} by difficulty, gameplay, level design, beginner value, advanced play, and walkthrough availability.`;

  return {
    title,
    description,
    alternates: {
      canonical: routes.comparison(comparison.slug)
    },
    openGraph: {
      title,
      description,
      url: routes.comparison(comparison.slug),
      type: "article"
    }
  };
}

export default async function CompareDetailPage({ params }: CompareDetailPageProps) {
  const { compareSlug } = await params;
  const comparison = getComparisonBySlug(compareSlug);

  if (!comparison) {
    notFound();
  }

  const [gameA, gameB] = getGamesBySlugs([comparison.gameA, comparison.gameB]);

  if (!gameA || !gameB) {
    notFound();
  }

  const relatedComparisons = getRelatedComparisons(comparison.relatedComparisons);

  return (
    <main className="container-page py-10">
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            Puzzle Game Comparison
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {comparison.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            {comparison.summary}
          </p>
        </div>
      </section>

      <section className="mt-10 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Summary</h2>
        <p className="mt-4 leading-8 text-muted">
          {gameA.name} and {gameB.name} are both strong puzzle games, but they
          serve different players. {comparison.winnerSummary} This comparison looks
          at difficulty, gameplay, level design, beginner value, advanced play, and
          walkthrough availability.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="content-card p-6">
          <h2 className="text-2xl font-black text-ink">Difficulty Comparison</h2>
          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl bg-paper p-4">
              <h3 className="font-black text-ink">{gameA.name}</h3>
              <p className="mt-2 text-sm text-muted">{comparison.difficultyA}</p>
            </div>
            <div className="rounded-2xl bg-paper p-4">
              <h3 className="font-black text-ink">{gameB.name}</h3>
              <p className="mt-2 text-sm text-muted">{comparison.difficultyB}</p>
            </div>
          </div>
        </article>

        <article className="content-card p-6">
          <h2 className="text-2xl font-black text-ink">Gameplay Comparison</h2>
          <div className="mt-5 grid gap-4">
            <p className="rounded-2xl bg-paper p-4 text-sm leading-6 text-muted">
              <span className="font-black text-ink">{gameA.name}: </span>
              {comparison.gameplayA}
            </p>
            <p className="rounded-2xl bg-paper p-4 text-sm leading-6 text-muted">
              <span className="font-black text-ink">{gameB.name}: </span>
              {comparison.gameplayB}
            </p>
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Level Design</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {gameA.name} has {gameA.totalLevels}+ levels and {gameB.name} has{" "}
            {gameB.totalLevels}+ levels. Both can support walkthrough discovery,
            but the type of stuck point is different.
          </p>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Best For Beginners</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Beginners should choose the game with simpler early levels and more
            forgiving move order. {gameA.difficulty === "Easy" ? gameA.name : gameB.name}{" "}
            is usually the easier starting point in this comparison.
          </p>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Best For Advanced Players</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Advanced players should choose the game with stricter blockers, harder
            level design, and more exact walkthrough demand.
          </p>
        </article>
      </section>

      <section className="mt-8 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Which one should you play?</h2>
        <p className="mt-4 leading-8 text-muted">
          {comparison.winnerSummary} If you mostly want relaxing daily play, start
          with the game that has simpler early levels. If you want a game where
          walkthroughs matter more, choose the one with stricter move order and
          harder level design. PuzzleMaster keeps both game hubs connected to level
          guides so you can switch from comparison to direct solution pages quickly.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Related Games</h2>
        <div className="mt-5">
          <GameGrid games={[gameA, gameB]} compact />
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Related Comparisons</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {relatedComparisons.map((related) => (
            <Link
              key={related.slug}
              href={routes.comparison(related.slug)}
              className="rounded-2xl border border-line p-4 transition hover:border-action"
            >
              <h3 className="font-black text-ink">{related.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{related.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4">
          {comparison.faq.map((item) => (
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
