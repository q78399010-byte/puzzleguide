import { profilePersonality } from "@/data/profile-data";

export function ProfilePersonality() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-3xl border border-white/50 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
          Personality
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
          {profilePersonality.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          {profilePersonality.description}
        </p>
      </article>

      <div className="grid gap-4 sm:grid-cols-3">
        {profilePersonality.traits.map((trait) => (
          <article
            key={trait.label}
            className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {trait.label}
            </p>
            <p className="mt-5 text-3xl font-bold tracking-tight text-ink">
              {trait.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
