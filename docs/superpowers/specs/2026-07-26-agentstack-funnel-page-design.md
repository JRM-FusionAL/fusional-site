# agentstack-init funnel page — design

## Context

`fusional-landing` (fusional.dev, separate repo) previously had a dedicated `/agentstack` funnel page for the `agentstack-init` CLI tool: hero, terminal demo, "what it checks" grid, email-capture lead form, and a 3-tier pricing section. `fusional-site` is the current/active marketing site and only references `agentstack-init` as a one-line teaser on the homepage and a card on `/tools` linking straight to PyPI.

This spec restores the full funnel page inside `fusional-site`, restyled to its existing brand tokens, and links the `/tools` card to it.

## Goals

- Add `/agentstack` page to `fusional-site` with the same content/structure as the original: hero + terminal demo, 3-item "what it checks" grid, email-capture section, 3-tier pricing.
- Reuse the site's existing global header/footer (layout.tsx) instead of the standalone header the original page had.
- Wire a working lead-capture form via a new `/api/contact` route using Resend, matching the pattern already proven in `fusional-landing`.
- Point the `/tools` page's `agentstack-init` card primarily at `/agentstack`, keeping the PyPI link as a secondary reference inside the card.

## Non-goals

- No new top-level nav entry (reachable via the `/tools` card and direct URL only).
- No changes to pricing, copy, or the Calendly booking link — ported verbatim.
- No application of the new FusionAL Design System (zip) to this or any page — staged separately, out of scope here.
- No changes to `fusional-landing` itself.

## Files

- `src/app/agentstack/page.tsx` — new. Server component. Hero, terminal block, checks grid, email section, pricing section. No page-level `<header>`/`<footer>` — inherits the root layout's.
- `src/components/agentstack-email-form.tsx` — new. Client component (`"use client"`), copied from fusional-landing's `agentstack-email-form.tsx` with no logic changes (still POSTs to `/api/contact`).
- `src/app/api/contact/route.ts` — new. Same validation + Resend send logic as fusional-landing's `app/api/contact/route.ts`. `to` defaults to `jrm@fusional.dev` (via `CONTACT_EMAIL` in `lib/links.ts`), overridable by `CONTACT_TO_EMAIL` env var. `from` defaults to `"agentstack-init leads <onboarding@resend.dev>"` unless `CONTACT_FROM_EMAIL` is set.
- `src/lib/links.ts` — new. Exports `BOOKING_URL` (same Calendly link, `https://calendly.com/jonathanmelton004`) and `CONTACT_EMAIL = "jrm@fusional.dev"`.
- `src/app/tools/page.tsx` — edit. The `agentstack-init` entry's primary `href` becomes `/agentstack`; add a small secondary link/line to the PyPI page inside that card.

## Styling adaptation

fusional-landing's page uses a token set fusional-site doesn't have (`bg-accent`, `text-accent`, `border-line`/`bg-surface`, `text-approve`/`text-deny`, `accent-ink`, `accent-strong`). Remap to fusional-site's existing tokens/conventions (`molten`, `molten-deep`, `gold`, `ink`, `ink-2`, `paper`, `line`, `.eyebrow`, `font-display`/`font-body`):

- Eyebrow label ("Free open-source tool") → `.eyebrow` class (already used site-wide for this purpose).
- Primary CTA buttons (`bg-accent` → `text-accent-ink`) → `bg-molten text-ink` (matches how primary CTAs read elsewhere on the site), hover `bg-molten-deep`.
- Secondary/outline CTA (GitHub link, border style) → `border-gold text-gold hover:bg-gold hover:text-ink`, matching the existing "Contact" pill in the nav.
- Card/section surfaces (`bg-surface`, `border-line`) → `bg-ink-2 border-line`, matching `/tools` page cards.
- Terminal demo's status dots (`bg-deny`/`bg-accent`/`bg-approve`) → keep as plain decorative colors (red/amber/green), since these aren't semantic tokens elsewhere on the site — no new token additions needed for three static dots.
- Headings keep `font-display font-bold`; body copy keeps `font-body` (site default) with `text-paper/60`–`/90` opacity variants for muted text, matching `/tools`.
- Rounded shapes (`rounded-2xl` cards, `rounded-full` CTA pills) carried over unchanged — consistent with `/tools`.

## Data flow

1. User fills form (name, email, harness dropdown) in `AgentStackEmailForm`.
2. Client POSTs JSON to `/api/contact`.
3. Route validates required fields + email format, then calls Resend's REST API with `RESEND_API_KEY`.
4. Success → `{ ok: true }`, form shows a "you're on the list" confirmation state.
5. Missing API key → `503` with an explicit unconfigured-form error (never silently succeeds).
6. Resend rejects the request → `502`, error surfaced inline on the form.

## Env vars (fusional-site Vercel project)

- `RESEND_API_KEY` — required. User has existing keys stored in Notion under Secrets; will add to Vercel project settings directly (not handled by this implementation).
- `CONTACT_TO_EMAIL` — optional, defaults to `jrm@fusional.dev`.
- `CONTACT_FROM_EMAIL` — optional, defaults to a Resend sandbox sender.

## Testing

- No existing test suite in `fusional-site` (no test runner configured) — verification is `npm run build` succeeding, manual visual check of `/agentstack` and updated `/tools` card, and a manual form submission test once `RESEND_API_KEY` is set in the Vercel project (can't be verified locally without the key).
