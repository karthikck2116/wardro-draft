"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trackNeedEvent } from "./need-analytics";

export const needSortOptions = [
  ["featured", "Featured"],
  ["best-selling", "Best Selling"],
  ["price-low", "Price: Low to High"],
  ["price-high", "Price: High to Low"],
  ["newest", "Newest"],
  ["discount", "Discount"],
] as const;

export function NeedResultHeader({
  count,
  selectedSort,
  onOpenFilters,
}: {
  count: number;
  selectedSort?: string;
  onOpenFilters: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeSort = (value: string) => {
    const query = new URLSearchParams(searchParams.toString());
    if (value === "featured") query.delete("sort");
    else query.set("sort", value);
    trackNeedEvent("need_sort_changed", { sort: value });
    router.push(query.size ? `${pathname}?${query.toString()}` : pathname);
  };

  return (
    <div className="need-result-header">
      <p aria-live="polite">
        <strong>{count}</strong> {count === 1 ? "Product" : "Products"} Found
      </p>
      <button
        className="need-mobile-filter-button"
        type="button"
        onClick={onOpenFilters}
      >
        <SlidersHorizontal aria-hidden="true" />
        Filters
      </button>
      <label>
        <span>Sort by</span>
        <select
          aria-label="Sort products"
          value={selectedSort ?? "featured"}
          onChange={(event) => changeSort(event.currentTarget.value)}
        >
          {needSortOptions.map(([value, label]) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
