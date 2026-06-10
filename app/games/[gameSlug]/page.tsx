import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { ArrowAwayCollections } from "@/components/arrow-away/arrow-away-collections";
import { ArrowAwayCompare } from "@/components/arrow-away/arrow-away-compare";
import { ArrowAwayFaq } from "@/components/arrow-away/arrow-away-faq";
import { ArrowAwayGuide } from "@/components/arrow-away/arrow-away-guide";
import { ArrowAwaySolutions } from "@/components/arrow-away/arrow-away-solutions";
import { ArrowAwaySolver } from "@/components/arrow-away/arrow-away-solver";
import { ArrowAwayTips } from "@/components/arrow-away/arrow-away-tips";
import { BlockBlastCollections } from "@/components/block-blast/block-blast-collections";
import { BlockBlastCompare } from "@/components/block-blast/block-blast-compare";
import { BlockBlastFaq } from "@/components/block-blast/block-blast-faq";
import { BlockBlastGuide } from "@/components/block-blast/block-blast-guide";
import { BlockBlastSolutions } from "@/components/block-blast/block-blast-solutions";
import { BlockBlastSolver } from "@/components/block-blast/block-blast-solver";
import { BlockBlastTips } from "@/components/block-blast/block-blast-tips";
import { BallSortPuzzleCollections } from "@/components/ball-sort-puzzle/ball-sort-puzzle-collections";
import { BallSortPuzzleCompare } from "@/components/ball-sort-puzzle/ball-sort-puzzle-compare";
import { BallSortPuzzleFaq } from "@/components/ball-sort-puzzle/ball-sort-puzzle-faq";
import { BallSortPuzzleGuide } from "@/components/ball-sort-puzzle/ball-sort-puzzle-guide";
import { BallSortPuzzleSolutions } from "@/components/ball-sort-puzzle/ball-sort-puzzle-solutions";
import { BallSortPuzzleSolver } from "@/components/ball-sort-puzzle/ball-sort-puzzle-solver";
import { BallSortPuzzleTips } from "@/components/ball-sort-puzzle/ball-sort-puzzle-tips";
import { Breadcrumb } from "@/components/breadcrumb";
import { ColorWoodJamCollections } from "@/components/color-wood-jam/color-wood-jam-collections";
import { ColorWoodJamCompare } from "@/components/color-wood-jam/color-wood-jam-compare";
import { ColorWoodJamFaq } from "@/components/color-wood-jam/color-wood-jam-faq";
import { ColorWoodJamGuide } from "@/components/color-wood-jam/color-wood-jam-guide";
import { ColorWoodJamSolutions } from "@/components/color-wood-jam/color-wood-jam-solutions";
import { ColorWoodJamSolver } from "@/components/color-wood-jam/color-wood-jam-solver";
import { ColorWoodJamTips } from "@/components/color-wood-jam/color-wood-jam-tips";
import { GameGrid } from "@/components/game-grid";
import { GoodsSortCollections } from "@/components/goods-sort/goods-sort-collections";
import { GoodsSortCompare } from "@/components/goods-sort/goods-sort-compare";
import { GoodsSortFaq } from "@/components/goods-sort/goods-sort-faq";
import { GoodsSortGuide } from "@/components/goods-sort/goods-sort-guide";
import { GoodsSortSolutions } from "@/components/goods-sort/goods-sort-solutions";
import { GoodsSortSolver } from "@/components/goods-sort/goods-sort-solver";
import { GoodsSortTips } from "@/components/goods-sort/goods-sort-tips";
import { HexaSortCollections } from "@/components/hexa-sort/hexa-sort-collections";
import { HexaSortCompare } from "@/components/hexa-sort/hexa-sort-compare";
import { HexaSortFaq } from "@/components/hexa-sort/hexa-sort-faq";
import { HexaSortGuide } from "@/components/hexa-sort/hexa-sort-guide";
import { HexaSortSolutions } from "@/components/hexa-sort/hexa-sort-solutions";
import { HexaSortSolver } from "@/components/hexa-sort/hexa-sort-solver";
import { HexaSortTips } from "@/components/hexa-sort/hexa-sort-tips";
import { LevelList } from "@/components/level-list";
import { ParkingJamCollections } from "@/components/parking-jam/parking-jam-collections";
import { ParkingJamCompare } from "@/components/parking-jam/parking-jam-compare";
import { ParkingJamFaq } from "@/components/parking-jam/parking-jam-faq";
import { ParkingJamGuide } from "@/components/parking-jam/parking-jam-guide";
import { ParkingJamSolutions } from "@/components/parking-jam/parking-jam-solutions";
import { ParkingJamSolver } from "@/components/parking-jam/parking-jam-solver";
import { ParkingJamTips } from "@/components/parking-jam/parking-jam-tips";
import { SearchBox } from "@/components/search-box";
import { SectionHeading } from "@/components/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ScrewJamCollections } from "@/components/screw-jam/screw-jam-collections";
import { ScrewJamCompare } from "@/components/screw-jam/screw-jam-compare";
import { ScrewJamFaq } from "@/components/screw-jam/screw-jam-faq";
import { ScrewJamGuide } from "@/components/screw-jam/screw-jam-guide";
import { ScrewJamSolutions } from "@/components/screw-jam/screw-jam-solutions";
import { ScrewJamSolver } from "@/components/screw-jam/screw-jam-solver";
import { ScrewJamTips } from "@/components/screw-jam/screw-jam-tips";
import { WaterSortCollections } from "@/components/water-sort/water-sort-collections";
import { WaterSortCompare } from "@/components/water-sort/water-sort-compare";
import { WaterSortFaq } from "@/components/water-sort/water-sort-faq";
import { WaterSortGuide } from "@/components/water-sort/water-sort-guide";
import { WaterSortSolutions } from "@/components/water-sort/water-sort-solutions";
import { WaterSortSolver } from "@/components/water-sort/water-sort-solver";
import { WaterSortTips } from "@/components/water-sort/water-sort-tips";
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
  const isColorWoodJam = game.slug === "color-wood-jam";
  const isScrewJam = game.slug === "screw-jam";
  const isGoodsSort = game.slug === "goods-sort";
  const isWaterSort = game.slug === "water-sort";
  const isParkingJam = game.slug === "parking-jam";
  const isArrowAway = game.slug === "arrows-go";
  const isHexaSort = game.slug === "hexa-sort";
  const isBallSortPuzzle = game.slug === "ball-sort-puzzle";
  const isBlockBlast = game.slug === "block-blast";
  const hasPremiumGameModules =
    isColorWoodJam ||
    isScrewJam ||
    isGoodsSort ||
    isWaterSort ||
    isParkingJam ||
    isArrowAway ||
    isHexaSort ||
    isBallSortPuzzle ||
    isBlockBlast;

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Games", item: routes.games },
          { name: game.name, item: routes.game(game.slug) }
        ]}
      />
      <FaqJsonLd faq={game.faq} />
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

      {isColorWoodJam ? (
        <>
          <ColorWoodJamGuide />
          <ColorWoodJamTips />
          <ColorWoodJamSolutions />
          <ColorWoodJamSolver />
          <ColorWoodJamCompare />
          <ColorWoodJamCollections />
          <ColorWoodJamFaq faq={game.faq} />
        </>
      ) : null}

      {isScrewJam ? (
        <>
          <ScrewJamGuide />
          <ScrewJamTips />
          <ScrewJamSolutions />
          <ScrewJamSolver />
          <ScrewJamCompare />
          <ScrewJamCollections />
          <ScrewJamFaq faq={game.faq} />
        </>
      ) : null}

      {isGoodsSort ? (
        <>
          <GoodsSortGuide />
          <GoodsSortTips />
          <GoodsSortSolutions />
          <GoodsSortSolver />
          <GoodsSortCompare />
          <GoodsSortCollections />
          <GoodsSortFaq faq={game.faq} />
        </>
      ) : null}

      {isWaterSort ? (
        <>
          <WaterSortGuide />
          <WaterSortTips />
          <WaterSortSolutions />
          <WaterSortSolver />
          <WaterSortCompare />
          <WaterSortCollections />
          <WaterSortFaq faq={game.faq} />
        </>
      ) : null}

      {isParkingJam ? (
        <>
          <ParkingJamGuide />
          <ParkingJamTips />
          <ParkingJamSolutions />
          <ParkingJamSolver />
          <ParkingJamCompare />
          <ParkingJamCollections />
          <ParkingJamFaq faq={game.faq} />
        </>
      ) : null}

      {isArrowAway ? (
        <>
          <ArrowAwayGuide />
          <ArrowAwayTips />
          <ArrowAwaySolutions />
          <ArrowAwaySolver />
          <ArrowAwayCompare />
          <ArrowAwayCollections />
          <ArrowAwayFaq faq={game.faq} />
        </>
      ) : null}

      {isHexaSort ? (
        <>
          <HexaSortGuide />
          <HexaSortTips />
          <HexaSortSolutions />
          <HexaSortSolver />
          <HexaSortCompare />
          <HexaSortCollections />
          <HexaSortFaq faq={game.faq} />
        </>
      ) : null}

      {isBallSortPuzzle ? (
        <>
          <BallSortPuzzleGuide />
          <BallSortPuzzleTips />
          <BallSortPuzzleSolutions />
          <BallSortPuzzleSolver />
          <BallSortPuzzleCompare />
          <BallSortPuzzleCollections />
          <BallSortPuzzleFaq faq={game.faq} />
        </>
      ) : null}

      {isBlockBlast ? (
        <>
          <BlockBlastGuide />
          <BlockBlastTips />
          <BlockBlastSolutions />
          <BlockBlastSolver />
          <BlockBlastCompare />
          <BlockBlastCollections />
          <BlockBlastFaq faq={game.faq} />
        </>
      ) : null}

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

      {!hasPremiumGameModules ? (
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
      ) : null}

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
