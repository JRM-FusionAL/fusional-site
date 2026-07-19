import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Writing | FusionAL",
  description: "Essays and build logs from the FusionAL stack.",
};

const posts = [
  {
    title: "9 Seconds. One AI Agent. A Wiped Production Database.",
    desc: "What ungoverned agent access costs — and the gateway pattern that prevents it.",
    href: "https://dev.to/jonathanmeltonfusional/-9-seconds-one-ai-agent-a-wiped-production-database-4i7a",
  },
  {
    title: "I Gave Gemma 4 150 Tools on Windows. Here's What Actually Happened.",
    desc: "Stress-testing a local model against a full MCP tool surface.",
    href: "https://dev.to/jonathanmeltonfusional/i-gave-gemma-4-150-tools-on-windows-heres-what-actually-happened-1njg",
  },
  {
    title:
      "I Had Claude Build Me a Full AI Marketing Department — Here's Exactly How I Did It",
    desc: "The AIOS pattern applied to marketing: routines, memory, and cadence on Claude Code.",
    href: "https://dev.to/jonathanmeltonfusional/i-had-claude-build-me-a-full-ai-marketing-department-heres-exactly-how-i-did-it-f3",
  },
  {
    title:
      "Why Your MCP Setup Keeps Timing Out in 60 Seconds (And How I Fixed It on Windows)",
    desc: "A debugging build log from the governance-gateway trenches.",
    href: "https://dev.to/jonathanmeltonfusional/why-your-mcp-setup-keeps-timing-out-in-60-seconds-and-how-i-fixed-it-on-windows-367a",
  },
];

export default function Writing() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow mb-4">Writing</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
        Build logs from the governed-AI trenches.
      </h1>
      <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-2xl border border-line">
        <Image
          src="/assets/writing-portal.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="mt-16 flex flex-col gap-6">
        {posts.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-b border-line pb-6 transition-colors"
          >
            <h2 className="font-display text-2xl font-bold group-hover:text-gold">
              {p.title}
            </h2>
            <p className="mt-2 max-w-xl text-paper/60">{p.desc}</p>
          </a>
        ))}
      </div>
      <a
        href="https://dev.to/jonathanmeltonfusional"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-block rounded-full border border-gold px-6 py-3 text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        All posts on dev.to
      </a>
    </section>
  );
}
