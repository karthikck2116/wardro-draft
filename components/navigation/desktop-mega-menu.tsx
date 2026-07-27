"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  navigationFeaturedPanel,
  shopByNeedSections,
  wardrobeMenuSections,
  type MegaMenuSection,
  type NavigationItem,
} from "@/data/navigation";
import type { NavigationMenuKey } from "./navigation-trigger";

function MegaMenuItem({
  item,
  mode,
  onSelect,
}: {
  item: NavigationItem;
  mode: "thumbnail" | "icon" | "collection";
  onSelect: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link className={`mega-menu-item is-${mode}`} href={item.href} onClick={onSelect}>
      {item.image ? (
        <span className="mega-menu-thumb">
          <Image
            src={item.image}
            alt={item.imageAlt ?? ""}
            fill
            sizes={mode === "collection" ? "110px" : "48px"}
          />
        </span>
      ) : Icon ? (
        <span className="mega-menu-icon">
          <Icon aria-hidden />
        </span>
      ) : null}
      <span className="mega-menu-item-copy">
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>
      {mode === "thumbnail" ? <ArrowRight aria-hidden /> : null}
    </Link>
  );
}

function MegaMenuColumn({
  section,
  mode,
  onSelect,
}: {
  section: MegaMenuSection;
  mode: "thumbnail" | "icon" | "collection";
  onSelect: () => void;
}) {
  return (
    <section className="mega-menu-column">
      <h2>{section.title}</h2>
      <div className="mega-menu-column-items">
        {section.items.map((item) => (
          <MegaMenuItem
            key={`${section.title}-${item.title}`}
            item={item}
            mode={mode}
            onSelect={onSelect}
          />
        ))}
      </div>
      <Link className="mega-menu-column-cta" href={section.cta.href} onClick={onSelect}>
        {section.cta.title}
        <ArrowRight aria-hidden />
      </Link>
    </section>
  );
}

function MegaMenuFeaturedPanel({ onSelect }: { onSelect: () => void }) {
  const Icon = navigationFeaturedPanel.icon;
  return (
    <aside className="mega-menu-featured">
      <div className="mega-menu-featured-image">
        <Image
          src={navigationFeaturedPanel.image}
          alt={navigationFeaturedPanel.imageAlt}
          fill
          sizes="280px"
        />
      </div>
      <div className="mega-menu-featured-copy">
        <span className="mega-menu-featured-icon">
          <Icon aria-hidden />
        </span>
        <span>
          <strong>{navigationFeaturedPanel.title}</strong>
          <p>{navigationFeaturedPanel.description}</p>
        </span>
      </div>
      <Link href={navigationFeaturedPanel.href} onClick={onSelect}>
        {navigationFeaturedPanel.cta}
        <ArrowRight aria-hidden />
      </Link>
    </aside>
  );
}

export function DesktopMegaMenu({
  activeMenu,
  onSelect,
  onPointerEnter,
  onPointerLeave,
}: {
  activeMenu: NavigationMenuKey | null;
  onSelect: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  if (!activeMenu) return null;

  const sections =
    activeMenu === "wardrobes" ? wardrobeMenuSections : shopByNeedSections;
  const modes =
    activeMenu === "wardrobes"
      ? (["thumbnail", "icon", "collection"] as const)
      : (["icon", "icon", "icon"] as const);

  return (
    <div
      id={`desktop-menu-${activeMenu}`}
      className={`desktop-mega-menu is-${activeMenu}`}
      aria-label={
        activeMenu === "wardrobes"
          ? "Explore wardrobes"
          : "Explore wardrobes by need"
      }
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <nav className="desktop-mega-menu-grid">
        {sections.map((section, index) => (
          <MegaMenuColumn
            key={section.title}
            section={section}
            mode={modes[index]}
            onSelect={onSelect}
          />
        ))}
        <MegaMenuFeaturedPanel onSelect={onSelect} />
      </nav>
    </div>
  );
}
