import {
  solverProCards,
  solverProFaq,
  solverProFlow,
  solverProLockup
} from "@/components/solver-pro/solver-pro-data";
import { SolverProCard } from "@/components/solver-pro/solver-pro-card";
import { SolverProCta } from "@/components/solver-pro/solver-pro-cta";
import { SolverProFaq } from "@/components/solver-pro/solver-pro-faq";
import { SolverProFlow } from "@/components/solver-pro/solver-pro-flow";
import { SolverProLockup } from "@/components/solver-pro/solver-pro-lockup";
import { SolverHistory } from "@/components/solver-pro/solver-history";
import { SolverStats } from "@/components/solver-pro/solver-stats";

export function SolverProSection() {
  return (
    <section id="solver-pro-preview" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Solver Pro Preview
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              A smarter puzzle solving workflow is coming soon.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Preview advanced solving flows for screenshots, move planning,
              risk detection, and strategy suggestions.
            </p>
          </div>

          <SolverProLockup items={solverProLockup} />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {solverProCards.map((card) => (
            <SolverProCard key={card.title} card={card} />
          ))}
        </div>

        <SolverProFlow steps={solverProFlow} />

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <SolverHistory />
          <SolverStats />
        </div>

        <SolverProFaq faq={solverProFaq} />
        <SolverProCta />
      </div>
    </section>
  );
}
