import type { Metadata } from "next";
import { AccountDataReassurance } from "@/components/account/account-page";
import { OrderTracking } from "@/components/account/order-tracking";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Securely check the progress of your Wardro order.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function TrackOrderPage() {
  return (
    <div className="wardro-account-page">
      <div className="wardro-account-container account-route-container">
        <p className="account-eyebrow">Order Support</p>
        <h1>Track Your Order</h1>
        <p className="account-route-intro">
          Use your order ID and the mobile number or email used for the order.
        </p>
        <OrderTracking />
        <AccountDataReassurance />
      </div>
    </div>
  );
}
