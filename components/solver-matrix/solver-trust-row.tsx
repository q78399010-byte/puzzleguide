const trustItems = [
  "Static preview only",
  "No account needed",
  "No real upload yet",
  "AI tools planned"
];

export function SolverTrustRow() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {trustItems.map((item) => (
        <div
          key={item}
          className="rounded-3xl border border-white/60 bg-white/70 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
        >
          <p className="text-sm font-bold text-ink">{item}</p>
        </div>
      ))}
    </div>
  );
}
