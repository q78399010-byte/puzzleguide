import type { Metadata } from "next";
import Link from "next/link";
import { GameGrid } from "@/components/game-grid";
import { SectionHeading } from "@/components/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { discoverFaq } from "@/data/faq-pages";
import { getRecommendedGames, getTrendingDiscoveryGames } from "@/lib/discovery";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Discover Puzzle Games Like Color Wood Jam, Screw Jam & Water Sort | PuzzleMaster",
  description:
    "Discover similar puzzle games, trending brain teasers, relaxing sorting games, puzzle walkthroughs, and level guides on PuzzleMaster.",
  alternates: {
    canonical: routes.discover
  },
  openGraph: {
    title: "Discover Puzzle Games | PuzzleMaster",
    description:
      "Find similar puzzle games, relaxing sorting games, brain teasers, walkthrough hubs, and level guides.",
    url: routes.discover,
    type: "website"
  }
};

const recommendationRows = [
  {
    title: "If you like Color Wood Jam, try these:",
    gameSlug: "color-wood-jam"
  },
  {
    title: "If you like Water Sort, try these:",
    gameSlug: "water-sort"
  },
  {
    title: "If you like Screw Jam, try these:",
    gameSlug: "screw-jam"
  }
];

const discoveryTypes = [
  "Sorting Games",
  "Wood Puzzle Games",
  "Block Puzzle Games",
  "Brain Training Games",
  "Relaxing Puzzle Games",
  "Hard Level Puzzle Games"
];

export default function DiscoverPage() {
  const trendingGames = getTrendingDiscoveryGames(6);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Discover", item: routes.discover }
        ]}
      />
      <FaqJsonLd faq={discoverFaq} />
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            Game Discovery
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Discover Puzzle Games Youll Love
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            Find similar puzzle games, trending brain teasers, relaxing sorting
            games, and level-based walkthroughs.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {recommendationRows.map((row) => {
          const games = getRecommendedGames(row.gameSlug, 4);

          return (
            <article key={row.gameSlug} className="content-card p-5">
              <h2 className="text-xl font-black text-ink">{row.title}</h2>
              <div className="mt-4 grid gap-3">
                {games.map((game) => (
                  <Link
                    key={game.slug}
                    href={routes.game(game.slug)}
                    className="rounded-2xl border border-line p-4 transition hover:border-action"
                  >
                    <h3 className="font-black text-ink">{game.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {game.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Types"
          title="Game Type Discovery"
          description="Explore puzzle games by play style, difficulty, and discovery intent."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryTypes.map((type) => (
            <Link
              key={type}
              href={`/search?q=${encodeURIComponent(type)}`}
              className="subtle-card p-5 transition hover:border-action hover:shadow-soft"
            >
              <h2 className="font-black text-ink">{type}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Browse related puzzle games, walkthroughs, and level guide hubs.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Trending Discovery"
          title="Trending Discovery"
          description="Recommended puzzle games based on static popularity and walkthrough coverage."
        />
        <GameGrid games={trendingGames} />
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Find the best puzzle games for your next session</h2>
        <p className="mt-4 leading-8 text-muted">
          PuzzleMaster discovery pages help players find the best puzzle games by
          matching gameplay patterns instead of only listing names. If you enjoy
          similar puzzle games with color sorting, wood block movement, screw and
          bolt order planning, traffic routes, or board control, this page points
          you toward walkthrough hubs that already include level guides. Relaxing
          puzzle games such as Water Sort, Magic Sort, Ball Sort Puzzle, and Sort
          It Out are useful when you want calm organization challenges. Harder
          puzzle games such as Color Wood Jam, Screw Jam, Wood Nuts & Bolts, and
          Parking Jam are better when you want precise move order and stuck-level
          help. Each recommendation connects back to puzzle walkthroughs, solution
          pages, and level guides so users can move from discovery to direct help
          without changing platforms.
        </p>
      </section>

      <section className="mt-10 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4">
          {discoverFaq.map((item) => (
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
