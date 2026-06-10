export function UploadCard() {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Upload Screenshot
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
        Add a board image to start the solver
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
        This prototype stays fully static. The upload area is visual only and does
        not send files anywhere.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/70 p-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
            +
          </div>
          <p className="mt-4 text-sm font-semibold text-ink">
            Drop a screenshot or click to choose a file
          </p>
          <p className="mt-2 text-xs text-muted">
            PNG and JPG are shown here as a static mockup.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Upload Screenshot
        </button>
      </div>
    </section>
  );
}
