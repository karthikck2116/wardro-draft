"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

export function FooterColumn({ title, links }: FooterColumnProps) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="wardro-footer-column" aria-label={`${title} footer links`}>
      <h2>{title}</h2>
      <button
        className="wardro-footer-accordion-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        {title} <ChevronDown aria-hidden="true" />
      </button>
      <div className={open ? "is-open" : undefined}>
        {links.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
