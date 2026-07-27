import type { Product } from "@/types/commerce";

export type MobileDoorFilter = "1" | "2" | "3" | "4" | "sliding";

export type MobileCollectionSort =
  | "featured"
  | "best-selling"
  | "price-low"
  | "price-high"
  | "newest"
  | "discount";

export type MobileCollectionFilters = {
  doors?: MobileDoorFilter;
  colour?: string;
  mirror?: "with" | "without";
  maxPrice?: number;
  storageType?: "hinged" | "sliding";
  sort: MobileCollectionSort;
};

export function getDiscount(product: Product) {
  if (!product.compareAt || product.compareAt.amount <= product.price.amount) {
    return 0;
  }

  return Math.round(
    ((product.compareAt.amount - product.price.amount) /
      product.compareAt.amount) *
      100,
  );
}

export function filterMobileCollection(
  products: Product[],
  filters: MobileCollectionFilters,
) {
  const filtered = products.filter((product) => {
    if (
      filters.doors === "sliding" &&
      product.type.toLowerCase() !== "sliding"
    ) {
      return false;
    }

    if (
      filters.doors &&
      filters.doors !== "sliding" &&
      product.doorCount !== Number(filters.doors)
    ) {
      return false;
    }

    if (
      filters.colour &&
      !product.colours.some(
        (colour) => colour.toLowerCase() === filters.colour?.toLowerCase(),
      )
    ) {
      return false;
    }

    if (filters.mirror) {
      const expected = filters.mirror === "with" ? "With Mirror" : "Without Mirror";
      if (!product.variants.some((variant) => variant.mirror === expected)) {
        return false;
      }
    }

    if (filters.maxPrice && product.price.amount > filters.maxPrice) {
      return false;
    }

    if (
      filters.storageType &&
      product.type.toLowerCase() !== filters.storageType
    ) {
      return false;
    }

    return true;
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "best-selling") {
      return Number(b.bestSeller) - Number(a.bestSeller);
    }
    if (filters.sort === "price-low") {
      return a.price.amount - b.price.amount;
    }
    if (filters.sort === "price-high") {
      return b.price.amount - a.price.amount;
    }
    if (filters.sort === "newest") {
      return (
        Date.parse(b.publishedAt ?? "1970-01-01") -
        Date.parse(a.publishedAt ?? "1970-01-01")
      );
    }
    if (filters.sort === "discount") {
      return getDiscount(b) - getDiscount(a);
    }
    return 0;
  });
}

