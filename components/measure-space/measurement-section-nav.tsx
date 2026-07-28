"use client";

import { useEffect, useState } from "react";
import { CircleHelp, Lightbulb, PanelsTopLeft, Ruler } from "lucide-react";

const items = [
  { id: "what-to-measure", label: "What to Measure", Icon: Ruler },
  { id: "how-to-measure", label: "How to Measure", Icon: PanelsTopLeft },
  { id: "measurement-tips", label: "Tips", Icon: Lightbulb },
  { id: "measurement-faq", label: "FAQ", Icon: CircleHelp },
];

export function MeasurementSectionNav() {
  const [activeId, setActiveId] = useState(items[0].id);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -52% 0px", threshold: [0, 0.05, 0.2] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleNavigation(id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <nav className="measurement-section-nav" aria-label="Measurement guide sections">
      <div>
        {items.map(({ id, label, Icon }) => {
          const active = activeId === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => handleNavigation(id)}
              aria-current={active ? "location" : undefined}
              className={active ? "is-active" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

