import Link from "next/link";
import { homePopularGames } from "@/components/home/home-data";
import { routes } from "@/lib/routes";

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" }
];

export function SiteFooter() {
  const footerSections = [
    {
      title: "Games",
      links: homePopularGames.slice(0, 4).map((game) => ({
        label: game.title,
        href: routes.game(game.slug)
      }))
    },
    {
      title: "Guides",
      links: [
        { label: "Walkthroughs", href: routes.walkthroughs },
        { label: "Tips", href: routes.tips },
        { label: "Guide", href: routes.guide },
        { label: "Solutions", href: routes.solutions }
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Browse solutions", href: routes.solutions },
        { label: "Search", href: routes.search },
        { label: "Compare", href: routes.compare }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Collections", href: routes.collections },
        { label: "Discover", href: routes.discover },
        { label: "Solver", href: routes.solver },
        { label: "FAQ", href: "/#faq" },
        { label: "Sitemap", href: "/sitemap.xml" }
      ]
    },
    {
      title: "About",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms" }
      ]
    }
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/20 bg-white/70 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.16),transparent_36rem),radial-gradient(circle_at_82%_10%,rgba(139,92,246,0.12),transparent_34rem)]" />
      <div className="container-page py-24">
        <div className="max-w-2xl">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
              P
            </span>
            <span>PuzzleMaster</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted">
            Practical walkthroughs, move orders, tips and strategies for thousands of puzzle levels.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/40 bg-white/55 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-2.5 text-sm font-medium text-muted">
                {section.links.map((label) => (
                  <Link
                    key={`${section.title}-${label.label}`}
                    href={label.href}
                    className="transition-all duration-300 hover:-translate-x-0.5 hover:text-action"
                  >
                    {label.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/50">
        <div className="container-page flex flex-col gap-4 py-6 text-xs font-semibold text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 PuzzleMaster. Unofficial game walkthrough index.</p>
          <div className="flex flex-wrap gap-4">
            {siteLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-action"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
