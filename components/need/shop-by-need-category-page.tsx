import { ProductCard } from "@/components/commerce/product-card";
import { TrustStrip } from "@/components/commerce/trust-strip";
import type { Product } from "@/types/commerce";
import type { NeedPageConfig } from "@/data/shop-by-need-pages";
import type { NeedFilterState } from "@/lib/commerce/need-filtering";
import { NeedHero } from "./need-hero";
import { NeedQuickSelector } from "./need-quick-selector";
import { NeedProductResults } from "./need-product-results";
import { NeedSelectedFilters } from "./need-selected-filters";
import { NeedEmptyState } from "./need-empty-state";

export function ShopByNeedCategoryPage({
  allProducts,
  config,
  filteredProducts,
  filters,
  query,
}: {
  allProducts: Product[];
  config: NeedPageConfig;
  filteredProducts: Product[];
  filters: NeedFilterState;
  query: Record<string, string | undefined>;
}) {
  const pathname = `/shop-by-need/${config.slug}`;
  const summaries = allProducts.map((product) => ({
    id: product.id,
    doorCount: product.doorCount,
    colours: product.colours,
    mirror: product.mirror,
    price: product.price,
    compareAt: product.compareAt,
    variants: product.variants,
    bestSeller: product.bestSeller,
    needMetadata: product.needMetadata,
    publishedAt: product.publishedAt,
  }));

  return (
    <div className="need-category-page">
      <div className="need-category-shell">
        <NeedHero config={config} />
        <NeedQuickSelector config={config} selected={filters.primary} />
        <div className="need-category-catalogue">
          <NeedProductResults
            config={config}
            initialFilters={filters}
            products={summaries}
            resultCount={filteredProducts.length}
            selectedFilters={
              <NeedSelectedFilters
                config={config}
                filters={filters}
                pathname={pathname}
                query={query}
              />
            }
            emptyState={
              filteredProducts.length ? undefined : (
                <NeedEmptyState pathname={pathname} />
              )
            }
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                product={product}
                context="collection"
                revealIndex={index}
                key={product.id}
              />
            ))}
          </NeedProductResults>
        </div>
        <div className="need-category-reassurance">
          <TrustStrip />
        </div>
      </div>
    </div>
  );
}
