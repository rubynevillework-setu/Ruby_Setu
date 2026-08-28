import type { Certification, Enterprise, Tier, VerificationEvent } from "./types";

export const TIER_LABELS: Record<Tier, string> = {
  T0: "Self-declared",
  T1: "Registered",
  T2: "Visited",
  T3: "Certified",
};

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  T0: "The enterprise filled in its own profile. Nothing has been independently checked, so it is not published.",
  T1: "Company registration, tax number and where relevant an export licence have been sighted and recorded.",
  T2: "Someone from Ruby Setu visited the premises and spoke to at least two references, one of them a previous buyer.",
  T3: "Independent third-party certification is on file, with expiry dates tracked.",
};

export function isCertificationCurrent(
  cert: Certification,
  now: Date = new Date(),
): boolean {
  return new Date(cert.expiresAt).getTime() > now.getTime();
}

/**
 * Derive the current tier from the event log. Never store a tier directly -
 * if the evidence goes stale the badge must go down on its own.
 */
export function deriveTier(
  events: VerificationEvent[],
  certifications: Certification[],
  now: Date = new Date(),
): Tier {
  const methods = new Set(events.map((e) => e.method));
  const hasCurrentCert = certifications.some((c) =>
    isCertificationCurrent(c, now),
  );

  const visited =
    methods.has("site_visit") &&
    events.filter((e) => e.method === "reference_call").length >= 2;

  if (hasCurrentCert && visited) return "T3";
  if (visited) return "T2";
  if (methods.has("documents_sighted")) return "T1";
  return "T0";
}

export function tierOf(enterprise: Enterprise, now: Date = new Date()): Tier {
  return deriveTier(enterprise.verification, enterprise.certifications, now);
}

/** Only T2 and above may receive a brokered introduction. */
export function isIntroducible(enterprise: Enterprise): boolean {
  const tier = tierOf(enterprise);
  return tier === "T2" || tier === "T3";
}

/** Certificates within 60 days of expiry need chasing. */
export function expiringSoon(
  enterprise: Enterprise,
  now: Date = new Date(),
): Certification[] {
  const horizon = now.getTime() + 60 * 24 * 60 * 60 * 1000;
  return enterprise.certifications.filter((c) => {
    const t = new Date(c.expiresAt).getTime();
    return t > now.getTime() && t <= horizon;
  });
}
