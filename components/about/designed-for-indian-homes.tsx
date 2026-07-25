import Image from "next/image";

export function DesignedForIndianHomes() {
  return (
    <section className="about-indian-homes" aria-labelledby="about-indian-title">
      <div>
        <p className="about-eyebrow">Designed for Indian homes</p>
        <h2 id="about-indian-title">
          Storage that fits the way
          <br />
          you live.
        </h2>
        <p>
          From compact rooms to spacious homes, our wardrobes offer smart
          storage, modern finishes and everyday ease. Because every home
          deserves more space and less chaos.
        </p>
      </div>
      <div className="about-indian-image">
        <Image
          src="/images/about/designed-for-indian-homes.png"
          alt="A Wardro sliding wardrobe in a warm, modern bedroom"
          fill
          sizes="(max-width: 820px) calc(100vw - 40px), 62vw"
        />
      </div>
    </section>
  );
}
