"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/commerce";
import {
  productToWishlistItem,
  type WishlistItem,
} from "@/components/wishlist/wishlist-types";
import { trackWishlistEvent } from "@/components/wishlist/wishlist-analytics";

const WISHLIST_STORAGE_KEY = "wardro-wishlist";

type WishlistContextValue = {
  items: WishlistItem[];
  hydrated: boolean;
  isSaved: (productHandle: string) => boolean;
  add: (product: Product, variantId?: string) => void;
  remove: (productHandle: string, productTitle?: string) => void;
  toggle: (product: Product, variantId?: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function parseWishlist(value: string | null): WishlistItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];

    const items = parsed
      .map((item): WishlistItem | null => {
        if (typeof item === "string" && item.trim()) {
          return { productHandle: item, savedAt: 0 };
        }
        if (
          item &&
          typeof item === "object" &&
          "productHandle" in item &&
          typeof item.productHandle === "string" &&
          item.productHandle.trim()
        ) {
          return {
            ...(item as WishlistItem),
            savedAt:
              typeof (item as WishlistItem).savedAt === "number"
                ? (item as WishlistItem).savedAt
                : 0,
          };
        }
        return null;
      })
      .filter((item): item is WishlistItem => Boolean(item));

    return [...new Map(items.map((item) => [item.productHandle, item])).values()];
  } catch {
    return [];
  }
}

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setItems(parseWishlist(localStorage.getItem(WISHLIST_STORAGE_KEY)));
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  useEffect(() => {
    function syncAcrossTabs(event: StorageEvent) {
      if (event.key !== WISHLIST_STORAGE_KEY) return;
      setItems(parseWishlist(event.newValue));
    }
    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);

  const isSaved = useCallback(
    (productHandle: string) =>
      items.some((item) => item.productHandle === productHandle),
    [items],
  );

  const add = useCallback((product: Product, variantId?: string) => {
    setItems((current) => {
      if (current.some((item) => item.productHandle === product.handle)) {
        return current;
      }
      return [...current, productToWishlistItem(product, variantId)];
    });
    trackWishlistEvent("wishlist_item_added", {
      product_handle: product.handle,
      product_title: product.title,
    });
  }, []);

  const remove = useCallback(
    (productHandle: string, productTitle?: string) => {
      setItems((current) =>
        current.filter((item) => item.productHandle !== productHandle),
      );
      trackWishlistEvent("wishlist_item_removed", {
        product_handle: productHandle,
        product_title: productTitle,
      });
    },
    [],
  );

  const toggle = useCallback(
    (product: Product, variantId?: string) => {
      if (isSaved(product.handle)) {
        remove(product.handle, product.title);
      } else {
        add(product, variantId);
      }
    },
    [add, isSaved, remove],
  );

  const value = useMemo(
    () => ({ items, hydrated, isSaved, add, remove, toggle }),
    [add, hydrated, isSaved, items, remove, toggle],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error("Wishlist context missing");
  return value;
}
