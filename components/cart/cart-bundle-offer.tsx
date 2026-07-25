"use client";

import { Check, Plus, Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/money";
import type { CartBundle } from "@/components/cart/cart-types";
import { trackCartEvent } from "@/components/cart/cart-analytics";

export function CartBundleOffer({
  bundle,
  added,
  onAdd,
}: {
  bundle?: CartBundle;
  added: boolean;
  onAdd: (bundle: CartBundle) => void;
}) {
  if (
    !bundle ||
    !bundle.items.length ||
    bundle.bundlePrice >= bundle.originalPrice
  ) {
    return null;
  }

  const saving = bundle.originalPrice - bundle.bundlePrice;

  return (
    <section className="wardro-cart-bundle" aria-labelledby="cart-bundle-title">
      <div className="wardro-cart-bundle-mark" aria-hidden="true">
        <Sparkles />
      </div>
      <div className="wardro-cart-bundle-copy">
        <div>
          <h3 id="cart-bundle-title">{bundle.title}</h3>
          {bundle.badge ? <span>{bundle.badge}</span> : null}
        </div>
        <p>{bundle.items.map((item) => item.title).join(" + ")}</p>
        <div className="wardro-cart-bundle-price">
          <strong>{formatMoney(bundle.bundlePrice)}</strong>
          <del>{formatMoney(bundle.originalPrice)}</del>
          <small>Save {formatMoney(saving)}</small>
        </div>
      </div>
      <button
        type="button"
        disabled={added}
        onClick={() => {
          onAdd(bundle);
          trackCartEvent("bundle_added_from_cart", {
            bundle_id: bundle.id,
            bundle_price: bundle.bundlePrice,
            saving,
          });
        }}
      >
        {added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
        {added ? "Added" : "Add bundle"}
      </button>
    </section>
  );
}
