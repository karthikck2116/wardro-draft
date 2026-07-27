import type { Metadata } from "next";
import { AccountPage } from "@/components/account/account-page";

export const metadata: Metadata = {
  title: "My Account",
  description: "Securely access essential Wardro order and account information.",
};

export default function AccountRoute() {
  return <AccountPage />;
}
