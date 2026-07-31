import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "rec.me — places worth remembering",
    template: "%s · rec.me"
  },
  description:
    "Remember places worth returning to and discover where trusted people have checked in.",
  applicationName: "rec.me",
  openGraph: {
    title: "rec.me — places worth remembering",
    description:
      "A searchable map of places you and the people you trust actually recommend.",
    url: SITE_URL,
    siteName: "rec.me",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "rec.me — places worth remembering"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "rec.me — places worth remembering",
    description:
      "A searchable map of places you and the people you trust actually recommend.",
    images: ["/og.png"]
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
