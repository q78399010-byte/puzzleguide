import Link from "next/link";
import { routes } from "@/lib/routes";

export function HomeCta() {
  return (
    <section className="container-page py-32">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,#2563eb_0%,#4f46e5_48%,#8b5cf6_100%)] px-8 py-16 shadow-2xl shadow-blue-500/20 sm:px-12 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_22rem),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_20rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              PuzzleMaster
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Stop Guessing.
              <br />
              Start Solving.
            </h2>
          </div>

          <Link
            href={routes.walkthroughs}
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50"
          >
            Explore Walkthroughs
          </Link>
        </div>
      </div>
    </section>
  );
}
