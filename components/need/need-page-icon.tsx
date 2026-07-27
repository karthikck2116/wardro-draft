import {
  Archive,
  BedDouble,
  IndianRupee,
  Layers3,
  PanelTop,
  Shirt,
  UsersRound,
} from "lucide-react";
import type { NeedOptionIcon } from "@/data/shop-by-need-pages";
import { WardrobeDoorIcon } from "@/components/home/wardrobe-door-icon";

export function NeedPageIcon({
  name,
  className,
}: {
  name: NeedOptionIcon;
  className?: string;
}) {
  if (name === "doors") {
    return (
      <WardrobeDoorIcon
        type="three-door"
        className={className}
      />
    );
  }

  const Icon =
    name === "room"
      ? BedDouble
      : name === "family"
        ? UsersRound
        : name === "hanging"
          ? Shirt
          : name === "shelves"
            ? Layers3
            : name === "drawers"
              ? Archive
              : name === "combo"
                ? PanelTop
                : IndianRupee;

  return <Icon className={className} aria-hidden="true" />;
}
