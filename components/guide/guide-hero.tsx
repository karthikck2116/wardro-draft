import Image from "next/image";
import { ClipboardCheck, House, Lightbulb, type LucideIcon } from "lucide-react";

const benefits: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Practical Ideas",
    description: "Real solutions for every home",
    icon: Lightbulb,
  },
  {
    title: "Expert Guidance",
    description: "Tips from storage and design experts",
    icon: ClipboardCheck,
  },
  {
    title: "Better Living",
    description: "More space, less chaos",
    icon: House,
  },
];

export function GuideHero() {
  return (
    <section className="guide-page-hero" aria-labelledby="guide-page-title">
      <div className="guide-page-hero-copy">
        <p className="guide-page-eyebrow">The Wardro Guide</p>
        <h1 id="guide-page-title">
          Ideas for
          <br />
          organised living.
        </h1>
        <span className="guide-page-rule" aria-hidden="true" />
        <p className="guide-page-hero-description">
          Smart ideas and expert tips to help you create beautiful, clutter-free
          spaces that work for you.
        </p>
        <div className="guide-page-benefits" aria-label="Guide benefits">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <h2>{benefit.title}</h2>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="guide-page-hero-image">
        <Image
          src="/images/wardro-guide/guide-hero.png"
          alt="An open walnut wardrobe organised with clothing and baskets"
          fill
          priority
          sizes="(max-width: 820px) calc(100vw - 40px), 54vw"
        />
      </div>
    </section>
  );
}
