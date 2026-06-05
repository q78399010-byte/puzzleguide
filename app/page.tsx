import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { GameGrid } from "@/components/game-grid";
import { LevelList } from "@/components/level-list";
import { SearchBox } from "@/components/search-box";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/data/categories";
import {
  getAllGames,
  getLatestLevels,
  getPopularLevels,
  getTrendingLevels
} from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "PuzzleMaster | Puzzle Game Walkthroughs & Level Guides",
  description:
    "Find written puzzle game walkthroughs, level guides, tips, and related levels for popular mobile puzzle games.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "PuzzleMaster | Puzzle Game Walkthroughs & Level Guides",
    description:
      "Search written puzzle walkthroughs, level guides, tips, and related puzzle game pages.",
    url: "/",
    type: "website"
  }
};

const quickSearches = [
  "Color Wood Jam Level 245",
  "Screw Jam Level 311",
  "Water Sort Level 245",
  "Ball Sort Puzzle Level 600"
];

export default function HomePage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);
  const popularGames = games.slice(0, 9);
  const latestLevels = getLatestLevels(6);
  const popularLevels = getPopularLevels(6);
  const trendingLevels = getTrendingLevels(6);

  return (
    <main className="bg-white">
      <section className="border-b border-line bg-white">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-mint">
              Written Puzzle Walkthroughs
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Find the move order for the puzzle level that has you stuck.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              PuzzleMaster collects practical walkthroughs for popular puzzle games:
              what to move first, which lane to keep open, where players get blocked,
              and which related levels use the same pattern.
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <SearchBox
              placeholder="Search a game or level, for example: Color Wood Jam Level 245"
              buttonLabel="Search"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
            {quickSearches.map((keyword) => (
              <Link
                key={keyword}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="rounded-full border border-line bg-paper px-4 py-2 text-muted hover:border-action hover:text-action"
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Popular Games"
          title="Popular Puzzle Games"
          description="Start from a game hub, then jump into level walkthroughs, tips, and related guides."
          href={routes.games}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <GameGrid games={popularGames} />
          <AdSlot className="lg:sticky lg:top-6 lg:self-start" />
        </div>
      </section>

      <section className="border-y border-line bg-paper py-12">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <div>
            <SectionHeading
              eyebrow="Latest"
              title="Latest Level Guides"
              description="Recently updated level pages with written move notes."
            />
            <LevelList levels={latestLevels} showGame />
          </div>

          <div>
            <SectionHeading
              eyebrow="Popular"
              title="Popular Walkthroughs"
              description="Frequently searched levels that players use for stuck-board help."
            />
            <LevelList levels={popularLevels} showGame ranked />
          </div>

          <div>
            <SectionHeading
              eyebrow="Trending"
              title="Trending Guides"
              description="High-interest pages based on recent updates and search demand."
            />
            <LevelList levels={trendingLevels} showGame ranked />
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Browse"
          title="Find Guides by Puzzle Type"
          description="Use categories when you know the mechanic but not the exact game name."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={routes.category(category.slug)}
              className="subtle-card p-5 transition hover:border-action hover:shadow-soft"
            >
              <h2 className="text-lg font-black text-ink">{category.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Walkthrough Hubs",
              text: "Browse written walkthrough collections for each supported puzzle game.",
              href: routes.walkthroughs
            },
            {
              title: "Tips and Mistakes",
              text: "Read short strategy pages for openings, late-board cleanup, and common traps.",
              href: routes.tips
            },
            {
              title: "Game Comparisons",
              text: "Compare puzzle games by difficulty, mechanics, and walkthrough demand.",
              href: routes.compare
            }
          ].map((item) => (
            <Link key={item.href} href={item.href} className="content-card p-6">
              <h2 className="text-2xl font-black text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              <span className="mt-5 inline-flex text-sm font-black text-action">
                Open section
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
