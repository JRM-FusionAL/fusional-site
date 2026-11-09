import { BOOKING_URL } from "@/lib/links";

// Owner-approved list prices, 2026-11-09.
// Scope: Outreach/small-business-ai-2026-10-29/01-offer.md.
export const workflowTiers = [
  {
    title: "Starter Workflow",
    price: "$750",
    terms: "Fixed price · one workflow · up to 2 apps",
    body: "For owner-run shops. One trigger in the tools you already use: summarize an inquiry, draft a response for your review, and record the next step. Includes a test checklist, handoff notes, one revision, and 14 days of defect fixes against the agreed checklist.",
    href: BOOKING_URL,
    cta: "Discuss a Starter build",
  },
  {
    title: "Standard Workflow",
    price: "$1,500",
    terms: "Fixed price · one workflow · up to 3 apps",
    body: "For multi-crew field-service and commercial teams. One workflow that can include your field-service software where it allows it, such as a service request through to a work order. Adds error handling, logging, a two-week stabilization period, and 14 days of defect fixes.",
    href: BOOKING_URL,
    cta: "Discuss a Standard build",
  },
  {
    title: "Care",
    price: "$300/month",
    terms: "Optional · after a FusionAL build",
    body: "Small fixes and adjustments to the workflow I built, up to 2 hours a month with no rollover. New workflows, urgent response, and software fees are not included.",
    href: BOOKING_URL,
    cta: "Ask about Care",
  },
];
