import { Archive, Layers3, ShieldCheck } from "lucide-react";
import { qualityImages } from "@/config/homepage-images";
import { DiscoveryRevealSection } from "@/components/home/discovery-reveal-section";
import { QualityCard, type QualityCardData } from "@/components/home/quality-card";
import { QualityIntro } from "@/components/home/quality-intro";

const qualityCards: QualityCardData[] = [
  {
    title: "Engineered Wood",
    description:
      "High-density boards for unmatched strength, stability and long life.",
    mobileDescription:
      "High-density boards for strength, stability and long life.",
    image: qualityImages.wood,
    imageAlt: "Close-up of layered engineered wood boards with a walnut finish",
    icon: Layers3,
    href: "/materials-and-quality",
  },
  {
    title: "Tested Hardware",
    description:
      "Premium quality hinges and fittings, tested for durability and smooth performance.",
    mobileDescription:
      "Premium hinges and fittings for smooth, reliable performance.",
    image: qualityImages.hardware,
    imageAlt: "Close-up of a premium concealed wardrobe hinge",
    icon: ShieldCheck,
    href: "/materials-and-quality",
  },
  {
    title: "Precision Channels",
    description:
      "Smooth, silent and reliable motion for everyday convenience.",
    image: qualityImages.channels,
    imageAlt: "Close-up of a precision drawer channel fitted into a wardrobe drawer",
    icon: Archive,
    href: "/materials-and-quality",
  },
];

export function QualitySection() {
  return (
    <DiscoveryRevealSection
      className="wardro-trust-quality-container wardro-quality-section"
      labelledBy="wardro-quality-title"
    >
      <QualityIntro />
      <div className="wardro-quality-grid">
        {qualityCards.map((card, index) => (
          <QualityCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </DiscoveryRevealSection>
  );
}
