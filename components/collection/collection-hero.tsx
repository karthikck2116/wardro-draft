import Image from "next/image";
import Link from "next/link";

export function CollectionHero() {
  return (
    <section className="wardro-collection-hero" aria-labelledby="collection-title">
      <div className="wardro-collection-hero-copy">
        <nav className="wardro-collection-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Wardrobes</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">All Wardrobes</span>
        </nav>
        <p className="wardro-collection-eyebrow">Designed for everyday living</p>
        <h1 id="collection-title">All Wardrobes</h1>
        <i aria-hidden="true" />
        <p className="wardro-collection-description">
          Thoughtfully designed wardrobes for modern Indian homes.
          <br />
          Spacious. Durable. Beautifully organised.
        </p>
      </div>
      <div className="wardro-collection-hero-image">
        <Image
          src="/images/wardro-hero.png"
          alt="A warm bedroom with a spacious walnut wardrobe"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 58vw"
        />
      </div>
    </section>
  );
}
