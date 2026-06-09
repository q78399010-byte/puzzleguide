import type { VideoMatrixItem } from "@/data/video-data";

type VideoCardProps = {
  item: VideoMatrixItem;
};

export function VideoCard({ item }: VideoCardProps) {
  return (
    <article className="group rounded-3xl border border-white/50 bg-white/75 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white/90 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {item.gameName}
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {item.title}
          </h3>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          Coming soon
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Level
          </p>
          <p className="mt-2 text-xl font-bold text-ink">{item.levelNumber}</p>
        </div>
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Duration
          </p>
          <p className="mt-2 text-xl font-bold text-ink">{item.duration}</p>
        </div>
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Type
          </p>
          <p className="mt-2 text-xl font-bold text-ink">{item.type}</p>
        </div>
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Status
          </p>
          <p className="mt-2 text-xl font-bold text-ink">Preview planned</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">{item.notes}</p>

      <a
        href={item.pagePath}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full border border-white/60 bg-white px-5 text-sm font-semibold text-action shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        View guide
      </a>
    </article>
  );
}
