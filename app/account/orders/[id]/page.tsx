import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { AccountDataReassurance } from "@/components/account/account-page";

export const metadata: Metadata = {
  title: "Order Details",
  description: "Secure Wardro order information.",
};

export default function AccountOrderDetailsPage() {
  return (
    <div className="wardro-account-page">
      <div className="wardro-account-container account-route-container">
        <p className="account-eyebrow">Order Details</p>
        <h1>Secure order access</h1>
        <section className="account-route-empty">
          <LockKeyhole aria-hidden />
          <h2>Verify your account to continue</h2>
          <p>
            Order items, delivery addresses, payments and tracking are shown
            only after secure sign in.
          </p>
          <Link className="account-primary-link" href="/account/login">
            Sign in
          </Link>
          <Link href="/support/order-help">Contact support</Link>
        </section>
        <AccountDataReassurance />
      </div>
    </div>
  );
}
