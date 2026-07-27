"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { Product } from "@/types/commerce";
import { MobileCollectionControls } from "./mobile-collection-controls";
import { MobileCollectionHero } from "./mobile-collection-hero";
import {
  filterMobileCollection,
  type MobileCollectionFilters,
  type MobileCollectionSort,
  type MobileDoorFilter,
} from "./mobile-collection-types";
import { MobileDoorSelector } from "./mobile-door-selector";
import { MobileFilterDrawer } from "./mobile-filter-drawer";
import { MobileProductGrid } from "./mobile-product-grid";
import { MobileSelectedCategorySummary } from "./mobile-selected-category-summary";
import { MobileSortSheet } from "./mobile-sort-sheet";

function filtersFromSearch(
  search: string,
  fallback: MobileCollectionFilters,
): MobileCollectionFilters {
  const query = new URLSearchParams(search);
  const doors = query.get("doors");
  const mirror = query.get("mirror");
  const storageType = query.get("storageType");
  const sort = query.get("sort");

  return {
    doors:
      doors === "1" ||
      doors === "2" ||
      doors === "3" ||
      doors === "4" ||
      doors === "sliding"
        ? doors
        : fallback.doors,
    colour: query.get("colour") ?? undefined,
    mirror:
      mirror === "with" || mirror === "without" ? mirror : undefined,
    maxPrice: query.get("maxPrice")
      ? Number(query.get("maxPrice"))
      : undefined,
    storageType:
      storageType === "hinged" || storageType === "sliding"
        ? storageType
        : undefined,
    sort:
      sort === "best-selling" ||
      sort === "price-low" ||
      sort === "price-high" ||
      sort === "newest" ||
      sort === "discount"
        ? sort
        : "featured",
  };
}

function queryForFilters(filters: MobileCollectionFilters) {
  const query = new URLSearchParams();
  if (filters.doors) query.set("doors", filters.doors);
  if (filters.colour) query.set("colour", filters.colour);
  if (filters.mirror) query.set("mirror", filters.mirror);
  if (filters.maxPrice) query.set("maxPrice", String(filters.maxPrice));
  if (filters.storageType) query.set("storageType", filters.storageType);
  if (filters.sort !== "featured") query.set("sort", filters.sort);
  return query;
}

export function MobileCollectionExperience({
  initialFilters,
  products,
}: {
  initialFilters: MobileCollectionFilters;
  products: Product[];
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const onPopState = () => {
      startTransition(() => {
        setFilters(
          filtersFromSearch(window.location.search, { sort: "featured" }),
        );
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const productsShown = useMemo(
    () => filterMobileCollection(products, filters),
    [filters, products],
  );

  const commit = (next: MobileCollectionFilters) => {
    const query = queryForFilters(next);
    const nextUrl = query.size
      ? `${window.location.pathname}?${query.toString()}`
      : window.location.pathname;
    window.history.pushState(null, "", nextUrl);
    startTransition(() => setFilters(next));
  };

  const chooseDoors = (doors: MobileDoorFilter) => {
    commit({ ...filters, doors });
  };

  const clearAll = () => {
    commit({ sort: filters.sort });
  };

  const changeSort = (sort: MobileCollectionSort) => {
    commit({ ...filters, sort });
  };

  return (
    <div className="mobile-collection-experience">
      <MobileCollectionHero />
      <MobileDoorSelector selected={filters.doors} onSelect={chooseDoors} />
      <MobileSelectedCategorySummary
        count={productsShown.length}
        selected={filters.doors}
        onClear={() => commit({ ...filters, doors: undefined })}
      />
      <MobileCollectionControls
        count={productsShown.length}
        sort={filters.sort}
        onOpenFilters={() => setFiltersOpen(true)}
        onOpenSort={() => setSortOpen(true)}
      />
      <MobileProductGrid
        clearing={isPending}
        products={productsShown}
        onClear={clearAll}
      />
      <MobileFilterDrawer
        key={JSON.stringify(filters)}
        filters={filters}
        products={products}
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        onApply={commit}
      />
      <MobileSortSheet
        selected={filters.sort}
        open={sortOpen}
        onOpenChange={setSortOpen}
        onChange={changeSort}
      />
    </div>
  );
}
