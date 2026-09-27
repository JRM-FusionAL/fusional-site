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
  aiosTemplate: "https://buy.stripe.com/7sY4gyevi22y41HcRJ33W00",
  aiosGuided: "https://buy.stripe.com/28E8wO2MA4aGaq5bNF33W02",
  aiosWhiteGlove: "https://buy.stripe.com/14A9AScnafTo7dT04X33W01",
  canvasConsulting: "https://buy.stripe.com/bJeaEWbj6cHc7dT3h933W04",
  // The $1,500 MCP Token Audit link stays live in Stripe for prospects quoted
  // that price before the reprice, but is no longer offered on the site:
  // https://buy.stripe.com/00w4gycnagXs2XDeZR33W03
} as const;
