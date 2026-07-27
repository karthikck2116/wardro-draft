import Link from "next/link";
import { X } from "lucide-react";
import type { NeedPageConfig } from "@/data/shop-by-need-pages";
import type { NeedFilterState } from "@/lib/commerce/need-filtering";

function hrefWithout(
  pathname: string,
  query: Record<string, string | undefined>,
  key: string,
) {
  const next = new URLSearchParams();
  Object.entries(query).forEach(([entryKey, value]) => {
    if (entryKey !== key && value) next.set(entryKey, value);
  });
  return next.size ? `${pathname}?${next.toString()}` : pathname;
}

export function NeedSelectedFilters({
  config,
  filters,
  pathname,
  query,
}: {
  config: NeedPageConfig;
  filters: NeedFilterState;
  pathname: string;
  query: Record<string, string | undefined>;
}) {
  const selectedOption = config.options.find(
    (option) => option.value === filters.primary,
  );
  const chips = [
    selectedOption
      ? {
          key: config.primaryFilterKey,
          label: selectedOption.title,
        }
      : null,
    filters.doors && config.primaryFilterKey !== "doors"
      ? { key: "doors", label: `${filters.doors} Door${filters.doors === "1" ? "" : "s"}` }
      : null,
    filters.colour
      ? { key: "colour", label: filters.colour }
      : null,
    filters.mirror
      ? {
          key: "mirror",
          label: filters.mirror === "with" ? "With Mirror" : "Without Mirror",
        }
      : null,
    filters.maxPrice
      ? {
          key: "maxPrice",
          label: `Up to ₹${Number(filters.maxPrice).toLocaleString("en-IN")}`,
        }
      : null,
  ].filter(Boolean) as { key: string; label: string }[];

  if (!chips.length) return null;

  return (
    <div className="need-selected-filters" aria-label="Selected filters">
      {chips.map((chip) => (
        <Link
          href={hrefWithout(pathname, query, chip.key)}
          aria-label={`Remove ${chip.label} filter`}
          key={`${chip.key}-${chip.label}`}
        >
          {chip.label}
          <X aria-hidden="true" />
        </Link>
      ))}
      <Link className="need-clear-filters" href={pathname}>
        Clear All
      </Link>
    </div>
  );
}
