import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | PuzzleMaster",
  description:
    "Read the PuzzleMaster disclaimer about independent puzzle walkthroughs, game names, accuracy, and unofficial guide content.",
  alternates: {
    canonical: "/disclaimer"
  },
  openGraph: {
    title: "Disclaimer | PuzzleMaster",
    description:
      "Disclaimer for independent puzzle walkthroughs, game names, accuracy, and unofficial guide content.",
    type: "article"
  }
};

export default function DisclaimerPage() {
  return (
    <main className="container-page py-12">
      <article className="content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Disclaimer
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
          Disclaimer
        </h1>
        <div className="mt-5 grid gap-4 text-sm leading-7 text-muted">
          <p>
            PuzzleMaster is an independent walkthrough and guide site. It is not
            affiliated with, endorsed by, or sponsored by the publishers or developers
            of the games listed on the site.
          </p>
          <p>
            Game titles, trademarks, and related names belong to their respective
            owners. They are used here only to identify the level guide or
            walkthrough topic.
          </p>
          <p>
            Walkthrough content is provided for informational help. Game levels may
            change over time, and some move orders may vary by version or event.
            PuzzleMaster may update pages when better information is available.
          </p>
        </div>
      </article>
    </main>
  );
}
