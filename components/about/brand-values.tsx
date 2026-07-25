import { brandValues } from "@/data/about-wardro";
import { AboutIcon } from "./about-icon";

export function BrandValues() {
  return (
    <section className="about-values" aria-labelledby="about-values-title">
      <p id="about-values-title" className="about-eyebrow">
        What we stand for
      </p>
      <div>
        {brandValues.map((value, index) => (
          <article
            style={{ "--about-index": index } as React.CSSProperties}
            key={value.title}
          >
            <span>
              <AboutIcon name={value.icon} />
            </span>
            <h2>{value.title}</h2>
            <p>{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
