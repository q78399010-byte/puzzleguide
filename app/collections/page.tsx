import type { Metadata } from "next";
import Link from "next/link";
import { collections } from "@/data/collections";
import { getGamesBySlugs } from "@/lib/discovery";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Best Puzzle Game Collections, Walkthroughs & Level Guides | PuzzleMaster",
  description:
    "Explore curated puzzle game collections, walkthrough hubs, level guide collections, similar games, and beginner-friendly puzzle lists.",
  alternates: {
    canonical: routes.collections
  },
  openGraph: {
    title: "Puzzle Game Collections | PuzzleMaster",
    description:
      "Curated puzzle game lists with walkthrough hubs, related games, and level guide collections.",
    url: routes.collections,
    type: "website"
  }
};

const faq = [
  {
    question: "What are puzzle game collections?",
    answer:
      "Collections group related puzzle games by theme, difficulty, gameplay style, or search intent."
  },
  {
    question: "How are these games selected?",
    answer:
      "Games are selected using static category data, popularity signals, related game links, and walkthrough coverage."
  },
  {
    question: "Do collections include walkthroughs?",
    answer:
      "Yes. Each collection links to game hubs where players can browse walkthroughs and level guides."
  },
  {
    question: "Which collection should beginners start with?",
    answer:
      "Top Puzzle Games for Beginners and Best Relaxing Puzzle Games are the easiest starting points."
  }
];

export default function CollectionsPage() {
  return (
    <main className="container-page py-10">
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            Collections
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Puzzle Game Collections
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            Explore curated puzzle game lists, walkthrough hubs, and level guide
            collections.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => {
          const relatedGames = getGamesBySlugs(collection.games).slice(0, 4);

          return (
            <Link
              key={collection.slug}
              href={routes.collection(collection.slug)}
              className="content-card block p-5 transition hover:-translate-y-1 hover:shadow-card"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
                {collection.estimatedGuidesCount} guides
              </p>
              <h2 className="mt-3 text-xl font-black text-ink">{collection.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{collection.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedGames.map((game) => (
                  <span
                    key={game.slug}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-action"
                  >
                    {game.name}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Puzzle game collections for SEO discovery</h2>
        <p className="mt-4 leading-8 text-muted">
          Puzzle game collections organize the best puzzle games into focused
          discovery paths. Instead of forcing users to search one game at a time,
          these pages group walkthrough collections, level guides, relaxing puzzle
          games, hard puzzle levels, and games like Color Wood Jam, Water Sort, or
          Screw Jam. Collections are useful for Google discovery because they match
          common search intent such as best puzzle games, puzzle game collections,
          walkthrough collections, and level guides. Each collection links to game
          hubs and detailed guide pages, giving players a clear path from browsing
          to solving.
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
