export function SolverProSafetyNote() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Safety Note
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Built as a safe preview first.
      </h3>
      <p className="mt-4 text-sm leading-6 text-muted sm:text-base sm:leading-7">
        Solver Pro is currently a static product preview. It does not upload
        images, call AI APIs, store user data, or analyze real screenshots yet.
      </p>
    </section>
  );
}
