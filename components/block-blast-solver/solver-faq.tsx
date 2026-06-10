const faq = [
  {
    question: "How does Block Blast Solver work?",
    answer:
      "It is a static prototype that shows a board preview, likely move, and basic strategy hints without connecting to live game state."
  },
  {
    question: "Do I need an account?",
    answer:
      "No. This homepage section is fully static and does not require sign-in."
  },
  {
    question: "Can I upload screenshots?",
    answer:
      "The upload card is visual only for now. It does not send files anywhere."
  },
  {
    question: "Is the solver free?",
    answer:
      "Yes. It is a free static prototype inside the homepage."
  },
  {
    question: "Will AI be added later?",
    answer:
      "This version does not use AI. Any future change would be a separate product decision."
  }
];

export function SolverFaq() {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        FAQ
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
        Solver questions
      </h3>
      <div className="mt-6 grid gap-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/55 bg-white/85 p-1 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4">
              <span className="text-left text-base font-semibold text-ink">
                {item.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-violet-500 text-lg font-semibold text-white transition-all duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-6 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
