import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  CircleHelp,
  Factory,
  HeartHandshake,
  House,
  Layers3,
  Leaf,
  LifeBuoy,
  PencilRuler,
  Settings,
  ShieldCheck,
  ThumbsUp,
  Truck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Design",
    description:
      "We study real homes and plan practical storage for everyday needs.",
    icon: PencilRuler,
  },
  {
    number: 2,
    title: "Manufacture",
    description:
      "We build using carefully selected materials, approved hardware and precise manufacturing processes.",
    icon: Factory,
  },
  {
    number: 3,
    title: "Quality Check",
    description:
      "Every wardrobe is inspected for finish, fit and function before dispatch.",
    icon: BadgeCheck,
  },
  {
    number: 4,
    title: "Delivery & Installation",
    description:
      "We deliver safely and arrange partner installation where available.",
    icon: Truck,
  },
];

const storyValues = [
  {
    title: "Indian roots, modern living",
    Icon: House,
  },
  {
    title: "Practical for real homes",
    Icon: UsersRound,
  },
  {
    title: "Carefully selected materials",
    Icon: Layers3,
  },
  {
    title: "Structured support",
    Icon: ShieldCheck,
  },
];

const brandValues = [
  { title: "Quality materials", Icon: Layers3 },
  { title: "Precision engineering", Icon: Settings },
  { title: "Durable & reliable", Icon: ShieldCheck },
  { title: "Designed for everyday life", Icon: HeartHandshake },
];

const dailyBenefits = [
  { title: "Smart storage that saves space", Icon: Boxes },
  { title: "Styles that suit your home", Icon: Leaf },
  { title: "Easy to use, easy to love", Icon: ThumbsUp },
  { title: "Built to stay beautiful", Icon: ShieldCheck },
];

const comparisonRows = [
  {
    wardro: "Engineered wood with selected finishes",
    alternative: "Material specifications may vary",
  },
  {
    wardro: "Dependable hardware and fittings",
    alternative: "Hardware specifications may vary",
  },
  {
    wardro: "Quality checks at key stages",
    alternative: "Quality processes may differ",
  },
  {
    wardro: "Structured warranty and support",
    alternative: "Support terms may be limited",
  },
];

export function MobileAboutHero() {
  return (
    <section className="mobile-about-hero" aria-labelledby="mobile-about-title">
      <div>
        <p className="mobile-about-eyebrow">About Wardro</p>
        <h1 id="mobile-about-title">
          Thoughtful wardrobes for calmer homes.
        </h1>
        <span className="mobile-about-rule" aria-hidden="true" />
        <p>
          Wardro is a brand of Home Craft, bringing practical wardrobe design
          and selected materials to Indian homes.
        </p>
        <Link href="/collections/all-wardrobes">
          Explore Wardrobes <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="mobile-about-hero-image">
        <Image
          src="/images/about/about-hero-family.png"
          alt="An Indian family relaxing beside a Wardro wardrobe"
          fill
          priority
          sizes="(max-width: 768px) 50vw, 1px"
        />
      </div>
    </section>
  );
}

export function MobileAboutStory() {
  return (
    <section className="mobile-about-story" aria-labelledby="mobile-about-story-title">
      <div className="mobile-about-story-copy">
        <p className="mobile-about-eyebrow">Our story</p>
        <h2 id="mobile-about-story-title">Wardro by Home Craft</h2>
        <p>
          Born from Home Craft&apos;s manufacturing experience, Wardro creates
          practical storage for modern Indian homes with a focus on thoughtful
          design and dependable everyday use.
        </p>
      </div>
      <div className="mobile-about-story-values">
        {storyValues.map(({ title, Icon }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MobileCraftsmanship() {
  return (
    <section
      className="mobile-about-craftsmanship"
      aria-labelledby="mobile-about-craftsmanship-title"
    >
      <div className="mobile-about-craftsmanship-image">
        <Image
          src="/images/about/homecraft-factory-temporary.png"
          alt="Illustrative view of a furniture production floor pending approved Home Craft photography"
          fill
          sizes="(max-width: 768px) 48vw, 1px"
        />
      </div>
      <div>
        <p className="mobile-about-eyebrow">Our craftsmanship</p>
        <h2 id="mobile-about-craftsmanship-title">
          Built with precision.
          <br />
          Made to last.
        </h2>
        <p>
          Every Wardro wardrobe is made with carefully selected materials,
          precise engineering and quality checks at key stages.
        </p>
      </div>
    </section>
  );
}

export function MobileProcessStep({ step }: { step: ProcessStep }) {
  const Icon = step.icon;
  return (
    <li>
      <article>
        <span className="mobile-about-process-number" aria-hidden="true">
          {step.number}
        </span>
        <span className="mobile-about-process-icon">
          <Icon aria-hidden="true" />
        </span>
        <div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </article>
    </li>
  );
}

export function MobileHowWeBuild() {
  return (
    <section
      className="mobile-about-process"
      aria-labelledby="mobile-about-process-title"
    >
      <div className="mobile-about-process-heading">
        <p className="mobile-about-eyebrow">Our process</p>
        <h2 id="mobile-about-process-title">How We Build</h2>
        <p>From idea to installation.</p>
      </div>
      <ol>
        {processSteps.map((step) => (
          <MobileProcessStep key={step.number} step={step} />
        ))}
      </ol>
    </section>
  );
}

export function MobileValuesStrip() {
  return (
    <section className="mobile-about-values" aria-labelledby="mobile-about-values-title">
      <p id="mobile-about-values-title" className="mobile-about-eyebrow">
        What we stand for
      </p>
      <div>
        {brandValues.map(({ title, Icon }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <h2>{title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MobileAboutComparison() {
  return (
    <section
      className="mobile-about-comparison"
      aria-labelledby="mobile-about-comparison-title"
    >
      <h2 id="mobile-about-comparison-title">Made honestly. Backed properly.</h2>
      <div role="table" aria-label="Wardro comparison">
        <div role="row" className="mobile-about-comparison-header">
          <span role="columnheader">Wardro</span>
          <span role="columnheader">Typical alternatives</span>
        </div>
        {comparisonRows.map((row) => (
          <div role="row" key={row.wardro}>
            <span role="cell">
              <Check aria-hidden="true" />
              {row.wardro}
            </span>
            <span role="cell">{row.alternative}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MobileDailyLifeBenefits() {
  return (
    <section
      className="mobile-about-daily"
      aria-labelledby="mobile-about-daily-title"
    >
      <p id="mobile-about-daily-title" className="mobile-about-eyebrow">
        Designed around daily life
      </p>
      <div>
        {dailyBenefits.map(({ title, Icon }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <h2>{title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MobileAboutCta() {
  return (
    <section className="mobile-about-cta" aria-labelledby="mobile-about-cta-title">
      <div>
        <h2 id="mobile-about-cta-title">Shape storage that fits your life.</h2>
        <p>Explore wardrobes crafted for your space and style.</p>
        <Link href="/collections/all-wardrobes">
          Explore Wardrobes <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="mobile-about-cta-image">
        <Image
          src="/images/about/designed-for-indian-homes.png"
          alt="A Wardro sliding wardrobe in a warm bedroom"
          fill
          sizes="(max-width: 768px) 48vw, 1px"
        />
      </div>
    </section>
  );
}

const supportLinks = [
  {
    title: "Contact Wardro support",
    description: "Get help with your Wardro questions",
    href: "/support/contact",
    Icon: LifeBuoy,
  },
  {
    title: "Materials & Quality",
    description: "Learn how Wardro wardrobes are built",
    href: "/materials-and-quality",
    Icon: Layers3,
  },
  {
    title: "Wardro Guide",
    description: "Buying, care and storage resources",
    href: "/wardro-guide",
    Icon: CircleHelp,
  },
];

export function MobileAboutSupport() {
  return (
    <section
      className="mobile-about-support"
      aria-labelledby="mobile-about-support-title"
    >
      <p id="mobile-about-support-title" className="mobile-about-eyebrow">
        We&apos;re here to help
      </p>
      <div>
        {supportLinks.map(({ title, description, href, Icon }) => (
          <Link key={title} href={href}>
            <Icon aria-hidden="true" />
            <span>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MobileAboutPage() {
  return (
    <div className="about-mobile">
      <div className="about-mobile-shell">
        <MobileAboutHero />
        <MobileAboutStory />
        <MobileCraftsmanship />
        <MobileHowWeBuild />
        <MobileValuesStrip />
        <MobileAboutComparison />
        <MobileDailyLifeBenefits />
        <MobileAboutCta />
        <MobileAboutSupport />
      </div>
    </div>
  );
}
