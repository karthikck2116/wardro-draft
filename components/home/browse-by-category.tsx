import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryImageByHandle } from "@/config/homepage-images";
import { CategoryCard, type CategoryCardData } from "./category-card";
import { DiscoveryRevealSection } from "./discovery-reveal-section";

const categories: CategoryCardData[] = [
  {
    title: "2-Door Wardrobes",
    description: "Compact & practical",
    href: "/collections/two-door-wardrobes",
    image: categoryImageByHandle["two-door-wardrobes"],
    imageAlt: "Two-door walnut wardrobe in a warm bedroom",
    iconType: "two-door",
  },
  {
    title: "3-Door Wardrobes",
    description: "Spacious & versatile",
    href: "/collections/three-door-wardrobes",
    image: categoryImageByHandle["three-door-wardrobes"],
    imageAlt: "Three-door walnut wardrobe with surrounding bedroom decor",
    iconType: "three-door",
  },
  {
    title: "Sliding Wardrobes",
    description: "Space-saving elegance",
    href: "/collections/sliding-door-wardrobes",
    image: categoryImageByHandle["sliding-door-wardrobes"],
    imageAlt: "Sliding-door wardrobe with mirror in a bright bedroom",
    iconType: "sliding",
  },
  {
    title: "1-Door Wardrobes",
    description: "Slim & smart",
    href: "/collections/one-door-wardrobes",
    image: categoryImageByHandle["one-door-wardrobes"],
    imageAlt: "Slim one-door wardrobe beside a bed and side table",
    iconType: "one-door",
  },
  {
    title: "4-Door Wardrobes",
    description: "Maximum storage",
    href: "/collections/four-door-wardrobes",
    image: categoryImageByHandle["four-door-wardrobes"],
    imageAlt: "Wide four-door walnut wardrobe in a styled bedroom",
    iconType: "four-door",
  },
];

export function BrowseByCategory() {
  return (
    <DiscoveryRevealSection
      className="wardro-discovery-container browse-category-section"
      labelledBy="browse-category-title"
    >
      <div className="browse-category-header discovery-reveal-heading">
        <div>
          <h2 id="browse-category-title">
            Browse by <span>Category</span>
          </h2>
          <i aria-hidden="true" />
          <p>Find the perfect wardrobe for your space and style.</p>
        </div>
        <Link href="/collections/all-wardrobes">
          View all wardrobes <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="wardro-category-grid">
        {categories.map((category, index) => (
          <CategoryCard {...category} index={index} key={category.title} />
        ))}
      </div>
    </DiscoveryRevealSection>
  );
}
