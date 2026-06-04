import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticGamePage } from "@/components/programmatic-game-page";
import { programmaticTypes } from "@/data/programmatic";
import { getAllGames, getGameBySlug, getLevelsByGame } from "@/lib/data";
import { routes } from "@/lib/routes";

export const dynamicParams = false;

type ProgrammaticPageProps = {
  params: Promise<{
    gameSlug: string;
  }>;
};

const pageType = programmaticTypes.find((type) => type.slug === "walkthroughs")!;

export function generateStaticParams() {
  return getAllGames().map((game) => ({
    gameSlug: game.slug
  }));
}

export async function generateMetadata({
  params
}: ProgrammaticPageProps): Promise<Metadata> {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    return {
      title: "Walkthroughs Not Found | PuzzleMaster"
    };
  }

  const title = `${game.name} Walkthroughs, Levels & Solutions | PuzzleMaster`;
  const description = `${game.name} walkthroughs page with level guide links, step-by-step solution notes, tips, common mistakes, and related levels.`;

  return {
    title,
    description,
    keywords: [game.name, "walkthroughs", "puzzle walkthroughs", "level guide"],
    alternates: {
      canonical: routes.walkthrough(game.slug)
    },
    openGraph: {
      title,
      description,
      type: "article"
    }
  };
}

export default async function WalkthroughGamePage({ params }: ProgrammaticPageProps) {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    notFound();
  }

  return (
    <ProgrammaticGamePage
      game={game}
      pageType={pageType}
      levels={getLevelsByGame(game.slug)}
    />
  );
}
