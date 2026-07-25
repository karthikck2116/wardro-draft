import Link from "next/link";

type CollectionQuickFiltersProps = {
  handle: string;
  selectedDoors?: string;
  mirrorSelected: boolean;
};

export function CollectionQuickFilters({
  handle,
  selectedDoors,
  mirrorSelected,
}: CollectionQuickFiltersProps) {
  const filters = [
    ...[1, 2, 3, 4].map((doors) => ({
      label: `${doors}-Door`,
      href: `?doors=${doors}`,
      active: selectedDoors === String(doors),
    })),
    {
      label: "Sliding Door",
      href: "/collections/sliding-door-wardrobes",
      active: handle === "sliding-door-wardrobes",
    },
    {
      label: "With Mirror",
      href: "?mirror=with",
      active: mirrorSelected,
    },
    {
      label: "Best Sellers",
      href: "/collections/best-sellers",
      active: handle === "best-sellers",
    },
  ];

  return (
    <nav className="wardro-quick-filters" aria-label="Browse wardrobe categories">
      {filters.map((filter) => (
        <Link
          className={filter.active ? "is-active" : undefined}
          href={filter.href}
          key={filter.label}
          aria-current={filter.active ? "page" : undefined}
        >
          {filter.label}
        </Link>
      ))}
    </nav>
  );
}
