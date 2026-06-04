import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/seo-jsonld";
import { getAllGames } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Puzzle Game Walkthroughs by Game | PuzzleMaster",
  description:
    "Browse static puzzle walkthrough hubs for every PuzzleMaster game, including summaries, solutions, tips, and related levels.",
  alternates: {
    canonical: routes.walkthroughs
  },
  openGraph: {
    title: "Puzzle Game Walkthroughs | PuzzleMaster",
    description: "Puzzle walkthrough pages by game with level guide links.",
    type: "website"
  }
};

export default function WalkthroughsIndexPage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are PuzzleMaster walkthrough pages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Walkthrough pages connect game strategy, level guide links, solution notes, tips, common mistakes, and related levels."
        }
      }
    ]
  };

  return (
    <main className="container-page py-10">
      <SeoJsonLd data={jsonLd} />
      <section className="content-card p-6 sm:p-8">
        <h1 className="text-4xl font-black text-ink">Puzzle Game Walkthroughs</h1>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          Browse walkthrough hubs for every game on PuzzleMaster. Each page connects
          game strategy, exact level pages, and related solution paths.
        </p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.slug} href={routes.walkthrough(game.slug)} className="subtle-card p-5">
            <h2 className="font-black text-ink">{game.name} Walkthroughs</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{game.shortDescription}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
