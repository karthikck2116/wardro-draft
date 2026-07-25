import {
  BadgeCheck,
  Building2,
  CircleHelp,
  CreditCard,
  Heart,
  House,
  Layers3,
  LayoutGrid,
  Luggage,
  MessageCircle,
  Palette,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Truck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { NeedIconKey } from "@/data/shop-by-need";

const needIcons: Record<NeedIconKey, LucideIcon> = {
  home: House,
  storage: LayoutGrid,
  confidence: BadgeCheck,
  "small-spaces": Building2,
  family: UsersRound,
  single: UserRound,
  newlyweds: Heart,
  rental: Luggage,
  maximum: Layers3,
  modern: Palette,
  premium: Star,
  measure: Ruler,
  filters: SlidersHorizontal,
  support: MessageCircle,
  warranty: ShieldCheck,
  delivery: Truck,
  payments: CreditCard,
  "transparent-support": CircleHelp,
};

export function NeedIcon({ name }: { name: NeedIconKey }) {
  const Icon = needIcons[name];
  return <Icon aria-hidden="true" />;
}
