"use client";

type WishlistPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackWishlistEvent(
  event: string,
  payload: WishlistPayload = {},
) {
  try {
    window.dispatchEvent(
      new CustomEvent("wardro:analytics", {
        detail: { event, ...payload },
      }),
    );
    window.dataLayer?.push({ event, ...payload });
  } catch {
    // Analytics must never block wishlist interactions.
  }
}
