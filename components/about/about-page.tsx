import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReassuranceStrip } from "@/components/home/reassurance-strip";
import { AboutHero } from "./about-hero";
import { AboutTrustStrip } from "./about-trust-strip";
import { BrandValues } from "./brand-values";
import { DesignedForIndianHomes } from "./designed-for-indian-homes";
import { HowWeBuild } from "./how-we-build";
import { WhoWeAreSection } from "./who-we-are-section";
import { WhyWardroComparison } from "./why-wardro-comparison";
import { MobileAboutPage } from "./mobile-about-page";

export function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-desktop-experience">
        <div className="about-shell">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight aria-hidden="true" />
            <span aria-current="page">About Us</span>
          </nav>
          <AboutHero />
          <AboutTrustStrip />
          <WhoWeAreSection />
          <BrandValues />
          <WhyWardroComparison />
          <HowWeBuild />
          <DesignedForIndianHomes />
        </div>
        <ReassuranceStrip />
      </div>
      <MobileAboutPage />
    </div>
  );
}
