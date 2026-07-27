import Image from "next/image";
import Link from "next/link";

export function MobileCollectionHero() {
  return (
    <section
      className="mobile-collection-hero"
      aria-labelledby="mobile-collection-title"
    >
      <div className="mobile-collection-hero-copy">
        <nav aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Wardrobes</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">All Wardrobes</span>
        </nav>
        <p>Designed for everyday living</p>
        <h1 id="mobile-collection-title">All Wardrobes</h1>
        <i aria-hidden="true" />
        <span>Spacious. Durable. Beautifully organised for Indian homes.</span>
      </div>
      <div className="mobile-collection-hero-image">
        <Image
          src="/images/wardro-hero.png"
          alt="Walnut wardrobe in a warm, organised bedroom"
          fill
          priority
          sizes="44vw"
        />
      </div>
    </section>
  );
}

