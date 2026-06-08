import { profileYearReview } from "@/data/profile-data";

export function ProfileYearReview() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
        Year In Review
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
        2026 Puzzle Review
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profileYearReview.map((item) => (
          <div key={item.label} className="rounded-3xl bg-paper p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {item.label}
            </p>
            <p className="mt-4 text-2xl font-bold tracking-tight text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
