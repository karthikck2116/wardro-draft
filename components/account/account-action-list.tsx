import Link from "next/link";
import {
  ChevronRight,
  Headphones,
  Package,
  Truck,
  UserRound,
} from "lucide-react";

const actions = [
  {
    title: "My Orders",
    description: "View order details and status",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Track Order",
    description: "Check delivery progress easily",
    href: "/track-order",
    icon: Truck,
  },
  {
    title: "Saved Details",
    description: "Access your basic account info",
    href: "/account#saved-details",
    icon: UserRound,
  },
  {
    title: "Support",
    description: "Get help with your order",
    href: "/support",
    icon: Headphones,
  },
];

export function AccountActionList() {
  return (
    <nav className="account-action-list" aria-label="Account actions">
      {actions.map(({ title, description, href, icon: Icon }) => (
        <Link href={href} key={title}>
          <span className="account-action-icon">
            <Icon aria-hidden />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{description}</small>
          </span>
          <ChevronRight aria-hidden />
        </Link>
      ))}
    </nav>
  );
}
