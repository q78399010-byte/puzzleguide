import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { Breadcrumb } from "@/components/breadcrumb";
import { LevelList } from "@/components/level-list";
import { SeoJsonLd } from "@/components/seo-jsonld";
import { SectionHeading } from "@/components/section-heading";
import { getGameMedia } from "@/data/game-media";
import { levels } from "@/data/levels";
import {
  getFeaturedLevelManualContent,
  getTopLevelManualContent
} from "@/data/top-level-content";
import { getGameBySlug, getLevelBySlug, getRelatedLevels } from "@/lib/data";
import { routes } from "@/lib/routes";
import { formatDate, formatNumber, levelMetadata } from "@/lib/seo";

export const dynamicParams = false;

type LevelPageProps = {
  params: Promise<{
    gameSlug: string;
    levelSlug: string;
  }>;
};

type ManualLevelContent = {
  title: string;
  metaDescription: string;
  heroDescription?: string;
  goal?: string;
  introduction: string;
  whyPlayersGetStuck: string;
  beforeYouStart: string;
  steps: string[];
  proTips: string[];
  commonMistakes: string[];
  alternativeStrategy: string;
  relatedLevels: {
    label: string;
    href?: string;
  }[];
  relatedGames: {
    name: string;
    slug: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

const manualLevelContentByPath: Record<string, ManualLevelContent> = {
  "color-wood-jam/level-245": {
    title: "Color Wood Jam Level 245 Walkthrough",
    metaDescription:
      "Struggling with Color Wood Jam Level 245? Learn how to solve it step by step, avoid common mistakes, and master tricky moves to clear this challenging level.",
    heroDescription:
      "A practical written route through Level 245, focused on tile order, lane control, and avoiding the column jams that usually cause restarts.",
    introduction:
      "Stuck on Color Wood Jam Level 245? The level is beatable, but it punishes quick, hopeful moves. The board uses tile patterns that seem open at first glance, while the limited moves force you to think about what each slide unlocks next. Column blocking is the main pressure point: one piece in the wrong lane can stop two or three later tiles from reaching their slots. Use this walkthrough as a steady plan. The aim is not to clear everything fast, but to keep space moving until the middle tiles can leave cleanly.",
    goal:
      "The goal is to open the side lanes first, protect one buffer column, and avoid dropping top tiles into the middle before the lower exits are ready. Once the center has room, clear the middle tiles one at a time and finish through the open lane.",
    whyPlayersGetStuck:
      "Players usually get stuck because Level 245 hides its traps behind tiles that look free. A tile may have a clear path to move, but if it fills the only spare lane, it blocks another color that needs that same column later. Certain columns can get jammed after the first few moves, especially when the center is used as storage instead of kept open. Wrong first moves also limit options because the board has very little room to recover. Another easy miss is the repeated pattern near the top and side tiles. It looks like a simple match, but the safer move is often the one that opens two slots, not the one that clears one tile immediately. If your attempts keep ending with one trapped middle piece, the issue is probably an early column choice, not the final move.",
    beforeYouStart:
      "Before you start, slow down and scan the full board from the edges inward. Mark the tiles that can free a column or create an empty slot for later turns. Your first priority is to release the key columns, not to chase the nearest matching tile. Avoid parking pieces in the middle unless they are about to clear, because the center becomes the hardest area to fix. Try to keep at least one open lane on the side of the board. That lane works as a buffer when a tile needs to move out, pause, and return.",
    steps: [
      "Step 1: Identify tiles that free multiple slots. Look for the tile that opens more than one follow-up move near a partially blocked column. Move that tile first even if another match looks more obvious. On Level 245, the strongest opener is the one that gives you breathing room, not the one that clears a single color. After the first move, check whether a second tile now has a clean lane.",
      "Step 2: Clear edges before center. Work along the outer lanes while they still have room to slide. Edge tiles are safer because they usually leave the middle available for later repositioning. Clear the side pieces that expose buried colors, then pause before touching the center. If an edge move would fill your only spare column, skip it. The goal is to widen the board before the tight section begins.",
      "Step 3: Avoid moving locked tiles too early. Some tiles look movable but are really holding the pattern together. If moving one would land it in front of a blocked column, leave it until another lane opens. A locked tile should move only when it either clears at once or releases a tile behind it. This keeps the board from turning into a stack of pieces that all need the same exit.",
      "Step 4: Keep an open lane. Choose one column, preferably near the side, and treat it as your buffer. Do not fill it with a tile that has no immediate follow-up. When the middle starts to loosen, use that lane to rotate pieces out and back into place. This is the difference between a controlled solve and a late jam where every remaining tile seems one move short.",
      "Step 5: Solve middle tiles carefully. Once the edges are lighter and your buffer lane is still open, start moving the middle pieces one at a time. Do not clear two center tiles in a row unless the first clear creates new space. Watch which colors are waiting above or below the middle. If a move blocks a hidden pattern, choose the tile that opens the column instead.",
      "Step 6: Clean remaining tiles and finish the level. In the last section, stop chasing speed and check every column before moving. Clear the pieces that are already aligned, then use the open lane to handle the final awkward tile. Avoid moving top tiles down too early, because they can block the last exit. If you kept one lane free, the final clears should fall into place without needing a booster."
    ],
    proTips: [
      "Watch repeated edge patterns; one copy usually opens a safer column.",
      "Keep one buffer column open until the middle is almost solved.",
      "Don't rush movable top tiles; they can drop into the last exit.",
      "After every move, check what changed behind the tile.",
      "Use restarts to learn which column needs protection next."
    ],
    commonMistakes: [
      "Moving randomly turns Level 245 into guesswork instead of a sequence.",
      "Ignoring hidden column patterns lets two colors fight for one lane.",
      "Blocking middle tiles early removes the recovery space you need later.",
      "Clearing every visible match wastes moves when it opens no space.",
      "Saving the tightest column for last is risky; free it early."
    ],
    alternativeStrategy:
      "An alternative strategy is to start on the right side first, then use the open space to rotate into the left side. This works well if your normal attempts keep jamming the center. Begin by clearing the right-side column that releases the most space, then keep one nearby slot empty as a turning point. Move only the left-side tiles that can clear immediately or that open a blocked color behind them. Once the right side is stable, shift your attention across the board and clear the left columns from outside to inside. The advantage of this route is control: you are not trying to solve the whole board at once. You are building a pocket, using it to move awkward tiles, and then closing the level after the middle has fewer ways to block itself.",
    relatedLevels: [
      {
        label: "Color Wood Jam Level 12",
        href: routes.level("color-wood-jam", "level-12")
      },
      {
        label: "Color Wood Jam Level 137",
        href: routes.level("color-wood-jam", "level-137")
      },
      {
        label: "Color Wood Jam Level 276",
        href: routes.level("color-wood-jam", "level-276")
      }
    ],
    relatedGames: [
      { name: "Color Wood Jam", slug: "color-wood-jam" },
      { name: "Screw Jam", slug: "screw-jam" },
      { name: "Water Sort", slug: "water-sort" },
      { name: "Block Blast", slug: "block-blast" }
    ],
    faq: [
      {
        question: "Is Level 245 hard?",
        answer:
          "Yes, Level 245 is harder than many nearby Color Wood Jam stages because space disappears quickly. The tile patterns are readable, but the limited moves leave little room for trial and error. If you protect one lane and clear the edges first, the difficulty drops a lot."
      },
      {
        question: "Which tile to move first?",
        answer:
          "Move the tile that frees multiple slots, not necessarily the tile closest to a match. A good first move opens a column, reveals another color, or creates a safe buffer lane. If your opener only clears one tile and blocks the center, it is probably too risky."
      },
      {
        question: "How to avoid column jams?",
        answer:
          "Keep one side column open until the middle is under control. Before moving any tile into a column, check whether another color will need that same path later. Most jams happen when a useful lane becomes temporary storage for a tile that cannot clear."
      },
      {
        question: "Can I solve without hints?",
        answer:
          "Yes. You can solve it without hints if you play slowly and restart carefully with a purpose when needed. Watch which column blocks your failed attempt, then adjust the opening. The level rewards observation more than luck or booster use."
      },
      {
        question: "Should I clear edges first?",
        answer:
          "Usually yes. Edges give you safer movement because they widen the board and keep the center available. Clear edge tiles that reveal buried colors or open columns, then move into the center only when you have a buffer lane ready."
      },
      {
        question: "What is the safest sequence?",
        answer:
          "The safest sequence is edges first, locked tiles later, middle tiles one at a time, then final cleanup through your open lane. Do not treat this as a strict color order. Treat it as a space order: open room, protect lanes, clear the middle, finish calmly."
      }
    ]
  },
  "screw-jam/level-311": {
    title: "Screw Jam Level 311 Walkthrough",
    metaDescription:
      "Need help with Screw Jam Level 311? Learn what to move first, how to avoid blocking screws, and the best way to clear this tricky puzzle level.",
    introduction:
      "Stuck on Screw Jam Level 311? The board gets tight quickly, and the order of the screws matters more than it may seem at first. This stage is mostly about screw order, blocked panels, and limited space. If you remove the wrong screw early, a panel that looked harmless can sit in the way of the next move. The safest way through is to open the edges first, leave yourself a lane, and handle the middle only after the board has room to breathe.",
    goal:
      "The goal is to open an outside lane, keep that lane available, and remove center screws only when the released panel has somewhere to go. If the side lane stays clear, the final panels can slide out without forcing the board into a dead end.",
    whyPlayersGetStuck:
      "Most failed runs on Level 311 start with a screw that looks available but quietly blocks a later panel. The middle area fills up fast, and once two panels overlap the same lane, it becomes hard to recover without wasting moves. Another common trap is removing a screw just because it is exposed. In Screw Jam, exposed does not always mean safe. Some screws hold panels that should stay in place until another piece has moved out of the way. Corner pieces are also easy to ignore because they do not look urgent, but they often decide whether the final panel can slide free. If the center feels blocked, the mistake usually happened a few moves earlier when an outer screw was left untouched.",
    beforeYouStart:
      "Before making the first move, scan the board for screws that free more than one panel or open a clear lane along the edge. Those are usually safer than center screws. Do not rush into the middle just because the screw is visible. The center only works after you have space to move panels out of it. Try to keep at least one open path on the side of the board. That open path gives you a place to send panels when the middle starts to crowd.",
    steps: [
      "Step 1: Open the safest outer screws. Start with the screws along the edge that release space without pushing a panel into the middle. These early moves should make the board wider, not busier. If two screws look equally safe, choose the one that opens a lane for another panel right away. Avoid removing a screw that sends a long piece into the center before you have somewhere for it to go.",
      "Step 2: Create room before touching the middle. The center of Level 311 is tempting because several screws look ready, but moving them too early can trap the panels around them. A safer move is to clear one side lane first, then use that lane as a parking area for panels that need to move later. If the middle feels blocked, do not force it. Make one more edge move and check again.",
      "Step 3: Clear locked panels in the correct order. Once the outer lane is open, look for the panel that is holding back the next two moves. Remove its screw only after the panel behind it has room to shift. This part is where many runs fail: players clear a screw, the panel drops into a narrow space, and the next screw becomes useless. Keep the order simple: free space, move panel, then remove the screw that was trapped behind it.",
      "Step 4: Watch the corner screws. The corner screws in Level 311 are easy to leave for later, but they can become a problem if the middle fills up first. Check both corners before you commit to the center. If a corner panel is angled toward your open lane, clear it while the lane is still free. Waiting too long can leave the corner blocked by a panel you already moved into the wrong spot.",
      "Step 5: Use the open lane to finish the center. After the edge and corners are under control, the center becomes much safer. Move the central screws only when each released panel has a clear direction to leave. Do not remove two center screws back to back unless the first panel has already moved out. The goal is to keep the middle flexible, not to empty it as fast as possible.",
      "Step 6: Clean up the final blocked pieces. Before the last few moves, pause and check for any panel that could be trapped by your next screw. The final section of Screw Jam Level 311 usually fails when one small piece blocks the only open path. Clear the piece that protects the lane first, then remove the last screws in a clean order. If the board still has one open side, the ending should finish without forcing a restart."
    ],
    proTips: [
      "Treat the outer screws as setup moves. If they open space without crowding the center, they are usually worth taking early.",
      "Do not remove a center screw just because it is visible. Check where the released panel will go next.",
      "Leave yourself a lane on one side of the board. That lane is your recovery space when the middle starts to feel tight.",
      "Before clearing a corner, check whether it supports another panel. Some corner screws look minor but control the ending.",
      "If a move gives you only one possible follow-up, slow down. A safer move is usually the one that leaves two options."
    ],
    commonMistakes: [
      "Clearing the center too early. This often pushes panels into the same lane and leaves no room for the next screw.",
      "Ignoring corner screws until the end. Corners look quiet, but they can block the final panel when the board is already crowded.",
      "Removing screws without checking the panel behind them. In Level 311, the second panel matters as much as the first one.",
      "Using the open lane for a low-value move. Once that lane is filled, the middle becomes much harder to control.",
      "Trying to finish too fast after the first good clear. The board can still lock up if the final blocked pieces are not handled in order."
    ],
    alternativeStrategy:
      "If the normal route keeps getting stuck, try playing the level from one edge instead of working straight through the middle. Pick the side that gives you the cleanest first lane, then clear two or three screws there before touching the center. This gives you a small amount of breathing room and makes the middle less risky. The tradeoff is that you need to be patient with the opposite corner. Do not forget it, but do not rush it either. Once one side is open, use that space to move the central panels out one at a time. This route is a little slower, but it is safer if your usual attempt keeps running out of space near the end.",
    relatedLevels: [
      {
        label: "Screw Jam Level 294",
        href: routes.level("screw-jam", "level-294")
      },
      {
        label: "Screw Jam Level 333",
        href: routes.level("screw-jam", "level-333")
      },
      {
        label: "Screw Jam Level 349",
        href: routes.level("screw-jam", "level-349")
      },
      {
        label: "Screw Jam Level 365",
        href: routes.level("screw-jam", "level-365")
      }
    ],
    relatedGames: [
      { name: "Color Wood Jam", slug: "color-wood-jam" },
      { name: "Water Sort", slug: "water-sort" },
      { name: "Block Blast", slug: "block-blast" },
      { name: "Magic Sort", slug: "magic-sort" }
    ],
    faq: [
      {
        question: "Is Screw Jam Level 311 hard?",
        answer:
          "Yes, it is harder than it looks because the center can become crowded after only a few wrong moves. The puzzle is not about speed. It is about keeping one lane open while you clear screws in an order that lets the panels move safely."
      },
      {
        question: "What should I move first?",
        answer:
          "Start with the safest outer screw that opens space without sending a panel into the middle. If a screw frees more than one future move, it is usually a better opening than a center screw that only looks convenient."
      },
      {
        question: "Why do I keep running out of space?",
        answer:
          "You are probably using the open lane too early or moving center screws before the edges are ready. Level 311 needs a little breathing room. Keep one side open until the central panels have somewhere to move."
      },
      {
        question: "Can I solve it without boosters?",
        answer:
          "Yes. Boosters can help if the board is already blocked, but they are not the main answer here. Careful screw order and space management are enough if you avoid crowding the center too early."
      },
      {
        question: "Should I clear the center first?",
        answer:
          "Usually no. The center is safer after you have opened at least one edge lane. If you clear it first, the released panels can block each other and make the corner screws much harder to reach."
      },
      {
        question: "What is the safest strategy?",
        answer:
          "Open the outer screws first, protect one lane, then clear the center one panel at a time. Before each move, check where the released panel will go. If it has no clean path, make another setup move instead."
      }
    ]
  }
};

const publicRoot = path.join(process.cwd(), "public");

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function localPublicFileExists(urlPath: string, requiredPrefix: "/images/" | "/gifs/") {
  const normalizedPath = path.posix.normalize(urlPath);

  if (!normalizedPath.startsWith(requiredPrefix)) {
    return false;
  }

  const resolvedPath = path.resolve(publicRoot, normalizedPath.slice(1));

  if (!resolvedPath.startsWith(`${publicRoot}${path.sep}`)) {
    return false;
  }

  return existsSync(resolvedPath);
}

function isRenderableMediaUrl(
  url: string | null,
  requiredPrefix: "/images/" | "/gifs/"
) {
  if (!url) {
    return false;
  }

  if (isHttpsUrl(url)) {
    return true;
  }

  return localPublicFileExists(url, requiredPrefix);
}

function getManualLevelContent(gameSlug: string, levelSlug: string) {
  return (
    getFeaturedLevelManualContent(gameSlug, levelSlug) ??
    manualLevelContentByPath[`${gameSlug}/${levelSlug}`] ??
    getTopLevelManualContent(gameSlug, levelSlug)
  );
}

export function generateStaticParams() {
  return levels.map((level) => ({
    gameSlug: level.gameSlug,
    levelSlug: level.levelSlug
  }));
}

export async function generateMetadata({ params }: LevelPageProps): Promise<Metadata> {
  const { gameSlug, levelSlug } = await params;
  const level = getLevelBySlug(gameSlug, levelSlug);

  if (!level) {
    return {
      title: "Level Not Found | PuzzleMaster"
    };
  }

  const manualContent = getManualLevelContent(gameSlug, levelSlug);

  if (manualContent) {
    const title = `${manualContent.title} | PuzzleMaster`;

    return {
      title,
      description: manualContent.metaDescription,
      alternates: {
        canonical: routes.level(level.gameSlug, level.levelSlug)
      },
      openGraph: {
        title,
        description: manualContent.metaDescription,
        url: routes.level(level.gameSlug, level.levelSlug),
        type: "article"
      }
    };
  }

  return levelMetadata(level);
}

export default async function LevelDetailPage({ params }: LevelPageProps) {
  const { gameSlug, levelSlug } = await params;
  const game = getGameBySlug(gameSlug);
  const level = getLevelBySlug(gameSlug, levelSlug);

  if (!game || !level) {
    notFound();
  }

  const manualContent = getManualLevelContent(game.slug, level.levelSlug);
  const pageTitle =
    manualContent?.title ?? `${game.name} Level ${level.levelNumber} Walkthrough`;
  const pageDescription =
    manualContent?.heroDescription ?? manualContent?.introduction ?? level.summary;
  const pageSteps = manualContent?.steps ?? level.steps;
  const pageTips = manualContent?.proTips ?? level.tips;
  const pageMistakes = manualContent?.commonMistakes ?? level.commonMistakes;
  const pageFaq = manualContent?.faq ?? level.faq;
  const media = getGameMedia(game.slug, level.levelNumber);
  const youtubeEmbedUrl = media?.youtubeEmbedUrl ?? null;
  const imageUrl = isRenderableMediaUrl(media?.imageUrl ?? null, "/images/")
    ? media?.imageUrl ?? null
    : null;
  const gifUrl = isRenderableMediaUrl(media?.gifUrl ?? null, "/gifs/")
    ? media?.gifUrl ?? null
    : null;
  const hasMedia = Boolean(youtubeEmbedUrl || imageUrl || gifUrl);
  const pageGoal =
    manualContent?.goal ??
    `The goal of ${game.name} Level ${level.levelNumber} is to create working space before forcing the main clear. Open the safest lane first, protect one reserve move, and only start the final sequence when the blocker has a clean route.`;
  const relatedLevels = getRelatedLevels(game.slug, level.levelNumber, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: pageTitle,
        description: manualContent?.metaDescription ?? level.summary,
        dateModified: level.updatedAt,
        datePublished: level.updatedAt,
        author: {
          "@type": "Organization",
          name: "PuzzleMaster"
        },
        publisher: {
          "@type": "Organization",
          name: "PuzzleMaster"
        },
        mainEntityOfPage: routes.level(game.slug, level.levelSlug)
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: routes.home
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Games",
            item: routes.games
          },
          {
            "@type": "ListItem",
            position: 3,
            name: game.name,
            item: routes.game(game.slug)
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `Level ${level.levelNumber}`,
            item: routes.level(game.slug, level.levelSlug)
          }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: pageFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="container-page py-10">
      <SeoJsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Home", href: routes.home },
          { label: "Games", href: routes.games },
          { label: game.name, href: routes.game(game.slug) },
          { label: `Level ${level.levelNumber}` }
        ]}
      />

      <article className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <header className="content-card p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
              Level Walkthrough
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-base leading-8 text-muted">{pageDescription}</p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-paper p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Difficulty
                </dt>
                <dd className="mt-2 text-lg font-black text-ink">{level.difficulty}</dd>
              </div>
              <div className="rounded-2xl bg-paper p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Updated
                </dt>
                <dd className="mt-2 text-lg font-black text-ink">
                  {formatDate(level.updatedAt)}
                </dd>
              </div>
              <div className="rounded-2xl bg-paper p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Views
                </dt>
                <dd className="mt-2 text-lg font-black text-ink">
                  {formatNumber(level.views)}
                </dd>
              </div>
            </dl>
          </header>

          {hasMedia ? (
            <section className="mt-6 content-card p-6 sm:p-8">
              <h2 className="text-2xl font-black text-ink">Visual Guide</h2>
              <div className="mt-5 grid gap-5">
                {youtubeEmbedUrl ? (
                  <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-paper">
                    <iframe
                      className="h-full w-full"
                      src={youtubeEmbedUrl}
                      title={`${game.name} Level ${level.levelNumber} video walkthrough`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                ) : null}

                {imageUrl ? (
                  <img
                    className="w-full rounded-2xl border border-line bg-paper object-cover"
                    src={imageUrl}
                    alt={
                      media?.imageAlt ??
                      `${game.name} Level ${level.levelNumber} screenshot`
                    }
                    loading="lazy"
                  />
                ) : null}

                {gifUrl ? (
                  <img
                    className="w-full rounded-2xl border border-line bg-paper object-cover"
                    src={gifUrl}
                    alt={
                      media?.imageAlt ??
                      `${game.name} Level ${level.levelNumber} animated walkthrough`
                    }
                    loading="lazy"
                  />
                ) : null}
              </div>
            </section>
          ) : null}

          {manualContent ? (
            <>
              <section className="mt-6 content-card p-6 sm:p-8">
                <h2 className="text-2xl font-black text-ink">Introduction</h2>
                <p className="mt-4 leading-8 text-muted">
                  {manualContent.introduction}
                </p>
              </section>

              <section className="mt-6 content-card p-6 sm:p-8">
                <h2 className="text-2xl font-black text-ink">Goal</h2>
                <p className="mt-4 leading-8 text-muted">{pageGoal}</p>
              </section>

              <section className="mt-6 content-card p-6 sm:p-8">
                <h2 className="text-2xl font-black text-ink">
                  Why Players Get Stuck
                </h2>
                <p className="mt-4 leading-8 text-muted">
                  {manualContent.whyPlayersGetStuck}
                </p>
              </section>

              <section className="mt-6 content-card p-6 sm:p-8">
                <h2 className="text-2xl font-black text-ink">Before You Start</h2>
                <p className="mt-4 leading-8 text-muted">
                  {manualContent.beforeYouStart}
                </p>
              </section>
            </>
          ) : (
            <section className="mt-6 content-card p-6 sm:p-8">
              <h2 className="text-2xl font-black text-ink">Goal</h2>
              <p className="mt-4 leading-8 text-muted">
                {pageGoal}
              </p>
            </section>
          )}

          <section className="mt-6 content-card p-6 sm:p-8">
            <h2 className="text-2xl font-black text-ink">
              Step-by-Step Walkthrough
            </h2>
            <ol className="mt-5 grid gap-4">
              {pageSteps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-line p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-action text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="content-card p-6">
              <h2 className="text-2xl font-black text-ink">Pro Tips</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                {pageTips.map((tip) => (
                  <li key={tip}>- {tip}</li>
                ))}
              </ul>
            </div>
            <div className="content-card p-6">
              <h2 className="text-2xl font-black text-ink">Common Mistakes</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                {pageMistakes.map((mistake) => (
                  <li key={mistake}>- {mistake}</li>
                ))}
              </ul>
            </div>
          </section>

          {manualContent ? (
            <>
              <section className="mt-6 content-card p-6 sm:p-8">
                <h2 className="text-2xl font-black text-ink">
                  Alternative Strategy
                </h2>
                <p className="mt-4 leading-8 text-muted">
                  {manualContent.alternativeStrategy}
                </p>
              </section>

              <section className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="content-card p-6">
                  <h2 className="text-2xl font-black text-ink">Related Levels</h2>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                    {manualContent.relatedLevels.map((relatedLevel) => (
                      <li key={relatedLevel.label}>
                        -{" "}
                        {relatedLevel.href ? (
                          <Link
                            href={relatedLevel.href}
                            className="font-bold text-action hover:underline"
                          >
                            {relatedLevel.label}
                          </Link>
                        ) : (
                          relatedLevel.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="content-card p-6">
                  <h2 className="text-2xl font-black text-ink">Related Games</h2>
                  <ul className="mt-4 grid gap-3 text-sm leading-6">
                    {manualContent.relatedGames.map((relatedGame) => (
                      <li key={relatedGame.slug}>
                        <Link
                          href={routes.game(relatedGame.slug)}
                          className="font-bold text-action hover:underline"
                        >
                          {relatedGame.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          ) : null}

          <section className="mt-6 content-card p-6 sm:p-8">
            <h2 className="text-2xl font-black text-ink">FAQ</h2>
            <div className="mt-5 grid gap-4">
              {pageFaq.map((item) => (
                <details key={item.question} className="rounded-2xl border border-line p-4">
                  <summary className="cursor-pointer font-black text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <AdSlot className="mt-6" />
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="content-card p-5">
            <h2 className="font-black text-ink">Level Navigation</h2>
            <div className="mt-4 grid gap-3">
              <Link
                href={routes.game(game.slug)}
                className="rounded-full border border-line px-4 py-3 text-center text-sm font-bold text-action hover:border-action"
              >
                Back to {game.name}
              </Link>
              <Link
                href={`/search?q=${encodeURIComponent(`${game.name} Level ${level.levelNumber}`)}`}
                className="rounded-full bg-action px-4 py-3 text-center text-sm font-bold text-white"
              >
                Search similar guides
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <SectionHeading title="Related Levels" />
            <LevelList levels={relatedLevels} />
          </div>
        </aside>
      </article>
    </main>
  );
}
