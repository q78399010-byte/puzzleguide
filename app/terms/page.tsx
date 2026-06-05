import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | PuzzleMaster",
  description:
    "Read the PuzzleMaster terms of use for puzzle walkthrough pages, site content, external links, and acceptable use.",
  alternates: {
    canonical: "/terms"
  },
  openGraph: {
    title: "Terms of Use | PuzzleMaster",
    description:
      "Terms for using PuzzleMaster walkthrough pages, site content, and external links.",
    url: "/terms",
    type: "article"
  }
};

export default function TermsPage() {
  return (
    <main className="container-page py-12">
      <article className="content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Terms
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
          Terms of Use
        </h1>
        <div className="mt-5 grid gap-5 text-sm leading-7 text-muted">
          <p>
            By using PuzzleMaster, you agree to use the site for personal,
            informational puzzle help. The guides are written to help players
            understand level patterns, move order, and common mistakes.
          </p>
          <section>
            <h2 className="text-xl font-black text-ink">Content</h2>
            <p className="mt-2">
              Walkthroughs and tips are provided for general guidance. We may update,
              remove, or reorganize content as games change and pages are improved.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-ink">External Links</h2>
            <p className="mt-2">
              PuzzleMaster may link to related pages or third-party resources. We are
              not responsible for the content, policies, or availability of external
              websites.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-ink">Acceptable Use</h2>
            <p className="mt-2">
              Do not attempt to disrupt the site, scrape it in a way that harms
              service quality, or reuse content in a misleading way.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
