import type { MobileDoorFilter } from "./mobile-collection-types";

const labels: Record<MobileDoorFilter, string> = {
  "1": "1-Door Wardrobes",
  "2": "2-Door Wardrobes",
  "3": "3-Door Wardrobes",
  "4": "4-Door Wardrobes",
  sliding: "Sliding Wardrobes",
};

export function MobileSelectedCategorySummary({
  count,
  selected,
  onClear,
}: {
  count: number;
  selected?: MobileDoorFilter;
  onClear: () => void;
}) {
  return (
    <div className="mobile-selected-category">
      <strong>{selected ? labels[selected] : "All Wardrobes"}</strong>
      <span aria-live="polite" aria-atomic="true">
        {count} {count === 1 ? "Product" : "Products"} Found
      </span>
      {selected ? (
        <button type="button" onClick={onClear}>
          Clear <span aria-hidden="true">×</span>
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
    </div>
  );
}

