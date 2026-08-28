import { hasSampleContent } from "@/lib/content";

/**
 * The seeded enterprises and stories are illustrative placeholders, not real
 * organisations. This banner stays visible until every sample record has been
 * replaced with a verified profile, so nothing invented is ever mistaken for
 * a real, checked enterprise. Delete the component once `isSample` is gone.
 */
export function SampleDataBanner() {
  if (!hasSampleContent()) return null;

  return (
    <div className="border-b border-brass/30 bg-brass-soft">
      <p className="mx-auto max-w-5xl px-6 py-2 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-brass">
        Demo content — the enterprises and stories below are illustrative
        placeholders, not real organisations, and nothing here has been verified.
      </p>
    </div>
  );
}
