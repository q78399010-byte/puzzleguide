import { homeFaq } from "@/components/home/home-data";

export function HomeFaq() {
  return (
    <section id="faq" className="container-page py-24">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
          FAQ
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Questions answered before the board gets stuck.
        </h2>
      </div>

      <div className="mt-10 grid gap-3">
        {homeFaq.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/40 bg-white/75 p-1 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-2xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-5 py-4">
              <span className="text-left text-base font-semibold tracking-tight text-ink sm:text-lg">
                {item.question}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="faq-panel px-5 pb-5 pt-1 text-sm leading-6 text-muted sm:text-base sm:leading-7">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
