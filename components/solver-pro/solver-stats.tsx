import { SolverStatCard } from "@/components/solver-pro/solver-stat-card";

const stats = [
  { label: "Boards analyzed", value: "124,521" },
  { label: "Average combo chance", value: "71%" },
  { label: "Suggested moves", value: "563,820" },
  { label: "Success rate", value: "93%" }
];

export function SolverStats() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Solver Stats
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Preview performance snapshot
          </h3>
        </div>
        <span className="inline-flex rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
          Fake data
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <SolverStatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
