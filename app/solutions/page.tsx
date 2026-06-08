import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { solutionsIndexFaq } from "@/data/faq-pages";
import { getAllGames } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Puzzle Game Solutions by Game | PuzzleMaster",
  description:
    "Browse static puzzle game solution hubs for every PuzzleMaster game, including step-by-step help, tips, mistakes, and related levels.",
  alternates: {
    canonical: routes.solutions
  },
  openGraph: {
    title: "Puzzle Game Solutions | PuzzleMaster",
    description: "Static puzzle solution pages by game with related level guides.",
    url: routes.solutions,
    type: "website"
  }
};

export default function SolutionsIndexPage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Solutions", item: routes.solutions }
        ]}
      />
      <FaqJsonLd faq={solutionsIndexFaq} />
      <section className="content-card p-6 sm:p-8">
        <h1 className="text-4xl font-black text-ink">Puzzle Game Solutions</h1>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          Browse solution hubs for every game on PuzzleMaster. Each page links to
          walkthrough summaries, step-by-step help, tips, common mistakes, and
          related levels.
        </p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.slug} href={routes.solution(game.slug)} className="subtle-card p-5">
            <h2 className="font-black text-ink">{game.name} Solutions</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{game.shortDescription}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
