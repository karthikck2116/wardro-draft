import { ComparisonTable } from "@/components/home/comparison-table";
import { DiscoveryRevealSection } from "@/components/home/discovery-reveal-section";
import { WhyWardroBenefits } from "@/components/home/why-wardro-benefits";
import { WhyWardroIntro } from "@/components/home/why-wardro-intro";

export function WhyWardroSection() {
  return (
    <DiscoveryRevealSection
      className="wardro-trust-quality-container why-wardro-section"
      labelledBy="why-wardro-title"
    >
      <div className="why-wardro-main">
        <WhyWardroIntro />
        <ComparisonTable />
      </div>
      <WhyWardroBenefits />
    </DiscoveryRevealSection>
  );
}
