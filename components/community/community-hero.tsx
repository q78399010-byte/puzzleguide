import { CommunityCard } from "@/components/community/community-card";
import { communityCards, communityHero } from "@/data/community-data";

export function CommunityHero() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/55 bg-white/72 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(31,111,209,0.18),transparent_24rem),radial-gradient(circle_at_82%_12%,rgba(20,163,111,0.16),transparent_22rem)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
          Community Matrix
        </p>
        <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          {communityHero.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
          {communityHero.subtitle}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          {communityHero.description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/walkthroughs"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-7 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Explore Walkthroughs
          </a>
          <a
            href="/games"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/60 bg-white/80 px-7 text-sm font-semibold text-ink shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-action hover:shadow-xl"
          >
            Browse Games
          </a>
        </div>
      </div>

      <div className="grid gap-4">
        {communityCards.map((card) => (
          <CommunityCard key={card.title} item={card} />
        ))}
      </div>
    </section>
  );
}
