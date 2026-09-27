import type { Metadata } from "next";
import { STRIPE_LINKS, BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "MCP Token Audit | FusionAL",
  description:
    "A five-day, fixed-price review of one workflow where AI agents or MCP tools reach regulated data: a permissions map, documented risks, and a prioritized RBAC and audit-trail remediation plan, walked through on a readout call.",
};

const FINDINGS = [
  {
    label: "Borrowed identity",
    detail:
      "The agent runs on a person's key or a shared service account, so the audit log records the wrong actor for everything it does.",
  },
  {
    label: "Scope wider than the task",
    detail:
      "A token that only needs to read one record can write, delete, or reach every customer, and nothing stops an agent from using it.",
  },
  {
    label: "An audit trail that can't answer",
    detail:
      "When someone asks who authorized an action and what it touched, the logs can't separate what the agent did from what a person did.",
  },
];

const INCLUDES = [
  "Permissions map: every identity, token and scope the agreed workflow uses, and what each can reach against what the task needs",
  "Documented risks: each gap in plain language, rated by likelihood and impact, with the evidence behind it",
  "Prioritized remediation plan: specific RBAC and audit-trail changes, ordered so the first few close the largest exposure",
  "Readout call: we walk through the findings with your team and agree the order of fixes",
];

const DAYS = [
  ["Day 1", "Kickoff call. Agree the workflow, the systems in scope, and the access needed."],
  ["Days 2–3", "Map identities, tokens and scopes; trace what the workflow can reach and what gets logged."],
  ["Day 4", "Write up the risks and the remediation plan."],
  ["Day 5", "Readout call and delivery of the written report."],
];

const NOT_INCLUDED = [
  "Implementing the fixes. That's a separate conversation after the readout.",
  "Penetration testing, a compliance certification, or any guarantee of a regulatory outcome.",
  "Workflows beyond the one agreed.",
];

export default function McpTokenAudit() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[52ch]">
          <p className="eyebrow mb-4">Five days · fixed price</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Your agents have access. Do you know how much?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            Agents usually get working access first and scoped access later.
            The MCP Token Audit takes one real workflow where an agent or MCP
            tool reaches regulated data and shows how far apart those two are:
            which identity it acts as, what it can actually reach, and whether
            you could prove afterwards what it did.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={STRIPE_LINKS.tokenAudit}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Start the audit — $1,500
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Ask a question first
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/50">
            Five days, starting once the workflow and access are agreed on the
            kickoff call. Fixed scope, fixed price. After payment you go
            straight to booking the kickoff.{" "}
            <a href="/mcp-token-audit-scope.pdf" className="text-gold underline-offset-4 hover:underline">
              Download the one-page scope
            </a>
            .
          </p>
        </div>

        {/* Terminal block: an illustration of the format, not a real engagement */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-paper/50">mcp-token-audit · example findings</span>
          </div>
          <pre className="overflow-x-auto px-6 py-5 font-mono text-sm leading-relaxed">
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">agent acts under a developer&apos;s API key: actions logged as that person</span>
            {"\n"}
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">token can write to every account; task only reads one</span>
            {"\n"}
            <span className="text-yellow-400">!  </span>
            <span className="text-paper/80">no record separating agent actions from human approvals</span>
            {"\n\n"}
            <span className="text-paper/60">Delivered: </span>
            <span className="font-semibold text-gold">permissions map · documented risks · remediation plan</span>
            {"\n"}
            <span className="text-paper/60">Then a readout call to agree the order of fixes</span>
          </pre>
        </div>
      </section>

      {/* What we look for */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Where agent access usually drifts.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            It isn&apos;t a generic checklist. It&apos;s a read of one real
            workflow: its configuration, its tokens, and what an agent
            connected to it can actually do.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {FINDINGS.map((f, i) => (
              <div key={f.label} className="rounded-2xl border border-line bg-ink-2 p-7">
                <p className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-medium">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{f.detail}</p>
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
                We pick one workflow together on the kickoff call. You give
                read access to its configuration (MCP and client config,
                token and role definitions, relevant logs), or walk me through
                it on a screen-share. Nothing changes on your side, and no
                production data is copied out.
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

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-semibold">Five days</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {DAYS.map(([day, what]) => (
                  <div key={day} className="flex gap-4">
                    <dt className="w-20 shrink-0 font-mono text-gold">{day}</dt>
                    <dd className="text-paper/80">{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
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
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-gold/50 bg-ink-2 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">MCP Token Audit</p>
              <p className="mt-2 font-mono text-4xl font-bold text-gold">$1,500</p>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-paper/60">
                Fixed price, five days, one workflow. Card or ACH at checkout,
                with an invoice emailed automatically, or ask for an invoice
                instead. No retainer.
              </p>
            </div>
            <a
              href={STRIPE_LINKS.tokenAudit}
              className="inline-flex shrink-0 items-center rounded-full bg-molten px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Start the audit
            </a>
          </div>
          <p className="mt-6 text-sm text-paper/50">
            Prefer to talk first?{" "}
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
