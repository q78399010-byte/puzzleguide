import { CommonMistakesCard } from "@/components/intelligence-center/common-mistakes-card";
import { ConfidenceMapCard } from "@/components/intelligence-center/confidence-map-card";
import { FutureFeaturesCard } from "@/components/intelligence-center/future-features-card";
import {
  commonMistakes,
  confidenceMap,
  futureFeatures,
  solverSignals,
  strategyLibrary
} from "@/components/intelligence-center/intelligence-center-data";
import { SolverSignalsCard } from "@/components/intelligence-center/solver-signals-card";
import { StrategyLibraryCard } from "@/components/intelligence-center/strategy-library-card";

export function IntelligenceCenterSection() {
  return (
    <section id="intelligence-center" className="mt-10">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Intelligence Center
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Organize solver signals, strategy patterns, and planned tools.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Browse static intelligence cards for solver signals, strategy
              library items, confidence mapping, common mistakes, and future
              planned modules.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-sky-50/80 to-emerald-50/70 p-5 shadow-lg shadow-slate-900/5">
            <p className="text-sm font-bold text-ink">
              Static intelligence preview
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              No AI, database, login, upload, or real screenshot recognition is
              connected.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <SolverSignalsCard signals={solverSignals} />
          <StrategyLibraryCard strategies={strategyLibrary} />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <ConfidenceMapCard items={confidenceMap} />
          <CommonMistakesCard mistakes={commonMistakes} />
        </div>

        <div className="mt-8">
          <FutureFeaturesCard features={futureFeatures} />
        </div>
      </div>
    </section>
  );
}
