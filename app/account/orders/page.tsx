import type { Metadata } from "next";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { AccountDataReassurance } from "@/components/account/account-page";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your Wardro orders after secure sign in.",
};

export default function AccountOrdersPage() {
  return (
    <div className="wardro-account-page">
      <div className="wardro-account-container account-route-container">
        <p className="account-eyebrow">My Account</p>
        <h1>My Orders</h1>
        <section className="account-route-empty">
          <PackageOpen aria-hidden />
          <h2>Sign in to view your orders</h2>
          <p>
            We only display orders after your mobile number or email has been
            securely verified.
          </p>
          <Link className="account-primary-link" href="/account/login">
            Sign in
          </Link>
          <Link href="/collections/all-wardrobes">Explore Wardrobes</Link>
        </section>
        <AccountDataReassurance />
      </div>
    </div>
  );
}
