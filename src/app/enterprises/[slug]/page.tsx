import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnterprise, getEnterprises, getStoriesAbout } from "@/lib/content";
import { Markdown } from "@/lib/markdown";
import {
  TIER_DESCRIPTIONS,
  isCertificationCurrent,
  isIntroducible,
  tierOf,
} from "@/lib/verification";
import { TierBadge } from "@/components/tier-badge";
import { IntroRequestForm } from "@/components/intro-request-form";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getEnterprises().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const enterprise = getEnterprise(slug);
  if (!enterprise) return {};
  return {
    title: enterprise.name,
    description: enterprise.summary,
    openGraph: { title: enterprise.name, description: enterprise.summary },
  };
}

const METHOD_LABELS: Record<string, string> = {
  self_declared: "Self-declared",
  documents_sighted: "Documents sighted",
  site_visit: "Site visit",
  reference_call: "Reference call",
  third_party_certification: "Certification on file",
};

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line-soft py-3 last:border-b-0">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-mute">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

export default async function EnterprisePage({ params }: Props) {
  const { slug } = await params;
  const enterprise = getEnterprise(slug);
  if (!enterprise) notFound();

  const tier = tierOf(enterprise);
  const stories = getStoriesAbout(enterprise.slug);
  const introducible = isIntroducible(enterprise);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="border-b border-line py-14">
        <Link
          href="/enterprises"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute transition-colors hover:text-ink"
        >
          ← Enterprises
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-medium tracking-[-0.02em]">
            {enterprise.name}
          </h1>
          <TierBadge tier={tier} />
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
          {enterprise.summary}
        </p>
      </header>

      <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <article>
          <Markdown source={enterprise.body} />

          {enterprise.impact.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
                Impact
              </h2>
              <p className="mt-2 text-sm text-mute">
                Figures the enterprise reports, with the source of each one. We
                publish the source so you can weigh the number yourself.
              </p>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                {enterprise.impact.map((m) => (
                  <div key={m.label} className="bg-surface p-4">
                    <dd className="font-display text-3xl font-medium tracking-[-0.02em] text-ruby">
                      {m.value}
                    </dd>
                    <dt className="mt-1 text-sm leading-snug">{m.label}</dt>
                    <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-mute">
                      {m.source} · {m.period}
                    </p>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="mt-12">
            <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
              What we checked
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
              {TIER_DESCRIPTIONS[tier]}
            </p>
            <ol className="mt-5 overflow-hidden rounded-sm border border-line">
              {enterprise.verification.map((v) => (
                <li
                  key={v.id}
                  className="border-b border-line-soft bg-surface p-4 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-indigo">
                      {METHOD_LABELS[v.method] ?? v.method}
                    </span>
                    <span className="font-mono text-[10.5px] text-mute">
                      {v.checkedAt} · {v.checker}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{v.note}</p>
                </li>
              ))}
            </ol>
            {!introducible && (
              <p className="mt-4 max-w-xl rounded-sm border border-line border-l-2 border-l-brass bg-surface p-4 text-sm leading-relaxed">
                <strong>Not yet open to brokered introductions.</strong> We only
                broker introductions to enterprises we have visited in person and
                referenced twice. This profile has not reached that bar, and we
                would rather say so than let you find out later.
              </p>
            )}
          </section>

          {stories.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
                Stories
              </h2>
              <ul className="mt-4">
                {stories.map((s) => (
                  <li key={s.slug} className="border-t border-line py-4">
                    <Link href={`/stories/${s.slug}`} className="group block">
                      <h3 className="font-display text-lg group-hover:text-ruby">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-mute">{s.standfirst}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-sm border border-line bg-surface p-5">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
              At a glance
            </h2>
            <dl className="mt-2">
              <Fact label="Sector" value={enterprise.sector} />
              <Fact label="Location" value={enterprise.location} />
              <Fact label="Founded" value={String(enterprise.founded)} />
              <Fact label="People" value={enterprise.headcount} />
              <Fact label="Products" value={enterprise.products.join(", ")} />
              <Fact
                label="Export markets"
                value={
                  enterprise.exportMarkets.length > 0
                    ? enterprise.exportMarkets.join(", ")
                    : "None yet — first-time exporter"
                }
              />
              <Fact label="Capacity" value={enterprise.capacity} />
              <Fact label="Contact" value={enterprise.contactName} />
            </dl>
          </div>

          <div className="mt-4 rounded-sm border border-line bg-surface p-5">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
              Certification
            </h2>
            {enterprise.certifications.length === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-mute">
                None held. That is not a mark against them — certification costs
                money most small producers do not have — but it does mean our own
                checks are the only evidence here.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {enterprise.certifications.map((c) => {
                  const current = isCertificationCurrent(c);
                  return (
                    <li key={c.name} className="text-sm leading-snug">
                      <span className="font-medium">{c.name}</span>
                      <span className="mt-0.5 block text-mute">{c.issuer}</span>
                      <span
                        className={`mt-1 block font-mono text-[10.5px] uppercase tracking-[0.1em] ${
                          current ? "text-brass" : "text-ruby"
                        }`}
                      >
                        {current ? `Valid to ${c.expiresAt}` : `Expired ${c.expiresAt}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {introducible && (
        <section
          id="introduction"
          className="border-t border-line py-14 scroll-mt-8"
        >
          <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
            Request an introduction to {enterprise.name}
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-mute">
            We read every request ourselves and only pass on the ones we think
            are a real fit — for both sides. If we do not think it is, we will
            tell you why.
          </p>
          <div className="mt-7 max-w-2xl">
            <IntroRequestForm enterpriseName={enterprise.name} />
          </div>
        </section>
      )}
    </div>
  );
}
