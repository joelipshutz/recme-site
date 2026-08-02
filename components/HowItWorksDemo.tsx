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

function CaptureDemo() {
  const sequence = useDemoSequence(captureTiming);
  const { frame } = sequence;
  const formVisible = frame >= 2 && frame < 5;

  return (
    <DemoShell
      {...sequence}
      frameCount={captureTiming.length}
      label="Animated example of searching for Woodcat Coffee and adding check-in details"
    >
      <Image
        alt=""
        className="app-demo__map-image"
        fill
        sizes="(max-width: 900px) 100vw, 56vw"
        src="/product/recme-map-you.jpg"
      />
      <div className={`app-demo__search${frame === 0 ? " is-tapped" : ""}`}>
        <span aria-hidden="true">⌕</span>
        {frame === 0 ? (
          <em>search a place, vibe, or username...</em>
        ) : (
          <strong className={frame === 1 ? "is-typing" : undefined} key={frame === 1 ? "typing" : "typed"}>
            Woodcat Coffee
          </strong>
        )}
      </div>

      {frame === 1 ? (
        <div className="app-demo__suggestion app-demo__arrive">
          <span className="app-demo__place-icon" aria-hidden="true">☕</span>
          <span><strong>Woodcat Coffee</strong><small>Sunset Blvd · Coffee shop</small></span>
          <b aria-hidden="true">＋</b>
        </div>
      ) : null}

      {formVisible ? (
        <div className="app-demo__sheet app-demo__sheet--form app-demo__arrive">
          <span className="app-demo__grab" />
          <small className="app-demo__kicker">CHECK IN</small>
          <h3>Woodcat Coffee</h3>
          <div className="app-demo__field-row">
            <span className="app-demo__field"><small>Category</small><strong>Coffee shop</strong></span>
            <span className="app-demo__field"><small>Rating</small><strong className={frame >= 3 ? "app-demo__rating is-filled" : "app-demo__rating"}>★★★★<i>★</i></strong></span>
          </div>
          <div className={`app-demo__note${frame >= 4 ? " is-filled" : ""}`}>
            <small>Note</small>
            <span>{frame >= 4 ? "Bright patio, good espresso, easy laptop morning." : "What should you remember?"}</span>
          </div>
          <div className={`app-demo__tags${frame >= 4 ? " is-filled" : ""}`}>
            <span>quiet</span><span>wifi solid</span><span>patio</span>
          </div>
          <span className="app-demo__save">Save check-in</span>
        </div>
      ) : null}

      {frame >= 5 ? (
        <div className="app-demo__confirmation app-demo__arrive">
          <span aria-hidden="true">✓</span>
          <small>CHECKED IN</small>
          <strong>Woodcat Coffee</strong>
          <p>★ 4 · quiet · wifi solid · patio</p>
          <em>“Bright patio, good espresso, easy laptop morning.”</em>
        </div>
      ) : null}
    </DemoShell>
  );
}

function TrustDemo() {
  const sequence = useDemoSequence(trustTiming);
  const { frame } = sequence;

  return (
    <DemoShell
      {...sequence}
      frameCount={trustTiming.length}
      label="Animated example of opening a place saved by someone you trust"
    >
      <Image
        alt=""
        className="app-demo__map-image app-demo__map-image--trust"
        fill
        sizes="(max-width: 900px) 100vw, 56vw"
        src="/product/recme-map-social.jpg"
      />
      <div className="app-demo__map-filter"><span aria-hidden="true">●●</span> Social</div>
      <div className={`app-demo__trusted-pin${frame === 1 ? " is-tapped" : ""}`}>
        <span aria-hidden="true">🍝</span>
      </div>
      {frame >= 2 ? (
        <div className="app-demo__sheet app-demo__sheet--place app-demo__arrive">
          <span className="app-demo__grab" />
          <small className="app-demo__kicker app-demo__kicker--social">MAYA + RYAN CHECKED IN</small>
          <h3>Bar Nido</h3>
          <p>Restaurant · Los Angeles · ★ 4.5</p>
          <blockquote>“Good for date night + easy conversation. Get the bar seats.”</blockquote>
          <div className="app-demo__tags is-filled"><span>date night</span><span>easy conversation</span></div>
        </div>
      ) : null}
    </DemoShell>
  );
}

function SearchDemo() {
  const sequence = useDemoSequence(searchTiming);
  const { frame } = sequence;
  const isQuietSearch = frame === 1 || frame === 2;
  const isSandwichSearch = frame >= 4;
  const query = isQuietSearch
    ? "quiet coffee shop with good wifi"
    : isSandwichSearch
      ? "Ryan’s favorite sandwiches in LA"
      : "";

  return (
    <DemoShell
      {...sequence}
      frameCount={searchTiming.length}
      label="Animated example of searching the Feed with natural-language questions"
    >
      <div className="app-demo__feed-head">
        <strong>Feed</strong>
        <span>Places from people you trust</span>
      </div>
      <div className={`app-demo__search app-demo__search--feed${frame === 0 || frame === 3 ? " is-tapped" : ""}`}>
        <span aria-hidden="true">⌕</span>
        {query ? (
          <strong
            className={frame === 1 || frame === 4 ? "is-typing" : undefined}
            key={query}
          >
            {query}
          </strong>
        ) : (
          <em>search your feed...</em>
        )}
      </div>

      {frame === 2 ? (
        <div className="app-demo__results app-demo__arrive">
          <small className="app-demo__kicker">BEST MATCH FROM CHECK-INS</small>
          <div className="app-demo__result-card app-demo__result-card--coffee">
            <span aria-hidden="true">☕</span>
            <div><strong>Circuit Coffee</strong><small>Ryan + Maya · ★ 4.5</small><p>Quiet, wifi solid, laptop friendly.</p></div>
            <b>92%</b>
          </div>
          <div className="app-demo__result-card">
            <span aria-hidden="true">☕</span>
            <div><strong>Fern Desk Coffee</strong><small>Maya checked in</small><p>Calm before noon · outlets along the wall.</p></div>
            <b>84%</b>
          </div>
        </div>
      ) : null}

      {frame >= 5 ? (
        <div className="app-demo__results app-demo__arrive">
          <small className="app-demo__kicker">RYAN’S LA SANDWICH PICKS</small>
          {[
            ["Bub and Grandma’s", "Italian sandwich · Glassell Park", "R"],
            ["Ggiata Delicatessen", "Spicy P · West Hollywood", "R"],
            ["Wax Paper", "Ira Glass · Frogtown", "R"]
          ].map(([place, detail, initial]) => (
            <div className="app-demo__list-row" key={place}>
              <span>{initial}</span><div><strong>{place}</strong><small>{detail}</small></div><b>›</b>
            </div>
          ))}
        </div>
      ) : null}

      {!query && frame > 0 ? <div className="app-demo__search-reset">New search</div> : null}
    </DemoShell>
  );
}

function NearbyDemo() {
  const sequence = useDemoSequence(nearbyTiming);
  const { frame } = sequence;

  return (
    <DemoShell
      {...sequence}
      frameCount={nearbyTiming.length}
      label="Animated example of opening the Add action and seeing nearby places"
    >
      <Image
        alt=""
        className="app-demo__map-image app-demo__map-image--nearby"
        fill
        sizes="(max-width: 900px) 100vw, 56vw"
        src="/product/recme-map-checkins.jpg"
      />
      <div className="app-demo__nearby-title"><strong>Your map</strong><span>Silver Lake</span></div>
      <div className="app-demo__tab-bar">
        <span>Map</span><span>Feed</span>
        <strong className={frame === 1 ? "is-tapped" : undefined}><b aria-hidden="true">＋</b>Add</strong>
        <span>Lists</span><span>Profile</span>
      </div>
      {frame >= 2 ? (
        <div className="app-demo__sheet app-demo__sheet--nearby app-demo__arrive">
          <span className="app-demo__grab" />
          <small className="app-demo__kicker">NEARBY PLACES</small>
          <h3>Where are you?</h3>
          {[
            ["Circuit Coffee", "0.2 mi", "☕"],
            ["Bacari Silverlake", "0.4 mi", "🍝"],
            ["The Window", "0.6 mi", "🥪"]
          ].map(([place, distance, icon]) => (
            <div className="app-demo__nearby-row" key={place}>
              <span aria-hidden="true">{icon}</span><strong>{place}</strong><small>{distance}</small><b>＋</b>
            </div>
          ))}
          <span className="app-demo__manual">Search somewhere else</span>
        </div>
      ) : null}
    </DemoShell>
  );
}

export function HowItWorksDemo({ kind }: { kind: HowItWorksDemoKind }) {
  switch (kind) {
    case "capture":
      return <CaptureDemo />;
    case "trust":
      return <TrustDemo />;
    case "search":
      return <SearchDemo />;
    case "nearby":
      return <NearbyDemo />;
  }
}
