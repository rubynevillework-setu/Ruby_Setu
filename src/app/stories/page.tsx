import type { Metadata } from "next";
import Link from "next/link";
import { getStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Case studies, interviews and explainers on working with Nepali social enterprises from Europe.",
};

export default function StoriesPage() {
  const stories = getStories();

  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="border-b border-line py-16">
        <h1 className="font-display text-4xl font-medium tracking-[-0.02em]">
          Stories
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">
          What actually happens when a European buyer and a Nepali producer try
          to work together — including the parts that go wrong.
        </p>
      </header>

      <ul className="pb-8">
        {stories.map((s) => (
          <li key={s.slug} className="border-b border-line last:border-b-0">
            <Link href={`/stories/${s.slug}`} className="group block py-8">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-mute">
                {s.kind} · {s.publishedAt}
              </p>
              <h2 className="mt-2.5 max-w-2xl text-balance font-display text-2xl font-medium leading-snug tracking-[-0.01em] group-hover:text-ruby">
                {s.title}
              </h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-mute">
                {s.standfirst}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
