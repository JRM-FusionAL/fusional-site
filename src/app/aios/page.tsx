import type { Metadata } from "next";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "AIOS — Historical Project | FusionAL",
  description:
    "Historical AIOS setup concept: cadence, memory, routines, and guardrails. Not current fixed-price enrollment; discuss a workflow before agreeing new work.",
};

const concepts = [
  { name: "Cadence", body: "The AIOS concept explored routines around recurring work rather than isolated prompts." },
  { name: "Memory", body: "Project context and documented decisions were part of the setup approach." },
  { name: "Guardrails", body: "Tool access, review boundaries, and human approval still need to be defined for each actual workflow." },
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
          <p className="eyebrow mb-4">Historical project · updated October 20, 2026</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
            AIOS: a setup concept for recurring work.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            This page preserves the earlier AIOS concept, not current fixed-price
            enrollment. The former template and setup tiers are not the default
            way to start with FusionAL. Individually agreed legacy terms remain
            unchanged; new work begins with a workflow conversation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {concepts.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-line bg-ink-2 p-8"
            >
              <p className="eyebrow">{t.name}</p>
              <p className="mt-4 leading-relaxed text-paper/60">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={BOOKING_URL}
            className="inline-block rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
          >
            Discuss your current workflow
          </a>
        </div>
      </section>
    </>
  );
}
