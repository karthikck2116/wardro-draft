import Image from "next/image";
import { indianHomeBenefits } from "@/data/materials-quality";
import { MaterialIcon } from "./material-icon";

export function DesignedForIndianHomes() {
  return (
    <section className="mq-indian-homes" aria-labelledby="indian-homes-title">
      <div className="mq-indian-copy">
        <p className="mq-eyebrow">Designed around daily life</p>
        <h2 id="indian-homes-title">Designed for Indian homes</h2>
        <p>
          Our wardrobes are designed to suit Indian homes, lifestyles and
          storage needs with a thoughtful balance of space, style and strength.
        </p>
        <div className="mq-home-benefits">
          {indianHomeBenefits.map((benefit) => (
            <div key={benefit.title}>
              <span>
                <MaterialIcon name={benefit.icon} />
              </span>
              <strong>{benefit.title}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="mq-indian-image">
        <Image
          src="/images/products/soho-3-door.png"
          alt="A three-door Wardro wardrobe in a warm Indian bedroom"
          fill
          sizes="(max-width: 800px) calc(100vw - 40px), 50vw"
        />
      </div>
    </section>
  );
}
