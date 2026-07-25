import type { Product } from "@/types/commerce";
import {
  qualityFeatures,
  specificationColumns,
} from "@/data/materials-quality";
import { DesignedForIndianHomes } from "./designed-for-indian-homes";
import { FinishesSection } from "./finishes-section";
import { MaterialsIntro } from "./materials-intro";
import { QualityControlProcess } from "./quality-control-process";
import { QualityFeatureCard } from "./quality-feature-card";
import { RelatedProducts } from "./related-products";
import { SpecificationColumn } from "./specification-column";

export function MaterialsQualityPage({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) {
  return (
    <div className="mq-page">
      <div className="mq-container">
        <MaterialsIntro />
        <section className="mq-quality-grid" aria-label="Wardro quality features">
          {qualityFeatures.map((feature, index) => (
            <QualityFeatureCard
              feature={feature}
              index={index}
              key={feature.title}
            />
          ))}
        </section>
        <div className="mq-process-finishes">
          <QualityControlProcess />
          <FinishesSection />
        </div>
        <section
          className="mq-specification-panel"
          aria-label="Materials and care overview"
        >
          <div className="mq-specification-grid">
            {specificationColumns.map((column) => (
              <SpecificationColumn column={column} key={column.title} />
            ))}
          </div>
          <p className="mq-specification-note">
            Specifications may vary by model. See the individual product page
            for exact materials, dimensions and included hardware.
          </p>
        </section>
        <DesignedForIndianHomes />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
