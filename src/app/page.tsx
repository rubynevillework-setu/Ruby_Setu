import Link from "next/link";
import { getFeaturedEnterprises, getStories } from "@/lib/content";
import { tierOf } from "@/lib/verification";
import { TierBadge } from "@/components/tier-badge";

export default function HomePage() {
  const featured = getFeaturedEnterprises(3);
  const latestStory = getStories()[0];

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Thesis */}
      <section className="border-b border-line py-20 sm:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          Kathmandu → Europe
        </p>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-6xl">
          You can find a Nepali social enterprise in an afternoon. Verifying one
          takes <span className="text-ruby">three months</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
          Ruby Setu does that part. Every enterprise here has been checked —
          registration sighted, premises visited, references called — and every
          introduction is made by a person who has stood in the workshop.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/enterprises"
            className="rounded-sm bg-ruby px-5 py-2.5 text-sm font-medium text-on-ruby transition-opacity hover:opacity-90"
          >
            See the enterprises
          </Link>
          <Link
            href="/about#verification"
            className="text-sm text-mute underline underline-offset-4 transition-colors hover:text-ink"
          >
            How verification works
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="border-b border-line py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
            Verified enterprises
          </h2>
          <Link
            href="/enterprises"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute transition-colors hover:text-ink"
          >
            All →
          </Link>
        </div>

        <ul className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {featured.map((e) => (
            <li key={e.slug} className="bg-surface">
              <Link
                href={`/enterprises/${e.slug}`}
                className="group flex h-full flex-col gap-3 p-5"
              >
                <TierBadge tier={tierOf(e)} />
                <h3 className="font-display text-lg font-medium leading-snug group-hover:text-ruby">
                  {e.name}
                </h3>
                <p className="text-sm leading-relaxed text-mute">{e.summary}</p>
                <p className="mt-auto pt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mute">
                  {e.sector}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Proof point */}
      <section className="border-b border-line py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-medium tracking-[-0.01em]">
            The paperwork is smaller than you have been told
          </h2>
          <p className="mt-4 leading-relaxed text-mute">
            After the 2026 Omnibus package, EU sustainability reporting rules
            apply only to companies above 1,000 employees and €450m turnover, and
            due diligence rules only above 5,000 employees and €1.5bn — deferred
            to 2029, with an explicit cap on what may be demanded of small
            suppliers. For most buyers, working with a 140-person collective in
            Kavre is a commercial decision, not a compliance project.
          </p>
          {latestStory && (
            <Link
              href={`/stories/${latestStory.slug}`}
              className="mt-5 inline-block text-sm text-ruby underline underline-offset-4"
            >
              Read the long version
            </Link>
          )}
        </div>
      </section>

      {/* Action */}
      <section className="py-16">
        <h2 className="max-w-xl text-balance font-display text-2xl font-medium tracking-[-0.01em]">
          Tell us what you are looking for and we will tell you honestly whether
          it exists here.
        </h2>
        <Link
          href="/about#introductions"
          className="mt-6 inline-block rounded-sm border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-ruby hover:text-ruby"
        >
          Request an introduction
        </Link>
      </section>
    </div>
  );
}
