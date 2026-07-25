"use client";

import type { Product } from "@/types/commerce";
import { ProductCard } from "@/components/commerce/product-card";

export function WishlistGrid({
  products,
  removingHandles,
  onRemove,
}: {
  products: Product[];
  removingHandles: Set<string>;
  onRemove: (product: Product) => void;
}) {
  return (
    <section className="wishlist-grid" aria-label="Saved wardrobes">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          context="wishlist"
          revealIndex={index}
          wishlistRemoving={removingHandles.has(product.handle)}
          onWishlistRemove={onRemove}
        />
      ))}
    </section>
  );
}
