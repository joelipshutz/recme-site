export const SITE_URL = "https://getrec.me";
export const APP_STORE_URL = "https://apps.apple.com/app/id6776850787";
export const TESTFLIGHT_URL = "https://testflight.apple.com/join/knEhRa6t";
export const SUPPORT_EMAIL = "support@getrec.me";

export const primaryDownloadURL = TESTFLIGHT_URL;
export const primaryDownloadLabel = "Join the TestFlight";

export type SharedRouteKind = "profile" | "place" | "list" | "invite";

export function appSchemeURL(kind: SharedRouteKind, identifier: string): string {
  const root = kind === "invite" ? "invites" : `${kind}s`;
  return `recme://${root}/${encodeURIComponent(identifier)}`;
}

export function websiteURL(kind: SharedRouteKind, identifier: string): string {
  const root = kind === "invite" ? "invites" : `${kind}s`;
  return `${SITE_URL}/${root}/${encodeURIComponent(identifier)}`;
}
