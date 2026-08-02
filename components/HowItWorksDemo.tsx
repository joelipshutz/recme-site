"use client";

import Image from "next/image";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export type HowItWorksDemoKind = "capture" | "trust" | "search" | "nearby";

const captureTiming = [900, 1900, 950, 950, 1500, 2600] as const;
const trustTiming = [1100, 750, 2900] as const;
const searchTiming = [850, 2100, 2300, 700, 2400, 3100] as const;
const nearbyTiming = [1200, 650, 3000] as const;

export function useDemoSequence(timing: readonly number[]) {
  const demoRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const demo = demoRef.current;
    if (!demo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setFrame(0);
      },
      { threshold: 0.25 }
    );

    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !inView) return;

    const timeout = window.setTimeout(() => {
      setFrame((current) => (current + 1) % timing.length);
    }, timing[frame]);

    return () => window.clearTimeout(timeout);
  }, [frame, inView, paused, reducedMotion, timing]);

  return {
    demoRef,
    frame: reducedMotion ? timing.length - 1 : frame,
    paused,
    reducedMotion,
    togglePaused: () => setPaused((current) => !current)
  };
}

export function DemoShell({
  children,
  demoRef,
  frame,
  frameCount,
  label,
  paused,
  reducedMotion,
  togglePaused
}: {
  children: ReactNode;
  demoRef: RefObject<HTMLDivElement | null>;
  frame: number;
  frameCount: number;
  label: string;
  paused: boolean;
  reducedMotion: boolean;
  togglePaused: () => void;
}) {
  return (
    <div className="app-demo" aria-label={label} ref={demoRef}>
      <div className="app-demo__chrome">
        <span>rec.me demo</span>
        {reducedMotion ? (
          <span className="app-demo__motion-state">Static view</span>
        ) : (
          <button
            aria-label={`${paused ? "Play" : "Pause"} ${label}`}
            aria-pressed={paused}
            onClick={togglePaused}
            type="button"
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
      <div className="app-demo__viewport" aria-hidden="true">
        {children}
      </div>
      <div className="app-demo__progress" aria-hidden="true">
        {Array.from({ length: frameCount }, (_, index) => (
          <span className={index === frame ? "is-active" : undefined} key={index} />
        ))}
      </div>
    </div>
  );
}

type FocusTarget =
  | "map-search"
  | "search-result"
  | "rating"
  | "more-options"
  | "note"
  | "map-ticket"
  | "feed-search"
  | "feed-results"
  | "add-button"
  | "nearby";

type RealFrame = {
  src: string;
  caption: string;
  focus?: FocusTarget;
};

const captureFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-map.jpg", caption: "Tap the real Map search", focus: "map-search" },
  { src: "/product/recme-live-map-search.jpg", caption: "Choose Woodcat Coffee", focus: "search-result" },
  { src: "/product/recme-live-checkin-editor.jpg", caption: "Adjust the real check-in details", focus: "rating" },
  { src: "/product/recme-live-checkin-details.jpg", caption: "Open note, tags, and privacy", focus: "more-options" },
  { src: "/product/recme-live-checkin-filled.jpg", caption: "Add the detail future-you needs", focus: "note" },
  { src: "/product/recme-live-place-woodcat.jpg", caption: "The memory lives on Woodcat’s full place profile" }
];

const trustFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-map.jpg", caption: "Browse places from people you trust" },
  { src: "/product/recme-live-trusted-map.jpg", caption: "Tap Bar Nido’s real map ticket", focus: "map-ticket" },
  { src: "/product/recme-live-trusted-place.jpg", caption: "See the full profile, ratings, tags, and context" }
];

const searchFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-feed.jpg", caption: "Tap the real Feed search", focus: "feed-search" },
  { src: "/product/recme-live-feed-search.jpg", caption: "Ask for quiet coffee with good wifi", focus: "feed-search" },
  { src: "/product/recme-live-feed-search.jpg", caption: "rec.me interprets the context and ranks saved places", focus: "feed-results" },
  { src: "/product/recme-live-feed.jpg", caption: "Start another search", focus: "feed-search" },
  { src: "/product/recme-live-feed-search-ryan.jpg", caption: "Ask for Ryan’s favorite places in LA", focus: "feed-search" },
  { src: "/product/recme-live-feed-search-ryan.jpg", caption: "The results keep Ryan’s notes and ratings attached", focus: "feed-results" }
];

const nearbyFrames: readonly RealFrame[] = [
  { src: "/product/recme-live-map.jpg", caption: "Tap the actual Map action button", focus: "add-button" },
  { src: "/product/recme-live-add-nearby.jpg", caption: "The real Add sheet opens over your map" },
  { src: "/product/recme-live-add-nearby.jpg", caption: "Nearby suggestions appear in the real Add flow", focus: "nearby" }
];

function RealAppSequence({ frame, frames }: { frame: number; frames: readonly RealFrame[] }) {
  const current = frames[Math.min(frame, frames.length - 1)];

  return (
    <div className="real-app-demo">
      <div className="real-app-demo__phone">
        <Image
          alt=""
          className="real-app-demo__screen"
          fill
          key={`${frame}-${current.src}`}
          sizes="(max-width: 620px) 280px, 320px"
          src={current.src}
        />
        {current.focus ? (
          <span className={`real-app-demo__focus real-app-demo__focus--${current.focus}`} />
        ) : null}
      </div>
      <div className="real-app-demo__caption" key={`${frame}-${current.caption}`}>
        <small>REAL REC.ME SCREEN</small>
        <strong>{current.caption}</strong>
      </div>
    </div>
  );
}

function RealDemo({
  frames,
  label,
  timing
}: {
  frames: readonly RealFrame[];
  label: string;
  timing: readonly number[];
}) {
  const sequence = useDemoSequence(timing);

  return (
    <DemoShell {...sequence} frameCount={timing.length} label={label}>
      <RealAppSequence frame={sequence.frame} frames={frames} />
    </DemoShell>
  );
}

export function HowItWorksDemo({ kind }: { kind: HowItWorksDemoKind }) {
  switch (kind) {
    case "capture":
      return (
        <RealDemo
          frames={captureFrames}
          label="Real rec.me app sequence for searching Woodcat Coffee and completing a check-in"
          timing={captureTiming}
        />
      );
    case "trust":
      return (
        <RealDemo
          frames={trustFrames}
          label="Real rec.me app sequence for opening a trusted place from the map"
          timing={trustTiming}
        />
      );
    case "search":
      return (
        <RealDemo
          frames={searchFrames}
          label="Real rec.me app sequence for natural-language Feed searches"
          timing={searchTiming}
        />
      );
    case "nearby":
      return (
        <RealDemo
          frames={nearbyFrames}
          label="Real rec.me app sequence for opening Add and seeing nearby places"
          timing={nearbyTiming}
        />
      );
  }
}
