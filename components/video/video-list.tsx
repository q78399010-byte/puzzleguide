import { VideoCard } from "@/components/video/video-card";
import { videoItems } from "@/data/video-data";

export function VideoList() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Planned Visual Guides
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Preview queue
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Visual guide planned for each item. No third-party video added.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {videoItems.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
