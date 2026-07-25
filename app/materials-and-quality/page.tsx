import type { Metadata } from "next";
import { MaterialsQualityPage } from "@/components/materials/materials-quality-page";
import { commerce } from "@/lib/commerce/repository";

export const metadata: Metadata = {
  title: "Materials & Quality",
  description:
    "Explore the materials, hardware, finishes and quality approach behind Wardro wardrobes.",
};

export default async function MaterialsAndQualityRoute() {
  const products = await commerce.getHomepageData();

  return <MaterialsQualityPage relatedProducts={products.slice(0, 4)} />;
}
