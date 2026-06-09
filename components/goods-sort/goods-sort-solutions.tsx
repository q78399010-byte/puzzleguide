import Link from "next/link";
import { routes } from "@/lib/routes";

const walkthroughBlocks = [
  {
    title: "Shelf Space",
    text: "Open a working lane before moving mixed items from crowded shelves."
  },
  {
    title: "Groups",
    text: "Build the item group that clears the most space before touching rare items."
  },
  {
    title: "Cleanup",
    text: "Finish matched shelves only after the remaining items have a clean lane."
  }
];

export function GoodsSortSolutions() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="rounded-3xl border border-white/55 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
          Solutions
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
          Shelf order pattern
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted">
          Goods Sort solutions work best when every move opens shelf space,
          groups matching items, or prepares the final cleanup route.
        </p>
        <Link
          href={routes.walkthrough("goods-sort")}
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-action via-sky-500 to-mint px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Open Walkthroughs
        </Link>
      </article>

      <div className="grid gap-4">
        {walkthroughBlocks.map((block, index) => (
          <article
            key={block.title}
            className="group rounded-3xl border border-white/55 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:bg-white hover:shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-mint text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110">
                {index + 1}
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-ink">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{block.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
