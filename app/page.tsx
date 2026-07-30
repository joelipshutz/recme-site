import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
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

const steps = [
  {
    number: "01",
    title: "Save the place while it’s fresh",
    copy: "Mark Been or Wanna Go, then add only the details future-you will actually use."
  },
  {
    number: "02",
    title: "Keep your real context",
    copy: "Remember the table, trail, dish, vibe, or person who made the place matter."
  },
  {
    number: "03",
    title: "Find it when the moment comes",
    copy: "Search by place, category, area, person, or the kind of outing you need."
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

        <div className="hero__product" aria-label="rec.me map preview">
          <div className="phone">
            <div className="phone__top">
              <BrandMark compact />
              <span className="phone__avatar">RL</span>
            </div>
            <div className="phone__search">Where should we go?</div>
            <div className="phone__chips">
              <span>You</span>
              <span>Friends</span>
              <span>Been</span>
            </div>
            <div className="product-map">
              <span className="map-block map-block--one" />
              <span className="map-block map-block--two" />
              <span className="map-block map-block--three" />
              <span className="map-road map-road--one" />
              <span className="map-road map-road--two" />
              <span className="map-road map-road--three" />
              <span className="map-pin map-pin--terracotta map-pin--hero-one" />
              <span className="map-pin map-pin--sky map-pin--hero-two" />
              <span className="map-pin map-pin--moss map-pin--hero-three" />
              <span className="map-pin map-pin--terracotta map-pin--hero-four" />
            </div>
            <div className="place-sheet">
              <span className="place-sheet__grab" />
              <p className="eyebrow">Saved from Maya</p>
              <h2>Bar Nido</h2>
              <p>date night · warm room · easy conversation</p>
              <div className="place-sheet__actions">
                <span>Been</span>
                <span>Directions</span>
              </div>
            </div>
          </div>
          <div className="hero__stamp">
            <strong>3 friends</strong>
            <span>have been here</span>
          </div>
        </div>
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
        <div className="step-grid">
          {steps.map((step) => (
            <article className="step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--feature">
        <div className="feature-map" aria-hidden="true">
          <div className="feature-map__label feature-map__label--one">
            <span className="map-pin map-pin--terracotta" />
            <strong>Your Been places</strong>
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
            <li>One map for Been and Wanna Go</li>
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
