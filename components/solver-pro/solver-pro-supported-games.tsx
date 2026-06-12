const supportedGames = [
  "Block Blast",
  "Screw Jam",
  "Goods Sort",
  "Water Sort",
  "Bus Escape",
  "Hexa Sort",
  "Color Wood Jam",
  "Arrow Away",
  "Magic Sort",
  "Parking Jam"
];

export function SolverProSupportedGames() {
  return (
    <section className="mt-8 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
            Supported Games
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Preview coverage for more puzzle formats.
          </h3>
        </div>
        <span className="w-fit rounded-full bg-gradient-to-r from-action to-mint px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
          Static ecosystem
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {supportedGames.map((game) => (
          <article
            key={game}
            className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/75 to-sky-50/70 p-4 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <h4 className="text-sm font-bold text-ink">{game}</h4>
            <p className="mt-2 text-xs leading-5 text-muted">
              Solver Pro preview target
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
