import type { Metadata } from "next";
import { AgentStackEmailForm } from "@/components/agentstack-email-form";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "agentstack-init | FusionAL",
  description:
    "agentstack-init audits your Claude Code or Hermes config for broken MCP wiring, missing CLAUDE.md, and unreachable servers — then gives you a score out of 100.",
};

const CHECKS = [
  {
    label: "CLAUDE.md present",
    detail: "Your harness needs a project-level CLAUDE.md to give the model context.",
  },
  {
    label: "MCP config wired",
    detail: "Are your MCP servers registered in the right config file for your harness?",
  },
  {
    label: "Servers reachable",
    detail: "A config that points at a dead port is worse than no config.",
  },
];

const TIERS = [
  {
    name: "Solo session",
    price: "$750",
    billing: "one-time",
    href: BOOKING_URL,
    blurb:
      "We fix your harness together in a 90-min working session. One harness, one project, everything wired by the time we hang up.",
    features: [
      "Audit run before the call",
      "Live fix session (90 min)",
      "CLAUDE.md + MCP config written for your project",
      "Score rechecked at the end",
    ],
    featured: false,
    cta: "Book a session",
  },
  {
    name: "Team setup",
    price: "from $4,000",
    billing: "one-time",
    href: BOOKING_URL,
    blurb:
      "Full harness rollout for engineering teams. We scope the engagement on a call, then build it out: memory, MCP wiring, CLAUDE.md templates, and handoff docs.",
    features: [
      "Everything in Solo session",
      "Multi-developer harness config",
      "Shared memory and recall setup",
      "Written handoff + team walkthrough",
    ],
    featured: true,
    cta: "Scope a project",
  },
  {
    name: "Retainer",
    price: "$99 / mo",
    billing: "solo · team from $750/mo",
    href: BOOKING_URL,
    blurb:
      "Ongoing harness health. Monthly audit, config updates as your tooling changes, and a standing async channel for harness questions.",
    features: [
      "Monthly audit + score report",
      "Config updates when tools change",
      "Async Q&A (48h response)",
    ],
    featured: false,
    cta: "Start a retainer",
  },
];

export default function AgentStackPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[52ch]">
          <p className="eyebrow mb-4">Free open-source tool</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Your AI harness has a score.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            <code className="font-mono text-paper/90">agentstack-init audit</code> checks
            your Claude Code or Hermes config for broken MCP wiring, missing
            CLAUDE.md, and unreachable servers — then gives you a score out of 100.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Book free 30-min review
            </a>
            <a
              href="https://github.com/JRM-FusionAL/agentstack-init"
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Terminal block */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-paper/50">terminal</span>
          </div>
          <pre className="overflow-x-auto px-6 py-5 font-mono text-sm leading-relaxed">
            <span className="text-paper/50">$ </span>
            <span className="text-paper">pip install agentstack-init</span>
            {"\n"}
            <span className="text-paper/50">$ </span>
            <span className="text-paper">agentstack-init audit</span>
            {"\n\n"}
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">CLAUDE.md not found at project root</span>
            {"\n"}
            <span className="text-paper/50">   Fix: Run agentstack-init init --harness claude_code</span>
            {"\n"}
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">No MCP config at ~/.claude/claude_mcp_settings.json</span>
            {"\n"}
            <span className="text-paper/50">   Fix: Run agentstack-init init --harness claude_code</span>
            {"\n\n"}
            <span className="text-paper/60">Score: </span>
            <span className="font-semibold text-gold">60/100</span>
            {"\n"}
            <span className="text-paper/60">Full report: .fusional/audit-report.json</span>
            {"\n\n"}
            <span className="text-green-400">→ </span>
            <span className="text-paper/80">Book a free 30-min review: agentstack.fyi/audit</span>
          </pre>
        </div>
      </section>

      {/* What it checks */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Three things most harnesses get wrong.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The audit catches the config mistakes that make your AI harness
            unreliable before you waste a week debugging them.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CHECKS.map((check, i) => (
              <div
                key={check.label}
                className="rounded-2xl border border-line bg-ink-2 p-7"
              >
                <p className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-medium">{check.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{check.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section id="audit" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Get a free 30-min harness review.
              </h2>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-paper/60">
                Run the audit yourself. Then book a call and we&apos;ll walk through
                the report together, fix what&apos;s broken, and wire in anything
                that&apos;s missing.
              </p>
              <p className="mt-4 text-sm text-paper/60">
                No pitch. No deck. We look at your config and fix it.
              </p>
            </div>
            <AgentStackEmailForm />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Fix it yourself, or fix it with me.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The CLI is free. Paid tiers are for teams that want the setup done
            right the first time.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-7 ${
                  tier.featured
                    ? "border-gold/50 bg-ink-2"
                    : "border-line bg-ink-2"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">{tier.name}</h3>
                  <div className="text-right">
                    <span className="font-mono text-xl font-semibold leading-none">
                      {tier.price}
                    </span>
                    <p className="mt-0.5 font-mono text-xs text-paper/60">{tier.billing}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-paper/60">{tier.blurb}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[7px] h-px w-3 shrink-0 bg-gold"
                      />
                      <span className="text-paper/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex-1" />
                <a
                  href={tier.href}
                  className={`inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
                    tier.featured
                      ? "bg-molten text-ink hover:bg-molten-deep"
                      : "border border-gold text-gold hover:bg-gold hover:text-ink"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-ink-2 p-7">
            <p className="text-sm text-paper/60">
              <span className="font-medium text-paper">Free tier:</span>{" "}
              <code className="font-mono">pip install agentstack-init</code> and run{" "}
              <code className="font-mono">agentstack-init audit</code> locally. The
              CLI is open source and always will be.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
