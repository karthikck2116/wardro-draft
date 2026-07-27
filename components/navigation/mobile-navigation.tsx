"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ContactRound,
  Heart,
  House,
  Layers3,
  Lightbulb,
  PackageSearch,
  ShoppingBag,
  Store,
  UserRound,
} from "lucide-react";
import {
  mobileShopByNeedItems,
  navigationFeaturedPanel,
  wardrobeDoorItems,
  type NavigationItem,
} from "@/data/navigation";

export type MobileNavigationPanel = "main" | "wardrobes" | "shopByNeed";

export function MobileNavigationPromoCard({
  onSelect,
}: {
  onSelect: () => void;
}) {
  const Icon = navigationFeaturedPanel.icon;
  return (
    <aside className="mobile-navigation-promo">
      <div className="mobile-navigation-promo-image">
        <Image
          src={navigationFeaturedPanel.image}
          alt={navigationFeaturedPanel.imageAlt}
          fill
          sizes="112px"
        />
      </div>
      <div className="mobile-navigation-promo-copy">
        <span className="mobile-navigation-promo-icon">
          <Icon aria-hidden />
        </span>
        <strong>{navigationFeaturedPanel.mobileTitle}</strong>
        <p>{navigationFeaturedPanel.mobileDescription}</p>
        <Link href={navigationFeaturedPanel.href} onClick={onSelect}>
          {navigationFeaturedPanel.cta}
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </aside>
  );
}

export function MobileNavigationMain({
  wardrobesActive,
  shopByNeedActive,
  onOpenWardrobes,
  onOpenShopByNeed,
  onSelect,
  wardrobesTriggerRef,
  shopByNeedTriggerRef,
}: {
  wardrobesActive: boolean;
  shopByNeedActive: boolean;
  onOpenWardrobes: () => void;
  onOpenShopByNeed: () => void;
  onSelect: () => void;
  wardrobesTriggerRef: React.RefObject<HTMLButtonElement | null>;
  shopByNeedTriggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className="mobile-navigation-scroll">
      <nav className="mobile-navigation-main" aria-label="Mobile navigation">
        <Link href="/" onClick={onSelect}>
          <House aria-hidden /> <span>Home</span>
          <ChevronRight aria-hidden />
        </Link>
        <button
          ref={wardrobesTriggerRef}
          type="button"
          className={wardrobesActive ? "is-active" : ""}
          aria-expanded="false"
          onClick={onOpenWardrobes}
        >
          <Store aria-hidden /> <span>Wardrobes</span>
          <ChevronRight aria-hidden />
        </button>
        <button
          ref={shopByNeedTriggerRef}
          type="button"
          className={shopByNeedActive ? "is-active" : ""}
          aria-expanded="false"
          onClick={onOpenShopByNeed}
        >
          <ShoppingBag aria-hidden /> <span>Shop by Need</span>
          <ChevronRight aria-hidden />
        </button>
        <Link href="/materials-and-quality" onClick={onSelect}>
          <Layers3 aria-hidden /> <span>Materials &amp; Quality</span>
          <ChevronRight aria-hidden />
        </Link>
        <Link href="/wardro-guide" onClick={onSelect}>
          <Lightbulb aria-hidden /> <span>Wardro Guide</span>
          <ChevronRight aria-hidden />
        </Link>
        <Link href="/about" onClick={onSelect}>
          <House aria-hidden /> <span>About Us</span>
          <ChevronRight aria-hidden />
        </Link>
      </nav>

      <nav className="mobile-navigation-secondary" aria-label="Account and support">
        <Link href="/wishlist" onClick={onSelect}>
          <Heart aria-hidden /> Wishlist
        </Link>
        <Link href="/account" onClick={onSelect}>
          <UserRound aria-hidden /> Account
        </Link>
        <Link href="/track-order" onClick={onSelect}>
          <PackageSearch aria-hidden /> Track Order
        </Link>
        <Link href="/support" onClick={onSelect}>
          <ContactRound aria-hidden /> Contact Us
        </Link>
      </nav>

      <MobileNavigationPromoCard onSelect={onSelect} />
    </div>
  );
}

function MobileNavigationRow({
  item,
  mode,
  onSelect,
}: {
  item: NavigationItem;
  mode: "thumbnail" | "icon";
  onSelect: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link className="mobile-navigation-row" href={item.href} onClick={onSelect}>
      {mode === "thumbnail" && item.image ? (
        <span className="mobile-navigation-row-thumb">
          <Image
            src={item.image}
            alt={item.imageAlt ?? ""}
            fill
            sizes="54px"
          />
        </span>
      ) : Icon ? (
        <span className="mobile-navigation-row-icon">
          <Icon aria-hidden />
        </span>
      ) : null}
      <span>
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>
      <ChevronRight aria-hidden />
    </Link>
  );
}

export function MobileNavigationSubPanel({
  panel,
  onSelect,
}: {
  panel: Exclude<MobileNavigationPanel, "main">;
  onSelect: () => void;
}) {
  const isWardrobes = panel === "wardrobes";
  const items = isWardrobes ? wardrobeDoorItems : mobileShopByNeedItems;

  return (
    <div className="mobile-navigation-subpanel">
      <div className="mobile-navigation-subpanel-scroll">
        <h2>{isWardrobes ? "Browse by doors" : "Find your need"}</h2>
        <div className="mobile-navigation-rows">
          {items.map((item) => (
            <MobileNavigationRow
              key={item.title}
              item={item}
              mode={isWardrobes ? "thumbnail" : "icon"}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
      <Link
        className="mobile-navigation-subpanel-cta"
        href={isWardrobes ? "/collections/all-wardrobes" : "/shop-by-need"}
        onClick={onSelect}
      >
        {isWardrobes ? "View All Wardrobes" : "View All Needs"}
        <ArrowRight aria-hidden />
      </Link>
    </div>
  );
}
