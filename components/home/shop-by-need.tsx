import { Layers3, Ruler, UsersRound, WalletCards } from "lucide-react";
import { DiscoveryRevealSection } from "./discovery-reveal-section";
import { NeedCard, type NeedCardData } from "./need-card";

const needs: NeedCardData[] = [
  {
    title: "By Number of Doors",
    description: "1, 2, 3, 4 & more",
    href: "/shop-by-need/number-of-doors",
    customIcon: "doors",
  },
  {
    title: "By Room Size",
    description: "Small, Medium, Large",
    href: "/shop-by-need/room-size",
    icon: Ruler,
  },
  {
    title: "By Family Size",
    description: "1–2, 3–4, 5+ Members",
    href: "/shop-by-need/family-size",
    icon: UsersRound,
  },
  {
    title: "By Storage Need",
    description: "Hanging, Shelves, More",
    href: "/shop-by-need/storage-need",
    icon: Layers3,
  },
  {
    title: "By Budget",
    description: "Find your perfect fit",
    href: "/shop-by-need/budget",
    icon: WalletCards,
  },
];

export function ShopByNeed() {
  return (
    <DiscoveryRevealSection
      className="wardro-discovery-container shop-by-need-section"
      labelledBy="shop-by-need-title"
    >
      <div className="shop-by-need-header discovery-reveal-heading">
        <h2 id="shop-by-need-title">
          Shop by <span>Need</span>
        </h2>
        <p>Filter wardrobes that fit your home and lifestyle perfectly.</p>
      </div>
      <div className="wardro-need-grid">
        {needs.map((need, index) => (
          <NeedCard {...need} index={index} key={need.title} />
        ))}
      </div>
    </DiscoveryRevealSection>
  );
}
