import Link from "next/link";
import { InteractiveProductDemo } from "@/components/InteractiveProductDemo";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

const trustNotes = [
  {
    label: "Useful before social",
    copy: "Search your own memory and the places people you trust chose to share."
  },
  {
    label: "Private by design",
    copy: "Stealth saves stay yours. rec.me never broadcasts live location."
  },
  {
    label: "Fast to capture",
    copy: "Save from nearby, search, a link, a photo, or your share sheet."
  }
];

const memoryMoments = [
  {
    number: "01",
    eyebrow: "Maya · last Friday",
    title: "Save the part you’ll forget.",
    copy: "Maya checks in at Bar Nido and keeps the useful detail: warm room, great pasta, easy to talk.",
    artifact: "“Get the bar seats.”",
    meta: "Check-in · Friends"
  },
  {
    number: "02",
    eyebrow: "The trusted layer",
    title: "See the people behind the pin.",
    copy: "Joe and Ryan check in too. Their notes stay attached, so the recommendation has a point of view.",
    artifact: "Maya + 2 friends",
    meta: "3 check-ins"
  },
  {
    number: "03",
    eyebrow: "Six months later",
    title: "Ask the way you actually think.",
    copy: "Search “date night where we can talk” and Bar Nido comes back with the people and reasons that made it useful.",
    artifact: "date night where we can talk",
    meta: "Found from your people"
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Your trusted place memory</p>
          <h1>
            Remember the places
            <span>worth going back to.</span>
          </h1>
          <p className="hero__lede">
            rec.me turns your saves—and the places trusted people choose to
            share—into a map you can actually use.
          </p>
          <div className="hero__actions">
            <a className="button" href={primaryDownloadURL}>
              {primaryDownloadLabel}
            </a>
            <Link className="button button--secondary" href="#how-it-works">
              See how it works
            </Link>
          </div>
          <p className="hero__note">
            iPhone first · private saves stay private · no live-location feed
          </p>
        </div>

        <InteractiveProductDemo />
      </section>

      <section className="trust-strip" aria-label="Product principles">
        {trustNotes.map((note) => (
          <article key={note.label}>
            <strong>{note.label}</strong>
            <p>{note.copy}</p>
          </article>
        ))}
      </section>

      <section className="section section--how" id="how-it-works">
        <header className="section__header">
          <p className="eyebrow">A map with a memory</p>
          <h2>Less collecting. More remembering.</h2>
          <p>
            rec.me keeps the useful human details that disappear inside a
            generic bookmark folder.
          </p>
        </header>
        <div className="memory-story">
          {memoryMoments.map((moment) => (
            <article className="memory-moment" key={moment.number}>
              <div className="memory-moment__rail" aria-hidden="true">
                <span>{moment.number}</span>
              </div>
              <div className="memory-moment__copy">
                <p className="eyebrow">{moment.eyebrow}</p>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </div>
              <div className={`memory-artifact memory-artifact--${moment.number}`}>
                <strong>{moment.artifact}</strong>
                <span>{moment.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--feature">
        <div className="feature-map" aria-hidden="true">
          <div className="feature-map__label feature-map__label--one">
            <span className="map-pin map-pin--terracotta" />
            <strong>Your check-ins</strong>
          </div>
          <div className="feature-map__label feature-map__label--two">
            <span className="map-pin map-pin--sky" />
            <strong>Trusted people</strong>
          </div>
          <div className="feature-map__label feature-map__label--three">
            <span className="map-pin map-pin--moss" />
            <strong>Worth a detour</strong>
          </div>
        </div>
        <div className="feature-copy">
          <p className="eyebrow">Trust travels with the place</p>
          <h2>Know whose recommendation you’re following.</h2>
          <p>
            Internet ratings answer what everyone thinks. rec.me helps you
            remember what your people thought—and whether it fits this moment.
          </p>
          <ul className="check-list">
            <li>One map for Check-ins and Wanna Go</li>
            <li>Follower and friend visibility, never a public feed</li>
            <li>Notes, ratings, tags, lists, and check-ins in context</li>
          </ul>
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">Your next place is already in someone’s memory</p>
          <h2>Start building the map you’ll actually come back to.</h2>
        </div>
        <a className="button button--dark" href={primaryDownloadURL}>
          {primaryDownloadLabel}
        </a>
      </section>
    </main>
  );
}
