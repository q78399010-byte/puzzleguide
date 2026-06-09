export function VideoCta() {
  return (
    <section className="rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_50%,#7c3aed_100%)] p-8 text-white shadow-2xl shadow-blue-500/20 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Visual Guides Are Coming.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/80">
            PuzzleGuide will add owned or authorized videos, GIFs, and image walkthroughs over time.
          </p>
        </div>
        <a
          href="/walkthroughs"
          className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Explore Written Walkthroughs
        </a>
      </div>
    </section>
  );
}
