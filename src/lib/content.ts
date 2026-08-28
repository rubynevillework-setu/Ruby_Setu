import { enterprises } from "@/content/enterprises";
import { stories } from "@/content/stories";
import type { Enterprise, Story } from "./types";
import { tierOf } from "./verification";

/**
 * The single seam between the site and its data.
 *
 * Everything is file-backed today so the site runs with no database. When
 * phase 2 arrives, only this module changes: each function becomes a Drizzle
 * query against the schema in src/db/schema.ts. No page imports content
 * directly - keep it that way.
 */

function byDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** T0 is never public. A profile with nothing checked does not get published. */
function isPublishable(e: Enterprise): boolean {
  return tierOf(e) !== "T0";
}

export function getEnterprises(): Enterprise[] {
  return enterprises.filter(isPublishable).sort(byDateDesc);
}

export function getEnterprise(slug: string): Enterprise | undefined {
  return getEnterprises().find((e) => e.slug === slug);
}

export function getFeaturedEnterprises(limit = 3): Enterprise[] {
  const ranked = getEnterprises().sort((a, b) => {
    const order = { T3: 0, T2: 1, T1: 2, T0: 3 } as const;
    return order[tierOf(a)] - order[tierOf(b)];
  });
  return ranked.slice(0, limit);
}

export function getSectors(): string[] {
  return [...new Set(getEnterprises().map((e) => e.sector))].sort();
}

export function getStories(): Story[] {
  return [...stories].sort(byDateDesc);
}

export function getStory(slug: string): Story | undefined {
  return getStories().find((s) => s.slug === slug);
}

export function getStoriesAbout(enterpriseSlug: string): Story[] {
  return getStories().filter((s) => s.subjects.includes(enterpriseSlug));
}

export function hasSampleContent(): boolean {
  return (
    enterprises.some((e) => e.isSample) || stories.some((s) => s.isSample)
  );
}
