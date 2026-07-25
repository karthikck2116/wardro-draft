"use client";

import {
  Check,
  Grid2X2Check,
  Layers3,
  PackageOpen,
  Plus,
} from "lucide-react";
import { formatMoney } from "@/lib/money";
import type {
  CartAccessoryRecommendation,
  CartLine,
} from "@/components/cart/cart-types";
import { trackCartEvent } from "@/components/cart/cart-analytics";

export type DrawerAccessoryRecommendation = {
  cartLineId: string;
  parentLineId: string;
  parentTitle: string;
  parentImage?: string;
  accessory: CartAccessoryRecommendation;
};

export function CartAccessoryRecommendations({
  recommendations,
  lines,
  onAdd,
}: {
  recommendations: DrawerAccessoryRecommendation[];
  lines: CartLine[];
  onAdd: (line: CartLine) => void;
}) {
  if (!recommendations.length) return null;

  return (
    <section
      className="wardro-cart-accessories"
      aria-labelledby="cart-accessories-title"
    >
      <div className="wardro-cart-section-heading">
        <h3 id="cart-accessories-title">Complete your setup</h3>
        <p>Compatible add-ons to make everyday storage easier</p>
      </div>
      <div className="wardro-cart-accessory-list">
        {recommendations.map((recommendation) => {
          const added = lines.some(
            (line) => line.id === recommendation.cartLineId,
          );
          return (
            <CartAccessoryItem
              key={recommendation.cartLineId}
              recommendation={recommendation}
              added={added}
              onAdd={() => {
                const { accessory } = recommendation;
                onAdd({
                  id: recommendation.cartLineId,
                  title: accessory.title,
                  variant: `Compatible with ${recommendation.parentTitle}`,
                  price: accessory.price.amount,
                  quantity: 1,
                  currencyCode: accessory.price.currencyCode,
                  kind: "accessory",
                  parentLineId: recommendation.parentLineId,
                  image: accessory.image,
                });
                trackCartEvent("accessory_added_from_cart", {
                  accessory_id: accessory.id,
                  accessory_title: accessory.title,
                  parent_line_id: recommendation.parentLineId,
                  price: accessory.price.amount,
                });
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

function CartAccessoryItem({
  recommendation,
  added,
  onAdd,
}: {
  recommendation: DrawerAccessoryRecommendation;
  added: boolean;
  onAdd: () => void;
}) {
  const { accessory } = recommendation;
  const Icon = accessory.id.includes("shelf")
    ? Layers3
    : accessory.id.includes("organiser")
      ? Grid2X2Check
      : PackageOpen;

  return (
    <article className="wardro-cart-accessory">
      <span className="wardro-cart-accessory-media" aria-hidden="true">
        <Icon />
      </span>
      <div>
        <strong>{accessory.title}</strong>
        <p>{accessory.description}</p>
      </div>
      <div className="wardro-cart-accessory-action">
        <b>{formatMoney(accessory.price.amount)}</b>
        <button
          type="button"
          className={added ? "is-added" : undefined}
          onClick={onAdd}
          disabled={added}
          aria-label={
            added
              ? `${accessory.title} added to cart`
              : `Add ${accessory.title} to cart`
          }
        >
          {added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
          {added ? "Added" : "Add"}
        </button>
      </div>
    </article>
  );
}
