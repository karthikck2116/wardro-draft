"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/commerce";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { trackWishlistEvent } from "@/components/wishlist/wishlist-analytics";
import { WishlistHero } from "@/components/wishlist/wishlist-hero";
import { WishlistInfoBar } from "@/components/wishlist/wishlist-info-bar";
import { WishlistGrid } from "@/components/wishlist/wishlist-grid";
import { WishlistEmptyState } from "@/components/wishlist/wishlist-empty-state";

export function WishlistPage({ products }: { products: Product[] }) {
  const { items, hydrated, remove } = useWishlist();
  const [removingHandles, setRemovingHandles] = useState<Set<string>>(
    () => new Set(),
  );
  const timers = useRef<number[]>([]);

  const savedProducts = useMemo(() => {
    const productsByHandle = new Map(
      products.map((product) => [product.handle, product]),
    );
    return items
      .map((item) => productsByHandle.get(item.productHandle))
      .filter((product): product is Product => Boolean(product));
  }, [items, products]);

  const unavailableCount = Math.max(items.length - savedProducts.length, 0);

  useEffect(() => {
    if (!hydrated) return;
    trackWishlistEvent("wishlist_viewed", {
      item_count: savedProducts.length,
      unavailable_count: unavailableCount,
    });
  }, [hydrated, savedProducts.length, unavailableCount]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  function removeWithMotion(product: Product) {
    setRemovingHandles((current) => new Set(current).add(product.handle));
    const timer = window.setTimeout(() => {
      remove(product.handle, product.title);
      setRemovingHandles((current) => {
        const next = new Set(current);
        next.delete(product.handle);
        return next;
      });
    }, 220);
    timers.current.push(timer);
  }

  return (
    <div className="wishlist-page">
      <WishlistHero count={hydrated ? savedProducts.length : 0} />
      <div className="wishlist-shell">
        {hydrated ? (
          savedProducts.length ? (
            <>
              <WishlistInfoBar />
              {unavailableCount ? (
                <p className="wishlist-unavailable" role="status">
                  {unavailableCount} saved{" "}
                  {unavailableCount === 1 ? "product is" : "products are"} no
                  longer available.
                </p>
              ) : null}
              <WishlistGrid
                products={savedProducts}
                removingHandles={removingHandles}
                onRemove={removeWithMotion}
              />
            </>
          ) : (
            <WishlistEmptyState />
          )
        ) : (
          <div className="wishlist-loading" aria-label="Loading saved products">
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
}
