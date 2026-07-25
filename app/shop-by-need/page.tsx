import type { Metadata } from "next";
import { ShopByNeedPage } from "@/components/need/shop-by-need-page";

export const metadata: Metadata = {
  title: "Shop by Need | Find the Right Wardrobe | Wardro",
  description:
    "Find wardrobes by room size, family type, storage needs, lifestyle and budget with Wardro’s Shop by Need guide.",
  alternates: {
    canonical: "/shop-by-need",
  },
  openGraph: {
    title: "Shop by Need | Find the Right Wardrobe | Wardro",
    description:
      "Find wardrobes by room size, family type, storage needs, lifestyle and budget with Wardro’s Shop by Need guide.",
    type: "website",
    url: "/shop-by-need",
    images: [
      {
        url: "/images/shop-by-need/shop-by-need-hero.png",
        alt: "Shop wardrobes by need with Wardro",
      },
    ],
  },
};

export default function ShopByNeedRoute() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop by Need",
        item: "/shop-by-need",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ShopByNeedPage />
    </>
  );
}
