import Link from "next/link";
import {
  guideCategories,
  type GuideCategorySlug,
} from "@/data/wardro-guide";

export function GuideCategoryTabs({
  activeCategory,
}: {
  activeCategory: GuideCategorySlug;
}) {
  return (
    <nav className="guide-tabs" aria-label="Filter guides by category">
      {guideCategories.map((category) => {
        const active = category.slug === activeCategory;
        const href =
          category.slug === "all-guides"
            ? "/wardro-guide"
            : `/wardro-guide?category=${category.slug}`;
        return (
          <Link
            className={active ? "is-active" : undefined}
            href={href}
            aria-current={active ? "page" : undefined}
            key={category.slug}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
