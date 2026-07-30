import type { ReactNode } from "react";

type DocumentPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  children: ReactNode;
};

export function DocumentPage({
  eyebrow,
  title,
  intro,
  updated = "July 29, 2026",
  children
}: DocumentPageProps) {
  return (
    <main className="document-shell">
      <article className="document">
        <header className="document__header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="document__intro">{intro}</p>
          <p className="document__updated">Last updated {updated}</p>
        </header>
        <div className="document__body">{children}</div>
      </article>
    </main>
  );
}
