import { needFinderTools } from "@/data/shop-by-need";
import { NeedFinderCard } from "./need-finder-card";

export function NeedFinderTools() {
  return (
    <section className="need-finder-section" aria-labelledby="need-finder-title">
      <header>
        <h2 id="need-finder-title">Not sure what you need?</h2>
        <p>Use our simple tools to find the perfect wardrobe.</p>
      </header>
      <div>
        {needFinderTools.map((tool) => (
          <NeedFinderCard tool={tool} key={tool.title} />
        ))}
      </div>
    </section>
  );
}
