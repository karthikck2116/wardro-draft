"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { MobileCollectionSort } from "./mobile-collection-types";
import { sortOptions } from "./mobile-sort-sheet";

export function MobileCollectionControls({
  count,
  onOpenFilters,
  onOpenSort,
  sort,
}: {
  count: number;
  onOpenFilters: () => void;
  onOpenSort: () => void;
  sort: MobileCollectionSort;
}) {
  const sortLabel =
    sortOptions.find((option) => option.value === sort)?.shortLabel ??
    "Featured";

  return (
    <div className="mobile-collection-controls">
      <button type="button" onClick={onOpenFilters}>
        <SlidersHorizontal aria-hidden="true" />
        Filters
      </button>
      <span aria-live="polite">
        <strong>{count}</strong> Products
      </span>
      <button type="button" onClick={onOpenSort}>
        Sort: {sortLabel}
        <ChevronDown aria-hidden="true" />
      </button>
    </div>
  );
}

