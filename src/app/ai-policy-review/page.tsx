import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Previous AI Policy Service | FusionAL",
  description:
    "The previous AI Use Policy Review is no longer offered for new engagements. Explore current AI workflow review and integration services.",
  robots: { index: false, follow: true },
};

export default function PreviousAiPolicyService() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="eyebrow mb-4">Previous service</p>
      <h1 className="max-w-3xl text-4xl font-bold md:text-5xl">
        The AI Use Policy Review is no longer offered for new engagements.
      </h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-paper/70">
        FusionAL now focuses on practical AI workflow review and integration
        for small software teams, starting with one lower-risk internal task.
        Individually agreed legacy terms remain unchanged.
      </p>
      <Link
        href="/#offers"
        className="mt-8 inline-block rounded-full bg-molten px-6 py-3 font-medium text-ink transition-colors hover:bg-gold"
      >
        Explore current services
      </Link>
    </section>
  );
}
