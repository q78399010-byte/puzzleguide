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
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 text-ink shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="container-page">
        <div className="flex min-h-20 items-center gap-5 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-blue-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
              P
            </span>
            <span className="text-xl font-bold tracking-tight">PuzzleMaster</span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:text-ink hover:shadow-lg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden w-[280px] lg:block xl:hidden">
            <SearchBox
              compact
              placeholder="Search levels"
              className="border-line/70 shadow-none"
            />
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-4 xl:hidden">
          {navItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="shrink-0 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-semibold text-muted shadow-sm backdrop-blur transition duration-300 hover:bg-white hover:text-action hover:shadow-lg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
