import type { CommunityCard as CommunityCardData } from "@/data/community-data";

type CommunityCardProps = {
  item: CommunityCardData;
  index?: number;
};

export function CommunityCard({ item, index }: CommunityCardProps) {
  return (
    <a
      href={item.href}
      className="group block rounded-3xl border border-white/55 bg-white/75 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white/90 hover:shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-action">
            {item.label}
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {item.title}
          </h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110">
          {typeof index === "number" ? index + 1 : item.title.slice(0, 1)}
        </span>
      </div>
      <p className="mt-5 text-sm leading-6 text-muted">{item.description}</p>
    </a>
  );
}
