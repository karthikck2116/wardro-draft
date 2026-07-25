import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NeedFinderTool } from "@/data/shop-by-need";
import { NeedIcon } from "./need-icon";

export function NeedFinderCard({ tool }: { tool: NeedFinderTool }) {
  return (
    <article className="need-finder-card">
      <span>
        <NeedIcon name={tool.icon} />
      </span>
      <div>
        <h3>{tool.title}</h3>
        <p>{tool.description}</p>
        <Link href={tool.href}>
          {tool.cta} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
