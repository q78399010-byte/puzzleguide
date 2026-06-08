import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata: Metadata = {
  title: "Search Game Walkthroughs, Solutions & Levels | PuzzleMaster",
  description:
    "Search PuzzleMaster for game walkthroughs, level guide pages, puzzle solutions, and tips. Try game names, level numbers, or queries like level 245.",
  alternates: {
    canonical: "/search"
  }
};

export default function SearchPage() {
  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Search", item: "/search" }
        ]}
      />
      <section className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Search
        </p>
        <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
          Search Puzzle Guides
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          Static client-side search for game names, level names, and exact level
          numbers. This can later be replaced with MeiliSearch or a database-backed
          index without changing the public URLs.
        </p>
      </section>
      <Suspense fallback={<div className="subtle-card p-6">Loading search...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
