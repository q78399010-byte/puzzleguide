import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameGrid } from "@/components/game-grid";
import { LevelList } from "@/components/level-list";
import { SectionHeading } from "@/components/section-heading";
import { collections } from "@/data/collections";
import {
  getCollectionBySlug,
  getGamesBySlugs,
  getRelatedCollections
} from "@/lib/discovery";
import { getPopularLevels } from "@/lib/data";
import { routes } from "@/lib/routes";

export const dynamicParams = false;

type CollectionPageProps = {
  params: Promise<{
    collectionSlug: string;
  }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({
    collectionSlug: collection.slug
  }));
}

export async function generateMetadata({
  params
}: CollectionPageProps): Promise<Metadata> {
  const { collectionSlug } = await params;
  const collection = getCollectionBySlug(collectionSlug);

  if (!collection) {
    return {
      title: "Collection Not Found | PuzzleMaster"
    };
  }

  const title = `${collection.title} with Walkthroughs & Level Guides | PuzzleMaster`;
  const description = `${collection.description} Browse related games, walkthroughs, level guides, tips, and puzzle solution hubs.`;

  return {
    title,
    description,
    alternates: {
      canonical: routes.collection(collection.slug)
    },
    openGraph: {
      title,
      description,
      url: routes.collection(collection.slug),
      type: "article"
    }
  };
}

function collectionEssay(title: string, keywords: string[]) {
  return `${title} is a curated PuzzleMaster collection built for players who want a practical way to discover puzzle games and move directly into walkthrough support. Instead of presenting a loose list of apps, this page groups games by shared mechanics, difficulty signals, search demand, and the availability of level guides. The result is useful for players who search for ${keywords.join(", ")} and want a clear starting point.

Puzzle games often overlap in subtle ways. A sorting game may feel relaxing at first but become difficult when temporary storage disappears. A wood puzzle may look calm but require exact move order. A traffic or screw puzzle may depend on reading hidden blockers several moves ahead. Collections help users compare those patterns before choosing what to play next.

This collection also supports walkthrough discovery. Every recommended game links back to a PuzzleMaster game hub, and each hub connects to static level pages with summaries, step-by-step solutions, pro tips, common mistakes, FAQ, and related levels. That structure makes the collection more than a simple recommendation list. It becomes a bridge between best puzzle games, similar puzzle games, puzzle walkthroughs, and level guide pages.

Beginners can use the collection to find easier games with calmer pacing. Advanced players can use it to locate harder puzzle levels and games where exact solution order matters. Because the content is static and SEO-friendly, the page is designed to be easy for search engines to crawl while still giving players useful navigation.`;
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { collectionSlug } = await params;
  const collection = getCollectionBySlug(collectionSlug);

  if (!collection) {
    notFound();
  }

  const games = getGamesBySlugs(collection.games);
  const relatedCollections = getRelatedCollections(collection.relatedCollections);
  const relatedWalkthroughs = getPopularLevels(6).filter((level) =>
    collection.games.includes(level.gameSlug)
  );

  return (
    <main className="container-page py-10">
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            Collection
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {collection.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            {collection.intro}
          </p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Recommended Games"
          title="Recommended Games"
          description={collection.description}
        />
        <GameGrid games={games} />
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Why play these games?</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            These games share related mechanics, strong walkthrough demand, and
            level-based progression that makes them useful for PuzzleMaster users.
          </p>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Best for</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            {collection.bestFor.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Keywords</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {collection.keywords.map((keyword) => (
              <Link
                key={keyword}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-action"
              >
                {keyword}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Walkthroughs"
          title="Related Walkthroughs"
          description="Popular level guides from games in this collection."
        />
        <LevelList levels={relatedWalkthroughs} showGame ranked />
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">SEO Guide</h2>
        <p className="mt-4 whitespace-pre-line leading-8 text-muted">
          {collectionEssay(collection.title, collection.keywords)}
        </p>
      </section>

      <section className="mt-12">
        <SectionHeading title="Related Collections" />
        <div className="grid gap-4 md:grid-cols-2">
          {relatedCollections.map((related) => (
            <Link
              key={related.slug}
              href={routes.collection(related.slug)}
              className="subtle-card p-5 transition hover:border-action hover:shadow-soft"
            >
              <h2 className="font-black text-ink">{related.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{related.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4">
          {collection.faq.map((item) => (
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
