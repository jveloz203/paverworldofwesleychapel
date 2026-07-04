"use client";

import { useState } from "react";
import { images, type ImageSlot } from "@/lib/images";
import PaverPattern from "@/components/PaverPattern";

export default function SmartImage({
  slot,
  className = "",
  eager = false,
}: {
  slot: ImageSlot;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const { url, alt } = images[slot];

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-gradient-to-br from-clay-500 via-clay-600 to-clay-800 ${className}`}
      >
        <PaverPattern className="absolute inset-0 h-full w-full text-sand-50" opacity={0.18} />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
