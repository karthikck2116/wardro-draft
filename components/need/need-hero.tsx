import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NeedPageConfig } from "@/data/shop-by-need-pages";

export function NeedHero({ config }: { config: NeedPageConfig }) {
  return (
    <>
      <nav className="need-category-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight aria-hidden="true" />
        <Link href="/shop-by-need">Shop by Need</Link>
        <ChevronRight aria-hidden="true" />
        <span aria-current="page">{config.title}</span>
      </nav>
      <header className="need-category-hero">
        <p className="need-page-eyebrow">Find your fit</p>
        <h1>{config.title}</h1>
        <p>{config.description}</p>
      </header>
    </>
  );
}
