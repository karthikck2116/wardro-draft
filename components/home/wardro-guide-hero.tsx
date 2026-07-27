import Image from "next/image";
import { ClipboardCheck, House, Lightbulb } from "lucide-react";
import { DiscoveryRevealSection } from "@/components/home/discovery-reveal-section";
import {
  GuideBenefit,
  type GuideBenefitData,
} from "@/components/home/guide-benefit";

const guideBenefits: GuideBenefitData[] = [
  {
    title: "Practical Ideas",
    description: "Real solutions for every home",
    icon: Lightbulb,
  },
  {
    title: "Expert Guidance",
    description: "Tips from storage and design experts",
    icon: ClipboardCheck,
  },
  {
    title: "Better Living",
    description: "More space, less chaos",
    icon: House,
  },
];

export function WardroGuideHero() {
  return (
    <DiscoveryRevealSection
      className="wardro-guide-container wardro-guide-hero"
      labelledBy="wardro-guide-title"
    >
      <div className="wardro-guide-hero-copy">
        <p className="wardro-guide-eyebrow discovery-reveal-heading">
          The Wardro Guide
        </p>
        <h2 id="wardro-guide-title" className="discovery-reveal-heading">
          Ideas for
          <br />
          organised living.
        </h2>
        <i className="wardro-guide-rule" aria-hidden="true" />
        <p className="wardro-guide-description discovery-reveal-heading">
          Smart ideas and expert tips to help you create beautiful,
          clutter-free spaces that work for you.
        </p>
        <div className="wardro-guide-benefits" aria-label="Guide benefits">
          {guideBenefits.map((benefit, index) => (
            <GuideBenefit key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
      <div className="wardro-guide-hero-image">
        <Image
          src="/images/categories/four-door.png"
          alt="Walnut four-door Wardro wardrobe in a warm bedroom setting"
          fill
          sizes="(max-width: 768px) 100vw, 53vw"
        />
      </div>
    </DiscoveryRevealSection>
  );
}
