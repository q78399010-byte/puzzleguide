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

const pageType = programmaticTypes.find((type) => type.slug === "tips")!;

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
      title: "Tips Not Found | PuzzleMaster"
    };
  }

  const title = `${game.name} Tips, Tricks & Common Mistakes | PuzzleMaster`;
  const description = `${game.name} tips page with beginner advice, advanced strategy, common mistakes, walkthrough summary, and related level guides.`;

  return {
    title,
    description,
    keywords: [game.name, "tips", "puzzle tips", "walkthrough tips"],
    alternates: {
      canonical: routes.tip(game.slug)
    },
    openGraph: {
      title,
      description,
      url: routes.tip(game.slug),
      type: "article"
    }
  };
}

export default async function TipsGamePage({ params }: ProgrammaticPageProps) {
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
