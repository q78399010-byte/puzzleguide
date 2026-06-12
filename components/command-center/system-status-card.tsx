type SystemStatusCardProps = {
  statuses: string[];
};

export function SystemStatusCard({ statuses }: SystemStatusCardProps) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        System Status
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Command Center status.
      </h3>

      <div className="mt-6 grid gap-3">
        {statuses.map((status) => (
          <article
            key={status}
            className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
            <span className="text-sm font-bold text-ink">{status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
