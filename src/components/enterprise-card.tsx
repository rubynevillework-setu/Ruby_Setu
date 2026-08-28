import Link from "next/link";
import type { Enterprise } from "@/lib/types";
import { tierOf } from "@/lib/verification";
import { TierBadge } from "./tier-badge";

export function EnterpriseCard({ enterprise }: { enterprise: Enterprise }) {
  return (
    <li className="border-b border-line last:border-b-0">
      <Link
        href={`/enterprises/${enterprise.slug}`}
        className="group block py-7 transition-colors"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-xl font-medium tracking-[-0.01em] group-hover:text-ruby">
            {enterprise.name}
          </h3>
          <TierBadge tier={tierOf(enterprise)} />
        </div>
        <p className="mt-2 max-w-2xl leading-relaxed text-mute">
          {enterprise.summary}
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
          {enterprise.sector} · {enterprise.location}
        </p>
      </Link>
    </li>
  );
}
