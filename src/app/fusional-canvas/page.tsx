import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FusionAL Canvas — Governed Architecture Planning | FusionAL",
  description:
    "Claude-native collaborative architecture planning with FusionAL governance for regulated industries.",
};

const pillars = [
  {
    title: "Plan on a living canvas",
    body: "Architecture diagrams that AI can read, extend, and critique — collaboratively, in real time, with your team in the loop.",
  },
  {
    title: "Every action goes through the gate",
    body: "The FusionAL governance gateway sits between the AI and your systems: policy enforcement, audit logs, and tool-level permissions on every call.",
  },
  {
    title: "Self-hosted for compliance",
    body: "Deploy inside your perimeter. Nothing leaves your environment that policy doesn't allow — built for healthcare, finance, and legal.",
  },
];

export default function FusionalCanvas() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image
          src="/assets/fusional-canvas-hero.png"
          alt=""
          width={1376}
          height={768}
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="eyebrow mb-4">For regulated industries</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
            FusionAL Canvas
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            A collaborative architecture planning canvas where every AI action
            is governed, logged, and yours to audit.
          </p>
          <a
            href="mailto:jrm@fusional.dev?subject=FusionAL%20Canvas%20engagement"
            className="mt-10 w-fit rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
          >
            Book a scoping call
          </a>
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
            Pilot deployments from $3K. Full governed rollouts to $15K.
          </h2>
          <p className="mt-4 max-w-xl text-paper/70">
            Scoping call → governed pilot in your environment → production
            rollout with your compliance team signed off at every stage.
          </p>
        </div>
      </section>
    </>
  );
}
