"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { trackCartEvent } from "@/components/cart/cart-analytics";

export function CartSummary({
  total,
  checkoutUrl,
  pinConfirmed,
  onClose,
}: {
  total: number;
  checkoutUrl: string;
  pinConfirmed: boolean;
  onClose: () => void;
}) {
  const usesFullCartAsCheckout = checkoutUrl === "/cart";

  return (
    <footer className="wardro-cart-summary">
      <div className="wardro-cart-subtotal">
        <span>Subtotal</span>
        <strong>{formatMoney(total)}</strong>
      </div>
      <p>
        {pinConfirmed
          ? "Delivery and installation eligibility confirmed by PIN code."
          : "Delivery and installation calculated using your PIN code."}
      </p>
      <a
        className="wardro-cart-checkout"
        href={checkoutUrl}
        onClick={() => {
          trackCartEvent("checkout_clicked", { value: total });
          onClose();
        }}
      >
        <LockKeyhole aria-hidden="true" />
        Checkout
      </a>
      {!usesFullCartAsCheckout ? (
        <Link className="wardro-cart-full-link" href="/cart" onClick={onClose}>
          View full cart <ArrowRight aria-hidden="true" />
        </Link>
      ) : null}
      <button
        className="wardro-cart-continue"
        type="button"
        onClick={() => {
          trackCartEvent("continue_shopping_clicked");
          onClose();
        }}
      >
        <ArrowLeft aria-hidden="true" /> Continue shopping
      </button>
    </footer>
  );
}
