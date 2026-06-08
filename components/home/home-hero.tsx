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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.22),transparent_26rem),radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.18),transparent_28rem),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.9),transparent_24rem)]" />
      <div className="container-page grid gap-14 py-24 lg:min-h-[840px] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-action shadow-xl shadow-slate-900/5 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-action to-violet-500" />
            {badge}
          </p>

          <h1 className="mt-8 max-w-5xl text-4xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
            {headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {subheadline}
          </p>

          <div className="mt-10 max-w-2xl">
            <SearchBox
              placeholder="Search game or level"
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
          <div className="absolute -inset-10 rounded-[2rem] bg-[radial-gradient(circle_at_28%_18%,rgba(59,130,246,0.22),transparent_22rem),radial-gradient(circle_at_74%_20%,rgba(124,58,237,0.18),transparent_20rem),linear-gradient(145deg,rgba(255,255,255,0.8),rgba(255,255,255,0.45))] blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/30 bg-white/55 p-4 shadow-[0_36px_100px_rgba(15,23,42,0.14)] backdrop-blur-xl">
            <div className="rounded-[1.75rem] border border-white/40 bg-white/45 p-5 shadow-inner shadow-white/30">
              <div className="rounded-[1.5rem] border border-white/50 bg-white/80 p-5 shadow-xl shadow-slate-900/5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
                      Puzzle Guide Preview
                    </p>
                    <p className="mt-2 text-base font-semibold text-ink sm:text-lg">
                      Color Wood Jam Level 245
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    3 steps
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Step 1: Clear the center lane",
                    "Step 2: Move blockers first",
                    "Step 3: Open the exit path"
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-violet-500 text-xs font-semibold text-white shadow-lg shadow-blue-500/20">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Tags
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {["wood", "guide", "level 245"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Progress
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 min-w-0 flex-1 rounded-full bg-slate-100 sm:w-24 sm:flex-none">
                        <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-action to-violet-500" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        67%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-6 rounded-2xl border border-white/40 bg-white/80 px-5 py-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
            <p className="text-2xl font-bold tracking-tight text-ink">1400+</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Walkthroughs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
