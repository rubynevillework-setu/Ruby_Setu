import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Phase 2 schema. Not wired up yet - the site reads from src/content until a
 * DATABASE_URL exists. Written now so the file-backed models in lib/types.ts
 * and this schema cannot drift apart.
 *
 * Two rules encoded here deliberately:
 *  1. Verification and introduction progress are APPEND-ONLY event logs.
 *     Current tier and current stage are derived, never stored.
 *  2. Publishable content carries an explicit status and never mutates in
 *     place - an edit creates a new draft.
 */

export const orgType = pgEnum("org_type", ["enterprise", "partner"]);
export const contentStatus = pgEnum("content_status", [
  "draft",
  "in_review",
  "published",
  "archived",
]);
export const verificationMethod = pgEnum("verification_method", [
  "self_declared",
  "documents_sighted",
  "site_visit",
  "reference_call",
  "third_party_certification",
]);
export const introStage = pgEnum("intro_stage", [
  "received",
  "screening",
  "matched",
  "intro_sent",
  "in_conversation",
  "closed",
]);
export const outcomeType = pgEnum("outcome_type", [
  "sample_order",
  "purchase_order",
  "partnership",
  "funding",
  "no_fit",
  "stalled",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: orgType("type").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const memberships = pgTable("memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  role: text("role").notNull().default("member"),
});

export const enterpriseProfiles = pgTable(
  "enterprise_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id),
    status: contentStatus("status").notNull().default("draft"),
    summary: text("summary").notNull(),
    sector: text("sector").notNull(),
    location: text("location").notNull(),
    founded: integer("founded"),
    headcount: text("headcount"),
    body: text("body").notNull(),
    products: jsonb("products").$type<string[]>().notNull().default([]),
    exportMarkets: jsonb("export_markets").$type<string[]>().notNull().default([]),
    capacity: text("capacity"),
    contactName: text("contact_name"),
    website: text("website"),
    isSample: boolean("is_sample").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("enterprise_status_idx").on(t.status)],
);

export const certifications = pgTable("certifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  evidenceUrl: text("evidence_url"),
});

/** Append only. Never update or delete a row here. */
export const verificationEvents = pgTable("verification_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  method: verificationMethod("method").notNull(),
  checker: text("checker").notNull(),
  checkedAt: timestamp("checked_at", { withTimezone: true }).notNull(),
  note: text("note").notNull(),
  evidenceUrl: text("evidence_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const impactMetrics = pgTable("impact_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  label: text("label").notNull(),
  value: text("value").notNull(),
  source: text("source").notNull(),
  period: text("period").notNull(),
});

export const introRequests = pgTable("intro_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  fromName: text("from_name").notNull(),
  fromEmail: text("from_email").notNull(),
  fromOrganisation: text("from_organisation").notNull(),
  fromCountry: text("from_country").notNull(),
  enterpriseId: uuid("enterprise_id").references(() => organizations.id),
  brief: text("brief").notNull(),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Append only. Current stage = the latest row for a request. */
export const introEvents = pgTable("intro_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestId: uuid("request_id").notNull().references(() => introRequests.id),
  stage: introStage("stage").notNull(),
  actor: text("actor").notNull(),
  note: text("note"),
  nextActionAt: timestamp("next_action_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const outcomes = pgTable("outcomes", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestId: uuid("request_id").notNull().references(() => introRequests.id),
  type: outcomeType("type").notNull(),
  valueMinor: integer("value_minor"),
  currency: text("currency"),
  impactNote: text("impact_note"),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const storiesTable = pgTable("stories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  standfirst: text("standfirst").notNull(),
  kind: text("kind").notNull(),
  body: text("body").notNull(),
  author: text("author").notNull(),
  status: contentStatus("status").notNull().default("draft"),
  isSample: boolean("is_sample").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
});

export const storySubjects = pgTable("story_subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  storyId: uuid("story_id").notNull().references(() => storiesTable.id),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
});

export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  locale: text("locale").notNull().default("en"),
  source: text("source").notNull(),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
});

export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id").notNull(),
  at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
});
