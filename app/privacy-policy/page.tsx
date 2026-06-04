import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PuzzleMaster",
  description:
    "Read the PuzzleMaster privacy policy for information about site analytics, advertising, cookies, and contact data.",
  alternates: {
    canonical: "/privacy-policy"
  },
  openGraph: {
    title: "Privacy Policy | PuzzleMaster",
    description:
      "Information about PuzzleMaster site analytics, advertising, cookies, and contact data.",
    type: "article"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container-page py-12">
      <article className="content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Privacy
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
          Privacy Policy
        </h1>
        <div className="mt-5 grid gap-5 text-sm leading-7 text-muted">
          <p>
            PuzzleMaster is a content website for puzzle walkthroughs and game
            guides. We do not require user accounts to read pages.
          </p>
          <section>
            <h2 className="text-xl font-black text-ink">Information We May Collect</h2>
            <p className="mt-2">
              Standard site logs may include browser type, pages visited, referral
              URLs, approximate region, and device information. If you contact us,
              we may receive the email address and message content you choose to
              send.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-ink">Cookies and Advertising</h2>
            <p className="mt-2">
              PuzzleMaster may use cookies, analytics, or advertising partners to
              measure traffic and support the site. Advertising partners may use
              cookies to show and measure ads based on their own policies.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-ink">Contact</h2>
            <p className="mt-2">
              For privacy questions, contact hello@puzzlemaster.example.com.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
