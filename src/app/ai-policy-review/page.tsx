import type { Metadata } from "next";
import { AI_POLICY_CHECKOUT, BOOKING_URL, aiPolicyCta, aiPolicyHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "AI Policy Review | FusionAL",
  description:
    "A one-week, fixed-price review for small regulated practices: a written AI acceptable-use policy, a settings checklist for the tools you already use, a one-page staff briefing, and a findings record.",
};

const FOR = [
  "Law firms, medical and dental practices, insurance agencies, and financial advisers",
  "Staff are starting to use AI tools, or asking whether they can",
  "Nobody has written down what is and isn't allowed with client information",
];

const INCLUDES = [
  "A written acceptable-use policy for the AI workflows we review: what staff may do, what they may paste in, and which tools and settings are acceptable",
  "A checklist and guided walkthrough of the privacy and data settings available on the tools and plans you already have",
  "A one-page staff briefing, written to be read in five minutes",
  "A findings record: the settings we observed, the limits we found, and recommended next steps",
];

const NOT_INCLUDED = [
  "New subscriptions, migrations, or setting up new tools. Those are separate.",
  "Legal advice. Questions that need your compliance owner or counsel are flagged for them, not guessed.",
  "Any guarantee of compliance, or of how a vendor handles your data on every plan. We record what was verified and what wasn't.",
];

export default function AiPolicyReview() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[54ch]">
          <p className="eyebrow mb-4">One week · fixed price</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Clear rules for how your staff use AI with client information.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            When someone reaches for an AI tool to summarize a record or draft
            a letter, what are they allowed to paste in, which tools and
            settings are acceptable, and who decides? The AI Policy Review
            answers that in writing, for the tools you already use.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={aiPolicyHref}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              {aiPolicyCta("Start the review — $750")}
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Ask a question first
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/50">
            One week, starting once we have agreed the list of tools and you
            can show the relevant settings.{" "}
            {AI_POLICY_CHECKOUT
              ? "After payment you go straight to booking the kickoff call."
              : "Book a short call to confirm scope; payment is by invoice."}
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Built for small regulated practices.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {FOR.map((f, i) => (
              <div key={f} className="rounded-2xl border border-line bg-ink-2 p-7">
                <p className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/80">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                What you get.
              </h2>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-paper/60">
                We agree which tools and workflows to cover, you show me their
                settings, and by the end of the week your staff have written
                guidance and a short briefing they will actually read.
              </p>
            </div>
            <ul className="space-y-3">
              {INCLUDES.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-gold" />
                  <span className="text-paper/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 max-w-2xl">
            <h3 className="font-display text-xl font-semibold">Not included</h3>
            <ul className="mt-4 space-y-3">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-paper/30" />
                  <span className="text-paper/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-gold/50 bg-ink-2 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">AI Policy Review</p>
              <p className="mt-2 font-mono text-4xl font-bold text-gold">$750</p>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-paper/60">
                {AI_POLICY_CHECKOUT
                  ? "Fixed price, one week. Card or ACH at checkout, with an invoice emailed automatically, or ask for an invoice instead."
                  : "Fixed price, one week. Paid by invoice once the scope is confirmed."}
              </p>
            </div>
            <a
              href={aiPolicyHref}
              className="inline-flex shrink-0 items-center rounded-full bg-molten px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              {aiPolicyCta("Start the review")}
            </a>
          </div>
          <p className="mt-6 text-sm text-paper/50">
            Running AI agents against regulated systems instead? See the{" "}
            <a href="/mcp-token-audit" className="text-gold underline-offset-4 hover:underline">
              MCP Token Audit
            </a>
            . Questions:{" "}
            <a href={BOOKING_URL} className="text-gold underline-offset-4 hover:underline">
              book a call
            </a>{" "}
            or email{" "}
            <a href="mailto:jrm@fusional.dev" className="text-gold underline-offset-4 hover:underline">
              jrm@fusional.dev
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
