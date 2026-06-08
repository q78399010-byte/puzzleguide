import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { walkthroughsIndexFaq } from "@/data/faq-pages";
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
    url: routes.walkthroughs,
    type: "website"
  }
};

export default function WalkthroughsIndexPage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Walkthroughs", item: routes.walkthroughs }
        ]}
      />
      <FaqJsonLd faq={walkthroughsIndexFaq} />
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
