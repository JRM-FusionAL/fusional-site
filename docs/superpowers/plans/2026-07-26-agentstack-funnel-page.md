# agentstack-init Funnel Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the `agentstack-init` funnel page (hero, terminal demo, checks grid, email capture, pricing) inside `fusional-site`, restyled to its existing brand tokens, with a working Resend-backed contact form and an updated `/tools` card linking to it.

**Architecture:** Four new files (`lib/links.ts`, `api/contact/route.ts`, `components/agentstack-email-form.tsx`, `app/agentstack/page.tsx`) plus one edit (`app/tools/page.tsx`). The page is a server component using the site's existing root layout (no page-level header/footer). The form is a client component posting JSON to the local API route, which forwards to Resend's REST API — same shape as the equivalent files already live in the sibling `fusional-landing` repo, restyled to fusional-site's tokens (`molten`/`gold`/`ink`/`ink-2`/`paper`/`line`, `.eyebrow`, `font-display`/`font-body`) instead of fusional-landing's (`accent`/`surface`/`approve`/`deny`).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. No test runner is configured in this repo (verified: `package.json` has no `test` script or test framework) — verification for each task is `npm run build` plus a manual check described in that task, not automated tests.

## Global Constraints

- Contact email is `jrm@fusional.dev` (matches the mailto already in `src/app/layout.tsx`).
- Booking link is `https://calendly.com/jonathanmelton004` (ported verbatim from fusional-landing).
- Pricing tiers, copy, and structure are ported **verbatim** from fusional-landing's `/agentstack` page — no content changes.
- No new top-level nav entry — page is reachable via the `/tools` card and direct URL only.
- Use fusional-site's existing token names only: `ink`, `ink-2`, `paper`, `molten`, `molten-deep`, `gold`, `line`. Do not introduce new CSS variables/tokens.
- `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` are set directly in the fusional-site Vercel project by the user (from their Notion secrets store) — not part of this implementation's file changes.

---

### Task 1: Links constants

**Files:**
- Create: `src/lib/links.ts`

**Interfaces:**
- Produces: `BOOKING_URL: string`, `CONTACT_EMAIL: string` — consumed by Task 2 (API route) and Task 4 (page).

- [ ] **Step 1: Create the file**

```ts
// src/lib/links.ts

// Booking link for agentstack-init review calls (Cal.com, Calendly, etc.).
export const BOOKING_URL = "https://calendly.com/jonathanmelton004";

export const CONTACT_EMAIL = "jrm@fusional.dev";
```

- [ ] **Step 2: Verify it compiles**

Run: `cd ~/Projects/fusional-site && npx tsc --noEmit`
Expected: no errors mentioning `src/lib/links.ts`.

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/fusional-site
git add src/lib/links.ts
git commit -m "feat(agentstack): add shared links constants"
```

---

### Task 2: Contact API route

**Files:**
- Create: `src/app/api/contact/route.ts`

**Interfaces:**
- Consumes: `CONTACT_EMAIL` from `src/lib/links.ts` (Task 1).
- Produces: `POST /api/contact` accepting JSON `{ name, email, company?, message }`, returning `{ ok: true }` on success or `{ error: string }` with 400/502/503 status on failure. Consumed by Task 3 (email form).

- [ ] **Step 1: Create the route**

```ts
// src/app/api/contact/route.ts
import { CONTACT_EMAIL } from "@/lib/links";

const MAX_FIELD = 2000;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const message = clean(body.message);

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email looks invalid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set; lead not delivered", {
      name,
      email,
      company,
    });
    return Response.json(
      { error: "The contact form is not configured yet." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "agentstack-init leads <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL],
      reply_to: email,
      subject: `agentstack-init lead: ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "n/a"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("contact: Resend rejected the email", res.status, detail);
    return Response.json(
      { error: "Sending failed on our side." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd ~/Projects/fusional-site && npx tsc --noEmit`
Expected: no errors mentioning `src/app/api/contact/route.ts`.

- [ ] **Step 3: Manual smoke test without a key (expected-failure path)**

Run: `cd ~/Projects/fusional-site && npm run dev` (in one terminal), then in another:
```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"hi"}' | head -c 200
```
Expected: HTTP 503 JSON body `{"error":"The contact form is not configured yet."}` (no `RESEND_API_KEY` set locally) — confirms the route is wired and the not-configured path works, without needing a real key. Stop the dev server after.

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/fusional-site
git add src/app/api/contact/route.ts
git commit -m "feat(agentstack): add Resend-backed contact API route"
```

---

### Task 3: Email capture form component

**Files:**
- Create: `src/components/agentstack-email-form.tsx`

**Interfaces:**
- Consumes: `POST /api/contact` from Task 2 (request/response shape above).
- Produces: `AgentStackEmailForm` component (default export style: named export `AgentStackEmailForm`), consumed by Task 4 (page).

- [ ] **Step 1: Create the component**

```tsx
// src/components/agentstack-email-form.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function AgentStackEmailForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `agentstack-init audit lead. Harness: ${data.harness || "unspecified"}`,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-ink-2 p-8">
        <h3 className="font-display font-medium">You&apos;re on the list.</h3>
        <p className="mt-2 text-sm leading-relaxed text-paper/60">
          I&apos;ll follow up within one business day to schedule your free 30-min
          review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ast-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="ast-name"
            name="name"
            required
            autoComplete="name"
            className="rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-gold focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ast-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="ast-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-gold focus:outline-none"
            placeholder="you@domain.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ast-harness" className="text-sm font-medium">
          Which harness are you running?
        </label>
        <select
          id="ast-harness"
          name="harness"
          className="rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper focus:border-gold focus:outline-none"
        >
          <option value="claude_code">Claude Code</option>
          <option value="hermes">Hermes Agent</option>
          <option value="other">Other / not sure</option>
        </select>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Book free review"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd ~/Projects/fusional-site && npx tsc --noEmit`
Expected: no errors mentioning `src/components/agentstack-email-form.tsx`.

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/fusional-site
git add src/components/agentstack-email-form.tsx
git commit -m "feat(agentstack): add email capture form component"
```

---

### Task 4: agentstack funnel page

**Files:**
- Create: `src/app/agentstack/page.tsx`

**Interfaces:**
- Consumes: `AgentStackEmailForm` from Task 3, `BOOKING_URL` from Task 1.
- Produces: route `/agentstack`, consumed by Task 5 (`/tools` card link).

- [ ] **Step 1: Create the page**

```tsx
// src/app/agentstack/page.tsx
import type { Metadata } from "next";
import { AgentStackEmailForm } from "@/components/agentstack-email-form";
import { BOOKING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "agentstack-init | FusionAL",
  description:
    "agentstack-init audits your Claude Code or Hermes config for broken MCP wiring, missing CLAUDE.md, and unreachable servers — then gives you a score out of 100.",
};

const CHECKS = [
  {
    label: "CLAUDE.md present",
    detail: "Your harness needs a project-level CLAUDE.md to give the model context.",
  },
  {
    label: "MCP config wired",
    detail: "Are your MCP servers registered in the right config file for your harness?",
  },
  {
    label: "Servers reachable",
    detail: "A config that points at a dead port is worse than no config.",
  },
];

const TIERS = [
  {
    name: "Solo session",
    price: "$750",
    billing: "one-time",
    href: BOOKING_URL,
    blurb:
      "We fix your harness together in a 90-min working session. One harness, one project, everything wired by the time we hang up.",
    features: [
      "Audit run before the call",
      "Live fix session (90 min)",
      "CLAUDE.md + MCP config written for your project",
      "Score rechecked at the end",
    ],
    featured: false,
    cta: "Book a session",
  },
  {
    name: "Team setup",
    price: "from $4,000",
    billing: "one-time",
    href: BOOKING_URL,
    blurb:
      "Full harness rollout for engineering teams. We scope the engagement on a call, then build it out: memory, MCP wiring, CLAUDE.md templates, and handoff docs.",
    features: [
      "Everything in Solo session",
      "Multi-developer harness config",
      "Shared memory and recall setup",
      "Written handoff + team walkthrough",
    ],
    featured: true,
    cta: "Scope a project",
  },
  {
    name: "Retainer",
    price: "$99 / mo",
    billing: "solo · team from $750/mo",
    href: BOOKING_URL,
    blurb:
      "Ongoing harness health. Monthly audit, config updates as your tooling changes, and a standing async channel for harness questions.",
    features: [
      "Monthly audit + score report",
      "Config updates when tools change",
      "Async Q&A (48h response)",
    ],
    featured: false,
    cta: "Start a retainer",
  },
];

export default function AgentStackPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <div className="max-w-[52ch]">
          <p className="eyebrow mb-4">Free open-source tool</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Your AI harness has a score.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/60">
            <code className="font-mono text-paper/90">agentstack-init audit</code> checks
            your Claude Code or Hermes config for broken MCP wiring, missing
            CLAUDE.md, and unreachable servers — then gives you a score out of 100.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full bg-molten px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-molten-deep active:scale-[0.98]"
            >
              Book free 30-min review
            </a>
            <a
              href="https://github.com/JRM-FusionAL/agentstack-init"
              className="inline-flex items-center rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink active:scale-[0.98]"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Terminal block */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-paper/50">terminal</span>
          </div>
          <pre className="overflow-x-auto px-6 py-5 font-mono text-sm leading-relaxed">
            <span className="text-paper/50">$ </span>
            <span className="text-paper">pip install agentstack-init</span>
            {"\n"}
            <span className="text-paper/50">$ </span>
            <span className="text-paper">agentstack-init audit</span>
            {"\n\n"}
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">CLAUDE.md not found at project root</span>
            {"\n"}
            <span className="text-paper/50">   Fix: Run agentstack-init init --harness claude_code</span>
            {"\n"}
            <span className="text-red-400">✗  </span>
            <span className="text-paper/80">No MCP config at ~/.claude/claude_mcp_settings.json</span>
            {"\n"}
            <span className="text-paper/50">   Fix: Run agentstack-init init --harness claude_code</span>
            {"\n\n"}
            <span className="text-paper/60">Score: </span>
            <span className="font-semibold text-gold">60/100</span>
            {"\n"}
            <span className="text-paper/60">Full report: .fusional/audit-report.json</span>
            {"\n\n"}
            <span className="text-green-400">→ </span>
            <span className="text-paper/80">Book a free 30-min review: agentstack.fyi/audit</span>
          </pre>
        </div>
      </section>

      {/* What it checks */}
      <section className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Three things most harnesses get wrong.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The audit catches the config mistakes that make your AI harness
            unreliable before you waste a week debugging them.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CHECKS.map((check, i) => (
              <div
                key={check.label}
                className="rounded-2xl border border-line bg-ink-2 p-7"
              >
                <p className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-medium">{check.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{check.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section id="audit" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Get a free 30-min harness review.
              </h2>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-paper/60">
                Run the audit yourself. Then book a call and we&apos;ll walk through
                the report together, fix what&apos;s broken, and wire in anything
                that&apos;s missing.
              </p>
              <p className="mt-4 text-sm text-paper/60">
                No pitch. No deck. We look at your config and fix it.
              </p>
            </div>
            <AgentStackEmailForm />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-line bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Fix it yourself, or fix it with me.
          </h2>
          <p className="mt-3 max-w-[56ch] text-paper/60">
            The CLI is free. Paid tiers are for teams that want the setup done
            right the first time.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-7 ${
                  tier.featured
                    ? "border-gold/50 bg-ink-2"
                    : "border-line bg-ink-2"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">{tier.name}</h3>
                  <div className="text-right">
                    <span className="font-mono text-xl font-semibold leading-none">
                      {tier.price}
                    </span>
                    <p className="mt-0.5 font-mono text-xs text-paper/60">{tier.billing}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-paper/60">{tier.blurb}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[7px] h-px w-3 shrink-0 bg-gold"
                      />
                      <span className="text-paper/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex-1" />
                <a
                  href={tier.href}
                  className={`inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
                    tier.featured
                      ? "bg-molten text-ink hover:bg-molten-deep"
                      : "border border-gold text-gold hover:bg-gold hover:text-ink"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-ink-2 p-7">
            <p className="text-sm text-paper/60">
              <span className="font-medium text-paper">Free tier:</span>{" "}
              <code className="font-mono">pip install agentstack-init</code> and run{" "}
              <code className="font-mono">agentstack-init audit</code> locally. The
              CLI is open source and always will be.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd ~/Projects/fusional-site && npx tsc --noEmit`
Expected: no errors mentioning `src/app/agentstack/page.tsx`.

- [ ] **Step 3: Manual visual check**

Run: `cd ~/Projects/fusional-site && npm run dev`, open `http://localhost:3000/agentstack` in a browser.
Expected: page renders with site header/footer, hero, terminal demo, checks grid, email form, and pricing tiers, all using molten/gold/ink coloring consistent with `/tools`. Stop the dev server after.

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/fusional-site
git add src/app/agentstack/page.tsx
git commit -m "feat(agentstack): add /agentstack funnel page"
```

---

### Task 5: Link the /tools card to /agentstack

**Files:**
- Modify: `src/app/tools/page.tsx`

**Interfaces:**
- Consumes: route `/agentstack` from Task 4.

- [ ] **Step 1: Edit the `repos` array and card markup**

Change the `agentstack-init` entry and how its card renders its links. Current code (for reference, `src/app/tools/page.tsx`):

```tsx
const repos = [
  {
    name: "agentstack-init",
    desc: "Audit and bootstrap AI agent stacks — detects MCP configs, CLI versions, and drift. On PyPI.",
    href: "https://pypi.org/project/agentstack-init/",
  },
  // ...
];
```

and:

```tsx
{repos.map((r) => (
  <a
    key={r.name}
    href={r.href}
    className="group rounded-2xl border border-line bg-ink-2 p-8 transition-colors hover:border-gold"
  >
    <h2 className="font-display text-xl font-bold group-hover:text-gold">
      {r.name}
    </h2>
    <p className="mt-3 leading-relaxed text-paper/60">{r.desc}</p>
  </a>
))}
```

Replace both with:

```tsx
import Link from "next/link";

const repos = [
  {
    name: "agentstack-init",
    desc: "Audit and bootstrap AI agent stacks — detects MCP configs, CLI versions, and drift. On PyPI.",
    href: "/agentstack",
    secondaryHref: "https://pypi.org/project/agentstack-init/",
    secondaryLabel: "View on PyPI",
  },
  {
    name: "FusionAL",
    desc: "Self-hosted MCP governance gateway for regulated environments. FastAPI, Docker, policy-enforced tool calls.",
    href: "https://github.com/JRM-FusionAL",
  },
  {
    name: "FusionAL-Recall",
    desc: "MCP server for semantic search over a solved-issues registry. sqlite-vec + sentence-transformers.",
    href: "https://github.com/JRM-FusionAL",
  },
  {
    name: "mcp-consulting-kit",
    desc: "A curated MCP server collection for consulting deployments, Dockerized and ready to govern.",
    href: "https://github.com/JRM-FusionAL",
  },
];
```

and:

```tsx
{repos.map((r) => (
  <div
    key={r.name}
    className="group rounded-2xl border border-line bg-ink-2 p-8 transition-colors hover:border-gold"
  >
    <Link href={r.href} className="block">
      <h2 className="font-display text-xl font-bold group-hover:text-gold">
        {r.name}
      </h2>
      <p className="mt-3 leading-relaxed text-paper/60">{r.desc}</p>
    </Link>
    {r.secondaryHref && (
      <a
        href={r.secondaryHref}
        className="mt-4 inline-block text-sm text-paper/50 underline hover:text-gold"
      >
        {r.secondaryLabel}
      </a>
    )}
  </div>
))}
```

Note: `href` values that start with `/` use Next's `<Link>`; external `href`s on the other three repos still navigate correctly through the same `<Link>` component since `next/link` passes through absolute URLs.

- [ ] **Step 2: Verify it compiles**

Run: `cd ~/Projects/fusional-site && npx tsc --noEmit`
Expected: no errors mentioning `src/app/tools/page.tsx`.

- [ ] **Step 3: Manual visual check**

Run: `cd ~/Projects/fusional-site && npm run dev`, open `http://localhost:3000/tools`.
Expected: `agentstack-init` card is clickable and navigates to `/agentstack`; a smaller "View on PyPI" link below it opens the PyPI page; other three cards behave unchanged. Stop the dev server after.

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/fusional-site
git add src/app/tools/page.tsx
git commit -m "feat(agentstack): link /tools card to /agentstack funnel page"
```

---

### Task 6: Full build verification

**Files:** none (verification only)

- [ ] **Step 1: Run the production build**

Run: `cd ~/Projects/fusional-site && npm run build`
Expected: build succeeds with no type or lint errors, and the route list includes `/agentstack` and `/api/contact`.

- [ ] **Step 2: Report env var requirement to the user**

State explicitly that `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL`) still need to be added to the fusional-site Vercel project before the live form can send email — this is a manual step for the user (they have the keys in Notion), not something this plan's tasks configure.

- [ ] **Step 3: Final commit if any build-fix changes were needed**

```bash
cd ~/Projects/fusional-site
git add -A
git commit -m "fix(agentstack): resolve build issues from full verification pass"
```
(Skip this step if the build already passed clean in Step 1 — no empty commits.)
