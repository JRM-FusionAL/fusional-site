import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Source | FusionAL",
  description:
    "Open-source tooling from the FusionAL stack: agentstack-init, FusionAL-Recall, mcp-consulting-kit, and more.",
};

const repos = [
  {
    name: "agentstack-init",
    desc: "Audit and bootstrap AI agent stacks — detects MCP configs, CLI versions, and drift. On PyPI.",
    href: "/agentstack",
    secondaryHref: "https://pypi.org/project/agentstack-init/",
    secondaryLabel: "View on PyPI",
  },
  {
    name: "FusionAL",
    desc: "Self-hosted MCP governance gateway for regulated environments. FastAPI, Docker, policy-enforced tool calls.",
    href: "https://github.com/JRM-FusionAL",
  },
  {
    name: "FusionAL-Recall",
    desc: "MCP server for semantic search over a solved-issues registry. sqlite-vec + sentence-transformers.",
    href: "https://github.com/JRM-FusionAL",
  },
  {
    name: "mcp-consulting-kit",
    desc: "A curated MCP server collection for consulting deployments, Dockerized and ready to govern.",
    href: "https://github.com/JRM-FusionAL",
  },
];

export default function Tools() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow mb-4">Open source</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
        Built in the open, hardened on our own stack.
      </h1>
      <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-2xl border border-line">
        <Image
          src="/assets/tools-gates.webp"
          alt=""
          fill
          preload
          sizes="(min-width: 1152px) 1104px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {repos.map((r) => (
          <div
            key={r.name}
            className="group rounded-2xl border border-line bg-ink-2 p-8 transition-colors hover:border-gold"
          >
            <Link href={r.href} className="block">
              <h2 className="font-display text-xl font-bold group-hover:text-gold">
                {r.name}
              </h2>
              <p className="mt-3 leading-relaxed text-paper/60">{r.desc}</p>
            </Link>
            {r.secondaryHref && (
              <a
                href={r.secondaryHref}
                className="mt-4 inline-block text-sm text-paper/50 underline hover:text-gold"
              >
                {r.secondaryLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
