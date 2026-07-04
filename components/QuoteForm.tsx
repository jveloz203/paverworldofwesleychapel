"use client";

import { useState } from "react";
import { business } from "@/lib/business";
import type { LeadSource } from "@/lib/leads";

type Status = "idle" | "sending" | "done" | "error";

export default function QuoteForm({
  source = "quote-form",
  showEmail = false,
  showMessage = false,
  showCompany = false,
  heading = "Get My Free Estimate",
}: {
  source?: LeadSource;
  showEmail?: boolean;
  showMessage?: boolean;
  showCompany?: boolean;
  heading?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFieldErrors({});
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-sand-200">
        <p className="font-display text-xl font-bold text-espresso-900">You're on the list! 🎉</p>
        <p className="mt-2 text-sm text-espresso-600">
          Thanks — we'll reach out shortly to schedule your free estimate. Want to talk now? Call{" "}
          <a href={`tel:${business.phone.tel}`} className="font-bold text-clay-600">
            {business.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-sm text-espresso-900 placeholder-espresso-500/60 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/30";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-sand-200">
      <p className="font-display text-xl font-bold text-espresso-900">{heading}</p>
      <p className="mt-1 text-xs text-espresso-600">Free on-site design consultation. No pressure, ever.</p>
      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor={`${source}-name`} className="sr-only">Name</label>
          <input id={`${source}-name`} name="name" required placeholder="Your name" className={inputClass} />
          {fieldErrors.name && <p className="mt-1 text-xs text-clay-700">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className="sr-only">Phone</label>
          <input id={`${source}-phone`} name="phone" required type="tel" placeholder="Phone number" className={inputClass} />
          {fieldErrors.phone && <p className="mt-1 text-xs text-clay-700">{fieldErrors.phone}</p>}
        </div>
        {showEmail && (
          <div>
            <label htmlFor={`${source}-email`} className="sr-only">Email</label>
            <input id={`${source}-email`} name="email" type="email" placeholder="Email (optional)" className={inputClass} />
          </div>
        )}
        {showCompany && (
          <div>
            <label htmlFor={`${source}-company`} className="sr-only">Company or community</label>
            <input id={`${source}-company`} name="company" placeholder="Company / community" className={inputClass} />
          </div>
        )}
        <div>
          <label htmlFor={`${source}-projectType`} className="sr-only">Project type</label>
          <select id={`${source}-projectType`} name="projectType" defaultValue="" className={inputClass}>
            <option value="" disabled>What's your project?</option>
            {business.services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </div>
        {showMessage && (
          <div>
            <label htmlFor={`${source}-message`} className="sr-only">Message</label>
            <textarea id={`${source}-message`} name="message" rows={3} placeholder="Tell us about your project (optional)" className={inputClass} />
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-lg bg-clay-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-clay-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request Free Estimate →"}
      </button>
      {status === "error" && Object.keys(fieldErrors).length === 0 && (
        <p className="mt-2 text-xs text-clay-700">
          Something went wrong — please call {business.phone.display} and we'll take care of you.
        </p>
      )}
      <p className="mt-3 text-center text-xs text-espresso-500">
        Prefer to talk? <a href={`tel:${business.phone.tel}`} className="font-bold text-clay-600">{business.phone.display}</a>
      </p>
    </form>
  );
}
