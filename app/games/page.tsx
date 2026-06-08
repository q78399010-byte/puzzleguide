import type { Metadata } from "next";
import Link from "next/link";
import { GameGrid } from "@/components/game-grid";
import { SearchBox } from "@/components/search-box";
import { SectionHeading } from "@/components/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { categories } from "@/data/categories";
import { getAllGames } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "All Puzzle Games, Walkthroughs & Level Guides | PuzzleMaster",
  description:
    "Browse PuzzleMaster games with walkthrough pages, solution hubs, level guide collections, discovery links, and comparison paths.",
  alternates: {
    canonical: "/games"
  }
};

export default function GamesPage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Games", item: routes.games }
        ]}
      />
      <div className="content-card overflow-hidden">
        <div className="bg-paper p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
            Game Library
          </p>
          <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            Puzzle Game Walkthrough Library
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Browse walkthroughs, solutions, level guides, and tips across 30 puzzle
            games including Color Wood Jam, Screw Jam, Water Sort, Parking Jam,
            Brain Test, Ball Sort Puzzle, Unblock Me, and more.
          </p>
          <div className="mt-6 max-w-2xl">
            <SearchBox placeholder="Search games, for example: Screw Jam or Water Sort" />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-line p-4">
          <Link
            href={routes.games}
            className="shrink-0 rounded-full bg-action px-4 py-2 text-sm font-bold text-white"
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={routes.category(category.slug)}
              className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-bold text-muted hover:border-action hover:text-action"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="mt-10">
        <SectionHeading
          title="All Games"
          description="Static game hubs generated for SEO-friendly walkthrough discovery."
        />
        <GameGrid games={games} />
      </section>
    </main>
  );
}
