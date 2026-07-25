import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About Wardro | A Wardrobe Brand by Home Craft",
  description:
    "Learn about Wardro, a brand of Home Craft creating thoughtfully designed wardrobes and storage solutions for Indian homes.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Wardro | A Wardrobe Brand by Home Craft",
    description:
      "Learn about Wardro, a brand of Home Craft creating thoughtfully designed wardrobes and storage solutions for Indian homes.",
    type: "website",
    url: "/about",
    images: [
      {
        url: "/images/about/about-hero-family.png",
        alt: "About Wardro",
      },
    ],
  },
};

export default function AboutRoute() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "About Us", item: "/about" },
    ],
  };
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wardro",
    description:
      "A brand of Home Craft creating thoughtfully designed wardrobes and storage solutions for Indian homes.",
    logo: "/images/brand/wardro-logo-terracotta.png",
    parentOrganization: {
      "@type": "Organization",
      name: "Home Craft",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
      <AboutPage />
    </>
  );
}
