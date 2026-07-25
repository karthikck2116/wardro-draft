"use client";

import { Minus, Plus } from "lucide-react";
import { trackCartEvent } from "@/components/cart/cart-analytics";

export function CartQuantityControl({
  id,
  title,
  quantity,
  onChange,
}: {
  id: string;
  title: string;
  quantity: number;
  onChange: (id: string, quantity: number) => void;
}) {
  function change(nextQuantity: number) {
    onChange(id, nextQuantity);
    trackCartEvent(
      nextQuantity > 0 ? "cart_quantity_changed" : "cart_item_removed",
      {
        line_id: id,
        product_title: title,
        quantity: Math.max(nextQuantity, 0),
      },
    );
  }

  return (
    <div className="wardro-cart-quantity" aria-label={`Quantity for ${title}`}>
      <button
        type="button"
        onClick={() => change(quantity - 1)}
        aria-label={
          quantity === 1 ? `Remove ${title}` : `Decrease quantity of ${title}`
        }
      >
        <Minus aria-hidden="true" />
      </button>
      <output aria-live="polite" aria-label={`${quantity} selected`}>
        {quantity}
      </output>
      <button
        type="button"
        onClick={() => change(quantity + 1)}
        aria-label={`Increase quantity of ${title}`}
      >
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}
