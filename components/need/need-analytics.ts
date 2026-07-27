export type NeedAnalyticsEvent =
  | "shop_by_need_viewed"
  | "need_option_selected"
  | "need_filter_applied"
  | "need_filter_cleared"
  | "need_sort_changed"
  | "need_product_clicked"
  | "need_no_results";

export function trackNeedEvent(
  event: NeedAnalyticsEvent,
  detail: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("wardro:analytics", {
      detail: { event, ...detail },
    }),
  );
}
