import Image from "next/image";
import { HeroCTA } from "./hero-cta";

export function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="hero-shell">
        <div className="hero-panel">
          <p className="hero-eyebrow">MORE SPACE. LESS CHAOS.</p>
          <h1 id="home-hero-title">
            <span>More Than</span>
            <span>Storage.</span>
            <span>A Calmer,</span>
            <span>Cleaner,</span>
            <span>Happier Home.</span>
          </h1>
          <i className="hero-rule" aria-hidden="true" />
          <p className="hero-description">
            Thoughtfully designed wardrobes that bring order, beauty and ease
            to your everyday.
          </p>
          <HeroCTA />
        </div>
        <div className="hero-media">
          <Image
            src="/images/home/wardro-family-hero.png"
            alt="Indian family relaxing together in an organised bedroom beside a walnut wardrobe"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 65vw"
          />
        </div>
      </div>
    </section>
  );
}
