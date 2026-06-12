const statusItems = [
  { label: "Board Preview", status: "Available" },
  { label: "Pseudo Analyzer", status: "Available" },
  { label: "History", status: "Available" },
  { label: "Stats", status: "Available" },
  { label: "AI Solver", status: "Planned" },
  { label: "Screenshot Recognition", status: "Planned" }
];

const statusStyle: Record<string, string> = {
  Available: "bg-emerald-50 text-emerald-700",
  Planned: "bg-slate-100 text-muted"
};

export function SolverProStatusBoard() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Status Board
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        What is available in the preview.
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {statusItems.map((item) => (
          <article
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="text-sm font-bold text-ink">{item.label}</span>
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-bold",
                statusStyle[item.status] ?? "bg-slate-100 text-muted"
              ].join(" ")}
            >
              {item.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
