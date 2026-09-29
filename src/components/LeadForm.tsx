"use client";

import { useId, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Phone } from "./icons";
import { LEAD_DETAILS_LIMIT, LEAD_SERVICES, validateLead, type LeadPayload } from "@/lib/lead";
import type { Errors } from "@/lib/quote";

const inputCls = (invalid?: boolean) =>
  `h-12 w-full border bg-white px-3 text-sm text-ink outline-none placeholder:text-ink-600 focus:ring-2 focus:ring-sky ${
    invalid ? "border-red-500 ring-1 ring-red-500" : "border-ink-200"
  }`;

/**
 * Short "get a free quote" form used on every inner page: name, phone, email, service.
 * Posts to /api/leads. `details` pre-fills the notes box (e.g. the cost calculator's answers).
 */
export function LeadForm({
  service = "local-move",
  details: initialDetails = "",
  heading = "Get your free quote",
  sub = "Real local people. We call you back fast with an honest, upfront price.",
  submitLabel = "Get My Free Quote",
}: {
  service?: string;
  details?: string;
  heading?: string;
  sub?: string;
  submitLabel?: string;
}) {
  const page = usePathname();
  const [d, setD] = useState<Omit<LeadPayload, "page">>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service,
    details: initialDetails,
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState("");
  // Keep the calculator's latest answers in the notes box until the person types their own.
  const [touchedDetails, setTouchedDetails] = useState(false);
  const details = touchedDetails ? d.details : initialDetails || d.details;

  const set = (k: keyof typeof d, v: string) => {
    setD((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((x) => Object.fromEntries(Object.entries(x).filter(([f]) => f !== k)));
  };

  async function submit() {
    const payload: LeadPayload = { ...d, details, page };
    const errs = validateLead(payload);
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; errors?: Errors };
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setFormError(json.error ?? "Something went wrong. Please call us instead.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setFormError("We couldn't reach the server. Check your connection or call us.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-ink bg-white p-6 text-ink offset-sky-sm sm:p-8" role="status">
        <p className="text-2xl font-bold">Got it, {d.firstName.trim()}!</p>
        <p className="mt-3 text-[15px] leading-7">
          A real person from our local crew will call you at <strong>{d.phone}</strong> shortly with an honest,
          upfront price. Need us sooner? Call now and we&apos;ll pick up.
        </p>
        <a
          href="tel:+17025278565"
          className="mt-5 inline-flex h-12 items-center gap-2 bg-sky px-6 text-sm font-bold uppercase text-ink hover:bg-sky-600"
        >
          <Phone width={16} height={16} /> (702) 527-8565
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="relative border border-ink bg-white p-5 text-ink offset-sky-sm sm:p-7"
    >
      <p className="text-2xl font-bold leading-tight">{heading}</p>
      <p className="mt-2 text-sm leading-6 text-ink-600">{sub}</p>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={d.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName}>
          {(p) => (
            <input {...p} autoComplete="given-name" className={inputCls(!!errors.firstName)} value={d.firstName} onChange={(e) => set("firstName", e.target.value)} />
          )}
        </Field>
        <Field label="Last name" error={errors.lastName}>
          {(p) => (
            <input {...p} autoComplete="family-name" className={inputCls(!!errors.lastName)} value={d.lastName} onChange={(e) => set("lastName", e.target.value)} />
          )}
        </Field>
        <Field label="Phone" error={errors.phone}>
          {(p) => (
            <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="(702) 555-0123" className={inputCls(!!errors.phone)} value={d.phone} onChange={(e) => set("phone", e.target.value)} />
          )}
        </Field>
        <Field label="Email" error={errors.email}>
          {(p) => (
            <input {...p} type="email" autoComplete="email" placeholder="you@email.com" className={inputCls(!!errors.email)} value={d.email} onChange={(e) => set("email", e.target.value)} />
          )}
        </Field>
        <div className="sm:col-span-2">
          <Field label="What do you need?" error={errors.service}>
            {(p) => (
              <select {...p} className={inputCls(!!errors.service)} value={d.service} onChange={(e) => set("service", e.target.value)}>
                {LEAD_SERVICES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Details (optional)" error={errors.details}>
            {(p) => (
              <textarea
                {...p}
                rows={3}
                maxLength={LEAD_DETAILS_LIMIT}
                placeholder="Date, where from/to, stairs, big items…"
                className={`${inputCls(!!errors.details)} h-auto py-3`}
                value={details}
                onChange={(e) => {
                  setTouchedDetails(true);
                  set("details", e.target.value);
                }}
              />
            )}
          </Field>
        </div>
      </div>

      {formError && (
        <p role="alert" className="mt-4 border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 bg-sky px-6 text-sm font-bold uppercase text-ink transition hover:bg-sky-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel} <ArrowUpRight />
      </button>
      <p className="mt-3 text-[11px] leading-4 text-ink-600">
        No spam, no pushy sales calls. By sending this you agree we can call, text or email you about your
        quote. See our{" "}
        <Link href="/privacy" className="text-sky-700 underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: (p: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-err` : undefined })}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs font-bold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
