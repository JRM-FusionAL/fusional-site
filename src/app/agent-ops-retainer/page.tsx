import type { Metadata } from "next";
import { STRIPE_LINKS, BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Agent Ops Retainer | FusionAL",
  description:
    "A $2,000/month review that keeps live AI agent and MCP permissions honest: new tools and credentials checked against an agreed baseline, a permission drift check, and one written findings note each month.",
};

const MONTHLY = [
  "Review of new tools, servers, and credentials added since last month",
  "Permission drift check against the baseline agreed at kickoff",
  "One written findings note each month",
  "Priority scheduling, with up to 8 hours of advisory work",
];

const EXCLUDED = [
  "New implementation work",
  "On-call incident response",
  "Managed hosting or uptime guarantees",
];

export default function AgentOpsRetainer() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[54ch]">
          <p className="eyebrow mb-4">Monthly</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Keep your agents&apos; permissions honest after launch.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            Once a workflow is live, the risk is drift: a tool added, a
            credential widened, a server nobody remembers approving. The Agent
            Ops Retainer checks what changed each month against a baseline you
            agree at the start, and tells you in writing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={STRIPE_LINKS.agentOpsRetainer}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Start the retainer — $2,000/mo
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Ask a question first
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/50">
            After subscribing you go straight to booking the kickoff call, where
            we agree the baseline for the monthly review.
          </p>
        </div>
      </section>

      {/* Monthly / excluded */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Every month.
              </h2>
              <ul className="mt-6 space-y-3">
                {MONTHLY.map((item) => (
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
              <p className="mt-6 text-sm text-paper/60">
                Scope only changes by agreeing a new monthly scope in writing,
                so the retainer never turns into an open-ended promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-gold/50 bg-ink-2 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">Agent Ops Retainer</p>
              <p className="mt-2 font-mono text-4xl font-bold text-gold">$2,000<span className="text-xl text-paper/60">/month</span></p>
              <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-paper/60">
                Billed monthly. Best after an{" "}
                <a href="/mcp-access-audit" className="text-gold underline-offset-4 hover:underline">
                  MCP Access Audit
                </a>
                , which sets the baseline the monthly review checks against.
              </p>
            </div>
            <a
              href={STRIPE_LINKS.agentOpsRetainer}
              className="inline-flex shrink-0 items-center rounded-full bg-molten px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Start the retainer
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
