import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { homeHeroChips } from "@/components/home/home-data";

type HomeHeroProps = {
  badge: string;
  headline: string;
  subheadline: string;
};

export function HomeHero({ badge, headline, subheadline }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_42%,#f4eeff_100%)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.28),transparent_28rem),radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.22),transparent_30rem),radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.92),transparent_26rem)]" />
      <div className="container-page grid gap-16 py-32 lg:min-h-[920px] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-action shadow-xl shadow-slate-900/5 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-action to-violet-500" />
            {badge}
          </p>

          <h1 className="mt-8 max-w-5xl text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
            {headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {subheadline}
          </p>

          <div className="mt-10 max-w-2xl">
            <SearchBox
              placeholder="Search a game or level, for example: Color Wood Jam Level 245"
              buttonLabel="Search"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {homeHeroChips.map((chip) => (
              <Link
                key={chip}
                href={`/search?q=${encodeURIComponent(chip)}`}
                className="rounded-full border border-white/30 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-action hover:shadow-xl"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.28),transparent_24rem),radial-gradient(circle_at_70%_18%,rgba(124,58,237,0.22),transparent_22rem),linear-gradient(145deg,rgba(255,255,255,0.85),rgba(255,255,255,0.5))] blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/30 bg-white/55 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.16)] backdrop-blur-xl">
            <div className="grid min-h-[620px] gap-4 rounded-[1.5rem] border border-white/40 bg-white/35 p-5 shadow-inner shadow-white/25">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  "Move order",
                  "Best route",
                  "Safe lane",
                  "Quick solve",
                  "Level map",
                  "Stuck board"
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/40 bg-white/70 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
                    style={{
                      transform:
                        index % 2 === 0 ? "translateY(0px)" : "translateY(12px)"
                    }}
                  >
                    <div
                      className="h-10 w-10 rounded-2xl bg-gradient-to-br from-action via-sky-500 to-violet-500"
                    />
                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-auto rounded-[1.5rem] border border-white/50 bg-white/70 p-6 shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-action">
                      Search
                    </p>
                    <p className="mt-2 text-lg font-semibold text-ink">
                      Color Wood Jam Level 245
                    </p>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-action to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25">
                    Search
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 rounded-2xl border border-white/40 bg-white/80 px-5 py-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
            <p className="text-3xl font-bold tracking-tight text-ink">1400+</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Walkthroughs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
