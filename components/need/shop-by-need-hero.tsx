import Image from "next/image";
import { shopByNeedBenefits } from "@/data/shop-by-need";
import { NeedIcon } from "./need-icon";

export function ShopByNeedHero() {
  return (
    <section className="need-page-hero" aria-labelledby="shop-by-need-title">
      <div className="need-page-hero-copy">
        <p className="need-page-eyebrow">Choose around your life</p>
        <h1 id="shop-by-need-title">Shop by Need</h1>
        <p className="need-page-hero-description">
          Find the right wardrobe for your space, lifestyle and storage.
        </p>
        <div className="need-page-benefits" aria-label="How Shop by Need helps">
          {shopByNeedBenefits.map((benefit) => (
            <article key={benefit.title}>
              <span>
                <NeedIcon name={benefit.icon} />
              </span>
              <div>
                <h2>{benefit.title}</h2>
                <p>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="need-page-hero-image">
        <Image
          src="/images/shop-by-need/shop-by-need-hero.png"
          alt="A walnut and warm-white Wardro wardrobe in a calm bedroom"
          fill
          priority
          sizes="(max-width: 820px) calc(100vw - 40px), 54vw"
        />
      </div>
    </section>
  );
}
