"use client";

import { LayoutGrid } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CollectionResultHeaderProps = {
  count: number;
  selectedSort?: string;
};

export function CollectionResultHeader({
  count,
  selectedSort,
}: CollectionResultHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="wardro-result-header">
      <div>
        <LayoutGrid aria-hidden="true" />
        <span>
          <strong>{count}</strong> wardrobes
        </span>
      </div>
      <form>
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          name="sort"
          value={selectedSort ?? "recommended"}
          onChange={(event) => {
            const query = new URLSearchParams(searchParams.toString());
            if (event.currentTarget.value === "recommended") {
              query.delete("sort");
            } else {
              query.set("sort", event.currentTarget.value);
            }
            router.push(query.size ? `${pathname}?${query.toString()}` : pathname);
          }}
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </form>
    </div>
  );
}
