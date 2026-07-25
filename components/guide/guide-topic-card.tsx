import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Layers3,
  LayoutGrid,
  ShoppingBag,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { GuideTopic } from "@/data/wardro-guide";

const topicIcons: Record<GuideTopic["icon"], LucideIcon> = {
  "small-bedroom": BedDouble,
  family: UsersRound,
  "first-wardrobe": ShoppingBag,
  materials: Layers3,
  organisation: LayoutGrid,
  care: Sparkles,
};

export function GuideTopicCard({ topic }: { topic: GuideTopic }) {
  const Icon = topicIcons[topic.icon];

  return (
    <Link className="guide-topic-card" href={topic.href}>
      <span className="guide-topic-icon">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <strong>{topic.title}</strong>
        <small>{topic.description}</small>
      </span>
      <i>
        <ArrowRight aria-hidden="true" />
      </i>
    </Link>
  );
}
