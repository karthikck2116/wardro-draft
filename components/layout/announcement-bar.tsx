"use client";

import { CalendarDays, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const messages = [
  {
    Icon: Truck,
    label: "Free delivery & installation in eligible Bengaluru areas",
  },
  {
    Icon: CalendarDays,
    label: "3–5 day delivery for eligible products & PIN codes",
  },
  { Icon: ShieldCheck, label: "5-year warranty" },
];

export function AnnouncementBar() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % messages.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  const ActiveIcon = messages[active].Icon;

  return (
    <div
      className="announcement"
      aria-label="Store benefits"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta =
          (event.changedTouches[0]?.clientX ?? touchStart.current) -
          touchStart.current;
        if (Math.abs(delta) > 34) {
          setActive((current) =>
            delta < 0
              ? (current + 1) % messages.length
              : (current - 1 + messages.length) % messages.length,
          );
        }
        touchStart.current = null;
      }}
    >
      <div className="announcement-inner">
        <span>
          <Truck aria-hidden="true" />
          <b>Free delivery & installation</b>
          <em>in eligible Bengaluru areas</em>
        </span>
        <i aria-hidden="true" />
        <span>
          <CalendarDays aria-hidden="true" />
          <b>3–5 day delivery</b>
          <em>for eligible products & PIN codes</em>
        </span>
        <i aria-hidden="true" />
        <span>
          <ShieldCheck aria-hidden="true" />
          <b>5-year warranty</b>
        </span>
      </div>
      <div className="announcement-mobile" aria-live="polite">
        <ActiveIcon aria-hidden="true" />
        <span>{messages[active].label}</span>
      </div>
    </div>
  );
}
