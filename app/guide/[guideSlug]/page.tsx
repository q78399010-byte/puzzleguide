import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LevelList } from "@/components/level-list";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { guideDetailFaq } from "@/data/faq-pages";
import { buildGuideSlug, guideTitle, guideTypes, parseGuideSlug } from "@/data/guides";
import { getAllGames, getGameBySlug, getLevelsByGame, getPopularLevels } from "@/lib/data";
import { routes } from "@/lib/routes";

export const dynamicParams = false;

type GuideDetailPageProps = {
  params: Promise<{
    guideSlug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGames().flatMap((game) =>
    guideTypes.map((guideType) => ({
      guideSlug: buildGuideSlug(game.slug, guideType.slug)
    }))
  );
}

export async function generateMetadata({
  params
}: GuideDetailPageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const parsed = parseGuideSlug(guideSlug);
  const game = parsed ? getGameBySlug(parsed.gameSlug) : undefined;

  if (!parsed || !game) {
    return {
      title: "Guide Not Found | PuzzleMaster"
    };
  }

  const title = `${guideTitle(game, parsed.guideType)} | PuzzleMaster`;
  const description = `${parsed.guideType.title} for ${game.name} levels with walkthroughs, solution planning, tips, common mistakes, and related level guides.`;

  return {
    title,
    description,
    alternates: {
      canonical: routes.guideDetail(guideSlug)
    },
    openGraph: {
      title,
      description,
      url: routes.guideDetail(guideSlug),
      type: "article"
    }
  };
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { guideSlug } = await params;
  const parsed = parseGuideSlug(guideSlug);
  const game = parsed ? getGameBySlug(parsed.gameSlug) : undefined;

  if (!parsed || !game) {
    notFound();
  }

  const levels = getLevelsByGame(game.slug);
  const popularLevels = getPopularLevels(6, game.slug);
  const title = guideTitle(game, parsed.guideType);
  const faq = guideDetailFaq(game.name);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Guide", item: routes.guide },
          { name: title, item: routes.guideDetail(guideSlug) }
        ]}
      />
      <FaqJsonLd faq={faq} />
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            {parsed.guideType.title}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            {parsed.guideType.description} This static guide connects {game.name}
            strategy with level walkthroughs and related solution pages.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Walkthrough Summary</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {game.name} levels are easier when you identify the main blocker,
            preserve temporary space, and follow a controlled move order.
          </p>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Tips & Tricks</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            {game.beginnerTips.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </article>
        <article className="subtle-card p-5">
          <h2 className="text-xl font-black text-ink">Common Mistakes</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            {game.commonMistakes.map((mistake) => (
              <li key={mistake}>- {mistake}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Related Levels</h2>
        <div className="mt-5">
          <LevelList levels={popularLevels} />
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Guide Notes</h2>
        <p className="mt-4 leading-8 text-muted">
          This {game.name} guide is part of the PuzzleMaster static SEO guide hub.
          It gives players a route from broad strategy to exact walkthrough pages.
          Use it to understand the opening move, the most likely mistake, and which
          level guides to check next. The game currently has {levels.length} indexed
          level pages on PuzzleMaster, all generated as static HTML for search
          discovery and fast browsing.
        </p>
        <Link
          href={routes.game(game.slug)}
          className="mt-5 inline-flex rounded-full bg-action px-5 py-3 text-sm font-black text-white"
        >
          Open {game.name} hub
        </Link>
      </section>
    </main>
  );
}
