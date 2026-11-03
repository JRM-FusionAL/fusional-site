import Image from "next/image";
import Link from "next/link";
import ReactDOM from "react-dom";
import { HeroVideo } from "@/components/hero-video";
import { BOOKING_URL } from "@/lib/links";

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
    href: "#contact",
    title: "Scoped implementation",
    tagline: "Build agreed controls after a paid review",
    detail:
      "After a paid audit or review, we quote named changes, prerequisites, acceptance checks, exclusions, and an understandable handoff. MCP implementation starts from $5,000; it is not an automatic next step or a general workflow setup price.",
    image: "/assets/fusional-canvas-hero.webp",
    cta: "After a review",
  },
];

const serviceOffers = [
  {
    title: "Discuss one workflow",
    price: "Scope first",
    terms: "Fit before a quote or payment",
    body: "Tell us what your team is trying to do, where manual work or unreliable output gets in the way, and who owns the process. No MCP setup is required for this conversation. Any new engagement needs its own agreed scope, effort, price, and payment path.",
    href: BOOKING_URL,
    details: "#contact",
    cta: "Discuss your workflow",
  },
  {
    title: "MCP Access Audit",
    price: "$2,500",
    terms: "Five business days after prerequisites · one workflow",
    body: "Only for a live or imminently deployed agent/MCP workflow with a named owner and an access decision to make. Read-only review, permission map, evidence appendix, bounded findings, and a 30-minute walkthrough.",
    href: BOOKING_URL,
    details: "/mcp-access-audit",
    cta: "Check audit fit",
  },
  {
    title: "Agent Ops Retainer",
    price: "$2,000/mo",
    terms: "Monthly · up to 8 total hours",
    body: "Requires a usable existing baseline and recurring changes worth reviewing. Manual review, findings note, calls, and advisory share the eight-hour cap. No continuous monitoring, incident response, or uptime guarantee.",
    href: BOOKING_URL,
    details: "/agent-ops-retainer",
    cta: "Discuss recurring review",
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
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-24 md:pt-40">
          <p className="eyebrow mb-4">Practical AI workflow services</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
            Make one AI workflow work for your team.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            FusionAL starts with your workflow, not a platform purchase.
            We focus first on lower-risk internal work for non-regulated teams:
            understand the problem, agree a bounded outcome, and define the
            review or integration work and handoff needed.
          </p>
          <p className="mt-4 text-sm italic text-paper/50">
            Keep it{" "}
            <span className="text-molten not-italic font-semibold">Flowing</span>{" "}
            while always{" "}
            <span className="text-gold not-italic font-semibold">Knowing</span>.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
            >
              Discuss your workflow
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
          <p className="eyebrow mb-4">Start with fit</p>
          <h2 className="mb-12 max-w-2xl text-3xl font-bold md:text-4xl">
            One real problem. A scope that fits.
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
                    {o.details === "#contact" ? "What to share" : "What’s included"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-paper/60">
            We confirm fit and scope before payment. Lower-risk does not mean
            no privacy, security, contractual, or legal obligations. Email{" "}
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

      <section id="implementation" className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-4">Implementation</p>
        <h2 className="mb-12 max-w-2xl text-3xl font-bold md:text-4xl">
          Implementation follows a paid review and a written scope.
        </h2>
        <div className="grid gap-8">
          {products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group grid overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors hover:border-gold md:grid-cols-2"
            >
              <div className="relative aspect-video min-h-56 overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
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
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="eyebrow mb-4">Specialist policy work and project background</p>
          <p className="max-w-2xl text-sm leading-relaxed text-paper/60">
            The AI Use Policy Review remains a separate $3,500 specialist
            service for smaller regulated operators with staff AI-use questions,
            not the default entry for ordinary workflow work. AIOS and Canvas
            are historical or exploratory projects, not current fixed-price
            enrollment. Agentstack is an open-source configuration tool.
          </p>
          <div className="mt-5 flex flex-wrap gap-5 text-sm">
            <Link href="/ai-policy-review" className="text-gold underline-offset-4 hover:underline">Specialist AI policy review</Link>
            <Link href="/aios" className="text-gold underline-offset-4 hover:underline">AIOS background</Link>
            <Link href="/fusional-canvas" className="text-gold underline-offset-4 hover:underline">Canvas exploration</Link>
            <Link href="/agentstack" className="text-gold underline-offset-4 hover:underline">Agentstack</Link>
            <Link href="/tools" className="text-gold underline-offset-4 hover:underline">Open-source tools</Link>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            What internal workflow would you like to improve?
          </h2>
          <p className="max-w-xl text-paper/70">
            Tell us the task, the tools involved, what is not working, and who
            owns it. Start with a non-sensitive description; do not send
            credentials, customer records, or confidential data. We will discuss
            fit before proposing work. No existing package has to fit every need.
          </p>
          <a
            href="mailto:jrm@fusional.dev"
            className="rounded-full bg-gold px-6 py-3 font-medium text-ink transition-colors hover:bg-molten"
          >
            jrm@fusional.dev
          </a>
          <a href={BOOKING_URL} className="text-gold underline-offset-4 hover:underline">Book a workflow conversation</a>
        </div>
      </section>
    </>
  );
}
