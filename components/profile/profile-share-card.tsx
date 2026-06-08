export function ProfileShareCard() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/40 bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_45%,#7c3aed_100%)] p-8 text-white shadow-2xl shadow-blue-500/20 sm:p-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.2),transparent_22rem),radial-gradient(circle_at_82%_10%,rgba(255,255,255,0.14),transparent_24rem)]" />
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Share
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Share Your Puzzle Journey
          </h2>
          <p className="mt-4 text-base leading-7 text-white/80">
            Create a card and share it with friends.
          </p>
        </div>
        <button className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          Generate Share Card
        </button>
      </div>
    </section>
  );
}
