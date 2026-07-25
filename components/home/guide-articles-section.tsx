import { guideImages, qualityImages } from "@/config/homepage-images";
import {
  GuideArticleCard,
  type GuideArticleCardData,
} from "@/components/content/guide-article-card";
import { DiscoveryRevealSection } from "@/components/home/discovery-reveal-section";
import { GuideSectionHeader } from "@/components/home/guide-section-header";

const articles: GuideArticleCardData[] = [
  {
    number: "01",
    category: "Storage Ideas",
    title: "10 Small Bedroom Storage Ideas That Actually Work",
    excerpt: "Make every corner work harder without making the room feel crowded.",
    image: guideImages.storage,
    imageAlt: "A family relaxing in a bedroom beside a spacious wooden wardrobe",
    href: "/wardro-guide",
  },
  {
    number: "02",
    category: "Buying Guide",
    title: "How to Choose the Right Wardrobe",
    excerpt: "Match doors, depth and internal storage to the way you live.",
    image: guideImages.choosing,
    imageAlt: "A walnut sliding-door wardrobe with an integrated mirror",
    href: "/wardro-guide",
  },
  {
    number: "03",
    category: "Care & Maintenance",
    title: "How to Care for Your Wardrobe",
    excerpt: "Simple habits that keep finishes and hardware working beautifully.",
    image: qualityImages.wood,
    imageAlt: "A close-up of layered engineered wood boards",
    href: "/wardro-guide",
  },
];

export function GuideArticlesSection() {
  return (
    <DiscoveryRevealSection
      className="wardro-guide-container wardro-guide-articles"
      labelledBy="explore-guides-title"
    >
      <GuideSectionHeader />
      <div className="wardro-guide-card-grid">
        {articles.map((article, index) => (
          <GuideArticleCard key={article.number} article={article} index={index} />
        ))}
      </div>
    </DiscoveryRevealSection>
  );
}
