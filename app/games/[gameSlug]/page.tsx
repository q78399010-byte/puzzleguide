import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { Breadcrumb } from "@/components/breadcrumb";
import { GameGrid } from "@/components/game-grid";
import { LevelList } from "@/components/level-list";
import { SearchBox } from "@/components/search-box";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllGames,
  getGameBySlug,
  getLevelsByGame,
  getPopularLevels,
  getRelatedGames
} from "@/lib/data";
import { routes } from "@/lib/routes";
import { formatDate, gameMetadata } from "@/lib/seo";

export const dynamicParams = false;

type GamePageProps = {
  params: Promise<{
    gameSlug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGames().map((game) => ({
    gameSlug: game.slug
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    return {
      title: "Game Not Found | PuzzleMaster"
    };
  }

  return gameMetadata(game);
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    notFound();
  }

  const gameLevels = getLevelsByGame(game.slug);
  const latestLevels = [...gameLevels]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.views - a.views)
    .slice(0, 8);
  const mostSearchedLevels = getPopularLevels(8, game.slug);
  const relatedGames = getRelatedGames(game.slug, 3);
  const difficultyDistribution = ["Easy", "Medium", "Hard", "Expert"].map((difficulty) => {
    const count = gameLevels.filter((level) => level.difficulty === difficulty).length;

    return {
      difficulty,
      count,
      percent: Math.round((count / gameLevels.length) * 100)
    };
  });
  const popularSearchKeywords = [
    `${game.name} Level 245`,
    `${game.name} walkthrough`,
    `${game.name} solution`,
    `${game.name} hard levels`,
    `${game.name} tips`
  ];
  const completionRate = Math.min(96, Math.max(68, game.popularity - 4));
  const guideFocus = ["Openings", "Blocked lanes", "Final cleanup"];
  const editorNotes = [
    "Check the reserve space before starting the final move sequence.",
    "If the board locks early, restart and delay the center group.",
    "Use the closest related level when the exact layout feels similar."
  ];
  const mostDiscussedLevels = mostSearchedLevels.slice(0, 4);

  return (
    <main className="container-page py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: routes.home },
          { label: "Games", href: routes.games },
          { label: game.name }
        ]}
      />

      <section className="mt-6 content-card overflow-hidden">
        <div
          className="game-art min-h-[240px] p-6 text-white sm:p-8"
          style={{
            background: `linear-gradient(135deg, ${game.color}, #12386d 135%)`
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-black text-ink">
              {game.categoryName}
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              {game.name} Walkthrough, Levels & Tips
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/90">
              {game.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full bg-white/15 px-4 py-2">
                {game.totalLevels}+ levels
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2">
                {game.guideCount} guides
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2">
                Updated {formatDate(game.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-2xl font-black text-ink">Game Introduction</h2>
            <p className="mt-3 leading-8 text-muted">{game.longDescription}</p>
            <p className="mt-3 leading-8 text-muted">{game.seoIntro}</p>
            <div className="mt-6 max-w-2xl">
              <SearchBox
                placeholder={`Search ${game.name} levels, for example: ${game.name} Level 245`}
              />
            </div>
          </div>
          <aside className="rounded-2xl border border-line bg-paper p-5">
            <h2 className="font-black text-ink">Guide Coverage</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Category</dt>
                <dd className="font-bold text-ink">{game.categoryName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Walkthroughs</dt>
                <dd className="font-bold text-ink">{game.guideCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Indexed pages</dt>
                <dd className="font-bold text-ink">{gameLevels.length}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-xs font-bold text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <AdSlot className="mt-6 bg-white" />
          </aside>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Latest Guides"
            title="Latest Level Walkthroughs"
            description={`Recently updated ${game.name} walkthrough pages with solution notes, level guide details, and practical tips.`}
          />
          <LevelList levels={latestLevels} />
        </div>
        <div>
          <SectionHeading
            eyebrow="Most Searched"
            title="Most Searched Levels"
            description="High-demand pages based on static popularity signals and common stuck-level patterns."
          />
          <LevelList levels={mostSearchedLevels} ranked />
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Beginner Tips</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            {game.beginnerTips.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Advanced Strategy</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            {game.advancedStrategy.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Common Mistakes</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            {game.commonMistakes.map((mistake) => (
              <li key={mistake}>- {mistake}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="Guide Snapshot"
          title="How These Guides Are Organized"
          description="A quick view of the patterns, notes, and related level links used across this game hub."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-line p-5">
            <h3 className="font-black text-ink">Guide Focus</h3>
            <div className="mt-4 grid gap-3">
              {guideFocus.map((name, index) => (
                <div key={name} className="flex items-center justify-between rounded-xl bg-paper px-4 py-3">
                  <span className="font-bold text-ink">{name}</span>
                  <span className="text-sm font-black text-action">#{index + 1}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-line p-5">
            <h3 className="font-black text-ink">Editor Notes</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
              {editorNotes.map((tip) => (
                <li key={tip}>- {tip}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-line p-5">
            <h3 className="font-black text-ink">Most Discussed Levels</h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-action">
              {mostDiscussedLevels.map((level) => (
                <a key={level.levelSlug} href={routes.level(level.gameSlug, level.levelSlug)}>
                  Level {level.levelNumber}
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="Data Signals"
          title="Level Insights"
          description="Static data-driven modules for SEO depth and product discovery."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-line p-5">
            <h3 className="font-black text-ink">Level Difficulty Distribution</h3>
            <div className="mt-4 grid gap-4">
              {difficultyDistribution.map((item) => (
                <div key={item.difficulty}>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-ink">{item.difficulty}</span>
                    <span className="text-muted">{item.count} levels</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-paper">
                    <div
                      className="h-full rounded-full bg-action"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-line p-5">
            <h3 className="font-black text-ink">Popular Search Keywords</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularSearchKeywords.map((keyword) => (
                <a
                  key={keyword}
                  href={`/search?q=${encodeURIComponent(keyword)}`}
                  className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-action"
                >
                  {keyword}
                </a>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-line p-5">
            <h3 className="font-black text-ink">Completion Rate</h3>
            <div className="mt-5 text-4xl font-black text-action">{completionRate}%</div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-mint"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Placeholder completion data based on static popularity signals.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="SEO Guide"
          title={`How to solve ${game.name} levels`}
          description={`${game.name} levels are easier when you identify the main blocker, preserve temporary space, and follow a clear move order instead of clearing pieces randomly.`}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-paper p-5">
            <h3 className="font-black text-ink">Tips and tricks</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Use each level guide to confirm the opening move, the reserve space,
              and the final cleanup pattern before committing risky moves.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-5">
            <h3 className="font-black text-ink">Common stuck levels</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Search exact pages such as {game.name} Level 145 or {game.name} Level
              245 when you need a direct solution.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-5">
            <h3 className="font-black text-ink">Walkthrough format</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              PuzzleMaster focuses on written walkthroughs, concise solution steps,
              pro tips, common mistakes, FAQ, and related levels.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <SectionHeading title={`${game.name} FAQ`} />
        <div className="grid gap-4">
          {game.faq.map((item) => (
            <details key={item.question} className="rounded-2xl border border-line p-4">
              <summary className="cursor-pointer font-black text-ink">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Related Games"
          title="Related Games"
          description="Similar puzzle games grouped by category, search demand, and gameplay pattern."
        />
        <GameGrid games={relatedGames} compact />
      </section>
    </main>
  );
}
