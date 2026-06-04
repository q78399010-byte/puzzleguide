import Link from "next/link";
import { categories } from "@/data/categories";
import { games } from "@/data/games";
import { routes } from "@/lib/routes";

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" }
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="container-page grid gap-10 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl font-black text-ink">
            PuzzleMaster
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Written puzzle game walkthroughs, level guides, related levels, and
            practical tips for players who want a clear route through stuck boards.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Popular Games</h2>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            {games.slice(0, 4).map((game) => (
              <Link key={game.slug} href={routes.game(game.slug)} className="hover:text-action">
                {game.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Categories</h2>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={routes.category(category.slug)}
                className="hover:text-action"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Site</h2>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            {siteLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-action">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        (c) 2026 PuzzleMaster. Unofficial game walkthrough index.
      </div>
    </footer>
  );
}
