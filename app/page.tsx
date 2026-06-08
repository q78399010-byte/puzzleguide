import type { Metadata } from "next";
import { HomeCta } from "@/components/home/home-cta";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeFeatureCards } from "@/components/home/home-features";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-timeline";
import { HomePopularGames } from "@/components/home/home-popular-games";
import { HomeStats } from "@/components/home/home-stats";

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
  return (
    <main className="overflow-hidden bg-[#fbfcff]">
      <HomeHero
        badge="WRITTEN PUZZLE WALKTHROUGHS"
        headline="Solve Any Puzzle Level Faster."
        subheadline="Practical walkthroughs, move orders, tips and strategies for thousands of puzzle levels."
      />
      <HomeStats />
      <HomeFeatureCards />
      <HomePopularGames />
      <HomeHowItWorks />
      <HomeFaq />
      <HomeCta />
    </main>
  );
}
