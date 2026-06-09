import { communityFaq } from "@/data/community-data";

export function CommunityFaq() {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
        Community FAQ
      </p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
        Community questions
      </h2>
      <div className="mt-8 grid gap-3">
        {communityFaq.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl border border-white/55 bg-white/80 p-1 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-3xl px-5 py-4">
              <span className="text-base font-semibold text-ink">
                {item.question}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint text-lg font-semibold text-white transition-all duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-6 text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
