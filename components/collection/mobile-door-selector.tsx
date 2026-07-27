"use client";

import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { WardrobeDoorIcon } from "@/components/home/wardrobe-door-icon";
import type { MobileDoorFilter } from "./mobile-collection-types";

const options: Array<{
  label: string;
  value: MobileDoorFilter;
  type: "one-door" | "two-door" | "three-door" | "four-door" | "sliding";
}> = [
  { label: "1-Door", value: "1", type: "one-door" },
  { label: "2-Door", value: "2", type: "two-door" },
  { label: "3-Door", value: "3", type: "three-door" },
  { label: "4-Door", value: "4", type: "four-door" },
  { label: "Sliding", value: "sliding", type: "sliding" },
];

function MobileDoorSelectorItem({
  active,
  label,
  onSelect,
  type,
}: {
  active: boolean;
  label: string;
  onSelect: () => void;
  type: (typeof options)[number]["type"];
}) {
  return (
    <button
      type="button"
      className={active ? "is-active" : undefined}
      aria-pressed={active}
      onClick={onSelect}
    >
      {active ? (
        <span className="mobile-door-check">
          <Check aria-hidden="true" />
        </span>
      ) : null}
      <WardrobeDoorIcon type={type} />
      <span>{label}</span>
    </button>
  );
}

export function MobileDoorSelector({
  selected,
  onSelect,
}: {
  selected?: MobileDoorFilter;
  onSelect: (value: MobileDoorFilter) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>(".is-active");
    if (!rail || !active) return;
    const target =
      active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, target),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [selected]);

  return (
    <div className="mobile-collection-selector-sticky">
      <div
        ref={railRef}
        className="mobile-door-selector"
        aria-label="Filter by door type"
      >
        {options.map((option) => (
          <MobileDoorSelectorItem
            active={selected === option.value}
            label={option.label}
            onSelect={() => onSelect(option.value)}
            type={option.type}
            key={option.value}
          />
        ))}
      </div>
    </div>
  );
}
