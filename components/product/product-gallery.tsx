"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/commerce";
import { ProductWishlistButton } from "@/components/commerce/product-wishlist-button";
import { ProductShareButton } from "@/components/product/product-share-button";

const galleryLabels = [
  "Front closed",
  "Doors open",
  "Interior",
  "Side view",
  "Room setting",
  "Material close-up",
  "Dimensions",
];

export function ProductGallery({ product }: { product: Product }) {
  const images = useMemo(
    () =>
      [...new Set([...product.images, ...product.galleryImages])].filter(Boolean),
    [product.galleryImages, product.images],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const hasMultipleImages = images.length > 1;
  const selectedImage = images[selectedIndex] ?? product.featuredImage;
  const selectedLabel = galleryLabels[selectedIndex] ?? `View ${selectedIndex + 1}`;

  const move = useCallback((direction: -1 | 1) => {
    setSelectedIndex((current) =>
      (current + direction + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (!viewerOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setViewerOpen(false);
      if (hasMultipleImages && event.key === "ArrowLeft") move(-1);
      if (hasMultipleImages && event.key === "ArrowRight") move(1);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasMultipleImages, move, viewerOpen]);

  return (
    <section className="pdp-gallery" aria-label={`${product.title} gallery`}>
      <div className="pdp-main-image">
        <button
          className="pdp-gallery-open"
          type="button"
          onClick={() => setViewerOpen(true)}
          aria-label={`Open full-screen view of ${product.title}`}
          onTouchStart={(event) =>
            setTouchStart(event.touches[0]?.clientX ?? null)
          }
          onTouchEnd={(event) => {
            if (!hasMultipleImages || touchStart === null) return;
            const delta =
              (event.changedTouches[0]?.clientX ?? touchStart) - touchStart;
            if (Math.abs(delta) > 42) move(delta < 0 ? 1 : -1);
            setTouchStart(null);
          }}
        >
          <Image
            className="pdp-gallery-backdrop"
            src={selectedImage}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 36px), 56vw"
          />
          <Image
            className="pdp-gallery-product-image"
            src={selectedImage}
            alt={`${product.title} — ${selectedLabel}`}
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 36px), 56vw"
          />
        </button>
        <ProductWishlistButton
          product={product}
        />
        <ProductShareButton productTitle={product.title} />
        <span className="pdp-gallery-counter" aria-live="polite">
          {selectedIndex + 1}/{images.length}
        </span>
        <button
          className="pdp-gallery-zoom"
          type="button"
          onClick={() => setViewerOpen(true)}
          aria-label={`Zoom ${product.title} image`}
        >
          <Expand aria-hidden="true" />
          <span>View larger</span>
        </button>
        {hasMultipleImages ? (
          <>
            <button
              className="pdp-gallery-arrow pdp-gallery-arrow--previous"
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous product image"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              className="pdp-gallery-arrow pdp-gallery-arrow--next"
              type="button"
              onClick={() => move(1)}
              aria-label="Next product image"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <div className="pdp-thumbnails" role="tablist" aria-label="Product views">
        {images.map((image, index) => {
          const label = galleryLabels[index] ?? `View ${index + 1}`;
          return (
            <button
              className={index === selectedIndex ? "is-selected" : undefined}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Show ${label.toLowerCase()}`}
              key={`${image}-${index}`}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="pdp-thumbnail-image">
                <Image src={image} alt="" fill sizes="88px" />
              </span>
              <small>{label}</small>
            </button>
          );
        })}
      </div>

      {viewerOpen ? (
        <div
          className="pdp-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} image viewer`}
          onMouseDown={() => setViewerOpen(false)}
        >
          <div
            className="pdp-image-viewer-content"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="pdp-image-viewer-close"
              type="button"
              onClick={() => setViewerOpen(false)}
              aria-label="Close image viewer"
              autoFocus
            >
              <X aria-hidden="true" />
            </button>
            <div className="pdp-image-viewer-image">
              <Image
                src={selectedImage}
                alt={`${product.title} — ${selectedLabel}`}
                fill
                sizes="92vw"
              />
            </div>
            {hasMultipleImages ? (
              <div className="pdp-image-viewer-controls">
                <button type="button" onClick={() => move(-1)}>
                  <ChevronLeft aria-hidden="true" /> Previous
                </button>
                <span>
                  {selectedIndex + 1} / {images.length}
                </span>
                <button type="button" onClick={() => move(1)}>
                  Next <ChevronRight aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
