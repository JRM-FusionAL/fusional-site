import { CONTACT_EMAIL } from "@/lib/links";

const MAX_FIELD = 2000;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

export async function POST(request: Request) {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  const body = parsed as Record<string, unknown>;

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const message = clean(body.message);

  const honeypot = clean(body.website);
  if (honeypot) {
    // Bot submission — pretend success so the bot doesn't learn to retry.
    return Response.json({ ok: true });
  }

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
    console.error("contact: RESEND_API_KEY is not set; lead not delivered");
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
