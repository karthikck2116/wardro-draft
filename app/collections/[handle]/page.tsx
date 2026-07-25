import type { Metadata } from "next";
import Link from "next/link";
import { commerce } from "@/lib/commerce/repository";
import { ProductCard } from "@/components/commerce/product-card";
import { TrustStrip } from "@/components/commerce/trust-strip";
import { CollectionHero } from "@/components/collection/collection-hero";
import { CollectionQuickFilters } from "@/components/collection/collection-quick-filters";
import { CollectionFilters } from "@/components/collection/collection-filters";
import { CollectionResultHeader } from "@/components/collection/collection-result-header";

export const metadata: Metadata = {
  title: "All Wardrobes",
  description: "Explore hinged and sliding wardrobes for modern Bengaluru homes.",
};

type CollectionPageProps = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function Collection({
  params,
  searchParams,
}: CollectionPageProps) {
  const { handle } = await params;
  const query = await searchParams;
  const items = await commerce.getCollection(handle, {
    doors: query.doors ? Number(query.doors) : undefined,
    colour: query.colour,
    mirror: query.mirror === "with" || query.mirror === "without" ? query.mirror : undefined,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    storageType: query.storageType,
    sort: query.sort,
  });

  return (
    <div className="wardro-collection-page">
      <div className="wardro-collection-container">
        <CollectionHero />
        <CollectionQuickFilters
          handle={handle}
          selectedDoors={query.doors}
          mirrorSelected={query.mirror === "with"}
        />
        <div className="wardro-catalogue">
          <CollectionFilters
            selectedDoors={query.doors}
            selectedColour={query.colour}
            selectedMirror={query.mirror}
            selectedSort={query.sort}
            selectedMaxPrice={query.maxPrice}
            selectedStorageType={query.storageType}
            resultCount={items.length}
          />
          <section className="wardro-results" aria-label="Wardrobe products">
            <CollectionResultHeader count={items.length} selectedSort={query.sort} />
            <div className="wardro-collection-product-grid">
              {items.map((product) => (
                <ProductCard product={product} context="collection" key={product.id} />
              ))}
            </div>
            {!items.length ? (
              <div className="wardro-collection-empty">
                <h2>No wardrobes match those filters</h2>
                <p>Try clearing one or more filters.</p>
                <Link href="?">Clear filters</Link>
              </div>
            ) : null}
          </section>
        </div>
        <div className="wardro-collection-trust">
          <TrustStrip />
        </div>
      </div>
    </div>
  );
}
