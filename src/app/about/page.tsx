import type { Metadata } from "next";
import { IntroRequestForm } from "@/components/intro-request-form";
import { TierBadge } from "@/components/tier-badge";
import { TIER_DESCRIPTIONS, TIER_LABELS } from "@/lib/verification";
import type { Tier } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who runs Ruby Setu, how enterprises are verified, and how to request an introduction.",
};

const TIERS: Tier[] = ["T0", "T1", "T2", "T3"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="border-b border-line py-16">
        <h1 className="font-display text-4xl font-medium tracking-[-0.02em]">
          About
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">
          Ruby Setu is a bridge — <em>setu</em> — between social enterprises in
          Nepal and the European companies and networks that want to work with
          them. It is run by one person, deliberately.
        </p>
      </header>

      {/* --- Who --- */}
      <section className="border-b border-line py-14">
        <div className="prose-setu">
          <h2>Who is behind this</h2>
          {/*
            TODO (Sanjog): replace the three paragraphs below with your own
            words. Keep it first-person and specific - who you are, why Nepal,
            why Europe, and what gives you the standing to vouch for anyone.
            This page does more persuading than any other on the site, and
            generic founder copy is worse than none.
          */}
          <p>
            <strong>[Draft — replace with your own words.]</strong> I am Sanjog.
            I grew up in Nepal and spent [X years] working in [field], which is
            where I saw the same thing happen repeatedly: a European buyer and a
            Nepali producer who would have been good for each other never met,
            because neither could afford the cost of finding out.
          </p>
          <p>
            [Say what you have done that makes you credible here — the companies
            you have worked with, the enterprises you already know, the
            introductions you have already made by hand.]
          </p>
          <p>
            [Say plainly how Ruby Setu sustains itself, and whether enterprises
            or partners pay anything. European buyers will look for this, and
            not finding it costs more trust than any answer would.]
          </p>
        </div>
      </section>

      {/* --- Verification --- */}
      <section id="verification" className="border-b border-line py-14 scroll-mt-8">
        <div className="prose-setu">
          <h2>How we verify</h2>
          <p>
            Anyone can publish a directory. The only thing that makes a listing
            worth your time is knowing precisely what was checked, when, by whom
            — and what was not.
          </p>
          <p>
            Every enterprise carries a tier. Tiers are cumulative and dated, and
            they are derived from a log of individual checks rather than set by
            hand, so a certificate that lapses drops the badge on its own. Each
            profile shows the full log, including the awkward entries.
          </p>
        </div>

        <ul className="mt-8 overflow-hidden rounded-sm border border-line">
          {TIERS.map((tier) => (
            <li
              key={tier}
              className="grid gap-3 border-b border-line-soft bg-surface p-5 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)]"
            >
              <div>
                <TierBadge tier={tier} showLabel={false} />
                <p className="mt-2 text-sm font-medium">{TIER_LABELS[tier]}</p>
              </div>
              <p className="text-sm leading-relaxed text-mute">
                {TIER_DESCRIPTIONS[tier]}
              </p>
            </li>
          ))}
        </ul>

        <div className="prose-setu mt-8">
          <h3>Three things we will not do</h3>
          <ul>
            <li>
              Publish an enterprise at T0. If nothing has been independently
              checked, it does not appear.
            </li>
            <li>
              Broker an introduction below T2. We introduce you only to
              enterprises we have visited in person and referenced twice.
            </li>
            <li>
              Hide a gap. If an enterprise has no export licence, no
              certification, or a buyer who did not come back, the profile says
              so.
            </li>
          </ul>
          <p>
            Verification is re-run annually. A badge with a stale date is worse
            than no badge, so if you ever see one, tell us.
          </p>
        </div>
      </section>

      {/* --- Paperwork --- */}
      <section className="border-b border-line py-14">
        <div className="prose-setu">
          <h2>What working with a Nepali enterprise actually requires of you</h2>
          <p>
            Less than you have probably been told. After the 2026 Omnibus
            package, EU sustainability reporting obligations start at 1,000
            employees and €450m turnover, and due diligence obligations at 5,000
            employees and €1.5bn — the latter deferred to July 2029. Both now cap
            what an in-scope company may demand from smaller suppliers.
          </p>
          <p>
            If you are below those thresholds, neither directive places a direct
            obligation on you. If you are above them, a supplier of this size is
            explicitly protected from the full reporting burden. Either way, the
            real question is not regulatory — it is whether the supplier is who
            they say they are. That is the question this site answers.
          </p>
          <p>
            None of the above is legal advice. Confirm your own position with
            your advisers rather than taking our word for it.
          </p>
        </div>
      </section>

      {/* --- Introductions --- */}
      <section id="introductions" className="py-14 scroll-mt-8">
        <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
          Request an introduction
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-mute">
          Tell us what you are looking for. We read every request ourselves,
          reply within two working days, and say no when there is no fit — which
          is most of the value.
        </p>
        <div className="mt-8 max-w-2xl">
          <IntroRequestForm />
        </div>
      </section>
    </div>
  );
}
