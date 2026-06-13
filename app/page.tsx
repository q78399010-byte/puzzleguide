import type { Metadata } from "next";
import { CoreAnalyzer } from "@/components/home/core-analyzer";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeHero } from "@/components/home/home-hero";
import { HomePopularGames } from "@/components/home/home-popular-games";
import { ProductOperatingSystem } from "@/components/home/product-operating-system";
import { SolverSuite } from "@/components/home/solver-suite";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { homeFaq } from "@/components/home/home-data";
import { communityFaq } from "@/data/community-data";
import { freemiumFaq } from "@/data/freemium-data";
import { profileFaq } from "@/data/profile-data";
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
      <HomePopularGames />
      <CoreAnalyzer />
      <SolverSuite />
      <ProductOperatingSystem />
      <HomeFaq />
    </main>
  );
}
