import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-hero-copy">
        <p className="about-eyebrow">About Wardro</p>
        <h1 id="about-title">
          Thoughtful wardrobes
          <br />
          for calmer homes.
        </h1>
        <span className="about-rule" aria-hidden="true" />
        <p>
          Wardro is a brand of Home Craft, created to bring thoughtfully
          designed wardrobes and storage solutions to Indian homes. We combine
          practical design, reliable materials and modern aesthetics to make
          everyday living more organised.
        </p>
        <div className="about-hero-actions">
          <Link href="/collections/all-wardrobes">
            Explore Wardrobes <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/materials-and-quality">Materials &amp; Quality</Link>
        </div>
      </div>
      <div className="about-hero-image">
        <Image
          src="/images/about/about-hero-family.png"
          alt="An Indian family relaxing in a warm bedroom beside a Wardro wardrobe"
          fill
          priority
          sizes="(max-width: 820px) calc(100vw - 40px), 58vw"
        />
      </div>
    </section>
  );
}
