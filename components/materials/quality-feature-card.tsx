import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { CSSProperties } from "react";
import type { QualityFeatureData } from "@/data/materials-quality";
import { MaterialIcon } from "./material-icon";

type QualityFeatureCardProps = {
  feature: QualityFeatureData;
  index: number;
};

export function QualityFeatureCard({
  feature,
  index,
}: QualityFeatureCardProps) {
  return (
    <article
      className="mq-quality-card mq-reveal"
      style={{ "--mq-index": index } as CSSProperties}
    >
      <div className="mq-quality-image">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) 50vw, 33vw"
        />
      </div>
      <div className="mq-quality-content">
        <div className="mq-quality-heading">
          <span className="mq-round-icon">
            <MaterialIcon name={feature.icon} />
          </span>
          <h2>{feature.title}</h2>
        </div>
        <p>{feature.description}</p>
        <ul>
          {feature.benefits.map((benefit) => (
            <li key={benefit}>
              <CheckCircle2 aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
