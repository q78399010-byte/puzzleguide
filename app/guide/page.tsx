import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/seo-jsonld";
import { guideTypes, buildGuideSlug } from "@/data/guides";
import { getAllGames } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Explore Puzzle Guides | Beginner, Advanced & Hard Level Guides | PuzzleMaster",
  description:
    "Explore PuzzleMaster guide hubs for beginner guides, advanced strategy guides, hard level guides, and walkthrough collections.",
  alternates: {
    canonical: routes.guide
  },
  openGraph: {
    title: "Explore Puzzle Guides | PuzzleMaster",
    description:
      "Puzzle guide hub with beginner guides, advanced strategies, hard level guides, and walkthrough collections.",
    url: routes.guide,
    type: "website"
  }
};

const moduleDescriptions = [
  {
    title: "Beginner Guides",
    text: "Start with safer openings, simple level planning, and the most common early mistakes."
  },
  {
    title: "Advanced Strategy Guides",
    text: "Learn deeper board reading, blocker timing, storage planning, and cleanup routes."
  },
  {
    title: "Hard Level Guides",
    text: "Find hard-level help for stuck boards, hidden blockers, and exact move-order puzzles."
  },
  {
    title: "Level Walkthrough Collections",
    text: "Jump from game hubs into level lists, related levels, and solution-focused walkthroughs."
  }
];

export default function GuideHubPage() {
  const games = getAllGames().sort((a, b) => b.popularity - a.popularity);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the PuzzleMaster Guide Hub?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Guide Hub links to beginner guides, advanced strategy guides, hard level guides, and walkthrough collections for every PuzzleMaster game."
        }
      },
      {
        "@type": "Question",
        name: "Are guide pages static?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Guide pages are statically generated for SEO discovery and fast browsing."
        }
      }
    ]
  };

  return (
    <main className="container-page py-10">
      <SeoJsonLd data={jsonLd} />
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            Guide Hub
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Explore Puzzle Guides
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            Browse beginner guides, advanced strategy guides, hard level guides,
            and walkthrough collections for every PuzzleMaster game.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {moduleDescriptions.map((module) => (
          <article key={module.title} className="subtle-card p-5">
            <h2 className="text-xl font-black text-ink">{module.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{module.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Game Guide Pages</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {games.map((game) => (
            <article key={game.slug} className="content-card p-5">
              <h3 className="text-xl font-black text-ink">{game.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{game.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {guideTypes.map((guideType) => (
                  <Link
                    key={guideType.slug}
                    href={routes.guideDetail(buildGuideSlug(game.slug, guideType.slug))}
                    className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-action"
                  >
                    {guideType.title}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
