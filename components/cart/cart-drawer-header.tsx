"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function CartDrawerHeader({ count }: { count: number }) {
  return (
    <header className="wardro-cart-head">
      <div>
        <Dialog.Title>Your cart</Dialog.Title>
        {count ? <span>{count} {count === 1 ? "item" : "items"}</span> : null}
      </div>
      <Dialog.Close asChild>
        <button type="button" aria-label="Close cart">
          <X aria-hidden="true" />
        </button>
      </Dialog.Close>
    </header>
  );
}
