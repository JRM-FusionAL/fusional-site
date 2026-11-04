import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "AI Implementation for Small Businesses | FusionAL",
  description:
    "Put AI to work on one recurring business task. Start with inquiry summaries, response drafts for human review, and a clear next step in your existing tools. Scope and quote agreed first.",
};

const steps = [
  ["Understand the task", "Walk through a recent inquiry, your current response process, the tools involved, and where work gets repeated. Decide whether AI adds anything useful."],
  ["Agree the work", "Choose one source, one kind of inquiry, one draft for review, and one place to record the next step. Agree the price, access, timing, and acceptance checks in writing."],
  ["Build and check", "Configure the workflow in agreed accounts. Test ordinary requests, missing details, duplicates, and tool failures. A person reviews and approves each customer message."],
  ["Hand it over", "Get a walkthrough, written operating instructions, a review checklist, and a way to pause the workflow. Your team knows who owns the next step."],
];

export default function SmallBusinessAI() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="eyebrow mb-4">AI implementation for small businesses</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Put one recurring task to work with AI.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">I help small businesses set up useful AI workflows in the tools they already use. A practical place to start is the work between a customer inquiry and a clear next step.</p>
        <p className="mt-4 max-w-2xl text-paper/65">AI can summarize the request and prepare a response. Your team checks it, approves the message, and stays responsible for what happens next.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={BOOKING_URL} className="rounded-full bg-molten px-6 py-3 font-semibold text-ink hover:bg-gold">Discuss one task</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-full border border-gold px-6 py-3 text-gold">Email Jonathan</a>
        </div>
        <p className="mt-5 max-w-xl text-sm text-paper/55">Scope and a fixed project quote come before payment. Software subscriptions and any ongoing support are agreed separately. Timing is confirmed after the tools, access, and examples are understood.</p>
      </section>

      <section className="border-y border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow mb-4">An example to discuss</p>
          <h2 className="max-w-2xl text-3xl font-bold">From an inquiry to a response you can review.</h2>
          <p className="mt-4 max-w-2xl text-paper/65">Illustrative cleaning-business example. This is a fictional walkthrough, not a customer result or a live AI demonstration.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-line bg-ink-2 p-7">
              <p className="eyebrow text-gold">1. Customer request</p>
              <p className="mt-4 text-paper/80">“Do you offer recurring cleaning for a two-bedroom home? What information do you need for an estimate?”</p>
            </article>
            <article className="rounded-2xl border border-line bg-ink-2 p-7">
              <p className="eyebrow text-gold">2. Draft for review</p>
              <p className="mt-4 text-paper/80">“Thanks for getting in touch. What area is the home in, and how often would you like cleaning? Our team will review those details before confirming an estimate.”</p>
              <p className="mt-4 text-sm text-paper/55">Based on an agreed response guide. It does not invent a price or confirm availability.</p>
            </article>
            <article className="rounded-2xl border border-line bg-ink-2 p-7">
              <p className="eyebrow text-gold">3. Owner’s next step</p>
              <p className="mt-4 text-paper/80">Review the request and draft. Edit or reject it. Approve the final message, then confirm who owns the follow-up in the agreed tracker.</p>
            </article>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-paper/60">Your actual workflow depends on the tools you use and what they support. If a simple rule or standard template does the job better, I will say so.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold">What the engagement includes.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {steps.map(([title, body], index) => (
            <article key={title} className="rounded-2xl border border-line p-7">
              <p className="font-mono text-sm text-gold">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-paper/65">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 max-w-3xl space-y-4 text-paper/65">
          <p>The first engagement covers one agreed workflow, a written test record, and a handoff. Extra tools, additional workflows, and ongoing support require a separate scope.</p>
          <p>Customer messages require human approval. The first workflow does not make payments, commit to prices or appointments, or make clinical, legal, financial, or employment decisions.</p>
          <p>There is no guaranteed sales increase or time-saving claim. We agree what to measure, check the result, and compare it with your existing process.</p>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-2xl text-3xl font-bold">Show me the work your team keeps repeating.</h2>
          <p className="mt-5 max-w-2xl text-paper/65">Start with a description of the task, the tools, and the person who handles it. Please do not send credentials, customer records, or confidential data. We will agree how to share any examples safely.</p>
          <a href={BOOKING_URL} className="mt-7 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink hover:bg-molten">Book a workflow conversation</a>
          <p className="mt-6 text-sm text-paper/55">Already running agents or MCP? The <Link href="/mcp-access-audit" className="text-gold underline">specialist MCP Access Audit</Link> remains a separate service.</p>
        </div>
      </section>
    </>
  );
}
