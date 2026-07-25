import {
  BadgeCheck,
  Boxes,
  Factory,
  Hammer,
  House,
  Layers3,
  PenTool,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { AboutIconKey } from "@/data/about-wardro";

const aboutIcons: Record<AboutIconKey, LucideIcon> = {
  organisation: Boxes,
  construction: Hammer,
  warranty: ShieldCheck,
  installation: Wrench,
  design: PenTool,
  materials: Layers3,
  quality: BadgeCheck,
  living: House,
  manufacture: Factory,
  delivery: Truck,
};

export function AboutIcon({ name }: { name: AboutIconKey }) {
  const Icon = aboutIcons[name];
  return <Icon aria-hidden="true" />;
}
