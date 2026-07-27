import { ProductCard } from "@/components/commerce/product-card";
import type { Product } from "@/types/commerce";
import { MobileCollectionEmptyState } from "./mobile-collection-empty-state";

export function MobileProductGrid({
  clearing,
  products,
  onClear,
}: {
  clearing: boolean;
  products: Product[];
  onClear: () => void;
}) {
  if (!products.length) {
    return <MobileCollectionEmptyState onClear={onClear} />;
  }

  return (
    <div
      className={`mobile-collection-grid${clearing ? " is-updating" : ""}`}
      aria-busy={clearing}
    >
      {products.map((product) => (
        <ProductCard product={product} context="collection" key={product.id} />
      ))}
    </div>
  );
}

