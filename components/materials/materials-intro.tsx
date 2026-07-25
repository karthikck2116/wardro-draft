import Link from "next/link";
import {
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import {
  materialsTrustItems,
  type TrustItemData,
} from "@/data/materials-quality";

const trustIcons: Record<TrustItemData["icon"], LucideIcon> = {
  warranty: ShieldCheck,
  delivery: Truck,
  payments: CreditCard,
};

function MaterialsTrustCard() {
  return (
    <aside className="mq-trust-card" aria-label="Wardro purchase reassurance">
      {materialsTrustItems.map((item) => {
        const Icon = trustIcons[item.icon];
        return (
          <div className="mq-trust-item" key={item.title}>
            <span className="mq-trust-icon">
              <Icon aria-hidden="true" />
            </span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
          </div>
        );
      })}
    </aside>
  );
}

export function MaterialsIntro() {
  return (
    <>
      <nav className="mq-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight aria-hidden="true" />
        <span aria-current="page">Materials &amp; Quality</span>
      </nav>
      <section className="mq-intro" aria-labelledby="materials-quality-title">
        <div className="mq-intro-copy">
          <p className="mq-eyebrow">How Wardro is made</p>
          <h1 id="materials-quality-title">Materials &amp; Quality</h1>
          <p>
            At Wardro, every wardrobe is crafted with carefully selected
            materials and precision hardware to deliver long-lasting strength,
            smart functionality and everyday reliability.
          </p>
        </div>
        <MaterialsTrustCard />
      </section>
    </>
  );
}
