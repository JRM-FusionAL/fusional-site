// Booking link for scoping calls (Cal.com, Calendly, etc.).
export const BOOKING_URL = "https://calendly.com/jonathanmelton004";

export const CONTACT_EMAIL = "jrm@fusional.dev";

// Live Stripe Payment Links. URLs are copied from the Stripe API, not typed by
// hand: a one-character slip in a buy.stripe.com path serves "page not found".
export const STRIPE_LINKS = {
  // Repriced offers, 2026-09-27 (Outreach/offer-sheet-2026-09-27.md).
  accessAudit: "https://buy.stripe.com/8x25kC3QE8qWgOt2d533W05", // $2,500 one-time
  aiUsePolicy: "https://buy.stripe.com/dRmbJ00EsePk69PeZR33W06", // $3,500 one-time
  agentOpsRetainer: "https://buy.stripe.com/aFabJ05YM8qW2XD19133W07", // $2,000 / month
  // Workflow tiers, created 2026-11-10. Sent after scope is agreed on a call;
  // site buttons still go to booking first.
  starterWorkflow: "https://buy.stripe.com/28EfZg2MAgXs69P8Bt33W08", // $750 one-time
  standardWorkflow: "https://buy.stripe.com/7sY8wObj66iOfKpeZR33W09", // $1,500 one-time
  care: "https://buy.stripe.com/3cI5kC4UIgXscydaJB33W0a", // $300 / month
  // AIOS ($97/$497/$1,497) and Canvas consulting ($3,000) links were
  // deactivated in Stripe on 2026-11-10.
  // The $1,500 MCP Token Audit link stays live in Stripe for prospects quoted
  // that price before the reprice, but is no longer offered on the site:
  // https://buy.stripe.com/00w4gycnagXs2XDeZR33W03
} as const;
