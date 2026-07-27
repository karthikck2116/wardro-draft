import type { Product } from "@/types/commerce";
import type {
  NeedPageConfig,
  NeedPrimaryFilterKey,
} from "@/data/shop-by-need-pages";

export type NeedFilterState = {
  primary?: string;
  doors?: string;
  colour?: string;
  mirror?: string;
  maxPrice?: string;
  sort?: string;
};

export type NeedProductSummary = Pick<
  Product,
  "doorCount" | "colours" | "mirror" | "price" | "variants" | "bestSeller"
> & {
  id: string;
  compareAt?: Product["compareAt"];
  needMetadata?: Product["needMetadata"];
  publishedAt?: string;
};

function matchesPrimary(
  product: NeedProductSummary,
  key: NeedPrimaryFilterKey,
  value?: string,
) {
  if (!value) return true;
  if (key === "doors") {
    return value === "5-plus"
      ? product.doorCount >= 5
      : product.doorCount === Number(value);
  }
  if (key === "room") {
    return product.needMetadata?.roomSizes?.includes(value) ?? false;
  }
  if (key === "family") {
    return product.needMetadata?.familySizes?.includes(value) ?? false;
  }
  if (key === "storage") {
    return product.needMetadata?.storageFeatures?.includes(value) ?? false;
  }
  if (key === "range") {
    const price = product.price.amount;
    if (value === "under-15000") return price < 15000;
    if (value === "15000-25000") return price >= 15000 && price <= 25000;
    if (value === "25000-40000") return price > 25000 && price <= 40000;
    if (value === "above-40000") return price > 40000;
  }
  return false;
}

function discountFor(product: NeedProductSummary) {
  const compareAt = product.compareAt?.amount;
  if (!compareAt || compareAt <= product.price.amount) return 0;
  return Math.round(((compareAt - product.price.amount) / compareAt) * 100);
}

export function filterNeedProducts<T extends NeedProductSummary>(
  products: T[],
  config: NeedPageConfig,
  filters: NeedFilterState,
) {
  const filtered = products.filter((product) => {
    if (!matchesPrimary(product, config.primaryFilterKey, filters.primary)) {
      return false;
    }
    if (
      filters.doors &&
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
    if (filters.mirror === "with") {
      if (!product.variants.some((variant) => variant.mirror === "With Mirror")) {
        return false;
      }
    }
    if (filters.mirror === "without") {
      if (
        !product.variants.some(
          (variant) => variant.mirror === "Without Mirror",
        )
      ) {
        return false;
      }
    }
    if (
      filters.maxPrice &&
      product.price.amount > Number(filters.maxPrice)
    ) {
      return false;
    }
    return true;
  });

  if (filters.sort === "price-low") {
    return filtered.sort((a, b) => a.price.amount - b.price.amount);
  }
  if (filters.sort === "price-high") {
    return filtered.sort((a, b) => b.price.amount - a.price.amount);
  }
  if (filters.sort === "best-selling") {
    return filtered.sort(
      (a, b) => Number(b.bestSeller) - Number(a.bestSeller),
    );
  }
  if (filters.sort === "newest") {
    return filtered.sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) return 0;
      return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    });
  }
  if (filters.sort === "discount") {
    return filtered.sort((a, b) => discountFor(b) - discountFor(a));
  }
  return filtered;
}
