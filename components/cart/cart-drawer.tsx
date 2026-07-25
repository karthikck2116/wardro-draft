"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useRef } from "react";
import { CartDrawerHeader } from "@/components/cart/cart-drawer-header";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CartIncentiveProgress } from "@/components/cart/cart-incentive-progress";
import {
  CartAccessoryRecommendations,
  type DrawerAccessoryRecommendation,
} from "@/components/cart/cart-accessory-recommendations";
import { CartBundleOffer } from "@/components/cart/cart-bundle-offer";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCartState } from "@/components/cart/empty-cart-state";
import { trackCartEvent } from "@/components/cart/cart-analytics";
import type {
  CartBundle,
  CartLine,
} from "@/components/cart/cart-types";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: CartLine[];
  total: number;
  checkoutUrl: string;
  add: (line: CartLine) => void;
  update: (id: string, quantity: number) => void;
};

export function CartDrawer({
  open,
  onOpenChange,
  lines,
  total,
  checkoutUrl,
  add,
  update,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const pinConfirmed =
    open &&
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("wardro-pincode"));

  const recommendations = useMemo(() => {
    const result: DrawerAccessoryRecommendation[] = [];
    const seen = new Set<string>();

    for (const line of lines) {
      if (line.kind === "accessory" || !line.compatibleAccessories?.length) {
        continue;
      }

      for (const accessory of line.compatibleAccessories) {
        if (line.selectedAccessories?.some((item) => item.id === accessory.id)) {
          continue;
        }

        const cartLineId = `${line.id}:accessory:${accessory.id}`;
        if (seen.has(cartLineId)) continue;
        seen.add(cartLineId);
        result.push({
          cartLineId,
          parentLineId: line.id,
          parentTitle: line.title,
          parentImage: line.image,
          accessory,
        });
      }
    }

    return result.slice(0, 3);
  }, [lines]);

  const unaddedRecommendationCount = recommendations.filter(
    (recommendation) =>
      !lines.some((line) => line.id === recommendation.cartLineId),
  ).length;

  useEffect(() => {
    if (!open) return;
    if (recommendations.length) {
      trackCartEvent("accessory_recommendation_viewed", {
        recommendation_count: recommendations.length,
      });
    }
  }, [open, recommendations.length]);

  // No approved bundle exists in the current catalogue, so the offer stays hidden.
  const approvedBundle: CartBundle | undefined = undefined;

  function addBundle(bundle: CartBundle) {
    for (const item of bundle.items) {
      add({
        id: `bundle:${bundle.id}:${item.variantId}`,
        title: item.title,
        variant: bundle.title,
        price: item.price,
        quantity: 1,
        image: item.image,
        kind: "accessory",
      });
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="wardro-cart-overlay" />
        <Dialog.Content
          ref={drawerRef}
          className="wardro-cart-drawer"
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            const closeButton = drawerRef.current?.querySelector<HTMLButtonElement>(
              ".wardro-cart-head button",
            );
            closeButton?.focus();
          }}
        >
          <CartDrawerHeader
            count={lines.reduce((sum, line) => sum + line.quantity, 0)}
          />

          {!lines.length ? (
            <EmptyCartState />
          ) : (
            <>
              <div className="wardro-cart-scroll">
                <div className="wardro-cart-lines" aria-label="Cart items">
                  {lines.map((line) => (
                    <CartLineItem
                      key={line.id}
                      line={line}
                      onUpdate={update}
                    />
                  ))}
                </div>

                <CartIncentiveProgress
                  recommendationCount={unaddedRecommendationCount}
                />

                <CartAccessoryRecommendations
                  recommendations={recommendations}
                  lines={lines}
                  onAdd={add}
                />

                <CartBundleOffer
                  bundle={approvedBundle}
                  added={false}
                  onAdd={addBundle}
                />
              </div>

              <CartSummary
                total={total}
                checkoutUrl={checkoutUrl}
                pinConfirmed={pinConfirmed}
                onClose={() => onOpenChange(false)}
              />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
