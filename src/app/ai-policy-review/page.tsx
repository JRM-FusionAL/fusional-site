import type { Metadata } from "next";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "AI Use Policy Review | FusionAL",
  description:
    "A $3,500 specialist review of staff AI use for smaller regulated operators: policy, settings checklist, walkthrough, staff briefing, and findings record. Confirm fit and prerequisites before payment.",
};

const FOR = [
  "Law firms, medical and dental practices, insurance agencies, and financial advisers",
  "Staff are already using AI assistants, or asking whether they can",
  "Nobody has written down what is acceptable to put into them",
];

const INCLUDES = [
  "A written acceptable-use policy, scoped at kickoff as a new draft or revision of an existing policy",
  "A tool-specific configuration and settings checklist, tied to the product and subscription details we can verify",
  "A guided walkthrough of the checklist and findings",
  "A one-page staff briefing, written to be read in five minutes",
  "A findings record for management approval, including review limits and questions for the client’s compliance owner or counsel",
];

const EXCLUDED = [
  "Legal certification or legal advice. Questions for your compliance owner or counsel are flagged, not guessed.",
  "Any guarantee of regulatory compliance",
  "Subscriptions or tool licences",
  "Implementation work",
  "Guarantees about how a vendor retains your data",
];

export default function AiUsePolicyReview() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[54ch]">
          <p className="eyebrow mb-4">Specialist service · smaller regulated operators</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Clear rules for how your staff use AI.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            Set clear rules for the AI tools your staff use or are considering.
            At kickoff, we agree whether to draft a policy or revise an
            existing one, the covered tool inventory, and a named client
            owner. The review ties rules and settings findings to product and
            subscription details we can verify. The client approves and adopts
            the policy; this is not legal advice or certification.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Discuss the review — $3,500
            </a>
            <a
              href="mailto:jrm@fusional.dev"
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Email a question
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/50">
            Five business days start after the covered tools, policy owner,
            inputs, and draft-versus-revision scope are agreed and available.
            We confirm fit and written scope before arranging payment.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Built for smaller regulated operators.
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

      {/* What's included / excluded */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                What you get.
              </h2>
              <ul className="mt-6 space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-gold" />
                    <span className="text-paper/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Not included.
              </h2>
              <ul className="mt-6 space-y-3">
                {EXCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-paper/30" />
                    <span className="text-paper/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-gold/50 bg-ink-2 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">AI Use Policy Review</p>
              <p className="mt-2 font-mono text-4xl font-bold text-gold">$3,500</p>
              <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-paper/60">
                Fixed price, five business days after agreed prerequisites are
                complete. This specialist policy service is not the default
                starting point for a general internal-workflow discussion.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              className="inline-flex shrink-0 items-center rounded-full bg-molten px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Discuss the review
            </a>
          </div>
          <p className="mt-6 text-sm text-paper/50">
            Questions first?{" "}
            <a href={BOOKING_URL} className="text-gold underline-offset-4 hover:underline">
              Book a call
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
