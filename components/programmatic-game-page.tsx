import Link from "next/link";
import { LevelList } from "@/components/level-list";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { SeoJsonLd } from "@/components/seo-jsonld";
import type { Game } from "@/data/games";
import type { ProgrammaticType } from "@/data/programmatic";
import type { LevelGuide } from "@/data/levels";
import { programmaticGameFaq } from "@/data/faq-pages";
import { routes } from "@/lib/routes";

type ProgrammaticGamePageProps = {
  game: Game;
  pageType: ProgrammaticType;
  levels: LevelGuide[];
};

function pathForType(pageType: ProgrammaticType, gameSlug: string) {
  if (pageType.slug === "solutions") {
    return routes.solution(gameSlug);
  }

  if (pageType.slug === "tips") {
    return routes.tip(gameSlug);
  }

  return routes.walkthrough(gameSlug);
}

function parentForType(pageType: ProgrammaticType) {
  if (pageType.slug === "solutions") {
    return { name: "Solutions", item: routes.solutions };
  }

  if (pageType.slug === "tips") {
    return { name: "Tips", item: routes.tips };
  }

  return { name: "Walkthroughs", item: routes.walkthroughs };
}

export function ProgrammaticGamePage({
  game,
  pageType,
  levels
}: ProgrammaticGamePageProps) {
  const featuredLevels = levels.slice(0, 8);
  const faq = programmaticGameFaq(game.name, pageType);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${game.name} ${pageType.singular} Guide`,
        description: `${game.name} ${pageType.slug} page with walkthrough summary, step-by-step solution notes, tips, common mistakes, and related levels.`,
        mainEntityOfPage: pathForType(pageType, game.slug),
        author: {
          "@type": "Organization",
          name: "PuzzleMaster"
        },
        publisher: {
          "@type": "Organization",
          name: "PuzzleMaster"
        }
      }
    ]
  };

  return (
    <main className="container-page py-10">
      <SeoJsonLd data={jsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          parentForType(pageType),
          {
            name: `${game.name} ${pageType.slug === "tips" ? "Tips" : pageType.singular + "s"}`,
            item: pathForType(pageType, game.slug)
          }
        ]}
      />
      <FaqJsonLd faq={faq} />
      <section className="content-card overflow-hidden">
        <div className="top-shell p-6 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-50">
            {pageType.singular}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {game.name} {pageType.singular} Guide
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50">
            {pageType.description} Browse {game.name} walkthroughs, solutions,
            tips, common mistakes, and related level guides.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <article className="content-card p-6">
          <h2 className="text-2xl font-black text-ink">Walkthrough Summary</h2>
          <p className="mt-4 leading-8 text-muted">
            {game.name} is a {game.difficulty.toLowerCase()} puzzle game in the{" "}
            {game.categoryName} category. The safest way to approach its levels is
            to identify the main blocker first, keep reserve space open, and avoid
            moves that only solve the immediate visual problem.
          </p>
        </article>
        <article className="content-card p-6">
          <h2 className="text-2xl font-black text-ink">Step-by-step Solution</h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            <li>1. Start with the safest opening move and preserve temporary space.</li>
            <li>2. Clear blockers in the order that opens the most future moves.</li>
            <li>3. Use related level guides when the final sequence is locked.</li>
          </ol>
        </article>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="content-card p-6">
          <h2 className="text-2xl font-black text-ink">Tips & Tricks</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            {[...game.beginnerTips, ...game.advancedStrategy.slice(0, 2)].map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </article>
        <article className="content-card p-6">
          <h2 className="text-2xl font-black text-ink">Common Mistakes</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
            {game.commonMistakes.map((mistake) => (
              <li key={mistake}>- {mistake}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Related Levels</h2>
        <div className="mt-5">
          <LevelList levels={featuredLevels} />
        </div>
      </section>

      <section className="mt-12 content-card p-6 sm:p-8">
        <h2 className="text-2xl font-black text-ink">Related Pages</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={routes.game(game.slug)} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-action">
            Game hub
          </Link>
          <Link href={routes.solution(game.slug)} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-action">
            Solutions
          </Link>
          <Link href={routes.tip(game.slug)} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-action">
            Tips
          </Link>
          <Link href={routes.walkthrough(game.slug)} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-action">
            Walkthroughs
          </Link>
        </div>
      </section>
    </main>
  );
}
