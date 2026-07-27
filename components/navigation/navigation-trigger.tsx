"use client";

import { ChevronDown } from "lucide-react";

export type NavigationMenuKey = "wardrobes" | "shopByNeed";

export function NavigationTrigger({
  menu,
  label,
  open,
  current,
  onClick,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
}: {
  menu: NavigationMenuKey;
  label: string;
  open: boolean;
  current: boolean;
  onClick: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      id={`nav-trigger-${menu}`}
      className="navigation-trigger"
      type="button"
      aria-expanded={open}
      aria-controls={`desktop-menu-${menu}`}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
    >
      {label}
      <ChevronDown aria-hidden />
    </button>
  );
}
