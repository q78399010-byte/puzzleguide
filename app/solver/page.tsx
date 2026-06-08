import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { games } from "@/data/games";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Puzzle Guide Finder | Find Level Walkthroughs | PuzzleMaster",
  description:
    "Use the PuzzleMaster guide finder to jump from a puzzle game to walkthrough hubs, level guides, tips, and solution pages.",
  alternates: {
    canonical: "/solver"
  },
  openGraph: {
    title: "Puzzle Guide Finder | PuzzleMaster",
    description:
      "Find puzzle game walkthrough hubs, level guides, tips, and solution pages.",
    url: "/solver",
    type: "article"
  }
};

const finderSteps = [
  {
    title: "Pick the game",
    text: "Start with the game hub so the level list, tips, and related games match the puzzle you are playing."
  },
  {
    title: "Search the level",
    text: "Use the search page for exact queries such as Color Wood Jam Level 245 or Screw Jam Level 311."
  },
  {
    title: "Compare related levels",
    text: "Check nearby levels when the same blocker, lane, tray, or color pattern appears again."
  }
];

export default function SolverPage() {
  const popularGames = [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 8);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Solver", item: routes.solver }
        ]}
      />
      <section className="content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Guide Finder
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
          Puzzle Guide Finder
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Use this page as a clean starting point when you know the game but need the
          right walkthrough path. Pick a popular game, search the exact level, or
          move into tips and related levels.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {finderSteps.map((item, index) => (
            <article key={item.title} className="subtle-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-action">
                {index + 1}
              </span>
              <h2 className="mt-4 font-black text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Popular Starting Points</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularGames.map((game) => (
            <Link
              key={game.slug}
              href={routes.game(game.slug)}
              className="rounded-2xl border border-line bg-white p-4 transition hover:border-action"
            >
              <h3 className="font-black text-ink">{game.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Browse level walkthroughs, tips, and related puzzle guides.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {[
          { title: "Search Levels", href: routes.search },
          { title: "Walkthrough Hubs", href: routes.walkthroughs },
          { title: "Tips Pages", href: routes.tips }
        ].map((item) => (
          <Link key={item.href} href={item.href} className="content-card p-6">
            <h2 className="text-2xl font-black text-ink">{item.title}</h2>
            <span className="mt-4 inline-flex text-sm font-black text-action">
              Open
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
