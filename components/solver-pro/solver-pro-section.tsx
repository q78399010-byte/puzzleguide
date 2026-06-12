import {
  solverProCards,
  solverProFeatures,
  solverProFaq,
  solverProFlow,
  solverProLockup,
  solverProRoadmap
} from "@/components/solver-pro/solver-pro-data";
import { SolverProCard } from "@/components/solver-pro/solver-pro-card";
import { SolverProChangelog } from "@/components/solver-pro/solver-pro-changelog";
import { SolverProComingSoon } from "@/components/solver-pro/solver-pro-coming-soon";
import { SolverProComparisonTable } from "@/components/solver-pro/solver-pro-comparison-table";
import { SolverProCta } from "@/components/solver-pro/solver-pro-cta";
import { SolverProFeatureGrid } from "@/components/solver-pro/solver-pro-feature-grid";
import { SolverProFaq } from "@/components/solver-pro/solver-pro-faq";
import { SolverProFlow } from "@/components/solver-pro/solver-pro-flow";
import { SolverProIntegrations } from "@/components/solver-pro/solver-pro-integrations";
import { SolverProLockup } from "@/components/solver-pro/solver-pro-lockup";
import { SolverProMetrics } from "@/components/solver-pro/solver-pro-metrics";
import { SolverProPricingPreview } from "@/components/solver-pro/solver-pro-pricing-preview";
import { SolverProReleaseRoadmap } from "@/components/solver-pro/solver-pro-release-roadmap";
import { SolverProRoadmap } from "@/components/solver-pro/solver-pro-roadmap";
import { SolverProSafetyNote } from "@/components/solver-pro/solver-pro-safety-note";
import { SolverProStatusBoard } from "@/components/solver-pro/solver-pro-status-board";
import { SolverProSupportedGames } from "@/components/solver-pro/solver-pro-supported-games";
import { SolverProTestimonials } from "@/components/solver-pro/solver-pro-testimonials";
import { SolverProUseCases } from "@/components/solver-pro/solver-pro-use-cases";
import { SolverProVision } from "@/components/solver-pro/solver-pro-vision";
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
        <SolverProFeatureGrid features={solverProFeatures} />
        <SolverProUseCases />
        <SolverProSupportedGames />

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <SolverProIntegrations />
          <SolverProMetrics />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <SolverHistory />
          <SolverStats />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <SolverProRoadmap items={solverProRoadmap} />
          <SolverProSafetyNote />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <SolverProComparisonTable />
          <SolverProTestimonials />
        </div>

        <SolverProVision />
        <div className="mt-8 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <SolverProPricingPreview />
          <SolverProStatusBoard />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1fr]">
          <SolverProChangelog />
          <SolverProReleaseRoadmap />
        </div>

        <SolverProComingSoon />
        <SolverProFaq faq={solverProFaq} />
        <SolverProCta />
      </div>
    </section>
  );
}
