/** Verification tiers. Cumulative: T3 implies the checks of T1 and T2. */
export type Tier = "T0" | "T1" | "T2" | "T3";

export type VerificationMethod =
  | "self_declared"
  | "documents_sighted"
  | "site_visit"
  | "reference_call"
  | "third_party_certification";

/**
 * Verification is an append-only event log, never a boolean on the enterprise.
 * The current tier is derived from these events (see lib/verification.ts).
 * When this moves to Postgres the shape stays identical.
 */
export type VerificationEvent = {
  id: string;
  method: VerificationMethod;
  /** Who performed the check. Named humans only - "the team" is not a checker. */
  checker: string;
  /** ISO date the check was performed. */
  checkedAt: string;
  /** What was actually looked at, in plain language. Shown publicly. */
  note: string;
};

export type Certification = {
  name: string;
  issuer: string;
  /** ISO date. An expired certificate silently downgrades the derived tier. */
  expiresAt: string;
};

export type ImpactMetric = {
  label: string;
  value: string;
  /** Where the number came from. A metric without a source is not published. */
  source: string;
  period: string;
};

export type Enterprise = {
  slug: string;
  name: string;
  /** One line, plain. Appears in the index and in share cards. */
  summary: string;
  sector: string;
  location: string;
  founded: number;
  headcount: string;
  /** Long-form body, markdown-lite (paragraphs, ## headings, > quotes, - lists). */
  body: string;
  products: string[];
  exportMarkets: string[];
  capacity: string;
  certifications: Certification[];
  impact: ImpactMetric[];
  verification: VerificationEvent[];
  contactName: string;
  website?: string;
  /** True while this record is illustrative placeholder content. */
  isSample: boolean;
  publishedAt: string;
};

export type Story = {
  slug: string;
  title: string;
  standfirst: string;
  kind: "case study" | "interview" | "explainer";
  body: string;
  author: string;
  publishedAt: string;
  /** Slugs of enterprises this story is about. */
  subjects: string[];
  isSample: boolean;
};
