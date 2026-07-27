import Link from "next/link";

export function NeedEmptyState({ pathname }: { pathname: string }) {
  return (
    <div className="need-empty-state">
      <h2>No exact matches found</h2>
      <p>Try changing one or more filters to see suitable wardrobes.</p>
      <div>
        <Link href={pathname}>Clear Filters</Link>
        <Link href="/collections/all-wardrobes">View All Wardrobes</Link>
        <Link href="/shop-by-need">Shop by Need</Link>
      </div>
    </div>
  );
}
