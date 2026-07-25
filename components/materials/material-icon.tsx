import {
  BadgeCheck,
  Boxes,
  House,
  Layers3,
  LayoutGrid,
  Palette,
  Rows3,
  Ruler,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { MaterialIconKey } from "@/data/materials-quality";

const materialIcons: Record<MaterialIconKey, LucideIcon> = {
  layers: Layers3,
  settings: Settings2,
  sliders: SlidersHorizontal,
  inspect: Search,
  measure: Ruler,
  edge: Rows3,
  fit: Wrench,
  assemble: Boxes,
  verify: BadgeCheck,
  space: LayoutGrid,
  durable: ShieldCheck,
  finish: Palette,
  home: House,
};

export function MaterialIcon({ name }: { name: MaterialIconKey }) {
  const Icon = materialIcons[name];
  return <Icon aria-hidden="true" />;
}
