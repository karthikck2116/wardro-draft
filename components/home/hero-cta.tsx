import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroCTA() {
  return (
    <div className="hero-actions">
      <Link
        className="hero-button hero-button-primary"
        href="/collections/all-wardrobes"
      >
        Find Your Wardrobe <ArrowRight aria-hidden="true" />
      </Link>
      <Link
        className="hero-button hero-button-secondary"
        href="/collections/best-sellers"
      >
        Explore Best Sellers
      </Link>
    </div>
  );
}
