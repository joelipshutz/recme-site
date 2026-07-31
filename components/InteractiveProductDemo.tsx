"use client";

import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const demoModes = [
  {
    id: "you",
    label: "You",
    query: "somewhere easy tonight",
    eyebrow: "Saved by you",
    place: "Elysian Picnic Steps",
    detail: "sunset · low effort · bring a blanket",
    action: "Your check-in",
    stampTitle: "Your memory",
    stampCopy: "ready when you need it",
    activePin: "one"
  },
  {
    id: "friends",
    label: "Friends",
    query: "date night where we can talk",
    eyebrow: "Saved from Maya",
    place: "Bar Nido",
    detail: "warm room · great pasta · easy conversation",
    action: "3 check-ins",
    stampTitle: "3 friends",
    stampCopy: "checked in here",
    activePin: "four"
  },
  {
    id: "check-ins",
    label: "Check-ins",
    query: "coffee with outlets",
    eyebrow: "Checked in by Ryan",
    place: "Circuit Coffee",
    detail: "quiet back table · outlets · good before noon",
    action: "4 check-ins",
    stampTitle: "Worth returning",
    stampCopy: "your people agree",
    activePin: "three"
  },
  {
    id: "wanna-go",
    label: "Wanna Go",
    query: "somewhere new this weekend",
    eyebrow: "Saved from Joe",
    place: "Quarter Sheets",
    detail: "pizza · cake · lively room · go early",
    action: "Wanna Go",
    stampTitle: "Saved for later",
    stampCopy: "with the reason attached",
    activePin: "two"
  }
] as const;

export function InteractiveProductDemo() {
  const [selectedID, setSelectedID] =
    useState<(typeof demoModes)[number]["id"]>("friends");
  const selected =
    demoModes.find((mode) => mode.id === selectedID) ?? demoModes[1];

  return (
    <div className="hero__product" aria-label="Try the rec.me map preview">
      <div className="phone">
        <div className="phone__top">
          <BrandMark compact />
          <span className="phone__avatar" aria-hidden="true">
            RL
          </span>
        </div>
        <div className="phone__search" aria-live="polite">
          <span aria-hidden="true">⌕</span>
          {selected.query}
        </div>
        <div className="phone__chips" aria-label="Filter the demo map">
          {demoModes.map((mode) => (
            <button
              aria-pressed={mode.id === selected.id}
              className={mode.id === selected.id ? "is-active" : undefined}
              key={mode.id}
              onClick={() => setSelectedID(mode.id)}
              type="button"
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className="product-map" aria-hidden="true">
          <span className="map-block map-block--one" />
          <span className="map-block map-block--two" />
          <span className="map-block map-block--three" />
          <span className="map-road map-road--one" />
          <span className="map-road map-road--two" />
          <span className="map-road map-road--three" />
          <span
            className={`map-pin map-pin--terracotta map-pin--hero-one ${
              selected.activePin === "one" ? "map-pin--active" : ""
            }`}
          />
          <span
            className={`map-pin map-pin--sky map-pin--hero-two ${
              selected.activePin === "two" ? "map-pin--active" : ""
            }`}
          />
          <span
            className={`map-pin map-pin--moss map-pin--hero-three ${
              selected.activePin === "three" ? "map-pin--active" : ""
            }`}
          />
          <span
            className={`map-pin map-pin--terracotta map-pin--hero-four ${
              selected.activePin === "four" ? "map-pin--active" : ""
            }`}
          />
        </div>
        <div className="place-sheet" key={selected.id}>
          <span className="place-sheet__grab" />
          <p className="eyebrow">{selected.eyebrow}</p>
          <h2>{selected.place}</h2>
          <p>{selected.detail}</p>
          <div className="place-sheet__actions">
            <span>{selected.action}</span>
            <span>Directions</span>
          </div>
        </div>
      </div>
      <div className="hero__stamp" key={`${selected.id}-stamp`} aria-live="polite">
        <strong>{selected.stampTitle}</strong>
        <span>{selected.stampCopy}</span>
      </div>
      <p className="hero__demo-hint">Tap a filter to try the map</p>
    </div>
  );
}
