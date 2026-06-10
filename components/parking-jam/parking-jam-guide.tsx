import Link from "next/link";
import { routes } from "@/lib/routes";

const guideCards = [
  {
    title: "Guide",
    text: "Understand exit lanes, blocking cars, and when to delay small moves.",
    href: routes.game("parking-jam")
  },
  {
    title: "Walkthrough",
    text: "Jump into written level paths for parking order, exit timing, and cleanup moves.",
    href: routes.walkthrough("parking-jam")
  },
  {
    title: "Solutions",
    text: "Use concise solution notes when a lot locks near the final vehicle exits.",
    href: routes.solution("parking-jam")
  }
];

export function ParkingJamGuide() {
  return (
    <section className="mt-12 rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Top Game
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            Parking Jam Guides & Solutions
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Walkthroughs, parking order tips, exit strategies and puzzle solutions.
          </p>
        </div>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            Best opening rule
          </p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
            Clear the exit lane before chasing small car moves.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Parking Jam levels usually fail when the main exit is blocked while
            empty space gets filled. Open the route first, then guide cars out in
            a controlled order.
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
