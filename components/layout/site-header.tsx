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
import { DesktopMegaMenu } from "@/components/navigation/desktop-mega-menu";
import {
  NavigationTrigger,
  type NavigationMenuKey,
} from "@/components/navigation/navigation-trigger";
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
  const [activeMenu, setActiveMenu] = useState<NavigationMenuKey | null>(null);
  const [menuPinned, setMenuPinned] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const { count, setDrawer } = useCart();
  const productPage = pathname.startsWith("/products/");
  const wardrobesActive =
    pathname.startsWith("/collections") || pathname.startsWith("/products");
  const shopByNeedActive =
    pathname.startsWith("/shop-by-need") || pathname === "/measure-your-space";

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setActiveMenu(null);
        setMenuPinned(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const menu = activeMenu;
      setActiveMenu(null);
      setMenuPinned(false);
      window.requestAnimationFrame(() =>
        document.getElementById(`nav-trigger-${menu}`)?.focus(),
      );
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeMenu]);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const openMegaMenu = (menu: NavigationMenuKey, pinned = false) => {
    clearHoverTimer();
    setSearchOpen(false);
    setActiveMenu(menu);
    setMenuPinned(pinned);
  };

  const previewMegaMenu = (menu: NavigationMenuKey) => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      openMegaMenu(menu);
    }, 90);
  };

  const scheduleMegaMenuClose = () => {
    clearHoverTimer();
    if (menuPinned) return;
    hoverTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 170);
  };

  const closeMegaMenu = () => {
    clearHoverTimer();
    setActiveMenu(null);
    setMenuPinned(false);
  };

  const toggleMegaMenu = (menu: NavigationMenuKey) => {
    if (activeMenu === menu && menuPinned) {
      closeMegaMenu();
      return;
    }
    openMegaMenu(menu, true);
  };

  const handleMenuKeyDown = (
    menu: NavigationMenuKey,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    openMegaMenu(menu, true);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`desktop-menu-${menu}`)
        ?.querySelector<HTMLElement>("a, button")
        ?.focus();
    });
  };

  return (
    <>
      <AnnouncementBar />
      <header
        ref={headerRef}
        className={`header${compact ? " compact" : ""}${
          searchOpen ? " is-searching" : ""
        }${activeMenu ? " is-menu-open" : ""}`}
      >
        <div className="header-shell header-inner">
          <button
            className="mobile-icon"
            onClick={() =>
              productPage
                ? router.back()
                : (closeMegaMenu(),
                  setSearchOpen(false),
                  setOpen((value) => !value))
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
            <NavigationTrigger
              menu="wardrobes"
              label="Wardrobes"
              open={activeMenu === "wardrobes"}
              current={wardrobesActive}
              onClick={() => toggleMegaMenu("wardrobes")}
              onPointerEnter={() => previewMegaMenu("wardrobes")}
              onPointerLeave={scheduleMegaMenuClose}
              onKeyDown={(event) => handleMenuKeyDown("wardrobes", event)}
            />
            <NavigationTrigger
              menu="shopByNeed"
              label="Shop by Need"
              open={activeMenu === "shopByNeed"}
              current={shopByNeedActive}
              onClick={() => toggleMegaMenu("shopByNeed")}
              onPointerEnter={() => previewMegaMenu("shopByNeed")}
              onPointerLeave={scheduleMegaMenuClose}
              onKeyDown={(event) => handleMenuKeyDown("shopByNeed", event)}
            />
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
                closeMegaMenu();
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
            onOpenChange={(nextOpen) => {
              if (nextOpen) closeMegaMenu();
              setSearchOpen(nextOpen);
            }}
            triggerRef={searchTriggerRef}
          />
        </div>
        <DesktopMegaMenu
          activeMenu={activeMenu}
          onSelect={closeMegaMenu}
          onPointerEnter={clearHoverTimer}
          onPointerLeave={scheduleMegaMenuClose}
        />
      </header>
      <MobileNavDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
