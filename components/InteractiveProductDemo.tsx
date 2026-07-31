"use client";

import Image from "next/image";
import { useState } from "react";

const productScreens = [
  {
    id: "map",
    label: "Map",
    src: "/product/recme-map-ticket.jpg",
    alt: "The rec.me iPhone map showing Check-in and Social filters, place pins around Silver Lake, and the Woodcat Coffee ticket open above the tab bar.",
    stampTitle: "The real app map",
    stampCopy: "with a live place ticket"
  },
  {
    id: "tickets",
    label: "Check-in tickets",
    src: "/product/recme-feed-tickets.jpg",
    alt: "The rec.me iPhone Feed showing a Bar Nido check-in and a Larchmont Noodles Wanna save as notched tickets.",
    stampTitle: "Real check-in tickets",
    stampCopy: "from the rec.me Feed"
  }
] as const;

export function InteractiveProductDemo() {
  const [selectedID, setSelectedID] =
    useState<(typeof productScreens)[number]["id"]>("map");
  const selected =
    productScreens.find((screen) => screen.id === selectedID) ?? productScreens[0];

  return (
    <div className="hero__product" aria-label="Explore real rec.me app screens">
      <div className="product-demo__switcher" aria-label="Choose an app screen">
        {productScreens.map((screen) => (
          <button
            aria-pressed={screen.id === selected.id}
            className={screen.id === selected.id ? "is-active" : undefined}
            key={screen.id}
            onClick={() => setSelectedID(screen.id)}
            type="button"
          >
            {screen.label}
          </button>
        ))}
      </div>

      <div className="phone phone--app-screen">
        <Image
          alt={selected.alt}
          className="product-demo__screen"
          fill
          key={selected.id}
          priority={selected.id === "map"}
          sizes="(max-width: 620px) 340px, 390px"
          src={selected.src}
        />
      </div>

      <div className="hero__stamp" key={`${selected.id}-stamp`} aria-live="polite">
        <strong>{selected.stampTitle}</strong>
        <span>{selected.stampCopy}</span>
      </div>
    </div>
  );
}
