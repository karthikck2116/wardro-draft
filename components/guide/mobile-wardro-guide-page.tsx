"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Heart,
  Lightbulb,
  ListChecks,
  Mail,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  featuredGuide,
  guideArticles,
  guideFaqs,
  type GuideArticle,
  type GuideCategorySlug,
} from "@/data/wardro-guide";
import { MobileGuideFaq } from "./mobile-guide-faq";
import { MobileGuideNewsletter } from "./mobile-guide-newsletter";

type MobileGuideTab = "all" | "choose" | "care";

const tabs: Array<{ id: MobileGuideTab; label: string }> = [
  { id: "all", label: "All Guides" },
  { id: "choose", label: "Choose Right" },
  { id: "care", label: "Care & Use" },
];

function tabFromCategory(category: GuideCategorySlug): MobileGuideTab {
  if (category === "buying-guides" || category === "measurement-guides") {
    return "choose";
  }
  if (category === "wardrobe-care" || category === "organisation-tips") {
    return "care";
  }
  return "all";
}

function articlesForTab(tab: MobileGuideTab) {
  if (tab === "choose") {
    return guideArticles.filter(
      (article) =>
        article.categorySlug === "buying-guides" ||
        article.categorySlug === "measurement-guides",
    );
  }
  if (tab === "care") {
    return guideArticles.filter(
      (article) =>
        article.categorySlug === "wardrobe-care" ||
        article.categorySlug === "organisation-tips",
    );
  }
  return guideArticles;
}

export function MobileGuideHero() {
  return (
    <section className="mobile-guide-hero" aria-labelledby="mobile-guide-title">
      <div>
        <p className="mobile-guide-eyebrow">Wardro Guide</p>
        <h1 id="mobile-guide-title">Ideas for organised living.</h1>
        <span className="mobile-guide-rule" aria-hidden="true" />
        <p>
          Smart tips and inspiration to help you choose, use and care for
          wardrobes that make everyday life easier.
        </p>
      </div>
      <div className="mobile-guide-hero-image">
        <Image
          src="/images/wardro-guide/guide-hero.png"
          alt="An organised walnut wardrobe interior"
          fill
          priority
          sizes="(max-width: 768px) 46vw, 1px"
        />
      </div>
    </section>
  );
}

const values = [
  {
    title: "Smart Ideas",
    description: "Simple solutions",
    Icon: Lightbulb,
  },
  {
    title: "Helpful Guides",
    description: "Make the right choice",
    Icon: ClipboardList,
  },
  {
    title: "Expert Advice",
    description: "Trusted insights",
    Icon: ShieldCheck,
  },
];

export function MobileGuideValueCards() {
  return (
    <section className="mobile-guide-values" aria-label="What the Wardro Guide offers">
      {values.map(({ title, description, Icon }) => (
        <article key={title}>
          <span>
            <Icon aria-hidden="true" />
          </span>
          <h2>{title}</h2>
          <p>{description}</p>
        </article>
      ))}
    </section>
  );
}

export function GuideCategoryTabs({
  activeTab,
  onChange,
}: {
  activeTab: MobileGuideTab;
  onChange: (tab: MobileGuideTab) => void;
}) {
  return (
    <div
      className="mobile-guide-tabs"
      role="tablist"
      aria-label="Filter guide articles"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`mobile-guide-tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls="mobile-guide-results"
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={activeTab === tab.id ? "is-active" : undefined}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function MobileFeaturedGuide({ article }: { article: GuideArticle }) {
  return (
    <article className="mobile-guide-featured">
      <Link
        className="mobile-guide-featured-image"
        href={`/wardro-guide/${article.slug}`}
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 44vw, 1px"
        />
      </Link>
      <div>
        <p className="mobile-guide-eyebrow">Choose right</p>
        <h2>{article.title}</h2>
        <p>
          Simple points to help you pick the perfect wardrobe for your space and
          needs.
        </p>
        <Link href={`/wardro-guide/${article.slug}`}>
          Read Guide <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function MobileGuideCard({ article }: { article: GuideArticle }) {
  return (
    <article className="mobile-guide-card">
      <Link
        href={`/wardro-guide/${article.slug}`}
        className="mobile-guide-card-image"
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 43vw, 1px"
        />
      </Link>
      <div>
        <span>{article.category}</span>
        <h3>
          <Link href={`/wardro-guide/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.readingTime}</p>
      </div>
    </article>
  );
}

export function MobileGuideCarousel({
  articles,
  activeTab,
}: {
  articles: GuideArticle[];
  activeTab: MobileGuideTab;
}) {
  return (
    <section className="mobile-guide-explore" aria-labelledby="mobile-guide-explore-title">
      <div className="mobile-guide-section-heading">
        <div>
          <p className="mobile-guide-eyebrow">Explore our guides</p>
          <h2 id="mobile-guide-explore-title">Explore Our Guides</h2>
          <p>Handpicked reads to help you organise better.</p>
        </div>
        <Link href="/wardro-guide">
          View all <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div
        id="mobile-guide-results"
        className="mobile-guide-carousel"
        role="tabpanel"
        aria-labelledby={`mobile-guide-tab-${activeTab}`}
        tabIndex={0}
      >
        {articles.map((article) => (
          <MobileGuideCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

const topics = [
  {
    label: "Size & Placement",
    href: "/wardro-guide/measure-your-space-before-buying",
    Icon: Ruler,
  },
  {
    label: "Organisation",
    href: "/wardro-guide?category=organisation-tips",
    Icon: ListChecks,
  },
  {
    label: "Care & Maintenance",
    href: "/wardro-guide?category=wardrobe-care",
    Icon: ShieldCheck,
  },
  {
    label: "Budget & Value",
    href: "/wardro-guide?category=buying-guides",
    Icon: BadgeCheck,
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.8" y="5.8" width="18.4" height="12.4" rx="3.2" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  );
}

export function MobileTopicShortcuts() {
  return (
    <section className="mobile-guide-topics" aria-labelledby="mobile-guide-topics-title">
      <p className="mobile-guide-eyebrow">Explore our topics</p>
      <h2 id="mobile-guide-topics-title">Find Advice by Topic</h2>
      <p>Quick answers to common wardrobe questions.</p>
      <div>
        {topics.map(({ label, href, Icon }) => (
          <Link key={label} href={href}>
            <span>
              <Icon aria-hidden="true" />
            </span>
            <strong>{label}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MobileMeasurementGuideCta() {
  return (
    <section
      className="mobile-guide-measurement"
      aria-labelledby="mobile-guide-measurement-title"
    >
      <div>
        <p className="mobile-guide-eyebrow">Get the size right</p>
        <h2 id="mobile-guide-measurement-title">
          Measure once.
          <br />
          Choose confidently.
        </h2>
        <p>
          Use our simple guide to get accurate measurements for the perfect fit.
        </p>
        <ul>
          <li>
            <BadgeCheck aria-hidden="true" /> Step-by-step guide
          </li>
          <li>
            <BadgeCheck aria-hidden="true" /> Room-measurement tips
          </li>
          <li>
            <BadgeCheck aria-hidden="true" /> Common mistakes to avoid
          </li>
        </ul>
        <Link href="/wardro-guide/measure-your-space-before-buying">
          View Measurement Guide <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="mobile-guide-measurement-image">
        <Image
          src="/images/wardro-guide/measure-your-space.png"
          alt="A room plan and measuring ruler on a desk"
          fill
          sizes="(max-width: 768px) 50vw, 1px"
        />
      </div>
    </section>
  );
}

export function MobileGuideHelpPanel() {
  return (
    <section className="mobile-guide-help" aria-labelledby="mobile-guide-help-title">
      <p id="mobile-guide-help-title">Need more help?</p>
      <Link href="/support/contact">
        <span>
          <CircleHelp aria-hidden="true" />
          Contact Wardro support
        </span>
        <ChevronRight aria-hidden="true" />
      </Link>
    </section>
  );
}

export function MobileGuideFooter() {
  return (
    <footer className="mobile-guide-footer">
      <div>
        <Link href="/" aria-label="Wardro home">
          <Image
            src="/images/brand/wardro-logo-terracotta.png"
            alt="Wardro — More Space, Less Chaos"
            width={836}
            height={199}
          />
        </Link>
        <p>Practical ideas for calmer, more organised homes.</p>
      </div>
      <nav aria-label="Wardro Guide footer links">
        <Link href="/collections/all-wardrobes">
          <BookOpenText aria-hidden="true" /> Wardrobes
        </Link>
        <Link href="/wishlist">
          <Heart aria-hidden="true" /> Wishlist
        </Link>
        <Link href="/account">
          <Sparkles aria-hidden="true" /> Account
        </Link>
      </nav>
      <div className="mobile-guide-footer-socials" aria-label="Wardro social links">
        <Link href="https://www.instagram.com" aria-label="Wardro on Instagram">
          <InstagramIcon />
        </Link>
        <Link href="https://www.youtube.com" aria-label="Wardro on YouTube">
          <YouTubeIcon />
        </Link>
        <Link href="/support/contact" aria-label="Contact Wardro">
          <Mail aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}

export function MobileWardroGuidePage({
  activeCategory,
}: {
  activeCategory: GuideCategorySlug;
}) {
  const [activeTab, setActiveTab] = useState<MobileGuideTab>(() =>
    tabFromCategory(activeCategory),
  );
  const visibleArticles = useMemo(
    () => articlesForTab(activeTab),
    [activeTab],
  );

  function changeTab(tab: MobileGuideTab) {
    setActiveTab(tab);
    const category =
      tab === "choose"
        ? "buying-guides"
        : tab === "care"
          ? "wardrobe-care"
          : null;
    const url = new URL(window.location.href);
    if (category) url.searchParams.set("category", category);
    else url.searchParams.delete("category");
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <div className="guide-mobile">
      <div className="guide-mobile-shell">
        <MobileGuideHero />
        <MobileGuideValueCards />
        <GuideCategoryTabs activeTab={activeTab} onChange={changeTab} />
        <MobileFeaturedGuide article={featuredGuide} />
        <MobileGuideCarousel articles={visibleArticles} activeTab={activeTab} />
        <MobileTopicShortcuts />
        <MobileMeasurementGuideCta />
        <MobileGuideFaq faqs={guideFaqs} />
        <MobileGuideNewsletter />
        <MobileGuideHelpPanel />
      </div>
      <MobileGuideFooter />
    </div>
  );
}
