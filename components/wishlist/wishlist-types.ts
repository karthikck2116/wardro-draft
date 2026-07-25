import type { Product } from "@/types/commerce";

export type WishlistItem = {
  productHandle: string;
  variantId?: string;
  title?: string;
  image?: string;
  dimensions?: string;
  price?: number;
  compareAtPrice?: number;
  currencyCode?: "INR";
  colours?: string[];
  customisable?: boolean;
  available?: boolean;
  savedAt: number;
};

export function productToWishlistItem(
  product: Product,
  variantId?: string,
): WishlistItem {
  return {
    productHandle: product.handle,
    variantId,
    title: product.title,
    image: product.featuredImage,
    dimensions: product.dimensions,
    price: product.price.amount,
    compareAtPrice: product.compareAt?.amount,
    currencyCode: product.price.currencyCode,
    colours: product.colours,
    customisable: product.customisable,
    available: product.variants.some((variant) => variant.available),
    savedAt: Date.now(),
  };
}
