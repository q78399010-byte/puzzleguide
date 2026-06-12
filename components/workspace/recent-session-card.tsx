import type { RecentSession } from "@/components/workspace/workspace-data";

type RecentSessionCardProps = {
  session: RecentSession;
};

const riskStyle: Record<RecentSession["risk"], string> = {
  Low: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700"
};

export function RecentSessionCard({ session }: RecentSessionCardProps) {
  return (
    <article className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-bold text-ink">{session.game}</h4>
          <p className="mt-1 text-sm text-muted">{session.time}</p>
        </div>
        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-bold",
            riskStyle[session.risk]
          ].join(" ")}
        >
          {session.risk} risk
        </span>
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Confidence
        </p>
        <p className="mt-2 text-2xl font-black tracking-tight text-ink">
          {session.confidence}
        </p>
      </div>
    </article>
  );
}
