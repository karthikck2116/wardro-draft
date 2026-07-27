"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FooterColumn, type FooterLink } from "@/components/layout/footer-column";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const footerColumns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Shop",
    links: [
      { label: "All Wardrobes", href: "/collections/all-wardrobes" },
      { label: "Best Sellers", href: "/collections/all-wardrobes?sort=best-selling" },
      { label: "New Arrivals", href: "/collections/all-wardrobes?sort=newest" },
      {
        label: "Ready to Dispatch",
        href: "/collections/all-wardrobes?availability=ready-to-dispatch",
      },
    ],
  },
  {
    title: "Shop by Need",
    links: [
      { label: "By Number of Doors", href: "/shop-by-need/number-of-doors" },
      { label: "By Room Size", href: "/shop-by-need/room-size" },
      { label: "By Family Size", href: "/shop-by-need/family-size" },
      {
        label: "By Storage Need",
        href: "/shop-by-need/storage-need",
      },
      {
        label: "By Budget",
        href: "/shop-by-need/budget",
      },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Your Order", href: "/track-order" },
      { label: "Delivery & Installation", href: "/support" },
      { label: "Warranty", href: "/support" },
      { label: "Cancellation & Returns", href: "/support" },
    ],
  },
  {
    title: "About Wardro",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Quality & Materials", href: "/materials-and-quality" },
      { label: "Inside Our Factory", href: "/inside-our-factory" },
      { label: "Careers", href: "/about" },
    ],
  },
];

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.4 20.3c.8-2.4 1.1-3.2 1.6-5.5-.8-1.3.1-4 1.5-4 1.2 0 1.7.9 1.7 2 0 1.2-.8 3-1.2 4.6-.4 1.4.7 2.6 2.1 2.6 2.5 0 4.4-2.6 4.4-6.4 0-3.4-2.4-5.7-5.9-5.7-4 0-6.4 3-6.4 6.1 0 1.2.5 2.5 1.1 3.2.1.1.1.2.1.4l-.4 1.7c-.1.5-.5.6-.9.4-2-1-3.2-3.8-3.2-6.1 0-5 3.6-9.5 10.4-9.5 5.4 0 9.7 3.9 9.7 9.1 0 5.4-3.4 9.8-8.1 9.8-1.6 0-3.1-.8-3.6-1.8l-1 3.7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 21v-8h3l.5-3H14V8.3c0-1 .4-1.8 1.9-1.8H18V3.8c-.6-.1-1.6-.2-2.7-.2-2.7 0-4.5 1.7-4.5 4.7V10H8v3h2.8v8" />
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

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    footer.classList.add("is-ready");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      footer.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        footer.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="wardro-site-footer">
      <div className="wardro-footer-container wardro-footer-grid">
        <div className="wardro-footer-brand">
          <Link className="wardro-footer-logo" href="/" aria-label="Wardro home">
            <Image
              src="/images/brand/wardro-logo-terracotta.png"
              alt="Wardro — More Space, Less Chaos"
              width={836}
              height={199}
            />
          </Link>
          <p>
            Thoughtfully designed wardrobes that bring order, beauty and ease to
            your everyday.
          </p>
          <div className="wardro-footer-socials" aria-label="Wardro social media">
            <Link href="https://www.instagram.com" aria-label="Instagram">
              <InstagramIcon />
            </Link>
            <Link href="https://www.facebook.com" aria-label="Facebook">
              <FacebookIcon />
            </Link>
            <Link href="https://www.pinterest.com" aria-label="Pinterest">
              <PinterestIcon />
            </Link>
            <Link href="https://www.youtube.com" aria-label="YouTube">
              <YouTubeIcon />
            </Link>
          </div>
        </div>
        {footerColumns.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links} />
        ))}
        <div className="wardro-footer-newsletter">
          <h2>Stay Inspired</h2>
          <p>Get ideas, offers and inspiration straight to your inbox.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="wardro-footer-container wardro-footer-bottom">
        <p>© 2026 Wardro. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
