import { guideTopics } from "@/data/wardro-guide";
import { GuideTopicCard } from "./guide-topic-card";

export function GuideTopics() {
  return (
    <section className="guide-topics" aria-labelledby="guide-topics-title">
      <header className="guide-page-section-heading">
        <div>
          <p className="guide-page-eyebrow">Browse around your needs</p>
          <h2 id="guide-topics-title">Find Advice by Topic</h2>
        </div>
        <p>Go directly to the ideas that fit your room and routine.</p>
      </header>
      <div className="guide-topic-grid">
        {guideTopics.map((topic) => (
          <GuideTopicCard topic={topic} key={topic.title} />
        ))}
      </div>
    </section>
  );
}
