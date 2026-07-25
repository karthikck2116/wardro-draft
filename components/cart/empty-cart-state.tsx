"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function EmptyCartState() {
  return (
    <div className="wardro-cart-empty">
      <span aria-hidden="true">
        <ShoppingBag />
      </span>
      <h3>Your cart is waiting</h3>
      <p>Add a wardrobe or storage essential to get started.</p>
      <Dialog.Close asChild>
        <Link
          className="wardro-cart-empty-primary"
          href="/collections/all-wardrobes"
        >
          Explore Wardrobes <ArrowRight aria-hidden="true" />
        </Link>
      </Dialog.Close>
      <div>
        <Dialog.Close asChild>
          <Link href="/collections/all-wardrobes?sort=best-selling">
            Best Sellers
          </Link>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Link href="/shop-by-need">Shop by Need</Link>
        </Dialog.Close>
      </div>
    </div>
  );
}
