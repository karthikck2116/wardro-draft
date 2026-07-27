import type { Metadata } from "next";
import { AccountPage } from "@/components/account/account-page";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in securely to your Wardro account.",
};

export default function AccountLoginRoute() {
  return <AccountPage autoFocus />;
}
