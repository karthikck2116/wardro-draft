import { commerce } from "@/lib/commerce/repository";
import { HeroSection } from "@/components/home/hero-section";
import { HeroTrustStrip } from "@/components/home/hero-trust-strip";
import { BrowseByCategory } from "@/components/home/browse-by-category";
import { ShopByNeed } from "@/components/home/shop-by-need";
import { SelectedBestSellers } from "@/components/home/selected-best-sellers";
import { WhyWardroSection } from "@/components/home/why-wardro-section";
import { QualitySection } from "@/components/home/quality-section";
import { WardroGuideHero } from "@/components/home/wardro-guide-hero";
import { GuideArticlesSection } from "@/components/home/guide-articles-section";
import { ReassuranceStrip } from "@/components/home/reassurance-strip";
export default async function Home() {
  const products = await commerce.getHomepageData();
  return (
    <>
      <HeroSection />
      <HeroTrustStrip />
      <div className="home-discovery">
        <BrowseByCategory />
        <ShopByNeed />
      </div>
      <SelectedBestSellers products={products} />
      <div className="home-trust-quality">
        <WhyWardroSection />
        <QualitySection />
      </div>
      <div className="home-wardro-guide">
        <WardroGuideHero />
        <GuideArticlesSection />
        <ReassuranceStrip />
      </div>
    </>
  );
}
