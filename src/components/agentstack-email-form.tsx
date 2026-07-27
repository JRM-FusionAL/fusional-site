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
