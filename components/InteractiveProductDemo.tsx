"use client";

import Image from "next/image";
import { useState } from "react";

const productScreens = [
  { id: "map", label: "Map" },
  { id: "tickets", label: "Check-in tickets" }
] as const;

const mapStates = [
  {
    id: "you",
    label: "You",
    icon: "●",
    src: "/product/recme-map-you.jpg",
    alt: "The rec.me iPhone map showing Ryan's personal place memories around Silver Lake with the Woodcat Coffee check-in ticket open.",
    stampTitle: "Your place memory",
    stampCopy: "personal check-ins on the map"
  },
  {
    id: "social",
    label: "Social",
    icon: "●●",
    src: "/product/recme-map-social.jpg",
    alt: "The rec.me iPhone map showing places shared by trusted people with the Bar Nido social check-in ticket open.",
    stampTitle: "From people you trust",
    stampCopy: "shared check-ins on the map"
  },
  {
    id: "check-ins",
    label: "Check-ins",
    icon: "●",
    src: "/product/recme-map-checkins.jpg",
    alt: "The rec.me iPhone map focused on check-ins with the Circuit Coffee ticket and recommendation details open.",
    stampTitle: "Places worth returning to",
    stampCopy: "with the check-in context attached"
  },
  {
    id: "wanna",
    label: "Wanna",
    icon: "○",
    src: "/product/recme-map-wanna.jpg",
    alt: "The rec.me iPhone map showing a saved Wanna place with the Larchmont Noodles ticket open.",
    stampTitle: "Saved for later",
    stampCopy: "with the place reason attached"
  }
] as const;

const ticketScreen = {
  src: "/product/recme-feed-tickets.jpg",
  alt: "The rec.me iPhone Feed showing a Bar Nido check-in and a Larchmont Noodles Wanna save as notched tickets.",
  stampTitle: "Real check-in tickets",
  stampCopy: "from the rec.me Feed"
} as const;

export function InteractiveProductDemo() {
  const [selectedID, setSelectedID] =
    useState<(typeof productScreens)[number]["id"]>("map");
  const [selectedMapID, setSelectedMapID] =
    useState<(typeof mapStates)[number]["id"]>("check-ins");
  const selectedMap =
    mapStates.find((state) => state.id === selectedMapID) ?? mapStates[2];
  const selectedScreen =
    productScreens.find((screen) => screen.id === selectedID) ?? productScreens[0];
  const displayedScreen = selectedID === "map" ? selectedMap : ticketScreen;

  return (
    <div className="hero__product" aria-label="Explore real rec.me app screens">
      <div className="product-demo__switcher" aria-label="Choose an app screen">
        {productScreens.map((screen) => (
          <button
            aria-pressed={screen.id === selectedScreen.id}
            className={screen.id === selectedScreen.id ? "is-active" : undefined}
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
          alt={displayedScreen.alt}
          className="product-demo__screen"
          fill
          key={`${selectedID}-${selectedMapID}`}
          priority={selectedID === "map"}
          sizes="(max-width: 620px) 320px, 360px"
          src={displayedScreen.src}
        />

        {selectedID === "map" ? (
          <div className="map-filter-controls" aria-label="Filter the example map">
            {mapStates.map((state) => {
              const isActive = state.id === selectedMap.id;

              return (
                <button
                  aria-label={`Show ${state.label} places on the example map`}
                  aria-pressed={isActive}
                  className={`map-filter-button map-filter-button--${state.id}${
                    isActive ? " is-active" : ""
                  }`}
                  key={state.id}
                  onClick={() => setSelectedMapID(state.id)}
                  type="button"
                >
                  <span aria-hidden="true" className="map-filter-button__icon">
                    {state.icon}
                  </span>
                  <span>{state.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div
        className="hero__stamp"
        key={`${selectedID}-${selectedMapID}-stamp`}
        aria-live="polite"
      >
        <strong>{displayedScreen.stampTitle}</strong>
        <span>{displayedScreen.stampCopy}</span>
      </div>
    </div>
  );
}
