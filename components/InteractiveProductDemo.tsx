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
    src: "/product/recme-map-you.jpg",
    alt: "The rec.me iPhone map showing Ryan's personal place memories around Silver Lake with the Woodcat Coffee check-in ticket open.",
    stampTitle: "Your place memory",
    stampCopy: "personal check-ins on the map"
  },
  {
    id: "social",
    label: "Social",
    src: "/product/recme-map-social.jpg",
    alt: "The rec.me iPhone map showing places shared by trusted people with the Bar Nido social check-in ticket open.",
    stampTitle: "From people you trust",
    stampCopy: "shared check-ins on the map"
  },
  {
    id: "check-ins",
    label: "Check-ins",
    src: "/product/recme-map-checkins.jpg",
    alt: "The rec.me iPhone map focused on check-ins with the Circuit Coffee ticket and recommendation details open.",
    stampTitle: "Places worth returning to",
    stampCopy: "with the check-in context attached"
  },
  {
    id: "wanna",
    label: "Wanna",
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

const ticketPlaces = [
  {
    id: "bar-nido",
    label: "Bar Nido",
    src: "/product/recme-map-social.jpg",
    alt: "The rec.me iPhone map with the Bar Nido social check-in place card open.",
    stampTitle: "Bar Nido place card",
    stampCopy: "from Maya + Ryan’s check-ins"
  },
  {
    id: "larchmont-noodles",
    label: "Larchmont Noodles",
    src: "/product/recme-map-wanna.jpg",
    alt: "The rec.me iPhone map with the Larchmont Noodles Wanna place card open.",
    stampTitle: "Larchmont Noodles",
    stampCopy: "saved to Wanna"
  }
] as const;

export function InteractiveProductDemo() {
  const [selectedID, setSelectedID] =
    useState<(typeof productScreens)[number]["id"]>("map");
  const [selectedMapID, setSelectedMapID] =
    useState<(typeof mapStates)[number]["id"]>("check-ins");
  const [selectedTicketID, setSelectedTicketID] =
    useState<(typeof ticketPlaces)[number]["id"] | null>(null);
  const selectedMap =
    mapStates.find((state) => state.id === selectedMapID) ?? mapStates[2];
  const selectedTicket = ticketPlaces.find(
    (place) => place.id === selectedTicketID
  );
  const selectedScreen =
    productScreens.find((screen) => screen.id === selectedID) ?? productScreens[0];
  const displayedScreen =
    selectedID === "map" ? selectedMap : (selectedTicket ?? ticketScreen);

  return (
    <div className="hero__product" aria-label="Explore real rec.me app screens">
      <div className="product-demo__switcher" aria-label="Choose an app screen">
        {productScreens.map((screen) => (
          <button
            aria-pressed={screen.id === selectedScreen.id}
            className={screen.id === selectedScreen.id ? "is-active" : undefined}
            key={screen.id}
            onClick={() => {
              setSelectedID(screen.id);
              setSelectedTicketID(null);
            }}
            type="button"
          >
            {screen.label}
          </button>
        ))}
      </div>

      <div className="product-demo__hint" aria-live="polite">
        {selectedID === "map" ? (
          <span>Tap an app filter to change the map</span>
        ) : selectedTicket ? (
          <button onClick={() => setSelectedTicketID(null)} type="button">
            <span aria-hidden="true">←</span> Back to the tickets
          </button>
        ) : (
          <span className="product-demo__hint--glow">
            <i aria-hidden="true" /> Tap a glowing ticket to open its place card
          </span>
        )}
      </div>

      <div className="phone phone--app-screen">
        <Image
          alt={displayedScreen.alt}
          className="product-demo__screen"
          fill
          key={`${selectedID}-${selectedMapID}-${selectedTicketID ?? "feed"}`}
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
                  className="map-filter-button"
                  key={state.id}
                  onClick={() => setSelectedMapID(state.id)}
                  type="button"
                />
              );
            })}
          </div>
        ) : null}

        {selectedID === "tickets" && !selectedTicket ? (
          <div
            className="ticket-hotspots"
            aria-label="Open a Feed place card"
            role="group"
          >
            {ticketPlaces.map((place) => (
              <button
                aria-label={`Open the ${place.label} place card`}
                className={`ticket-hotspot ticket-hotspot--${place.id}`}
                key={place.id}
                onClick={() => setSelectedTicketID(place.id)}
                type="button"
              />
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="hero__stamp"
        key={`${selectedID}-${selectedMapID}-${selectedTicketID ?? "feed"}-stamp`}
        aria-live="polite"
      >
        <strong>{displayedScreen.stampTitle}</strong>
        <span>{displayedScreen.stampCopy}</span>
      </div>
    </div>
  );
}
