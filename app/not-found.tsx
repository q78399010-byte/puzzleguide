export default function NotFound() {
  return (
    <main className="container-page py-16">
      <div className="content-card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-action">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 max-w-xl text-muted">
          This walkthrough page is not available. Browse the game library to
          find an existing guide or related level.
        </p>
        <a
          href="/games"
          className="mt-6 inline-flex rounded-full bg-action px-5 py-3 text-sm font-semibold text-white"
        >
          Browse games
        </a>
      </div>
    </main>
  );
}
