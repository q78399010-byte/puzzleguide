export function FreemiumCta() {
  return (
    <section className="rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_48%,#7c3aed_100%)] p-8 text-white shadow-2xl shadow-blue-500/20 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Stop Guessing.
          <span className="block">Start Solving.</span>
        </h2>
        <a
          href="/games"
          className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Explore PuzzleGuide
        </a>
      </div>
    </section>
  );
}
