import type { Metadata } from "next";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "FusionAL Canvas — Exploratory Project | FusionAL",
  description:
    "Exploratory architecture-planning concept, not current fixed-price enrollment. Current implementation is separately scoped after a paid audit or review.",
};

const pillars = [
  {
    title: "Plan on a living canvas",
    body: "The concept explores architecture diagrams that people and AI tools could work with together. It is not a promise of a production-ready product.",
  },
  {
    title: "Scope the controls you need",
    body: "Any implementation needs its own agreed tools, permissions, logging, and acceptance checks. Buying a FusionAL gateway or canvas is not a prerequisite for service work.",
  },
  {
    title: "Review the evidence",
    body: "Each engagement defines the systems and actions in scope, then documents the configuration and acceptance checks completed. No claim is made about paths outside that scope.",
  },
];

export default function FusionalCanvas() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src="/assets/fusional-canvas-hero.webp"
          alt=""
          width={1376}
          height={768}
          preload
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="eyebrow mb-4">Exploratory project · updated October 20, 2026</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
            FusionAL Canvas
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            An exploratory architecture-planning concept, not current fixed-price
            enrollment or a required platform purchase. This page preserves
            project background. Earlier pilot terms are not a new-work offer;
            individually agreed legacy terms remain unchanged.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL}
              className="w-fit rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
            >
              Discuss your workflow
            </a>
            <a
              href="mailto:jrm@fusional.dev?subject=FusionAL%20Canvas%20engagement"
              className="w-fit rounded-full border border-paper/30 px-6 py-3 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              Email a question
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title}>
              <h2 className="text-xl font-bold">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-paper/60">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-4">Current services are separate</p>
          <h2 className="max-w-2xl text-3xl font-bold">
            MCP implementation starts from $5,000, after a paid review.
          </h2>
          <p className="mt-4 max-w-xl text-paper/70">
            After a paid audit or review, we agree the specific changes, systems,
            acceptance checks, and handoff in writing. The fee and schedule are
            quoted to that scope; broader platform or compliance outcomes are
            not implied.
          </p>
        </div>
      </section>
    </>
  );
}
