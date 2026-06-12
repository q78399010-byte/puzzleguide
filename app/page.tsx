import type { Metadata } from "next";
import { CommunityAchievements } from "@/components/community/community-achievements";
import { CommunityCta } from "@/components/community/community-cta";
import { CommunityFaq } from "@/components/community/community-faq";
import { CommunityHero } from "@/components/community/community-hero";
import { CommunityStats } from "@/components/community/community-stats";
import { CommunityTopGames } from "@/components/community/community-top-games";
import { FreemiumCta } from "@/components/freemium/freemium-cta";
import { FreemiumFaq } from "@/components/freemium/freemium-faq";
import { FreemiumFeatures } from "@/components/freemium/freemium-features";
import { FreemiumPlans } from "@/components/freemium/freemium-plans";
import { HomeCta } from "@/components/home/home-cta";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeFeatureCards } from "@/components/home/home-features";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-timeline";
import { HomePopularGames } from "@/components/home/home-popular-games";
import { HomeStats } from "@/components/home/home-stats";
import { BoardPreview } from "@/components/block-blast-solver/board-preview";
import { BestMoveCard } from "@/components/block-blast-solver/best-move-card";
import { ComboCard } from "@/components/block-blast-solver/combo-card";
import { DangerCard } from "@/components/block-blast-solver/danger-card";
import { SolverCta } from "@/components/block-blast-solver/solver-cta";
import { SolverFaq } from "@/components/block-blast-solver/solver-faq";
import { SolverHero } from "@/components/block-blast-solver/solver-hero";
import { StrategyCard } from "@/components/block-blast-solver/strategy-card";
import { UploadCard } from "@/components/block-blast-solver/upload-card";
import { BusEscapeSolverPreview } from "@/components/solver-matrix/bus-escape-solver-preview";
import { GoodsSortSolverPreview } from "@/components/solver-matrix/goods-sort-solver-preview";
import { HexaSortSolverPreview } from "@/components/solver-matrix/hexa-sort-solver-preview";
import { ScrewJamSolverPreview } from "@/components/solver-matrix/screw-jam-solver-preview";
import { WaterSortSolverPreview } from "@/components/solver-matrix/water-sort-solver-preview";
import { ProfileBadges } from "@/components/profile/profile-badges";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileFaq } from "@/components/profile/profile-faq";
import { ProfilePersonality } from "@/components/profile/profile-personality";
import { ProfileShareCard } from "@/components/profile/profile-share-card";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileTimeline } from "@/components/profile/profile-timeline";
import { ProfileYearReview } from "@/components/profile/profile-year-review";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { VideoCta } from "@/components/video/video-cta";
import { VideoFaq } from "@/components/video/video-faq";
import { VideoList } from "@/components/video/video-list";
import { VideoPreview } from "@/components/video/video-preview";
import { homeFaq } from "@/components/home/home-data";
import { communityFaq } from "@/data/community-data";
import { freemiumFaq } from "@/data/freemium-data";
import { popularProfiles, profileFaq, profileHero } from "@/data/profile-data";
import { videoFaq } from "@/data/video-data";

export const metadata: Metadata = {
  title: "PuzzleMaster | Puzzle Game Walkthroughs & Level Guides",
  description:
    "Find written puzzle game walkthroughs, level guides, tips, and related levels for popular mobile puzzle games.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "PuzzleMaster | Puzzle Game Walkthroughs & Level Guides",
    description:
      "Search written puzzle walkthroughs, level guides, tips, and related puzzle game pages.",
    url: "/",
    type: "website"
  }
};

export default function HomePage() {
  const homepageFaq = [
    ...homeFaq,
    ...profileFaq,
    ...freemiumFaq,
    ...videoFaq,
    ...communityFaq
  ];

  return (
    <main className="overflow-hidden bg-[#fbfcff]">
      <BreadcrumbJsonLd items={[{ name: "Home", item: "/" }]} />
      <FaqJsonLd faq={homepageFaq} />
      <HomeHero
        badge="WRITTEN PUZZLE WALKTHROUGHS"
        headline="Solve Any Puzzle Level Faster."
        subheadline="Practical walkthroughs, move orders, tips and strategies for thousands of puzzle levels."
      />
      <HomeStats />
      <HomeFeatureCards />
      <HomePopularGames />
      <HomeHowItWorks />

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_46%,#ffffff_100%)] py-24">
        <div className="container-page">
          <SolverHero />

          <div className="mt-8">
            <UploadCard />
          </div>

          <div className="mt-8">
            <BoardPreview />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <BestMoveCard value="Clear left side first" />
            <ComboCard value="72%" />
            <DangerCard value="Low" />
            <StrategyCard value="Create space in the center" />
          </div>

          <div className="mt-8">
            <SolverFaq />
          </div>

          <div className="mt-8">
            <SolverCta />
          </div>

          <section className="mt-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                  Solver Matrix
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                  More static solver previews
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Five homepage-ready previews using static board states, mock
                move guidance, and responsive cards.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              <ScrewJamSolverPreview />
              <GoodsSortSolverPreview />
              <WaterSortSolverPreview />
              <BusEscapeSolverPreview />
              <HexaSortSolverPreview />
            </div>
          </section>
        </div>
      </section>

      <section
        id="profile"
        className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_44%,#ffffff_100%)] py-24"
      >
        <div className="container-page">
          <ProfileCard
            title={profileHero.title}
            subtitle={profileHero.subtitle}
            description={profileHero.description}
          />

          <div className="mt-8">
            <ProfileStats />
          </div>

          <div className="mt-8">
            <ProfilePersonality />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <ProfileBadges />
            <ProfileTimeline />
          </div>

          <div className="mt-8">
            <ProfileYearReview />
          </div>

          <div className="mt-8">
            <ProfileShareCard />
          </div>

          <section className="mt-8 rounded-3xl border border-white/50 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
              Popular Profiles
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
              Player archetypes
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularProfiles.map((profile) => (
                <article
                  key={profile}
                  className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-action via-sky-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                    {profile.slice(0, 1)}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                    {profile}
                  </h3>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <ProfileFaq />
          </div>

          <section className="mt-8 rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_52%,#7c3aed_100%)] p-8 text-white shadow-2xl shadow-blue-500/20 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                Celebrate Every Puzzle Victory.
              </h2>
              <a
                href="#profile"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Explore Your Profile
              </a>
            </div>
          </section>
        </div>
      </section>

      <section
        id="freemium"
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_45%,#ffffff_100%)] py-24"
      >
        <div className="container-page">
          <FreemiumPlans />

          <div className="mt-8">
            <FreemiumFeatures />
          </div>

          <div className="mt-8">
            <FreemiumFaq />
          </div>

          <div className="mt-8">
            <FreemiumCta />
          </div>
        </div>
      </section>

      <section
        id="video"
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_45%,#ffffff_100%)] py-24"
      >
        <div className="container-page">
          <VideoPreview />

          <div className="mt-8">
            <VideoList />
          </div>

          <div className="mt-8">
            <VideoFaq />
          </div>

          <div className="mt-8">
            <VideoCta />
          </div>
        </div>
      </section>

      <section
        id="community"
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f3fbf8_44%,#ffffff_100%)] py-24"
      >
        <div className="container-page">
          <CommunityHero />

          <div className="mt-8">
            <CommunityStats />
          </div>

          <div className="mt-8">
            <CommunityTopGames />
          </div>

          <div className="mt-8">
            <CommunityAchievements />
          </div>

          <div className="mt-8">
            <CommunityFaq />
          </div>

          <div className="mt-8">
            <CommunityCta />
          </div>
        </div>
      </section>

      <HomeFaq />
      <HomeCta />
    </main>
  );
}
