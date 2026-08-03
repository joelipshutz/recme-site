import type { Metadata } from "next";
import Link from "next/link";
import { ExtensionsDemo } from "@/components/ExtensionsDemo";
import { primaryDownloadLabel, primaryDownloadURL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Extensions",
  description: "Learn how to save places to rec.me from other apps, the Action Button, and iPhone widgets."
};

const lessons = [
  {
    number: "01",
    eyebrow: "Import from anywhere",
    title: "Bring the place. Keep the source.",
    copy: "Share a Google Maps place, Instagram post, or TikTok straight to rec.me. For a loose list, paste your Notes text and review every place before it is saved.",
    kind: "imports"
  },
  {
    number: "02",
    eyebrow: "Your Action Button",
    title: "Make checking in a physical shortcut.",
    copy: "Assign rec.me’s Check In Here shortcut to the iPhone Action Button. A press opens nearby places, ready for the note you want future-you to remember.",
    kind: "action"
  },
  {
    number: "03",
    eyebrow: "Home, Lock, and Control Center",
    title: "Put the right shortcut one tap away.",
    copy: "Add I’m Here Now, Quick Search, Activity Calendar, Nearby Places, or the Check-in Control. Choose the surface and size that match how you use rec.me.",
    kind: "widgets"
  },
  {
    number: "04",
    eyebrow: "The rec.me share extension",
    title: "Find it once. Keep it within reach.",
    copy: "In another app, tap Share and choose rec.me. If it is hidden, open More, tap Edit, and favorite rec.me so it stays in the first row next time.",
    kind: "share"
  }
] as const;

export default function ExtensionsPage() {
  return (
    <main className="extensions-page">
      <section className="extensions-hero">
        <div className="extensions-hero__copy motion-reveal">
          <p className="eyebrow">rec.me beyond the app</p>
          <h1>Save a place from wherever it finds you.</h1>
          <p>Turn posts, links, lists, buttons, and widgets into useful place memories—without breaking your flow.</p>
          <div className="extensions-hero__actions">
            <Link className="button" href="#extension-lessons">Show me how</Link>
            <a className="text-link" href={primaryDownloadURL}>{primaryDownloadLabel}</a>
          </div>
        </div>
        <div className="extensions-hero__orbit motion-reveal" aria-hidden="true">
          <span className="extensions-hero__center">⌖<strong>rec.me</strong></span>
          <span className="extensions-orbit extensions-orbit--maps">📍<small>Maps</small></span>
          <span className="extensions-orbit extensions-orbit--social">◎<small>Instagram</small></span>
          <span className="extensions-orbit extensions-orbit--video">♪<small>TikTok</small></span>
          <span className="extensions-orbit extensions-orbit--notes">▤<small>Notes</small></span>
          <span className="extensions-orbit extensions-orbit--widgets">▦<small>Widgets</small></span>
        </div>
      </section>

      <section className="extensions-intro">
        <p className="eyebrow">Four small superpowers</p>
        <h2>rec.me should be close when a place is worth keeping.</h2>
        <p>Each simulation loops automatically. Pause any one when you want to follow a step at your own pace.</p>
      </section>

      <section className="extensions-lessons" id="extension-lessons">
        {lessons.map((lesson) => (
          <article className="extension-lesson" key={lesson.number}>
            <div className="extension-lesson__copy motion-reveal">
              <span className="extension-lesson__number">{lesson.number}</span>
              <p className="eyebrow">{lesson.eyebrow}</p>
              <h2>{lesson.title}</h2>
              <p>{lesson.copy}</p>
            </div>
            <ExtensionsDemo kind={lesson.kind} />
          </article>
        ))}
      </section>

      <section className="extensions-page__cta motion-reveal">
        <div><p className="eyebrow">Keep the place, not the friction</p><h2>Your next save can start anywhere.</h2></div>
        <a className="button button--dark" href={primaryDownloadURL}>{primaryDownloadLabel}</a>
      </section>
    </main>
  );
}
