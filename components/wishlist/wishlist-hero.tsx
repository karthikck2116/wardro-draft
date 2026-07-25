"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { trackWishlistEvent } from "@/components/wishlist/wishlist-analytics";

export function WishlistHero({ count }: { count: number }) {
  return (
    <section className="wishlist-hero" aria-labelledby="wishlist-title">
      <div className="wishlist-hero-copy">
        <p className="wishlist-eyebrow">Wardro</p>
        <h1 id="wishlist-title">Your wishlist</h1>
        <p className="wishlist-hero-description">
          Saved products are stored in this browser while shopping as a guest.
        </p>
        <div className="wishlist-hero-actions">
          <span className="wishlist-count" aria-live="polite">
            <Heart aria-hidden="true" />
            {count} saved {count === 1 ? "item" : "items"}
          </span>
          <Link
            href="/collections/all-wardrobes"
            onClick={() =>
              trackWishlistEvent("wishlist_continue_shopping_clicked")
            }
          >
            Continue shopping <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="wishlist-hero-image" aria-hidden="true">
        <Image
          src="/images/categories/one-door.png"
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 48vw"
        />
      </div>
    </section>
  );
}
