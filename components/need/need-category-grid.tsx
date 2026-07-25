import { needCategories } from "@/data/shop-by-need";
import { NeedCategoryCard } from "./need-category-card";

export function NeedCategoryGrid() {
  return (
    <section className="need-category-section" aria-labelledby="need-grid-title">
      <header>
        <h2 id="need-grid-title">Find the right wardrobe for your need</h2>
        <span aria-hidden="true" />
        <p>
          Explore by space and lifestyle, then confirm the exact fit on each
          product page.
        </p>
      </header>
      <div className="need-category-grid">
        {needCategories.map((category, index) => (
          <NeedCategoryCard
            category={category}
            index={index}
            key={category.slug}
          />
        ))}
      </div>
    </section>
  );
}
