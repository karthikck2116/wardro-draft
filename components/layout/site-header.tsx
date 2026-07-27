"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  ArrowLeft,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { HeaderSearch } from "@/components/search/header-search";
import { AnnouncementBar } from "./announcement-bar";
import { HeaderLogo } from "./logo";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const { count, setDrawer } = useCart();
  const productPage = pathname.startsWith("/products/");

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header
        className={`header${compact ? " compact" : ""}${
          searchOpen ? " is-searching" : ""
        }`}
      >
        <div className="header-shell header-inner">
          <button
            className="mobile-icon"
            onClick={() =>
              productPage ? router.back() : setOpen((value) => !value)
            }
            aria-label={productPage ? "Go back" : "Open menu"}
            aria-expanded={open}
          >
            {productPage ? <ArrowLeft /> : <Menu />}
          </button>
          <HeaderLogo />
          <nav
            className={open ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            <Link
              href="/collections/all-wardrobes"
              aria-current={pathname.startsWith("/collections") ? "page" : undefined}
            >
              Wardrobes
            </Link>
            <Link
              href="/shop-by-need"
              aria-current={
                pathname === "/shop-by-need" ||
                pathname === "/measure-your-space"
                  ? "page"
                  : undefined
              }
            >
              Shop by Need
            </Link>
            <Link
              href="/materials-and-quality"
              aria-current={
                pathname === "/materials-and-quality" ? "page" : undefined
              }
            >
              Materials &amp; Quality
            </Link>
            <Link
              href="/wardro-guide"
              aria-current={
                pathname.startsWith("/wardro-guide") ? "page" : undefined
              }
            >
              Wardro Guide
            </Link>
            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
            >
              About Us
            </Link>
          </nav>
          <div className="header-actions">
            <button
              ref={searchTriggerRef}
              className="header-search-trigger"
              type="button"
              aria-label="Search"
              aria-haspopup="listbox"
              aria-expanded={searchOpen}
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
            >
              <Search />
            </button>
            <Link className="desktop-only" href="/account" aria-label="Account">
              <UserRound />
            </Link>
            <Link
              className="desktop-only"
              href="/wishlist"
              aria-label="Wishlist"
              aria-current={pathname === "/wishlist" ? "page" : undefined}
            >
              <Heart />
            </Link>
            <button
              onClick={() => {
                setSearchOpen(false);
                setDrawer(true);
              }}
              aria-label={`Cart with ${count} items`}
            >
              <ShoppingCart />
              <b>{count}</b>
            </button>
          </div>
          <HeaderSearch
            open={searchOpen}
            onOpenChange={setSearchOpen}
            triggerRef={searchTriggerRef}
          />
        </div>
      </header>
      <MobileNavDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
