import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { tipsIndexFaq } from "@/data/faq-pages";
import { getAllGames } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Puzzle Game Tips & Tricks by Game | PuzzleMaster",
  description:
    "Browse static puzzle tips pages for every PuzzleMaster game, including beginner tips, advanced strategy, and common mistakes.",
  alternates: {
    canonical: routes.tips
  },
  openGraph: {
    title: "Puzzle Game Tips | PuzzleMaster",
    description: "Puzzle tips and tricks pages by game with level guide links.",
    url: routes.tips,
    type: "website"
  }
};

export default function TipsIndexPage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Tips", item: routes.tips }
        ]}
      />
      <FaqJsonLd faq={tipsIndexFaq} />
      <section className="content-card p-6 sm:p-8">
        <h1 className="text-4xl font-black text-ink">Puzzle Game Tips</h1>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          Browse game-specific tips, beginner advice, advanced strategy, and common
          mistake notes for every PuzzleMaster game.
        </p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.slug} href={routes.tip(game.slug)} className="subtle-card p-5">
            <h2 className="font-black text-ink">{game.name} Tips</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{game.shortDescription}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
