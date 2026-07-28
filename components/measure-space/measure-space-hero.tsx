import Image from "next/image";
import { BadgeCheck, PackageCheck, Truck } from "lucide-react";

const heroBenefits = [
  {
    title: "Perfect fit",
    description: "Made for your space",
    Icon: BadgeCheck,
  },
  {
    title: "Smooth installation",
    description: "Better preparation for delivery and installation",
    Icon: Truck,
  },
  {
    title: "Built to last",
    description: "Supported by a 5-year warranty",
    Icon: PackageCheck,
  },
];

export function MeasureSpaceHero() {
  return (
    <section className="measure-hero" aria-labelledby="measure-page-title">
      <div className="measure-hero__copy">
        <p className="measure-eyebrow">Measure with confidence</p>
        <h1 id="measure-page-title">Measure your space</h1>
        <p className="measure-hero__description">
          <span className="measure-hero__desktop-copy">
            A few careful measurements help you choose with confidence and ensure
            your wardrobe fits your room properly.
          </span>
          <span className="measure-hero__mobile-copy">
            A few careful measurements help you choose with confidence.
          </span>
        </p>
        <div className="measure-hero__benefits" aria-label="Measurement benefits">
          {heroBenefits.map(({ title, description, Icon }) => (
            <div key={title}>
              <span className="measure-hero__benefit-icon">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="measure-hero__image">
        <Image
          src="/images/measure-space/measure-space-hero.png"
          alt="Warm bedroom with a wardrobe, tape measure and room plan ready for measuring"
          fill
          priority
          sizes="(max-width: 767px) 58vw, (max-width: 1440px) 53vw, 720px"
        />
      </div>
    </section>
  );
}

