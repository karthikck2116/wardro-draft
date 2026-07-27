import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce/repository";
import {
  shopByNeedPageMap,
  shopByNeedPages,
  type NeedPageSlug,
} from "@/data/shop-by-need-pages";
import {
  filterNeedProducts,
  type NeedFilterState,
} from "@/lib/commerce/need-filtering";
import { ShopByNeedCategoryPage } from "@/components/need/shop-by-need-category-page";

type NeedRouteProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export function generateStaticParams() {
  return shopByNeedPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: NeedRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const config = shopByNeedPageMap.get(slug as NeedPageSlug);
  if (!config) return {};
  return {
    title: `${config.title} | Shop by Need`,
    description: config.description,
    alternates: { canonical: `/shop-by-need/${config.slug}` },
  };
}

export default async function ShopByNeedCategoryRoute({
  params,
  searchParams,
}: NeedRouteProps) {
  const { slug } = await params;
  const config = shopByNeedPageMap.get(slug as NeedPageSlug);
  if (!config) notFound();

  const query = await searchParams;
  const filters: NeedFilterState = {
    primary: query[config.primaryFilterKey],
    doors:
      config.primaryFilterKey === "doors" ? undefined : query.doors,
    colour: query.colour,
    mirror:
      query.mirror === "with" || query.mirror === "without"
        ? query.mirror
        : undefined,
    maxPrice: query.maxPrice,
    sort: query.sort,
  };

  const allProducts = await commerce.getCollection("all-wardrobes", {});
  const filteredProducts = filterNeedProducts(allProducts, config, filters);

  return (
    <ShopByNeedCategoryPage
      allProducts={allProducts}
      config={config}
      filteredProducts={filteredProducts}
      filters={filters}
      query={query}
    />
  );
}
