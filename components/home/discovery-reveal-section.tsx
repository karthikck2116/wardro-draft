"use client";

import { useEffect, useRef, type ReactNode } from "react";

type DiscoveryRevealSectionProps = {
  children: ReactNode;
  className: string;
  labelledBy: string;
};

export function DiscoveryRevealSection({
  children,
  className,
  labelledBy,
}: DiscoveryRevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.classList.add("is-ready");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${className} discovery-reveal`}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}
