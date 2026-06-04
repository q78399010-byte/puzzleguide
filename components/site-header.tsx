import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { routes } from "@/lib/routes";

const navItems = [
  { label: "Home", href: routes.home },
  { label: "Games", href: routes.games },
  { label: "Discover", href: routes.discover },
  { label: "Collections", href: routes.collections },
  { label: "Compare", href: routes.compare },
  { label: "Solver", href: routes.solver },
  { label: "Guide", href: routes.guide },
  { label: "Solutions", href: routes.solutions },
  { label: "Tips", href: routes.tips },
  { label: "Walkthroughs", href: routes.walkthroughs },
  { label: "Search", href: routes.search }
];

export function SiteHeader() {
  return (
    <header className="top-shell text-white">
      <div className="container-page">
        <div className="flex min-h-20 items-center gap-5 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-ocean">
              P
            </span>
            <span className="text-xl font-black tracking-tight">PuzzleMaster</span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 2xl:flex">
            {navItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="rounded-full px-2.5 py-2 text-sm font-semibold text-blue-50/90 transition hover:bg-white/12 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden w-[280px] md:block">
            <SearchBox compact placeholder="Search games or levels" className="border-white/25" />
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-4 2xl:hidden">
          {navItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
