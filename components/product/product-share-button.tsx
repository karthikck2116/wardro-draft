"use client";

import { Check, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ProductShareButton({
  productTitle,
}: {
  productTitle: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copyProductLink(url: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  async function shareProduct() {
    const url = window.location.href;
    const shareData = {
      title: productTitle,
      text: `Take a look at ${productTitle} from Wardro.`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await copyProductLink(url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await copyProductLink(url);
      } catch {
        // The control remains usable without presenting misleading success UI.
      }
    }
  }

  return (
    <div className="pdp-share-control">
      <button
        className={copied ? "pdp-product-share is-copied" : "pdp-product-share"}
        type="button"
        onClick={shareProduct}
        aria-label={`Share ${productTitle}`}
      >
        {copied ? <Check aria-hidden="true" /> : <Share2 aria-hidden="true" />}
      </button>
      <span className="pdp-share-feedback" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
