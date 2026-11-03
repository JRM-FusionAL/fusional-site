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
              Discuss your workflow
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
            <span className="ml-3 font-mono text-xs text-paper/50">illustrative output · not a security assessment</span>
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
            <span className="text-paper/80">Discuss next steps with FusionAL</span>
          </pre>
        </div>
      </section>

      {/* What it checks */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            What the audit checks.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The CLI checks the listed configuration conditions and reports
            what it can inspect locally. Its score is a configuration aid, not
            a security assessment or a guarantee that a harness will work.
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
                Ask about your harness or workflow.
              </h2>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-paper/60">
                Run the audit yourself and tell us what you need help with.
                We confirm fit before proposing paid work. Configuration changes
                depend on access and a separately agreed scope.
              </p>
              <p className="mt-4 text-sm text-paper/60">
                Send only non-sensitive context. Do not send credentials or
                confidential records. A request is not a booked engagement.
              </p>
            </div>
            <AgentStackEmailForm />
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Tool first, service only if it fits.</h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The CLI is open source. Earlier paid harness tiers are historical,
            not current fixed-price enrollment. Individually agreed legacy terms
            remain unchanged. New assistance needs a named problem, agreed scope,
            prerequisites, acceptance checks, handoff, and a separate quote.
          </p>
          <a href={BOOKING_URL} className="mt-6 inline-block text-gold underline-offset-4 hover:underline">Discuss your workflow</a>
        </div>
      </section>
    </>
  );
}
