import type { SolverProFaqItem } from "@/components/solver-pro/solver-pro-data";

type SolverProFaqProps = {
  faq: SolverProFaqItem[];
};

export function SolverProFaq({ faq }: SolverProFaqProps) {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Solver Pro FAQ
      </p>
      <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink">
        Preview notes
      </h3>

      <div className="mt-6 grid gap-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl border border-white/60 bg-white/80 p-1 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-3xl px-4 py-3">
              <span className="text-sm font-bold text-ink">
                {item.question}
              </span>
              <span className="text-sm font-black text-action transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-4 pb-4 text-sm leading-6 text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
