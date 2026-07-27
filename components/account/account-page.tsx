import Link from "next/link";
import { LockKeyhole, PackageOpen, ShieldCheck, UserRound } from "lucide-react";
import { AccountActionList } from "./account-action-list";
import { AccountLogin } from "./account-login";
import { OrderTracking } from "./order-tracking";

function SignedOutRecentOrders() {
  return (
    <section className="account-preview-card account-orders-preview">
      <div className="account-card-heading">
        <h2>Recent Orders</h2>
      </div>
      <div className="account-neutral-state">
        <PackageOpen aria-hidden />
        <span>
          <strong>Sign in to view your orders</strong>
          <small>Your Wardro orders will appear here securely.</small>
        </span>
        <Link href="/account/login">Sign in</Link>
      </div>
    </section>
  );
}

function SignedOutSummary() {
  return (
    <section className="account-preview-card" id="saved-details">
      <div className="account-card-heading">
        <h2>Account Summary</h2>
      </div>
      <div className="account-summary-preview">
        <UserRound aria-hidden />
        <strong>Sign in to view saved details</strong>
        <p>
          Only your verified contact and essential delivery details are shown.
        </p>
        <Link href="/account/login">Sign in</Link>
      </div>
    </section>
  );
}

export function AccountDataReassurance() {
  return (
    <section className="account-data-reassurance">
      <span>
        <ShieldCheck aria-hidden />
        <strong>Essential account only</strong>
      </span>
      <p>
        Your Wardro account is simple and secure. We store only what is needed
        to show your orders, track deliveries, and support you better.
      </p>
      <span>
        <LockKeyhole aria-hidden />
        <strong>Minimal data. Maximum trust.</strong>
      </span>
    </section>
  );
}

export function AccountPage({ autoFocus = false }: { autoFocus?: boolean }) {
  return (
    <div className="wardro-account-page">
      <div className="wardro-account-container">
        <div className="account-primary-grid">
          <div className="account-intro">
            <p className="account-eyebrow">My Account</p>
            <h1>
              Sign in to your
              <br />
              Wardro account
            </h1>
            <p>
              Log in with your mobile number or email to check your orders,
              track deliveries and manage the basics.
            </p>
            <AccountLogin autoFocus={autoFocus} />
          </div>
          <AccountActionList />
        </div>

        <div className="account-lower-grid">
          <SignedOutRecentOrders />
          <OrderTracking compact />
          <SignedOutSummary />
        </div>
        <AccountDataReassurance />
      </div>
    </div>
  );
}
