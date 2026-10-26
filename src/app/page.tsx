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
    href: "/mcp-access-audit",
    title: "MCP Access Audit",
    tagline: "$2,500 · one existing agent/MCP workflow",
    detail:
      "For teams with a live or imminently deployed agent/MCP workflow and a named owner. A read-only access review, permission map, evidence, findings, and walkthrough. Five business days after agreed prerequisites.",
    image: "/assets/fusional-canvas-hero.webp",
    cta: "Specialist access review",
  },
];

const serviceOffers = [
  {
    title: "Review one workflow",
    price: "Understand it",
    terms: "A defined problem and practical next steps",
    body: "Walk through the task, tools, inputs, and current workaround. Identify where manual effort or unreliable AI output gets in the way, what needs human review, and what a useful result would look like. No MCP setup is required for this conversation.",
    href: BOOKING_URL,
    details: "#contact",
    cta: "Discuss your workflow",
  },
  {
    title: "Scoped integration",
    price: "Connect it",
    terms: "Agreed scope and price before work begins",
    body: "Connect the tools needed for one internal workflow. Agree the inputs, access, approval steps, acceptance checks, and exclusions before building. Get a walkthrough and written handoff your team can use. Each engagement has its own agreed scope, effort, price, and payment path.",
    href: BOOKING_URL,
    details: "#contact",
    cta: "Discuss an integration",
  },
  {
    title: "Ongoing workflow review",
    price: "Keep it useful",
    terms: "For an existing workflow with recurring changes",
    body: "Review changes to tools, access, and workflow behavior against an existing baseline. Agree the review cadence and limits around actual recurring work. The existing Agent Ops Retainer is $2,000/month for up to eight total hours of manual review, calls, and advisory.",
    href: BOOKING_URL,
    details: "/agent-ops-retainer",
    cta: "Discuss ongoing review",
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
            Practical AI workflow review and integration for small software teams.
            Start with one internal task: preparing a weekly report, finding
            information in team documents, or drafting an internal update.
            Agree what it should do, check the result, and give your team a
            clear handoff.
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
            We confirm fit and scope before payment. Start with lower-risk
            internal work, with clear data boundaries and human approval for
            consequential actions. Email{" "}
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
        <p className="eyebrow mb-4">Already using MCP?</p>
        <h2 className="mb-12 max-w-2xl text-3xl font-bold md:text-4xl">
          A focused access review when your workflow needs it.
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
          <p className="eyebrow mb-4">Tools and project background</p>
          <p className="max-w-2xl text-sm leading-relaxed text-paper/60">
            MCP is relevant when your workflow uses it. After a paid audit or
            review, MCP implementation starts from $5,000 under a separate
            written scope. General workflow work is quoted individually.
            AIOS and Canvas are historical or exploratory projects.
            Agentstack is an open-source configuration tool.
          </p>
          <div className="mt-5 flex flex-wrap gap-5 text-sm">
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
            fit, agree the outcome and acceptance checks, and quote the work.
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
