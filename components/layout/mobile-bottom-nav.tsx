"use client";

import Link from "next/link";
import { Grid2X2, Heart, Home, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/", Icon: Home },
  {
    label: "Categories",
    href: "/collections/all-wardrobes",
    Icon: Grid2X2,
  },
  { label: "Wishlist", href: "/wishlist", Icon: Heart },
  { label: "Account", href: "/account", Icon: UserRound },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/products/") || pathname === "/cart") return null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
      {links.map(({ label, href, Icon }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            href={href}
            key={href}
            className={active ? "is-active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
