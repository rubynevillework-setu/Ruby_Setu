"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please give us a name we can address you by."),
  email: z.string().email("That email address does not look right."),
  organisation: z.string().min(2, "Which organisation are you writing from?"),
  country: z.string().min(2, "Which country are you based in?"),
  enterprise: z.string().optional(),
  message: z
    .string()
    .min(30, "Tell us a little more — 30 characters at minimum.")
    .max(4000),
  consent: z.literal("on", {
    errorMap: () => ({ message: "We need your agreement before we can reply." }),
  }),
});

export type IntroFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Phase 1: validate, then either email via Resend or log to the server.
 * Phase 2 replaces the delivery step with an `intro_requests` insert plus an
 * `intro_events` row at stage "received" - see the plan. Keep the validation
 * schema as the single source of truth when that happens.
 */
export async function submitIntroRequest(
  _prev: IntroFormState,
  formData: FormData,
): Promise<IntroFormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  // Trim: an env var set to an empty value must count as "not configured".
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INTRO_NOTIFY_EMAIL?.trim();

  const body = [
    `From: ${data.name} <${data.email}>`,
    `Organisation: ${data.organisation}`,
    `Country: ${data.country}`,
    `Enterprise of interest: ${data.enterprise || "not specified"}`,
    "",
    data.message,
  ].join("\n");

  if (apiKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Resend rejects a From address on an unverified domain. Until a
          // domain is verified, its shared sender works and delivers to your
          // own inbox. Set INTRO_FROM_EMAIL once rubysetu.org is verified.
          from:
            process.env.INTRO_FROM_EMAIL?.trim() ||
            "Ruby Setu <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `Introduction request — ${data.organisation}`,
          text: body,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } catch (error) {
      console.error("[intro] delivery failed", error);
      return {
        status: "error",
        message:
          "We could not send that just now. Please email us directly and we will pick it up.",
      };
    }
  } else {
    // No mail configured. Warn loudly rather than info: on a hosted platform
    // this line is the ONLY record of a request that a real person just sent,
    // and it expires with the log retention window.
    console.warn(
      "[intro] MAIL NOT CONFIGURED - request received but not delivered:\n" +
        body,
    );
  }

  return {
    status: "success",
    message:
      "Thank you — we have it. Expect a reply within two working days, from a person.",
  };
}
