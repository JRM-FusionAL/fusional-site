import type { Metadata } from "next";
import { STRIPE_LINKS, BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "MCP Token Audit | FusionAL",
  description:
    "A one-time audit of your MCP server setup: security posture, tool coverage, governance readiness, and a prioritized hardening plan — delivered as a 1-page report plus a 30-minute walkthrough.",
};

const FINDINGS = [
  {
    label: "Tool-level exposure",
    detail:
      "Which of your MCP tools can read, write, or execute — and whether an agent can reach them without a human in the loop.",
  },
  {
    label: "Auth & secret handling",
    detail:
      "API keys and tokens scoped correctly, or sitting in a config file an agent can read and leak.",
  },
  {
    label: "Governance gaps",
    detail:
      "No audit trail, no approval gate, no policy layer — the three failure modes that turn a useful agent into a liability.",
  },
];

const INCLUDES = [
  "Full read of every MCP server config in your stack",
  "Tool-by-tool risk classification (safe / needs a gate / remove)",
  "Secret and credential exposure check",
  "Prioritized hardening plan, ranked by risk vs. effort",
  "1-page report you can hand to a compliance team",
  "30-minute walkthrough call to go through findings",
];

export default function McpTokenAudit() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[52ch]">
          <p className="eyebrow mb-4">One-time engagement</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            You wired up MCP. Do you know what it can do?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            Most MCP setups grow one server at a time until nobody remembers
            what an agent can actually reach. The Token Audit is a one-time,
            outside look at your stack: what&apos;s exposed, what&apos;s
            ungoverned, and what to fix first.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={STRIPE_LINKS.tokenAudit}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Buy now — $1,500
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              Ask a question first
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/50">
            Delivered within 5 business days of payment. Fixed scope, fixed
            price — no surprise invoice.
          </p>
        </div>

        {/* Terminal block */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-paper/50">mcp-token-audit</span>
          </div>
          <pre className="overflow-x-auto px-6 py-5 font-mono text-sm leading-relaxed">
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">github MCP server: write + delete scope, no approval gate</span>
            {"\n"}
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">stripe MCP server: live secret key readable by any agent process</span>
            {"\n"}
            <span className="text-yellow-400">!  </span>
            <span className="text-paper/80">3 servers with no audit log — actions untraceable after the fact</span>
            {"\n\n"}
            <span className="text-paper/60">Risk summary: </span>
            <span className="font-semibold text-gold">2 critical · 3 medium · 6 low</span>
            {"\n"}
            <span className="text-paper/60">Full report + fix plan delivered as a 1-page PDF</span>
          </pre>
        </div>
      </section>

      {/* What we find */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Three things every MCP stack gets wrong.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The audit isn&apos;t a generic checklist — it&apos;s a read of your
            actual config, your actual tools, and what an agent connected to
            them can actually do.
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
                What&apos;s in the audit.
              </h2>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-paper/60">
                Fixed scope. You send me read access to your MCP configs (no
                write access needed, no code changes on your end), I read
                every server, and you get a report plus a call.
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
                One-time, fixed price. Delivered as a report plus a 30-minute
                walkthrough. No retainer, no upsell required to get value.
              </p>
            </div>
            <a
              href={STRIPE_LINKS.tokenAudit}
              className="inline-flex shrink-0 items-center rounded-full bg-molten px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Buy now
            </a>
          </div>
          <p className="mt-6 text-sm text-paper/50">
            Prefer to talk first?{" "}
            <a href={BOOKING_URL} className="text-gold underline-offset-4 hover:underline">
              Book a free 15-min call
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
