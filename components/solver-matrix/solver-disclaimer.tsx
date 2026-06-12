export function SolverDisclaimer() {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
          These previews are static demos. Future versions may support screenshot
          analysis, advanced solvers, and AI-assisted strategy tools.
        </p>

        <a
          href="/guide"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Explore Guides
        </a>
      </div>
    </section>
  );
}
