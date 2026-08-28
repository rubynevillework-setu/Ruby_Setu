import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnterprise, getStories, getStory } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.standfirst,
    openGraph: {
      type: "article",
      title: story.title,
      description: story.standfirst,
      publishedTime: story.publishedAt,
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const subjects = story.subjects
    .map((s) => getEnterprise(s))
    .filter((e) => e !== undefined);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="border-b border-line py-14">
        <Link
          href="/stories"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute transition-colors hover:text-ink"
        >
          ← Stories
        </Link>
        <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.11em] text-mute">
          {story.kind} · {story.publishedAt} · {story.author}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl">
          {story.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">
          {story.standfirst}
        </p>
      </header>

      <article className="py-12">
        <Markdown source={story.body} />
      </article>

      {subjects.length > 0 && (
        <section className="border-t border-line py-10">
          <h2 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
            Enterprises in this story
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {subjects.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/enterprises/${e.slug}`}
                  className="group inline-flex flex-col"
                >
                  <span className="font-display text-xl group-hover:text-ruby">
                    {e.name}
                  </span>
                  <span className="text-sm text-mute">{e.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
