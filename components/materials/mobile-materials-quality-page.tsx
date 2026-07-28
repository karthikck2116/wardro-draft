import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { finishSamples } from "@/data/materials-quality";
import { MobileMaterialsFaq } from "./mobile-materials-faq";

const pillars = [
  {
    title: "Premium Boards",
    description: "Selected for consistent quality",
    Icon: Layers3,
  },
  {
    title: "Tested Hardware",
    description: "Smooth and dependable",
    Icon: ShieldCheck,
  },
  {
    title: "Everyday Durability",
    description: "Designed for daily use",
    Icon: BadgeCheck,
  },
];

const materialCards = [
  {
    title: "Engineered Wood",
    description:
      "Engineered boards selected for strength, stability and a consistent finish.",
    image: "/images/materials/engineered-wood.png",
    imageAlt: "Close-up of layered engineered wood with a walnut finish",
    benefits: [
      "Good screw-holding strength",
      "Smooth surface for laminates",
      "Stable for everyday furniture use",
      "Selected for consistent quality",
    ],
  },
  {
    title: "Tested Hardware",
    description:
      "Wardrobe hinges and fittings selected for smooth operation and dependable daily use.",
    image: "/images/materials/tested-hardware.png",
    imageAlt: "Wardrobe hinge fitted to a walnut engineered panel",
    benefits: [
      "Smooth opening and closing",
      "Durable metal fittings",
      "Reliable door alignment",
      "Matched precisely to each model",
    ],
  },
  {
    title: "Precision Channels",
    description:
      "Drawer channels selected for smooth movement and dependable performance.",
    image: "/images/materials/precision-channels.png",
    imageAlt: "Drawer channel fitted inside a walnut wardrobe drawer",
    benefits: [
      "Smooth drawer movement",
      "Strong metal construction",
      "Reliable everyday support",
      "Designed for daily use",
    ],
  },
];

const proofItems = [
  { title: "Selected Materials", Icon: Layers3 },
  { title: "Quality Checked", Icon: CheckCircle2 },
  { title: "Made for Daily Use", Icon: BadgeCheck },
  { title: "5-Year Warranty", Icon: ShieldCheck },
];

export function MobileMaterialsHero() {
  return (
    <section className="mq-mobile-hero" aria-labelledby="mq-mobile-title">
      <div>
        <p>Materials &amp; Quality</p>
        <h1 id="mq-mobile-title">
          Built with care.
          <br />
          Made to last.
        </h1>
        <i aria-hidden="true" />
        <span>
          At Wardro, we use carefully selected materials and tested hardware
          to create wardrobes designed for everyday use.
        </span>
      </div>
      <div className="mq-mobile-hero-image">
        <Image
          src="/images/materials/engineered-wood.png"
          alt="Layered engineered wood boards with a walnut surface"
          fill
          priority
          sizes="44vw"
        />
      </div>
    </section>
  );
}

export function MobileQualityPillars() {
  return (
    <section className="mq-mobile-pillars" aria-label="Wardro quality pillars">
      {pillars.map(({ title, description, Icon }) => (
        <article key={title}>
          <Icon aria-hidden="true" />
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export function MobileMaterialDetailCard({
  card,
}: {
  card: (typeof materialCards)[number];
}) {
  return (
    <article className="mq-mobile-material-card">
      <div className="mq-mobile-material-image">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="43vw"
        />
      </div>
      <div>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <ul>
          {card.benefits.map((benefit) => (
            <li key={benefit}>
              <CheckCircle2 aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function MobileFinishSwatches() {
  return (
    <section
      className="mq-mobile-finishes"
      aria-labelledby="mq-mobile-finishes-title"
    >
      <h2 id="mq-mobile-finishes-title">Available Finishes</h2>
      <p>Choose from finishes designed to suit different room styles.</p>
      <div>
        {finishSamples.map((finish) => (
          <figure key={finish.name}>
            <span>
              <Image
                src={finish.image}
                alt={finish.imageAlt}
                fill
                sizes="20vw"
                style={{ objectPosition: finish.objectPosition }}
              />
            </span>
            <figcaption>{finish.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function MobileQualityProofStrip() {
  return (
    <section className="mq-mobile-proof" aria-label="Wardro quality assurance">
      {proofItems.map(({ title, Icon }) => (
        <div key={title}>
          <Icon aria-hidden="true" />
          <strong>{title}</strong>
        </div>
      ))}
    </section>
  );
}

export function MobileMaterialsCta() {
  return (
    <section className="mq-mobile-cta">
      <span>
        <Sparkles aria-hidden="true" />
      </span>
      <div>
        <h2>See the quality up close.</h2>
        <p>Explore how Wardro wardrobes are designed and built.</p>
      </div>
      <Link href="/collections/all-wardrobes">Explore Wardrobes</Link>
      <Link href="/wardro-guide">Read the Wardro Guide</Link>
    </section>
  );
}

export function MobileMaterialsQualityPage() {
  return (
    <div className="mq-mobile">
      <MobileMaterialsHero />
      <MobileQualityPillars />
      <section className="mq-mobile-material-list" aria-label="Material details">
        {materialCards.map((card) => (
          <MobileMaterialDetailCard card={card} key={card.title} />
        ))}
      </section>
      <MobileFinishSwatches />
      <MobileQualityProofStrip />
      <MobileMaterialsFaq />
      <MobileMaterialsCta />
    </div>
  );
}
