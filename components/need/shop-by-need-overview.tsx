"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { shopByNeedPages } from "@/data/shop-by-need-pages";
import { NeedPageIcon } from "./need-page-icon";
import { trackNeedEvent } from "./need-analytics";

export function ShopByNeedOverviewPage() {
  useEffect(() => {
    trackNeedEvent("shop_by_need_viewed", { page: "overview" });
  }, []);

  return (
    <section
      className="need-overview"
      aria-labelledby="shop-by-need-overview-title"
    >
      <header>
        <p className="need-page-eyebrow">Find your fit</p>
        <h1 id="shop-by-need-overview-title">
          Shop by <span>Need</span>
        </h1>
        <i aria-hidden="true" />
        <p>Filter wardrobes that fit your home and lifestyle perfectly.</p>
      </header>
      <div className="need-overview-grid">
        {shopByNeedPages.map((page) => (
          <Link
            className="need-overview-card"
            href={`/shop-by-need/${page.slug}`}
            key={page.slug}
            onClick={() =>
              trackNeedEvent("need_option_selected", {
                page: "overview",
                option: page.slug,
              })
            }
          >
            <span className="need-overview-icon">
              <NeedPageIcon name={page.icon} />
            </span>
            <span className="need-overview-copy">
              <strong>{page.title}</strong>
              <small>{page.overviewDescription}</small>
            </span>
            <i className="need-overview-arrow" aria-hidden="true">
              <ArrowRight />
            </i>
          </Link>
        ))}
      </div>
    </section>
  );
}
