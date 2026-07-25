import Image from "next/image";

export function WhoWeAreSection() {
  return (
    <section className="about-who" aria-labelledby="who-we-are-title">
      <div>
        <p className="about-eyebrow">Who we are</p>
        <h2 id="who-we-are-title">Wardro by Home Craft</h2>
        <p>
          Wardro is the customer-facing storage brand of Home Craft. Built on
          manufacturing expertise and a focus on quality control, Wardro
          creates wardrobes designed for Indian homes, modern lifestyles and
          easy everyday use.
        </p>
        <small>
          Factory image shown is a temporary illustrative visual pending
          approved Home Craft photography.
        </small>
      </div>
      <div className="about-who-image">
        <Image
          src="/images/about/homecraft-factory-temporary.png"
          alt="Illustrative view of a furniture production floor with board-processing machinery"
          fill
          sizes="(max-width: 820px) calc(100vw - 40px), 62vw"
        />
      </div>
    </section>
  );
}
