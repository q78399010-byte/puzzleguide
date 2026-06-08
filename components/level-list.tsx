import Link from "next/link";
import type { LevelGuide } from "@/data/levels";
import { formatDate, formatNumber } from "@/lib/seo";
import { routes } from "@/lib/routes";

type LevelListProps = {
  levels: LevelGuide[];
  showGame?: boolean;
  ranked?: boolean;
};

export function LevelList({ levels, showGame = false, ranked = false }: LevelListProps) {
  return (
    <div className="grid gap-3">
      {levels.map((level, index) => (
        <Link
          key={`${level.gameSlug}-${level.levelSlug}`}
          href={routes.level(level.gameSlug, level.levelSlug)}
          className="subtle-card grid gap-4 p-5 transition duration-300 hover:-translate-y-1 hover:border-action/30 hover:bg-white hover:shadow-xl sm:grid-cols-[auto_1fr_auto] sm:items-center"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-action">
            {ranked ? index + 1 : level.levelNumber}
          </div>
          <div>
            <h3 className="font-bold text-ink">
              {showGame
                ? `${level.gameName} Level ${level.levelNumber}`
                : `Level ${level.levelNumber} Walkthrough`}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
              {level.summary}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-muted">
              <span>{level.difficulty}</span>
              <span>{formatDate(level.updatedAt)}</span>
              <span>{formatNumber(level.views)} views</span>
            </div>
          </div>
          <span className="text-sm font-bold text-action">View guide</span>
        </Link>
      ))}
    </div>
  );
}
