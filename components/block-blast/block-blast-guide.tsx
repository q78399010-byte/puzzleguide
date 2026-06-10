import Link from "next/link";
import { routes } from "@/lib/routes";

const guideCards = [
  {
    title: "Guide",
    text: "Understand board pressure, placement safety, and when to avoid risky shapes.",
    href: routes.game("block-blast")
  },
  {
    title: "Walkthrough",
    text: "Jump into written level paths for row clears, column clears, and combo timing.",
    href: routes.walkthrough("block-blast")
  },
  {
    title: "Solutions",
    text: "Use concise solution notes when a board locks near the final space crunch.",
    href: routes.solution("block-blast")
  }
];

export function BlockBlastGuide() {
  return (
    <section className="mt-12 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Top Game
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            Block Blast Guides & Solutions
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Walkthroughs, placement strategies, combo tips and puzzle solutions.
          </p>
        </div>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            Best opening rule
          </p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
            Keep the center open before chasing easy clears.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Block Blast levels usually fail when the board fills too early and
            large shapes lose their landing space. Open the board first, then
            build clears that keep future placements flexible.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {guideCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-3xl border border-white/55 bg-white/78 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white hover:shadow-2xl"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110">
              {card.title.slice(0, 1)}
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{card.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
