"use client";

type CartAnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackCartEvent(
  event: string,
  payload: CartAnalyticsPayload = {},
) {
  try {
    window.dispatchEvent(
      new CustomEvent("wardro:analytics", {
        detail: { event, ...payload },
      }),
    );
    window.dataLayer?.push({ event, ...payload });
  } catch {
    // Analytics must never block a cart action.
  }
}
