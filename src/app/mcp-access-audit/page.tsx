import type { Metadata } from "next";
import { STRIPE_LINKS, BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "MCP Access Audit | FusionAL",
  description:
    "A five-business-day, read-only review of one agreed AI workflow: a one-page executive summary, permission map, evidence appendix, observed risks and limits, and a 30-minute walkthrough.",
};

const LOOKS_AT = [
  {
    label: "What each credential authorises",
    detail:
      "At server, tool, and parameter level: what the inspected configuration shows each credential can do, within the agreed workflow.",
  },
  {
    label: "Scope against the task",
    detail:
      "Whether the permissions we can inspect appear broader than the agreed workflow requires, with each observation tied to its evidence and limits.",
  },
  {
    label: "What the audit trail can answer",
    detail:
      "What the agreed log sources can show about identity, permission, and action, including attribution or retention limits.",
  },
];

const INCLUDES = [
  "Permission map for one agreed workflow: what each credential authorises, at server, tool, and parameter level",
  "One-page executive summary plus a supporting permissions and evidence appendix",
  "Evidence-backed observations, including observed access-control gaps, client-reported statements, and items that were not observable",
  "Prioritized actions tied to the evidence, plus a 30-minute findings walkthrough",
];

const EXCLUDED = [
  "Penetration testing or exploit development",
  "Remediation work (implementation is a separate engagement, from $5,000)",
  "Vendor selection",
  "Runtime assurance, production attack testing, or a guarantee of completeness or security",
];

export default function McpAccessAudit() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[54ch]">
          <p className="eyebrow mb-4">Five business days · read-only</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            An independent look at what your agents can reach.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            The MCP Access Audit reviews one workflow you choose, where an AI
            agent or MCP tool touches your systems. It maps what the agreed
            evidence shows each credential can reach, then records observed
            gaps, limitations, and what remains unverified. The review is
            read-only and does not assume a problem before examining evidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={STRIPE_LINKS.accessAudit}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Start the audit — $2,500
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Ask a question first
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/50">
            Five business days start after the workflow, inventory limits, and
            required evidence are agreed and available. If the inventory
            exceeds an agreed limit, we pause and agree any revised scope,
            schedule, and fee before expanding the review. After payment you go
            straight to booking the kickoff call.{" "}
            <a href="/mcp-access-audit-scope.pdf" className="text-gold underline-offset-4 hover:underline">
              Download the scope overview
            </a>
            .
          </p>
        </div>
      </section>

      {/* What it looks at */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            What the audit looks at.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            Bounded to one agreed workflow, environment, inventory, and
            evidence period. The review is read-only; no configuration is
            changed.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LOOKS_AT.map((f, i) => (
              <div key={f.label} className="rounded-2xl border border-line bg-ink-2 p-7">
                <p className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-medium">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{f.detail}</p>
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
              <p className="eyebrow">MCP Access Audit</p>
              <p className="mt-2 font-mono text-4xl font-bold text-gold">$2,500</p>
              <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-paper/60">
                Fixed price, five business days after agreed access is
                available, one workflow. Card or ACH at
                checkout, with an invoice emailed automatically, or ask for an
                invoice instead.
              </p>
            </div>
            <a
              href={STRIPE_LINKS.accessAudit}
              className="inline-flex shrink-0 items-center rounded-full bg-molten px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Start the audit
            </a>
          </div>
          <p className="mt-6 text-sm text-paper/50">
            Already live and want it kept honest? See the{" "}
            <a href="/agent-ops-retainer" className="text-gold underline-offset-4 hover:underline">
              Agent Ops Retainer
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
