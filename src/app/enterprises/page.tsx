import type { Metadata } from "next";
import { getEnterprises, getSectors } from "@/lib/content";
import { EnterpriseCard } from "@/components/enterprise-card";

export const metadata: Metadata = {
  title: "Enterprises",
  description:
    "Verified social enterprises in Nepal, open to European partners. Every profile states what was checked, when, and by whom.",
};

export default function EnterprisesPage() {
  const enterprises = getEnterprises();
  const sectors = getSectors();

  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="border-b border-line py-16">
        <h1 className="font-display text-4xl font-medium tracking-[-0.02em]">
          Enterprises
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">
          {enterprises.length} enterprises, each one visited or documented before
          it appeared here. The badge on every profile says exactly how far the
          checking went — and where it stopped.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
          {sectors.map((s) => (
            <span key={s} className="rounded-sm bg-surface-2 px-2 py-1">
              {s}
            </span>
          ))}
        </p>
      </header>

      <ul className="pb-8">
        {enterprises.map((e) => (
          <EnterpriseCard key={e.slug} enterprise={e} />
        ))}
      </ul>
    </div>
  );
}
