"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import type { NeedPageConfig } from "@/data/shop-by-need-pages";
import { NeedPageIcon } from "./need-page-icon";
import { trackNeedEvent } from "./need-analytics";

export function NeedQuickSelector({
  config,
  selected,
}: {
  config: NeedPageConfig;
  selected?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className={`need-quick-selector is-${config.slug}`}
      aria-label={`${config.title} options`}
    >
      {config.options.map((option) => {
        const query = new URLSearchParams(searchParams.toString());
        query.set(config.primaryFilterKey, option.value);
        const isSelected = selected === option.value;

        return (
          <Link
            className={isSelected ? "is-selected" : undefined}
            href={`${pathname}?${query.toString()}`}
            aria-current={isSelected ? "true" : undefined}
            aria-label={`${option.title}: ${option.description}`}
            key={option.value}
            onClick={() =>
              trackNeedEvent("need_option_selected", {
                page: config.slug,
                option: option.value,
              })
            }
          >
            {option.image ? (
              <span className="need-quick-image">
                <Image
                  src={option.image}
                  alt={option.imageAlt ?? ""}
                  fill
                  sizes="(max-width: 767px) 48vw, 180px"
                />
              </span>
            ) : (
              <span className="need-quick-icon">
                <NeedPageIcon name={option.icon} />
              </span>
            )}
            <span className="need-quick-copy">
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </span>
            <span className="need-quick-selected" aria-hidden="true">
              <Check />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
