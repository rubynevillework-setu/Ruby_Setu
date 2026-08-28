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

/**
 * Resolve the canonical site URL.
 *
 * Uses `||` and a trim, not `??`: an env var that exists but is EMPTY is the
 * common case on a hosting platform (a variable added with no value yet), and
 * `??` passes an empty string straight through to `new URL("")`, which throws
 * ERR_INVALID_URL and fails the production build.
 *
 * Falls back to the host's own URL so metadata is correct with zero config.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

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
