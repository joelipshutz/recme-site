import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See how rec.me turns a check-in, trusted context, and a future search into one useful place memory."
};

const chapters = [
  {
    number: "01",
    eyebrow: "Capture the useful part",
    title: "Check in with the reason attached.",
    copy: "Save the place, who you were with, and the detail future-you will need. A private save stays private; you decide what becomes social.",
    image: "/product/recme-map-you.jpg",
    imageAlt:
      "The rec.me map showing personal check-ins and the Woodcat Coffee place ticket.",
    place: "Woodcat Coffee",
    meta: "You checked in · ★ 4",
    note: "Strong fit based on your check-ins.",
    tone: "you"
  },
  {
    number: "02",
    eyebrow: "Add the trusted layer",
    title: "A pin carries a point of view.",
    copy: "When people you trust share a check-in, their notes stay connected to the place. The map shows who recommended it and why it might fit.",
    image: "/product/recme-map-social.jpg",
    imageAlt:
      "The rec.me map showing social check-ins and the Bar Nido recommendation ticket.",
    place: "Bar Nido",
    meta: "Maya + Ryan checked in · ★ 4.5",
    note: "Good for date night + easy conversation.",
    tone: "social"
  },
  {
    number: "03",
    eyebrow: "Find it when it matters",
    title: "Search the way you remember.",
    copy: "Months later, ask for the moment instead of a category. rec.me brings back the place, the people, and the reasons that made it worth saving.",
    image: "/product/recme-map-checkins.jpg",
    imageAlt:
      "The rec.me map showing check-ins with the Circuit Coffee recommendation ticket selected.",
    place: "Circuit Coffee",
    meta: "Found from trusted check-ins",
    note: "Quiet coffee with solid wifi and laptop space.",
    tone: "found"
  }
] as const;

export default function HowItWorksPage() {
  return (
    <main className="motion-page">
      <section className="motion-hero">
        <div className="motion-hero__copy motion-reveal">
          <p className="eyebrow">How rec.me works</p>
          <h1>A place becomes useful when its story stays attached.</h1>
          <p>
            rec.me turns a quick check-in into a trusted place memory you can
            actually find again.
          </p>
          <div className="motion-hero__actions">
            <a className="button" href={primaryDownloadURL}>
              {primaryDownloadLabel}
            </a>
            <Link className="text-link" href="#the-journey">
              Follow one place ↓
            </Link>
          </div>
        </div>

        <div className="motion-hero__visual motion-reveal" aria-hidden="true">
          <div className="motion-hero__phone">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 340px, 380px"
              src="/product/recme-map-social.jpg"
            />
          </div>
          <div className="motion-hero__ticket motion-card-to-map">
            <span className="motion-ticket__eyebrow">CHECKED IN · FRIDAY</span>
            <strong>Bar Nido</strong>
            <small>Maya · date night · ★ 4.5</small>
            <em>“Easy to talk. Get the bar seats.”</em>
          </div>
          <span className="motion-pin motion-pin--hero motion-pin--social" />
        </div>
      </section>

      <section className="motion-principles" aria-label="The rec.me loop">
        <span>Check in</span>
        <i aria-hidden="true">→</i>
        <span>Keep the context</span>
        <i aria-hidden="true">→</i>
        <span>Find it later</span>
      </section>

      <section className="motion-story" id="the-journey">
        <header className="motion-story__header motion-reveal">
          <p className="eyebrow">One place, still useful later</p>
          <h2>Follow the memory from map pin to future plan.</h2>
        </header>

        <div className="motion-story__route" aria-hidden="true">
          <span className="motion-story__route-progress" />
        </div>

        <div className="motion-chapters">
          {chapters.map((chapter, index) => (
            <article className="motion-chapter" key={chapter.number}>
              <div className="motion-chapter__copy motion-reveal">
                <span className="motion-chapter__number">{chapter.number}</span>
                <p className="eyebrow">{chapter.eyebrow}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.copy}</p>
              </div>

              <div className={`motion-map motion-map--${chapter.tone}`}>
                <Image
                  alt={chapter.imageAlt}
                  className="motion-map__image"
                  fill
                  sizes="(max-width: 900px) 100vw, 56vw"
                  src={chapter.image}
                />
                <div className="motion-map__shade" aria-hidden="true" />
                <span
                  className={`motion-pin motion-pin--one motion-pin--${chapter.tone}`}
                  aria-hidden="true"
                />
                <span
                  className={`motion-pin motion-pin--two motion-pin--${chapter.tone}`}
                  aria-hidden="true"
                />
                <span
                  className={`motion-pin motion-pin--three motion-pin--${chapter.tone}`}
                  aria-hidden="true"
                />

                {index === 2 ? (
                  <div className="motion-search motion-reveal">
                    <span aria-hidden="true">⌕</span>
                    quiet coffee with good wifi
                  </div>
                ) : null}

                <div className="motion-map__ticket motion-card-to-map">
                  <span className="motion-ticket__eyebrow">
                    {chapter.eyebrow}
                  </span>
                  <strong>{chapter.place}</strong>
                  <small>{chapter.meta}</small>
                  <em>“{chapter.note}”</em>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="motion-page__cta motion-reveal">
        <div>
          <p className="eyebrow">A map that gets more useful</p>
          <h2>Build the place memory you’ll actually come back to.</h2>
        </div>
        <a className="button button--dark" href={primaryDownloadURL}>
          {primaryDownloadLabel}
        </a>
      </section>
    </main>
  );
}
