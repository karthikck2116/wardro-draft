import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  featuredGuide,
  guideArticles,
  guideFaqs,
  type GuideCategorySlug,
} from "@/data/wardro-guide";
import { ReassuranceStrip } from "@/components/home/reassurance-strip";
import { FeaturedGuide } from "./featured-guide";
import { GuideCategoryTabs } from "./guide-category-tabs";
import { GuideFAQ } from "./guide-faq";
import { GuideGrid } from "./guide-grid";
import { GuideHero } from "./guide-hero";
import { GuideNewsletter } from "./guide-newsletter";
import { GuideTopics } from "./guide-topics";
import { MeasurementGuideCTA } from "./measurement-guide-cta";
import { MobileWardroGuidePage } from "./mobile-wardro-guide-page";

export function WardroGuidePage({
  activeCategory,
}: {
  activeCategory: GuideCategorySlug;
}) {
  const visibleArticles =
    activeCategory === "all-guides"
      ? guideArticles
      : guideArticles.filter(
          (article) => article.categorySlug === activeCategory,
        );

  return (
    <div className="guide-page">
      <div className="guide-desktop-experience">
        <div className="guide-page-shell">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight aria-hidden="true" />
            <span aria-current="page">Wardro Guide</span>
          </nav>
          <GuideHero />
          <GuideCategoryTabs activeCategory={activeCategory} />
          <FeaturedGuide article={featuredGuide} />
          <GuideGrid articles={visibleArticles} />
          <GuideTopics />
          <MeasurementGuideCTA />
          <GuideFAQ faqs={guideFaqs} />
          <GuideNewsletter />
        </div>
        <ReassuranceStrip />
      </div>
      <MobileWardroGuidePage activeCategory={activeCategory} />
    </div>
  );
}
