import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PuzzleMaster | Written Puzzle Game Walkthroughs",
  description:
    "Learn about PuzzleMaster, an independent puzzle game walkthrough site focused on written level guides, practical tips, and related puzzle content.",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "About PuzzleMaster",
    description:
      "Independent written puzzle game walkthroughs, level guides, tips, and related puzzle content.",
    url: "/about",
    type: "article"
  }
};

export default function AboutPage() {
  return (
    <main className="container-page py-12">
      <article className="content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          About
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
          About PuzzleMaster
        </h1>
        <div className="mt-5 grid gap-4 text-sm leading-7 text-muted">
          <p>
            PuzzleMaster is an independent walkthrough index for puzzle game players.
            The site focuses on written help: what to move first, where a level
            usually gets blocked, which mistakes cause restarts, and which related
            levels use a similar pattern.
          </p>
          <p>
            The goal is to make level help quick to scan. Pages are organized by
            game, level number, related levels, tips, and FAQ so players can find a
            practical route without watching a long video.
          </p>
          <p>
            PuzzleMaster is not affiliated with the game publishers listed on the
            site. Game names are used only to identify the walkthrough and guide
            content players are searching for.
          </p>
        </div>
        <Link
          href="/games"
          className="mt-6 inline-flex rounded-full bg-action px-5 py-3 text-sm font-black text-white"
        >
          Browse games
        </Link>
      </article>
    </main>
  );
}
