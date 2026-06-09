export function CommunityCta() {
  return (
    <section className="rounded-3xl border border-white/20 bg-[linear-gradient(135deg,#132033_0%,#1f6fd1_52%,#14a36f_100%)] p-8 text-white shadow-2xl shadow-blue-500/20 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Puzzle Together.
          <span className="block">Solve Better.</span>
        </h2>
        <a
          href="/walkthroughs"
          className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-white via-sky-50 to-emerald-50 px-7 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Explore Walkthroughs
        </a>
      </div>
    </section>
  );
}
