import type { Metadata } from "next";
import Image from "next/image";
import { STRIPE_LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "AIOS Setup Service | FusionAL",
  description:
    "Done-for-you Claude Code AI operating systems for solopreneurs and small teams.",
};

const tiers = [
  {
    name: "DIY Template",
    price: "$97",
    href: STRIPE_LINKS.aiosTemplate,
    cta: "Get the template",
    body: "The AIOS template repo: cadence, routines, memory system, and guardrails, documented for self-install on Claude Code.",
  },
  {
    name: "Guided Setup",
    price: "$497",
    href: STRIPE_LINKS.aiosGuided,
    cta: "Get guided setup",
    body: "Template plus a working session: installed on your machine, tuned to your business, first routines live before we hang up.",
  },
  {
    name: "White Glove",
    price: "$1,497",
    href: STRIPE_LINKS.aiosWhiteGlove,
    cta: "Get white-glove",
    body: "Full build-out: custom routines, integrations with your calendar, comms and task stack, and 30 days of iteration support.",
  },
];

export default function AIOS() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src="/assets/aios-hero.webp"
          alt=""
          width={1376}
          height={768}
          preload
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="eyebrow mb-4">For solo operators & small teams</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
            An AI operating system, installed for you.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            Stop prompting from scratch. Get a Claude Code setup with cadence,
            memory, routines, and guardrails that runs your day with you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-line bg-ink-2 p-8"
            >
              <p className="eyebrow">{t.name}</p>
              <p className="mt-3 font-display text-4xl font-bold text-gold">
                {t.price}
              </p>
              <p className="mt-4 leading-relaxed text-paper/60">{t.body}</p>
              <a
                href={t.href}
                className="mt-6 inline-block rounded-full border border-paper/30 px-5 py-2.5 text-center text-sm font-medium transition-colors hover:border-gold hover:text-gold"
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:jrm@fusional.dev?subject=AIOS%20setup"
            className="inline-block rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
          >
            Not sure which? Ask me
          </a>
        </div>
      </section>
    </>
  );
}
