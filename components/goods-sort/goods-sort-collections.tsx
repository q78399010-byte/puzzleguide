import Link from "next/link";
import { routes } from "@/lib/routes";

const collections = [
  {
    title: "Beginner Levels",
    text: "Start with shelf basics and clean item grouping routes.",
    href: routes.game("goods-sort")
  },
  {
    title: "Hard Levels",
    text: "Find stricter shelf locks, mixed item traps, and exact sorting order.",
    href: routes.collection("hardest-puzzle-levels")
  },
  {
    title: "Most Popular Levels",
    text: "Browse high-demand walkthrough hubs and frequently searched levels.",
    href: routes.collection("most-popular-puzzle-walkthroughs")
  },
  {
    title: "Daily Challenges",
    text: "Use the Goods Sort walkthrough hub as a daily solving path.",
    href: routes.walkthrough("goods-sort")
  },
  {
    title: "Expert Strategies",
    text: "Study shelf capacity, hidden groups, and mixed item trap timing.",
    href: routes.tip("goods-sort")
  },
  {
    title: "Speed Runs",
    text: "Practice shorter sorting routes with fewer shelf resets.",
    href: routes.solution("goods-sort")
  }
];

export function GoodsSortCollections() {
  return (
    <section className="mt-8 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Collections
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Curated shelf paths
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Six static collections for moving from shelf basics to difficult Goods
          Sort walkthrough demand and faster solution routes.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-3xl border border-white/55 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white hover:shadow-2xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110">
              {item.title.slice(0, 1)}
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
