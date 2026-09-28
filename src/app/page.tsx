import Image from "next/image";
import Link from "next/link";
import ReactDOM from "react-dom";
import { HeroVideo } from "@/components/hero-video";
import { BOOKING_URL, STRIPE_LINKS } from "@/lib/links";

const HERO_WIDTHS = [960, 1440, 1920, 2560];

const HERO_STILL = {
  avif: HERO_WIDTHS.map((w) => `/assets/hero-still-${w}.avif ${w}w`).join(", "),
  webp: HERO_WIDTHS.map((w) => `/assets/hero-still-${w}.webp ${w}w`).join(", "),
};

const HERO_SIZES = "100vw";

// The hero still is the LCP element, but it lives in a <picture> in the body —
// nothing in <head> points at it, so the browser cannot start it until it has
// parsed past every preload the framework put there first. This hoists it into
// <head> ahead of that work. `type` makes the hint self-cancelling: a browser
// without AVIF ignores the whole link rather than fetching bytes it cannot
// decode, and falls through to the <source> chain below. The srcSet/sizes must
// stay byte-identical to the AVIF <source> or the browser fetches twice.
function preloadHeroStill() {
  ReactDOM.preload(`/assets/hero-still-1440.avif`, {
    as: "image",
    type: "image/avif",
    imageSrcSet: HERO_STILL.avif,
    imageSizes: HERO_SIZES,
    fetchPriority: "high",
  });
}

const products = [
  {
    href: "/fusional-canvas",
    title: "FusionAL Canvas",
    tagline: "Architecture planning canvas with built-in AI governance",
    detail:
      "Claude-native collaborative planning for regulated industries. Every AI action passes through a FusionAL governance gateway — auditable, policy-enforced, self-hosted.",
    image: "/assets/fusional-canvas-hero.webp",
    cta: "For regulated teams",
  },
  {
    href: "/aios",
    title: "AIOS Setup Service",
    tagline: "A done-for-you AI operating system on Claude Code",
    detail:
      "Cadence, routines, memory, and guardrails — installed and tuned for solopreneurs and small teams. From a $97 DIY template to full white-glove setup.",
    image: "/assets/aios-hero.webp",
    cta: "For solo operators",
  },
  {
    href: "/tools",
    title: "Open Source",
    tagline: "The tooling behind it all, in the open",
    detail:
      "agentstack-init, FusionAL-Recall, mcp-consulting-kit, and the FusionAL governance gateway. Battle-tested on our own stack first.",
    image: "/assets/tools-gates.webp",
    cta: "On GitHub",
  },
];

const serviceOffers = [
  {
    title: "MCP Access Audit",
    price: "$2,500",
    terms: "Five business days · one workflow",
    body: "For teams with AI agents or MCP tools touching their systems. A read-only permission map of one agreed workflow, observed risks and limitations, and prioritized RBAC and audit-trail actions, with a 30-minute walkthrough.",
    href: STRIPE_LINKS.accessAudit,
    details: "/mcp-access-audit",
    cta: "Start the audit",
  },
  {
    title: "AI Use Policy Review",
    price: "$3,500",
    terms: "Five business days · fixed price",
    body: "For smaller regulated practices whose staff use AI assistants. A written acceptable-use policy, a settings checklist and walkthrough, a one-page staff briefing, and a findings record.",
    href: STRIPE_LINKS.aiUsePolicy,
    details: "/ai-policy-review",
    cta: "Start the review",
  },
  {
    title: "Agent Ops Retainer",
    price: "$2,000/mo",
    terms: "Monthly · up to 8 advisory hours",
    body: "For live workflows that need to stay honest. New tools and credentials checked against an agreed baseline, a permission drift check, and one written findings note each month.",
    href: STRIPE_LINKS.agentOpsRetainer,
    details: "/agent-ops-retainer",
    cta: "Start the retainer",
  },
];

export default function Home() {
  preloadHeroStill();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-70">
          <picture>
            <source
              type="image/avif"
              sizes={HERO_SIZES}
              srcSet={HERO_STILL.avif}
            />
            <source
              type="image/webp"
              sizes={HERO_SIZES}
              srcSet={HERO_STILL.webp}
            />
            <img
              src="/assets/hero-still-1440.jpg"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          <HeroVideo />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40">
          <p className="eyebrow mb-4">AI access, reviewed</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
            Know what your AI can reach.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            FusionAL reviews how AI agents and tools get access to your
            systems, writes the rules your staff follow, and keeps permissions
            honest after launch. Fixed scope, read-only, and no platform to
            buy.
          </p>
          <p className="mt-4 text-sm italic text-paper/50">
            Keep it{" "}
            <span className="text-molten not-italic font-semibold">Flowing</span>{" "}
            while always{" "}
            <span className="text-gold not-italic font-semibold">Knowing</span>.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/mcp-access-audit"
              className="rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
            >
              MCP Access Audit · $2,500
            </Link>
            <a
              href="#offers"
              className="rounded-full border border-paper/30 px-6 py-3 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              See how to start
            </a>
          </div>
        </div>
      </section>

      <section id="offers" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-4">Fastest way in</p>
          <h2 className="mb-12 max-w-2xl text-3xl font-bold md:text-4xl">
            Three ways to work together. Scoped, then priced.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {serviceOffers.map((o) => (
              <div key={o.title} className="flex flex-col rounded-2xl border border-line bg-ink-2 p-8">
                <p className="text-sm font-medium text-paper/70">{o.title}</p>
                <p className="mt-2 font-display text-4xl font-bold text-gold">{o.price}</p>
                <p className="mt-1 font-mono text-xs text-paper/50">{o.terms}</p>
                <p className="mt-4 flex-1 leading-relaxed text-paper/60">{o.body}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={o.href}
                    className="inline-block rounded-full bg-molten px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-molten-deep"
                  >
                    {o.cta}
                  </a>
                  <Link
                    href={o.details}
                    className="inline-block rounded-full border border-paper/30 px-6 py-3 text-center text-sm font-medium transition-colors hover:border-gold hover:text-gold"
                  >
                    What&apos;s included
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-paper/60">
            Implementation work starts from $5,000 and is scoped only after an
            audit or review. Prefer to talk first? Email{" "}
            <a href="mailto:jrm@fusional.dev" className="text-gold underline-offset-4 hover:underline">
              jrm@fusional.dev
            </a>{" "}
            or{" "}
            <a href={BOOKING_URL} className="text-gold underline-offset-4 hover:underline">
              book a call
            </a>
            .
          </p>
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
                  sizes="(min-width: 1152px) 362px, (min-width: 768px) 33vw, 100vw"
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
