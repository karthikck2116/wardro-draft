"use client";

import { Heart, X } from "lucide-react";
import type { Product } from "@/types/commerce";
import { useWishlist } from "@/components/wishlist/wishlist-provider";

type ProductWishlistButtonProps = {
  product: Product;
  mode?: "toggle" | "remove";
  onRemove?: (product: Product) => void;
};

export function ProductWishlistButton({
  product,
  mode = "toggle",
  onRemove,
}: ProductWishlistButtonProps) {
  const { isSaved, remove, toggle } = useWishlist();
  const selected = isSaved(product.handle);
  const removeMode = mode === "remove";

  function toggleWishlist() {
    if (removeMode) {
      if (onRemove) onRemove(product);
      else remove(product.handle, product.title);
      return;
    }
    toggle(product);
  }

  return (
    <button
      className={`wardro-product-wishlist${selected ? " is-selected" : ""}${
        removeMode ? " is-remove" : ""
      }`}
      type="button"
      onClick={toggleWishlist}
      aria-label={
        removeMode
          ? `Remove ${product.title} from wishlist`
          : `${selected ? "Remove" : "Add"} ${product.title} ${
              selected ? "from" : "to"
            } wishlist`
      }
      aria-pressed={removeMode ? true : selected}
    >
      {removeMode ? <X aria-hidden="true" /> : <Heart aria-hidden="true" />}
    </button>
  );
}
