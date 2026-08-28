import type { Metadata } from "next";
// Self-hosted fonts. Deliberately not next/font/google: hotlinking Google
// Fonts sends every European visitor's IP address to a third country, which
// German courts have already found unlawful. These ship with the site.
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SampleDataBanner } from "@/components/sample-data-banner";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ruby Setu — Nepali social enterprises, verified for European partners",
    template: "%s · Ruby Setu",
  },
  description:
    "Ruby Setu bridges social enterprises in Nepal with the European companies and networks that want to work with them. Verified profiles, real stories, brokered introductions.",
  openGraph: {
    type: "website",
    siteName: "Ruby Setu",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SampleDataBanner />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
