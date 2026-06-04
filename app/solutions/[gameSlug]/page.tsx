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

const pageType = programmaticTypes.find((type) => type.slug === "solutions")!;

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
      title: "Solutions Not Found | PuzzleMaster"
    };
  }

  const title = `${game.name} Solutions, Level Help & Step-by-Step Guide | PuzzleMaster`;
  const description = `${game.name} solutions page with walkthrough summary, step-by-step solution notes, tips and tricks, common mistakes, and related levels.`;

  return {
    title,
    description,
    keywords: [game.name, "solutions", "puzzle solutions", "level guide"],
    alternates: {
      canonical: routes.solution(game.slug)
    },
    openGraph: {
      title,
      description,
      type: "article"
    }
  };
}

export default async function SolutionGamePage({ params }: ProgrammaticPageProps) {
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
