import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { GameGrid } from "@/components/game-grid";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { categories } from "@/data/categories";
import { getCategoryBySlug, getGamesByCategory } from "@/lib/data";
import { routes } from "@/lib/routes";

export const dynamicParams = false;

type CategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    categorySlug: category.slug
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | PuzzleMaster"
    };
  }

  return {
    title: `${category.name} Games, Walkthroughs & Level Guides | PuzzleMaster`,
    description: `${category.name} puzzle games with walkthroughs, solutions, level guide pages, and tips on PuzzleMaster.`,
    alternates: {
      canonical: routes.category(category.slug)
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const games = getGamesByCategory(category.slug);

  return (
    <main className="container-page py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: routes.home },
          { name: "Games", item: routes.games },
          { name: category.name, item: routes.category(category.slug) }
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: routes.home },
          { label: "Games", href: routes.games },
          { label: category.name }
        ]}
      />
      <section className="mt-6 content-card p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-mint">
          Category
        </p>
        <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
          {category.name} Games
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-muted">{category.description}</p>
      </section>
      <section className="mt-10">
        <GameGrid games={games} />
      </section>
    </main>
  );
}
