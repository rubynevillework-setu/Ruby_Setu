import { TIER_DESCRIPTIONS, TIER_LABELS } from "@/lib/verification";
import type { Tier } from "@/lib/types";

const styles: Record<Tier, string> = {
  T0: "bg-surface-2 text-mute",
  T1: "bg-surface-2 text-mute",
  T2: "bg-indigo-soft text-indigo",
  T3: "bg-brass-soft text-brass",
};

export function TierBadge({
  tier,
  showLabel = true,
}: {
  tier: Tier;
  showLabel?: boolean;
}) {
  return (
    <span
      title={TIER_DESCRIPTIONS[tier]}
      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.09em] ${styles[tier]}`}
    >
      <span>{tier}</span>
      {showLabel && <span>{TIER_LABELS[tier]}</span>}
    </span>
  );
}
