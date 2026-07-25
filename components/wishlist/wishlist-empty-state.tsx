import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export function WishlistEmptyState() {
  return (
    <section className="wishlist-empty" aria-labelledby="wishlist-empty-title">
      <span aria-hidden="true">
        <Heart />
      </span>
      <h2 id="wishlist-empty-title">
        Your wishlist is ready for favourites
      </h2>
      <p>
        Save wardrobes you love and compare them whenever you&apos;re ready.
      </p>
      <div>
        <Link
          className="wishlist-empty-primary"
          href="/collections/all-wardrobes"
        >
          Explore Wardrobes <ArrowRight aria-hidden="true" />
        </Link>
        <Link
          className="wishlist-empty-secondary"
          href="/collections/all-wardrobes?sort=best-selling"
        >
          View Best Sellers
        </Link>
      </div>
    </section>
  );
}
