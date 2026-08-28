"use client";

import { useActionState } from "react";
import {
  submitIntroRequest,
  type IntroFormState,
} from "@/app/actions/intro";

const initial: IntroFormState = { status: "idle" };

const field =
  "w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ruby";
const label =
  "block font-mono text-[10.5px] uppercase tracking-[0.11em] text-mute mb-1.5";

export function IntroRequestForm({
  enterpriseName,
}: {
  enterpriseName?: string;
}) {
  const [state, action, pending] = useActionState(
    submitIntroRequest,
    initial,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-line border-l-2 border-l-ruby bg-surface p-6">
        <p className="font-display text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {enterpriseName && (
        <input type="hidden" name="enterprise" value={enterpriseName} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" className={field} required />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-ruby">{state.fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={field}
            required
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-ruby">{state.fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="organisation">
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            className={field}
            required
          />
          {state.fieldErrors?.organisation && (
            <p className="mt-1 text-xs text-ruby">
              {state.fieldErrors.organisation}
            </p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="country">
            Country
          </label>
          <input id="country" name="country" className={field} required />
          {state.fieldErrors?.country && (
            <p className="mt-1 text-xs text-ruby">
              {state.fieldErrors.country}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          What are you looking for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={field}
          placeholder="Volumes, timelines, what would make this worth your while — the more specific, the faster we can tell you whether there is a fit."
          required
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-ruby">{state.fieldErrors.message}</p>
        )}
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-mute">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 accent-ruby"
          required
        />
        <span>
          I agree that Ruby Setu may store these details in order to reply and,
          where relevant, share them with the enterprise concerned. Nothing is
          added to a mailing list without a separate opt-in.
        </span>
      </label>
      {state.fieldErrors?.consent && (
        <p className="-mt-2 text-xs text-ruby">{state.fieldErrors.consent}</p>
      )}

      {state.status === "error" && state.message && (
        <p className="text-sm text-ruby">{state.message}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-sm bg-ruby px-5 py-2.5 text-sm font-medium text-on-ruby transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Sending…" : "Request an introduction"}
        </button>
      </div>
    </form>
  );
}
