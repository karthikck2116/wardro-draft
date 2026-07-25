"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import {
  ChevronDown,
  CircleHelp,
  ContactRound,
  Heart,
  House,
  Layers3,
  Lightbulb,
  PackageSearch,
  ShoppingBag,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { HeaderLogo } from "@/components/layout/logo";

const wardrobeLinks = [
  ["1-Door Wardrobes", "/collections/one-door-wardrobes"],
  ["2-Door Wardrobes", "/collections/two-door-wardrobes"],
  ["3-Door Wardrobes", "/collections/three-door-wardrobes"],
  ["4-Door Wardrobes", "/collections/four-door-wardrobes"],
  ["Sliding Wardrobes", "/collections/sliding-door-wardrobes"],
];

const needLinks = [
  ["Small Spaces", "/collections/all-wardrobes?need=small-spaces"],
  ["Family Homes", "/collections/all-wardrobes?need=family-homes"],
  ["Single Living", "/collections/all-wardrobes?need=single-living"],
  ["Maximum Storage", "/collections/all-wardrobes?need=maximum-storage"],
];

export function MobileNavDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-nav-overlay" />
        <Dialog.Content
          className="mobile-nav-drawer"
          aria-describedby={undefined}
        >
          <header className="mobile-nav-head">
            <Dialog.Title className="mobile-nav-title">
              <HeaderLogo />
              <span className="sr-only">Wardro navigation</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close navigation">
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </header>

          <nav className="mobile-nav-main" aria-label="Mobile navigation">
            <details open>
              <summary>
                <span>
                  <Store aria-hidden="true" /> Wardrobes
                </span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div>
                {wardrobeLinks.map(([label, href]) => (
                  <Link href={href} key={href} onClick={close}>
                    {label}
                  </Link>
                ))}
              </div>
            </details>

            <details>
              <summary>
                <span>
                  <ShoppingBag aria-hidden="true" /> Shop by Need
                </span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div>
                <Link href="/shop-by-need" onClick={close}>
                  Explore all needs
                </Link>
                {needLinks.map(([label, href]) => (
                  <Link href={href} key={href} onClick={close}>
                    {label}
                  </Link>
                ))}
              </div>
            </details>

            <Link href="/materials-and-quality" onClick={close}>
              <Layers3 aria-hidden="true" /> Materials &amp; Quality
            </Link>
            <Link href="/wardro-guide" onClick={close}>
              <Lightbulb aria-hidden="true" /> Wardro Guide
            </Link>
            <Link href="/about" onClick={close}>
              <House aria-hidden="true" /> About Us
            </Link>
          </nav>

          <nav className="mobile-nav-secondary" aria-label="Account and support">
            <Link href="/wishlist" onClick={close}>
              <Heart aria-hidden="true" /> Wishlist
            </Link>
            <Link href="/account" onClick={close}>
              <UserRound aria-hidden="true" /> Account
            </Link>
            <Link href="/track-order" onClick={close}>
              <PackageSearch aria-hidden="true" /> Track Order
            </Link>
            <Link href="/support" onClick={close}>
              <ContactRound aria-hidden="true" /> Contact Us
            </Link>
          </nav>

          <Link className="mobile-nav-support" href="/support" onClick={close}>
            <span>
              <b>Need help?</b>
              <small>Chat with our storage experts</small>
            </span>
            <CircleHelp aria-hidden="true" />
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
