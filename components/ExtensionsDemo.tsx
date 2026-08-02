"use client";

import { DemoShell, useDemoSequence } from "@/components/HowItWorksDemo";

export type ExtensionsDemoKind = "imports" | "action" | "widgets" | "share";

const importTiming = [1200, 1500, 1500, 1500, 1700, 2500] as const;
const actionTiming = [1300, 1700, 900, 2600] as const;
const widgetTiming = [1200, 1800, 1900, 1900, 2500] as const;
const shareTiming = [1200, 1500, 2000, 1700, 2500] as const;

const importSources = [
  ["Google Maps", "📍"],
  ["Instagram", "◎"],
  ["TikTok", "♪"],
  ["Notes or text", "▤"]
] as const;

function ShareSheet({ source }: { source: string }) {
  return (
    <div className="extension-share-sheet extension-rise">
      <span className="app-demo__grab" />
      <small>SHARE FROM {source.toUpperCase()}</small>
      <div className="extension-share-sheet__apps">
        <span><i>✉</i>Messages</span>
        <span><i>↗</i>AirDrop</span>
        <span className="is-recme"><i>⌖</i>rec.me</span>
        <span><i>•••</i>More</span>
      </div>
      <strong><i aria-hidden="true">⌖</i> Save places to rec.me</strong>
    </div>
  );
}

function ImportsDemo() {
  const sequence = useDemoSequence(importTiming);
  const { frame } = sequence;
  const activeSource = frame >= 1 && frame <= 4 ? importSources[frame - 1] : null;

  return (
    <DemoShell
      {...sequence}
      frameCount={importTiming.length}
      label="Looping tutorial for importing places from Google Maps, Instagram, TikTok, and notes"
    >
      <div className="extension-demo extension-demo--imports">
        <header className="extension-app-header"><span>‹</span><strong>Import places</strong><span>?</span></header>
        {frame === 0 ? (
          <div className="extension-source-grid extension-rise">
            <small>WHERE DID YOU SAVE IT?</small>
            {importSources.map(([name, icon]) => (
              <span key={name}><i aria-hidden="true">{icon}</i><strong>{name}</strong><small>Share or paste</small></span>
            ))}
          </div>
        ) : null}

        {activeSource && frame < 4 ? (
          <>
            <div className={`extension-source-preview extension-source-preview--${frame} extension-rise`}>
              <span aria-hidden="true">{activeSource[1]}</span>
              <small>{activeSource[0]}</small>
              <strong>{frame === 1 ? "Woodcat Coffee" : frame === 2 ? "5 coffee shops for a slow LA morning" : "The best noodles in Larchmont"}</strong>
              <em>{frame === 1 ? "Sunset Blvd · Los Angeles" : frame === 2 ? "@maya_places · saved post" : "@ryaneats · 0:18"}</em>
              <b>↗ Share</b>
            </div>
            <ShareSheet source={activeSource[0]} />
          </>
        ) : null}

        {frame === 4 ? (
          <div className="extension-notes extension-rise">
            <div className="extension-notes__paper">
              <small>LA places</small>
              <p>Woodcat Coffee — quiet patio, wifi</p>
              <p>Bar Nido — Maya says bar seats</p>
              <p>Larchmont Noodles — rainy night</p>
            </div>
            <span>Paste text into rec.me</span>
          </div>
        ) : null}

        {frame >= 5 ? (
          <div className="extension-import-review extension-rise">
            <small className="app-demo__kicker">READY TO REVIEW</small>
            <h3>4 places found</h3>
            {[
              ["Woodcat Coffee", "Google Maps", "☕"],
              ["Bar Nido", "Instagram", "🍝"],
              ["Larchmont Noodles", "TikTok", "🍜"],
              ["Wax Paper", "Pasted text", "🥪"]
            ].map(([place, source, icon]) => (
              <div key={place}><span>{icon}</span><strong>{place}<small>{source}</small></strong><i>✓</i></div>
            ))}
            <b>Review &amp; save 4 places</b>
          </div>
        ) : null}
      </div>
    </DemoShell>
  );
}

function ActionButtonDemo() {
  const sequence = useDemoSequence(actionTiming);
  const { frame } = sequence;

  return (
    <DemoShell
      {...sequence}
      frameCount={actionTiming.length}
      label="Looping tutorial for setting up and using the iPhone Action Button with rec.me"
    >
      <div className="extension-demo extension-demo--action">
        {frame < 2 ? (
          <div className="extension-settings extension-rise">
            <header><span>‹ Settings</span><strong>Action Button</strong><span /></header>
            <div className="extension-phone-side"><i className={frame === 1 ? "is-selected" : undefined}>⌖</i></div>
            <small>{frame === 0 ? "Swipe to Shortcut" : "SHORTCUT SELECTED"}</small>
            <h3>{frame === 0 ? "Shortcut" : "rec.me: Check In Here"}</h3>
            <p>{frame === 0 ? "Run a favorite action without unlocking your phone." : "Open nearby places whenever you press the Action Button."}</p>
            {frame === 1 ? <b className="extension-setting-confirm">✓ Ready</b> : <span className="extension-setting-picker">Choose a Shortcut →</span>}
          </div>
        ) : null}

        {frame === 2 ? (
          <div className="extension-action-press extension-rise">
            <div className="extension-action-phone"><span className="extension-action-button" /><i>⌖</i></div>
            <strong>Press and hold</strong><small>Action Button</small>
          </div>
        ) : null}

        {frame >= 3 ? (
          <div className="extension-nearby extension-rise">
            <header><span>⌖</span><div><small>REC.ME ACTION</small><strong>Check in nearby</strong></div></header>
            <p>Choose the place you’re at.</p>
            {[["Woodcat Coffee", "250 ft", "☕"], ["Bacari Silverlake", "0.2 mi", "🍝"], ["Circuit Coffee", "0.4 mi", "☕"]].map(([place, distance, icon]) => (
              <div key={place}><span>{icon}</span><strong>{place}<small>{distance}</small></strong><b>＋</b></div>
            ))}
            <em>Search somewhere else</em>
          </div>
        ) : null}
      </div>
    </DemoShell>
  );
}

const widgets = [
  ["I’m here now", "Quick capture", "⌖"],
  ["Quick Search", "Find your memory", "⌕"],
  ["Activity Calendar", "Your place rhythm", "▦"],
  ["Nearby Places", "Rich visit", "↗"],
  ["Check-in Control", "Control Center", "＋"]
] as const;

function WidgetsDemo() {
  const sequence = useDemoSequence(widgetTiming);
  const { frame } = sequence;

  return (
    <DemoShell
      {...sequence}
      frameCount={widgetTiming.length}
      label="Looping tutorial for adding every rec.me Home Screen, Lock Screen, and Control Center widget"
    >
      <div className="extension-demo extension-demo--widgets">
        {frame === 0 ? (
          <div className="extension-home-screen extension-rise">
            <small>9:41</small>
            <div className="extension-home-icons">{["☀", "◉", "✉", "♫", "▦", "⌁", "☁", "⌕"].map((icon, index) => <i key={`${icon}-${index}`}>{icon}</i>)}</div>
            <span className="extension-jiggle-plus">＋</span>
            <strong>Touch and hold, then tap ＋</strong>
          </div>
        ) : null}

        {frame === 1 ? (
          <div className="extension-widget-gallery extension-rise">
            <header><span>Cancel</span><strong>Add Widgets</strong><span /></header>
            <div className="extension-widget-search">⌕ Search Widgets</div>
            <small>REC.ME WIDGETS</small>
            {widgets.map(([name, description, icon]) => (
              <div key={name}><i>{icon}</i><strong>{name}<small>{description}</small></strong><span>＋</span></div>
            ))}
          </div>
        ) : null}

        {frame === 2 ? (
          <div className="extension-widget-families extension-rise">
            <small>CHOOSE A SIZE</small>
            <div className="extension-widget-small"><i>⌖</i><strong>I’m here now</strong><span>Save this place</span></div>
            <div className="extension-widget-wide"><i>⌕</i><strong>Quick Search</strong><span>What are you looking for?</span></div>
            <div className="extension-widget-lock"><span>⌖</span><strong>Lock Screen</strong><span>rec.me nearby</span></div>
            <b>Add Widget</b>
          </div>
        ) : null}

        {frame === 3 ? (
          <div className="extension-widget-places extension-rise">
            <small>PUT REC.ME WHERE YOU NEED IT</small>
            <div><span>Home Screen</span><i className="extension-mini-widget">⌕<b>Find a place</b></i></div>
            <div><span>Lock Screen</span><i className="extension-lock-widget">⌖</i></div>
            <div><span>Control Center</span><i className="extension-control-widget">＋<b>Check in</b></i></div>
          </div>
        ) : null}

        {frame >= 4 ? (
          <div className="extension-widget-result extension-rise">
            <div className="extension-live-widget"><small>NEARBY NOW</small><strong>3 saved places close by</strong><span>Woodcat Coffee · 250 ft</span><span>Bacari Silverlake · 0.2 mi</span><b>Open nearby places →</b></div>
            <p><span>✓</span> One tap opens the right rec.me view.</p>
          </div>
        ) : null}
      </div>
    </DemoShell>
  );
}

function ShareExtensionDemo() {
  const sequence = useDemoSequence(shareTiming);
  const { frame } = sequence;

  return (
    <DemoShell
      {...sequence}
      frameCount={shareTiming.length}
      label="Looping tutorial showing where to find and favorite the rec.me share extension"
    >
      <div className="extension-demo extension-demo--share">
        {frame === 0 ? (
          <div className="extension-any-app extension-rise"><small>FROM ALMOST ANY APP</small><span>📍</span><strong>Found a place?</strong><p>Tap the app’s Share button.</p><b>↗ Share</b></div>
        ) : null}
        {frame === 1 ? <ShareSheet source="any app" /> : null}
        {frame === 2 ? (
          <div className="extension-more-sheet extension-rise">
            <header><span>Cancel</span><strong>Apps</strong><span>Edit</span></header>
            <small>FAVORITES</small>
            {["Messages", "Mail", "rec.me"].map((app) => <div className={app === "rec.me" ? "is-recme" : undefined} key={app}><i>{app === "rec.me" ? "⌖" : "○"}</i><strong>{app}</strong><span>{app === "rec.me" ? "☆" : "−"}</span></div>)}
            <p>Tap the star to keep rec.me in the first row.</p>
          </div>
        ) : null}
        {frame === 3 ? (
          <div className="extension-favorite-sheet extension-rise"><small>YOUR FAVORITES</small><div><i>✉</i><span>Messages</span></div><div className="is-recme"><i>⌖</i><span>rec.me</span><b>Always easy to find</b></div><div><i>•••</i><span>More</span></div></div>
        ) : null}
        {frame >= 4 ? (
          <div className="extension-share-review extension-rise"><small className="app-demo__kicker">SHARED TO REC.ME</small><span>☕</span><h3>Woodcat Coffee</h3><p>We found the place and carried over the source link.</p><div><i>✓</i> Place matched</div><div><i>＋</i> Add a note or tags</div><b>Save to Wanna</b></div>
        ) : null}
      </div>
    </DemoShell>
  );
}

export function ExtensionsDemo({ kind }: { kind: ExtensionsDemoKind }) {
  switch (kind) {
    case "imports": return <ImportsDemo />;
    case "action": return <ActionButtonDemo />;
    case "widgets": return <WidgetsDemo />;
    case "share": return <ShareExtensionDemo />;
  }
}
