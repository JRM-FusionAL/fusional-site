import Image from "next/image";
import Link from "next/link";
import { STRIPE_LINKS } from "@/lib/links";

const products = [
  {
    href: "/fusional-canvas",
    title: "FusionAL Canvas",
    tagline: "Architecture planning canvas with built-in AI governance",
    detail:
      "Claude-native collaborative planning for regulated industries. Every AI action passes through a FusionAL governance gateway — auditable, policy-enforced, self-hosted.",
    image: "/assets/fusional-canvas-hero.png",
    cta: "For regulated teams",
  },
  {
    href: "/aios",
    title: "AIOS Setup Service",
    tagline: "A done-for-you AI operating system on Claude Code",
    detail:
      "Cadence, routines, memory, and guardrails — installed and tuned for solopreneurs and small teams. From a $97 DIY template to full white-glove setup.",
    image: "/assets/aios-hero.png",
    cta: "For solo operators",
  },
  {
    href: "/tools",
    title: "Open Source",
    tagline: "The tooling behind it all, in the open",
    detail:
      "agentstack-init, FusionAL-Recall, mcp-consulting-kit, and the FusionAL governance gateway. Battle-tested on our own stack first.",
    image: "/assets/tools-gates.png",
    cta: "On GitHub",
  },
];

const serviceOffers = [
  {
    title: "MCP Token Audit",
    price: "$1,500",
    body: "One-time audit of your MCP server setup: security posture, tool coverage, governance readiness, and a prioritized hardening plan in a 1-page report.",
    href: STRIPE_LINKS.tokenAudit,
    cta: "Buy now",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-fusional.png"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        >
          <source src="/assets/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40">
          <p className="eyebrow mb-4">Governed AI infrastructure</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
            AI that passes through the gate.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            FusionAL builds governance gateways, planning tools, and operating
            systems that let regulated teams and solo operators run AI with
            confidence — self-hosted, auditable, yours.
          </p>
          <p className="mt-4 text-sm italic text-paper/50">
            Keep it{" "}
            <span className="text-molten not-italic font-semibold">Flowing</span>{" "}
            while always{" "}
            <span className="text-gold not-italic font-semibold">Knowing</span>.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/fusional-canvas"
              className="rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
            >
              Explore FusionAL Canvas
            </Link>
            <Link
              href="/aios"
              className="rounded-full border border-paper/30 px-6 py-3 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              Get an AIOS
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-4">What we build</p>
        <h2 className="mb-16 max-w-2xl text-3xl font-bold md:text-4xl">
          Two products, one governed stack.
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors hover:border-gold"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="eyebrow mb-2">{p.cta}</p>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-1 text-sm font-medium text-paper/70">
                  {p.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">
                  {p.detail}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-4">Fastest way in</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-line bg-ink-2 p-8">
              <p className="text-sm font-medium text-paper/70">MCP Token Audit</p>
              <p className="mt-2 font-display text-4xl font-bold text-gold">
                $1,500
              </p>
              <p className="mt-4 flex-1 leading-relaxed text-paper/60">
                One-time audit of your MCP server setup: security posture, tool
                coverage, governance readiness, and a prioritized hardening plan
                in a 1-page report. A low-risk first engagement that earns trust
                for a bigger build.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={STRIPE_LINKS.tokenAudit}
                  className="inline-block rounded-full bg-molten px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-molten-deep"
                >
                  Buy now
                </a>
                <Link
                  href="/mcp-token-audit"
                  className="inline-block rounded-full border border-paper/30 px-6 py-3 text-center text-sm font-medium transition-colors hover:border-gold hover:text-gold"
                >
                  What&apos;s included
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-line bg-ink-2 p-8">
              <p className="eyebrow">Prefer to talk first?</p>
              <p className="mt-3 leading-relaxed text-paper/70">
                Most engagements start with a scoping call. Share what you're
                running and I'll map the path — audit, pilot, or full rollout.
              </p>
              <a
                href="mailto:jrm@fusional.dev"
                className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-center font-medium text-ink transition-colors hover:bg-molten"
              >
                jrm@fusional.dev
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            Running AI in a regulated environment — or drowning solo?
          </h2>
          <p className="max-w-xl text-paper/70">
            Engagements from $97 templates to $15K governed deployments. One
            builder, no handoffs.
          </p>
          <a
            href="mailto:jrm@fusional.dev"
            className="rounded-full bg-gold px-6 py-3 font-medium text-ink transition-colors hover:bg-molten"
          >
            jrm@fusional.dev
          </a>
        </div>
      </section>
    </>
  );
}
