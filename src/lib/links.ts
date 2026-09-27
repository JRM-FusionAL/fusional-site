// Booking link for scoping calls (Cal.com, Calendly, etc.).
export const BOOKING_URL = "https://calendly.com/jonathanmelton004";

export const CONTACT_EMAIL = "jrm@fusional.dev";

// Live Stripe Payment Links (created in the Stripe Dashboard).
export const STRIPE_LINKS = {
  aiosTemplate: "https://buy.stripe.com/7sY4gyevi22y41HcRJ33W00",
  aiosGuided: "https://buy.stripe.com/28E8wO2MA4aGaq5bNF33W02",
  aiosWhiteGlove: "https://buy.stripe.com/14A9AScnafTo7dT04X33W01",
  tokenAudit: "https://buy.stripe.com/00w4gycnagXs2XDeZR33W03",
  canvasConsulting: "https://buy.stripe.com/bJeaEWbj6cHc7dT3h933W04",
} as const;

// $750 AI Policy Review payment link. Until it exists (null), the buy buttons
// fall back to booking a call, labelled honestly. Set it to the Stripe URL to
// switch every "start the review" button to checkout.
export const AI_POLICY_CHECKOUT: string | null = null;
export const aiPolicyHref = AI_POLICY_CHECKOUT ?? BOOKING_URL;
export const aiPolicyCta = (checkoutLabel: string) =>
  AI_POLICY_CHECKOUT ? checkoutLabel : "Book a call to start";
