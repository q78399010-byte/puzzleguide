import Image from "next/image";
import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { uiCopy } from "@/data/ui-copy";
import type { Game } from "@/data/games";
import { routes } from "@/lib/routes";

type HomeHeroProps = {
  featuredGames: Game[];
};

const featureAccents = [
  "from-blue-500/20 via-sky-300/20 to-white",
  "from-indigo-500/20 via-violet-300/20 to-white",
  "from-cyan-400/20 via-blue-200/20 to-white"
];

const statAccents = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-orange-500"
];

export function HomeHero({ featuredGames }: HomeHeroProps) {
  const spotlightGames = featuredGames.slice(0, 3);

  return (
    <section className="product-gradient relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/95 to-transparent" />
      <div className="container-page grid gap-16 py-32 lg:min-h-[820px] lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
        <div className="max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-action shadow-lg shadow-blue-500/10 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-action to-indigo-500 shadow-[0_0_18px_rgba(31,111,209,0.7)]" />
            <span>{uiCopy.hero.badge}</span>
          </p>
          <h1 className="mt-8 max-w-[11ch] text-4xl font-bold tracking-tight text-ink sm:max-w-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            {uiCopy.hero.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {uiCopy.hero.subheadline}
          </p>

          <div className="mt-10 max-w-2xl">
            <SearchBox
              placeholder={uiCopy.hero.placeholder}
              buttonLabel={uiCopy.hero.primaryCTA}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {uiCopy.hero.quickTags.map((keyword) => (
              <Link
                key={keyword}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="rounded-full border border-white/70 bg-white/70 px-3 py-2 text-xs font-bold text-muted shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-action/40 hover:bg-white hover:text-action hover:shadow-lg sm:px-4"
              >
                {keyword}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {spotlightGames.map((game) => (
              <Link
                key={game.slug}
                href={routes.game(game.slug)}
                className="group rounded-3xl border border-white/70 bg-white/60 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <span
                  className="mb-4 block h-1.5 w-10 rounded-full transition duration-300 group-hover:w-14"
                  style={{ backgroundColor: game.color }}
                />
                <span className="block text-sm font-black text-ink">
                  {game.name}
                </span>
                <span className="mt-1 block text-xs font-semibold text-muted">
                  {game.guideCount} guides
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-blue-300/40 via-white to-purple-300/35 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/50 p-2 shadow-[0_38px_110px_rgba(31,111,209,0.22)] backdrop-blur-xl">
            <Image
              src="/images/home-hero-product.png"
              alt="Abstract puzzle walkthrough boards"
              width={1792}
              height={1024}
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="h-[360px] w-full rounded-2xl object-cover sm:h-[460px] lg:h-[560px]"
            />
          </div>

          <div className="absolute -bottom-7 left-6 hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:block">
            <span className="text-4xl font-bold tracking-tight text-ink">
              {uiCopy.stats[0].value}
            </span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {uiCopy.stats[0].label}
            </span>
          </div>

          <div className="absolute -top-6 right-8 hidden rounded-3xl border border-white/70 bg-white/80 px-6 py-5 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:block">
            <span className="block text-sm font-bold text-ink">
              {uiCopy.hero.primaryCTA}
            </span>
            <span className="mt-1 block text-xs font-semibold text-muted">
              {uiCopy.hero.quickTags[0]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFeatureCards() {
  return (
    <section className="container-page py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
          {uiCopy.hero.badge}
        </p>
        <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          Practical help for the moment a board stops moving.
        </h2>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {uiCopy.features.map((feature, index) => (
          <article
            key={feature.title}
            className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-action/30 hover:shadow-xl"
          >
            <div
              className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${featureAccents[index]} opacity-80 transition duration-300 group-hover:opacity-100`}
            />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ink to-action text-sm font-bold text-white shadow-lg transition duration-300 group-hover:scale-105">
                0{index + 1}
              </span>
              <h3 className="mt-10 text-2xl font-bold tracking-tight text-ink transition duration-300 group-hover:text-action">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeStats() {
  return (
    <section className="container-page pb-32">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {uiCopy.stats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl"
          >
            <span
              className={`mb-8 block h-2 w-12 rounded-full ${statAccents[index]}`}
            />
            <div className="text-5xl font-bold tracking-tight text-ink">
              {stat.value}
            </div>
            <p className="mt-4 text-sm font-semibold text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeFaqAccordion() {
  return (
    <section id="faq" className="container-page py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
          FAQ
        </p>
        <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          Clear answers before you search.
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-4">
        {uiCopy.faq.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group rounded-2xl border border-white/70 bg-white/75 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-action/30 hover:bg-white hover:shadow-xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-8">
              <span className="text-left text-lg font-bold text-ink">
                {item.question}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-line bg-paper text-xl font-bold text-action transition duration-300 group-open:rotate-45 group-hover:bg-blue-50">
                +
              </span>
            </summary>
            <p className="px-8 pb-8 text-base leading-7 text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section className="relative isolate overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#eaf4ff_0%,#ffffff_42%,#f1eaff_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-[54rem] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
              PuzzleMaster
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              {uiCopy.cta.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {uiCopy.cta.description}
            </p>
          </div>
          <Link
            href={routes.walkthroughs}
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-action via-blue-500 to-indigo-500 px-8 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/35"
          >
            {uiCopy.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
