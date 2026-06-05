import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PuzzleMaster | Puzzle Walkthrough Feedback",
  description:
    "Contact PuzzleMaster for walkthrough corrections, puzzle guide feedback, site questions, and content requests.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact PuzzleMaster",
    description:
      "Send walkthrough corrections, puzzle guide feedback, site questions, and content requests.",
    url: "/contact",
    type: "article"
  }
};

export default function ContactPage() {
  return (
    <main className="container-page py-12">
      <article className="content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
          Contact PuzzleMaster
        </h1>
        <div className="mt-5 grid gap-4 text-sm leading-7 text-muted">
          <p>
            Use this page for walkthrough corrections, missing context, broken link
            reports, or site feedback. If a level guide is unclear, include the game
            name, level number, and the section that needs attention.
          </p>
          <p>
            For editorial requests, send a short note describing the game, level, and
            the problem players are likely running into. PuzzleMaster prioritizes
            pages where written move order and common mistakes can help players
            recover quickly.
          </p>
          <p>
            Contact email: <span className="font-bold text-ink">hello@www.puzzleguide.org</span>
          </p>
        </div>
      </article>
    </main>
  );
}
