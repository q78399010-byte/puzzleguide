"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { games } from "@/data/games";
import { levels } from "@/data/levels";
import { routes } from "@/lib/routes";
import { formatDate, formatNumber } from "@/lib/seo";

type SearchResult = {
  type: "game" | "level";
  title: string;
  description: string;
  href: string;
  meta: string;
};

const popularSearches = [
  "Color Wood Jam Level 245",
  "Screw Jam Level 420",
  "Water Sort Level 245",
  "Arrows GO Level 318",
  "Magic Sort Level 301",
  "Block Blast Level 360"
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function includesQuery(source: string[], query: string) {
  return normalize(source.join(" ")).includes(query);
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const { gameResults, levelResults } = useMemo(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return {
        gameResults: games
          .slice()
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6)
          .map<SearchResult>((game) => ({
            type: "game",
            title: game.name,
            description: game.description,
            href: routes.game(game.slug),
            meta: `${game.categoryName} - ${game.guideCount} guides`
          })),
        levelResults: levels
          .slice()
          .sort((a, b) => b.views - a.views)
          .slice(0, 8)
          .map<SearchResult>((level) => ({
            type: "level",
            title: `${level.gameName} Level ${level.levelNumber}`,
            description: level.summary,
            href: routes.level(level.gameSlug, level.levelSlug),
            meta: `${level.difficulty} - ${formatNumber(level.views)} views`
          }))
      };
    }

    const gameMatches = games
      .filter((game) =>
        includesQuery(
          [game.name, game.slug, game.description, game.categoryName, ...game.tags],
          normalizedQuery
        )
      )
      .map<SearchResult>((game) => ({
        type: "game",
        title: game.name,
        description: game.description,
        href: routes.game(game.slug),
        meta: `${game.categoryName} - ${game.totalLevels}+ levels`
      }));

    const levelMatches = levels
      .filter((level) =>
        includesQuery(
          [
            level.gameName,
            level.gameSlug,
            level.levelSlug,
            `level ${level.levelNumber}`,
            `level-${level.levelNumber}`,
            String(level.levelNumber),
            level.title,
            level.summary,
            level.difficulty
          ],
          normalizedQuery
        )
      )
      .map<SearchResult>((level) => ({
        type: "level",
        title: `${level.gameName} Level ${level.levelNumber}`,
        description: level.summary,
        href: routes.level(level.gameSlug, level.levelSlug),
        meta: `${level.difficulty} - Updated ${formatDate(level.updatedAt)}`
      }));

    return {
      gameResults: gameMatches.slice(0, 12),
      levelResults: levelMatches.slice(0, 30)
    };
  }, [query]);

  const totalResults = gameResults.length + levelResults.length;

  return (
    <div>
      <div className="content-card p-5 sm:p-6">
        <label htmlFor="search-query" className="text-sm font-black text-ink">
          Search games or levels
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="search-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Color Wood Jam Level 245"
            className="min-h-12 flex-1 rounded-full border border-line px-5 text-ink outline-none focus:border-action"
          />
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-6 text-sm font-black text-white"
          >
            Update link
          </Link>
        </div>

        {!normalize(query) ? (
          <div className="mt-5">
            <p className="text-sm font-black text-ink">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-action hover:bg-white"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-black text-ink">Search results</h2>
        <p className="text-sm font-bold text-muted">{totalResults} results</p>
      </div>

      {totalResults > 0 ? (
        <div className="mt-4 grid gap-8">
          <ResultGroup title="Game results" results={gameResults} />
          <ResultGroup title="Level results" results={levelResults} />
        </div>
      ) : (
        <div className="mt-4 subtle-card p-8 text-center">
          <h3 className="text-lg font-black text-ink">No matching results</h3>
          <p className="mt-2 text-sm text-muted">
            Try a game name, an exact level number, or a query such as level 245.
          </p>
        </div>
      )}
    </div>
  );
}

function ResultGroup({
  title,
  results
}: {
  title: string;
  results: SearchResult[];
}) {
  if (!results.length) {
    return null;
  }

  return (
    <section>
      <h3 className="text-sm font-black uppercase tracking-[0.14em] text-muted">
        {title}
      </h3>
      <div className="mt-3 grid gap-3">
        {results.map((result) => (
          <Link
            key={`${result.type}-${result.href}`}
            href={result.href}
            className="subtle-card p-5 transition hover:border-action hover:shadow-soft"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  result.type === "game"
                    ? "bg-emerald-50 text-mint"
                    : "bg-blue-50 text-action"
                }`}
              >
                {result.type === "game" ? "Game" : "Level"}
              </span>
              <span className="text-xs font-bold text-muted">{result.meta}</span>
            </div>
            <h4 className="mt-3 text-lg font-black text-ink">{result.title}</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{result.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
