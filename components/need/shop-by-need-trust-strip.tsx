import { shopByNeedTrustItems } from "@/data/shop-by-need";
import { NeedIcon } from "./need-icon";

export function ShopByNeedTrustStrip() {
  return (
    <section className="need-trust-strip" aria-label="Wardro reassurance">
      {shopByNeedTrustItems.map((item) => (
        <article key={item.title}>
          <span>
            <NeedIcon name={item.icon} />
          </span>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
