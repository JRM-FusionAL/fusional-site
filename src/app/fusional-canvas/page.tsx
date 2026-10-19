import type { Metadata } from "next";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "FusionAL Canvas — Scoped Architecture Planning | FusionAL",
  description:
    "Collaborative architecture planning and separately scoped implementation work for agreed AI access controls.",
};

const pillars = [
  {
    title: "Plan on a living canvas",
    body: "Architecture diagrams that AI can read, extend, and critique — collaboratively, in real time, with your team in the loop.",
  },
  {
    title: "Scope the controls you need",
    body: "A scoped implementation can configure selected tool permissions and logging through the FusionAL gateway. Coverage depends on the agreed tools, configuration, and evidence available for review.",
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
          <p className="eyebrow mb-4">For regulated industries</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
            FusionAL Canvas
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            A collaborative architecture planning canvas that can support
            scoped implementation work after an audit or review.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL}
              className="w-fit rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
            >
              Scope implementation
            </a>
            <a
              href="mailto:jrm@fusional.dev?subject=FusionAL%20Canvas%20engagement"
              className="w-fit rounded-full border border-paper/30 px-6 py-3 font-medium transition-colors hover:border-gold hover:text-gold"
            >
              Book a scoping call
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
          <p className="eyebrow mb-4">Engagements</p>
          <h2 className="max-w-2xl text-3xl font-bold">
            Implementation engagements start from $5,000.
          </h2>
          <p className="mt-4 max-w-xl text-paper/70">
            After an audit or review, we agree the specific changes, systems,
            acceptance checks, and handoff in writing. The fee and schedule are
            quoted to that scope; broader platform or compliance outcomes are
            not implied.
          </p>
        </div>
      </section>
    </>
  );
}
