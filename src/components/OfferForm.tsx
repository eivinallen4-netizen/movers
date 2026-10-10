"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Camera, Check, Lock, Phone } from "./icons";
import { BUSINESS, PHONE, PHONE_HREF } from "@/content/site";
import { uploadPhoto } from "@/lib/image";
import { AD_PARAMS, MAX_QUOTE_PHOTOS, MOVE_SIZES, type MoveSize, type OfferSlug } from "@/lib/offer";
import { EMAIL, normalizePhone, todayInVegas, type Errors } from "@/lib/quote";

type Photo = { id: string; name: string; preview: string; url?: string; error?: string };
type Stage = "size" | "form" | "photo" | "done";
type Contact = "name" | "phone" | "email";

const inputCls = (invalid?: boolean) =>
  `h-12 w-full min-w-0 border bg-white px-3 pr-10 text-base text-ink outline-none focus:ring-2 focus:ring-sky sm:text-sm ${
    invalid ? "border-red-500 ring-1 ring-red-500" : "border-white"
  }`;

/** (702) 555-0134 as they type. A leading +1 is dropped. */
function formatPhoneInput(raw: string) {
  const d = raw.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function contactError(k: Contact, v: string) {
  if (k === "name") return v.trim() ? "" : "Enter your name.";
  if (k === "phone") return normalizePhone(v) ? "" : "Enter a 10-digit US phone number.";
  return EMAIL.test(v.trim()) ? "" : "Enter a valid email address.";
}

/**
 * The short form on the /offers/* ad pages. Step 1 is one tap (move size) to get them started;
 * step 2 is name, phone, email, an optional move date and SMS consent.
 * The second-opinion offer then asks for a photo of their current quote, or lets them send it later.
 */
export function OfferForm({
  offer,
  title,
  button,
  askForQuotePhoto = false,
  checklist,
}: {
  offer: OfferSlug;
  /** Heading on the form card. */
  title: string;
  button: string;
  askForQuotePhoto?: boolean;
  /** Shown on the thank-you screen (the red-flags checklist on the second-opinion page). */
  checklist?: ReactNode;
}) {
  const [d, setD] = useState({
    moveSize: "" as MoveSize | "",
    name: "",
    phone: "",
    email: "",
    moveDate: "",
    smsConsent: false,
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Contact, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [submitError, setSubmitError] = useState("");
  const [stage, setStage] = useState<Stage>("size");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [sentPhotos, setSentPhotos] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const picked = useRef(false);

  // Straight into the name field after the step-1 tap (never on page load, which would pop the keyboard).
  useEffect(() => {
    if (stage === "form" && picked.current) nameRef.current?.focus();
  }, [stage]);

  const set = <K extends keyof typeof d>(k: K, v: (typeof d)[K]) => {
    setD((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  // Check a field when they leave it, but don't scold an empty one they only tabbed through.
  const blur = (k: Contact) => {
    if (!d[k].trim()) return;
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: contactError(k, d[k]) }));
  };
  const valid = (k: Contact) => Boolean(touched[k]) && !contactError(k, d[k]);

  function pickSize(size: MoveSize) {
    set("moveSize", size);
    picked.current = true;
    setStage("form");
  }

  async function submit() {
    const keys: Contact[] = ["name", "phone", "email"];
    const e: Errors = Object.fromEntries(keys.map((k) => [k, contactError(k, d[k])]));
    setErrors(e);
    setTouched({ name: true, phone: true, email: true });
    if (Object.values(e).some(Boolean)) return;

    setStatus("sending");
    setSubmitError("");
    const sp = new URLSearchParams(window.location.search);
    const ad = Object.fromEntries(AD_PARAMS.flatMap((k) => (sp.get(k) ? [[k, sp.get(k)!.slice(0, 300)]] : [])));
    try {
      const res = await fetch("/api/offer-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, offer, page: window.location.pathname, ad }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string | null; error?: string; errors?: Errors };
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setSubmitError(data.error ?? "Something went wrong. Please try again or call us.");
        setStatus("idle");
        return;
      }
      setLeadId(data.id ?? null);
      setStage(askForQuotePhoto && data.id ? "photo" : "done");
    } catch {
      setSubmitError("We couldn't reach the server. Check your connection, or call us.");
      setStatus("idle");
    }
  }

  if (stage === "photo" && leadId) {
    return (
      <QuotePhotoStep
        leadId={leadId}
        onDone={(sent) => {
          setSentPhotos(sent);
          setStage("done");
        }}
      />
    );
  }

  if (stage === "done") {
    return (
      <div role="status">
        <p className="flex items-center gap-2 text-2xl font-bold leading-tight">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
            <Check width={18} height={18} />
          </span>
          Got it, {d.name.trim().split(/\s+/)[0]}!
        </p>
        <p className="mt-3 text-base leading-7 text-white/85">
          {askForQuotePhoto
            ? sentPhotos
              ? "We have your quote. We'll look it over and call or text you within 15 minutes with what we find."
              : "We'll call or text you within 15 minutes. Have your quote handy and you can send it to us then."
            : "We'll call or text you within 15 minutes to lock in your price and date."}
        </p>
        <a href={PHONE_HREF} className="mt-5 inline-flex h-12 items-center gap-2 bg-white px-6 text-sm font-bold text-ink transition hover:bg-sky-100">
          <Phone width={16} height={16} /> Can&apos;t wait? Call {PHONE}
        </a>
        {checklist}
      </div>
    );
  }

  const header = (
    <div>
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="font-extrabold uppercase tracking-widest text-sky">Step {stage === "size" ? 1 : 2} of 2</span>
        <span className="font-semibold text-white/70">Takes about 30 seconds</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5" aria-hidden>
        <span className="h-1.5 bg-sky" />
        <span className={`h-1.5 transition-colors ${stage === "size" ? "bg-white/20" : "bg-sky"}`} />
      </div>
      <h2 className="mt-4 text-[22px] font-bold leading-tight sm:mt-5 sm:text-[28px]">{title}</h2>
      <p className="mt-3 flex items-center gap-2 bg-sky px-3 py-2.5 text-[13px] font-bold text-ink sm:mt-4 sm:px-4 sm:py-3 sm:text-sm">
        <Phone width={18} height={18} className="shrink-0" /> We&apos;ll call or text you within 15 minutes.
      </p>
    </div>
  );

  if (stage === "size") {
    return (
      <div>
        {header}
        <fieldset className="mt-5 sm:mt-6">
          <legend className="text-lg font-bold">How big is your move?</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {MOVE_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={d.moveSize === s}
                onClick={() => pickSize(s)}
                className="flex min-h-16 items-center justify-between gap-2 border-2 border-white/25 bg-white/5 px-4 py-3 text-left text-sm font-bold leading-tight transition hover:border-sky hover:bg-white/10 aria-pressed:border-sky aria-pressed:bg-sky/15"
              >
                {s} <ArrowUpRight className="shrink-0 text-sky" />
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-white/70">
          <Lock /> Free, no obligation. We never sell your info.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        if (status !== "sending") void submit();
      }}
    >
      {header}

      <button type="button" onClick={() => setStage("size")} className="mt-4 text-sm text-white/75 transition hover:text-sky">
        Move size: <span className="font-bold text-white">{d.moveSize || "not picked"}</span>{" "}
        <span className="underline underline-offset-2">Change</span>
      </button>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={d.company} onChange={(ev) => set("company", ev.target.value)} />
        </label>
      </div>

      <div className="mt-4 grid gap-4">
        <Field label="Name" error={errors.name} valid={valid("name")}>
          {(p) => (
            <input
              {...p}
              ref={nameRef}
              autoComplete="name"
              maxLength={120}
              value={d.name}
              onChange={(ev) => set("name", ev.target.value)}
              onBlur={() => blur("name")}
              className={inputCls(p["aria-invalid"])}
            />
          )}
        </Field>
        <Field label="Phone" error={errors.phone} valid={valid("phone")}>
          {(p) => (
            <input
              {...p}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(702) 555-0134"
              maxLength={20}
              value={d.phone}
              onChange={(ev) => set("phone", formatPhoneInput(ev.target.value))}
              onBlur={() => blur("phone")}
              className={inputCls(p["aria-invalid"])}
            />
          )}
        </Field>
        <Field label="Email" error={errors.email} valid={valid("email")}>
          {(p) => (
            <input
              {...p}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              value={d.email}
              onChange={(ev) => set("email", ev.target.value)}
              onBlur={() => blur("email")}
              className={inputCls(p["aria-invalid"])}
            />
          )}
        </Field>
        <Field label="Move date (optional)" error={errors.moveDate}>
          {(p) => (
            <input {...p} type="date" min={todayInVegas()} suppressHydrationWarning value={d.moveDate} onChange={(ev) => set("moveDate", ev.target.value)} className={inputCls(p["aria-invalid"])} />
          )}
        </Field>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[11px] leading-4 text-white/75">
        <input
          type="checkbox"
          checked={d.smsConsent}
          onChange={(ev) => set("smsConsent", ev.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-sky"
        />
        <span>
          Optional: {BUSINESS} can text me about my move at this number. Msg &amp; data rates may apply. Msg frequency varies.
          Reply STOP to opt out, HELP for help. Consent isn&apos;t required to get a quote.{" "}
          <Link href="/privacy" className="underline hover:text-sky">
            Privacy
          </Link>{" "}
          &amp;{" "}
          <Link href="/terms" className="underline hover:text-sky">
            Terms
          </Link>
          .
        </span>
      </label>

      {submitError && (
        <p role="alert" className="mt-5 border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 bg-sky px-6 text-sm font-bold uppercase text-ink transition hover:bg-sky-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : (
          <>
            {button} <ArrowUpRight />
          </>
        )}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-white/70">
        <Lock /> No spam. No obligation. We never sell your info.
      </p>
    </form>
  );
}

/**
 * Mobile only: once the form has scrolled up out of view, a bar at the bottom of the screen jumps back to it
 * (or calls). Hidden again near the closing call-to-action (#claim-end) and after the form is sent.
 */
export function StickyClaimBar({ button }: { button: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("claim");
    if (!form) return;
    const end = document.getElementById("claim-end");
    let formAbove = false;
    let endVisible = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === form) formAbove = !e.isIntersecting && e.boundingClientRect.top < 0;
        else endVisible = e.isIntersecting;
      }
      setShow(formAbove && !endVisible && !form.querySelector('[role="status"]'));
    });
    io.observe(form);
    if (end) io.observe(end);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-ink px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 print:hidden lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <a href="#claim" className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 bg-sky px-3 text-[13px] font-bold uppercase text-ink">
          <span className="truncate">{button}</span> <ArrowUpRight className="shrink-0" />
        </a>
        <a href={PHONE_HREF} aria-label={`Call ${PHONE}`} className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-ink">
          <Phone />
        </a>
      </div>
    </div>
  );
}

/** Second-opinion step 2: a photo of the quote they already have, or "send it when you contact me". */
function QuotePhotoStep({ leadId, onDone }: { leadId: string; onDone: (sentPhotos: boolean) => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [uploadsOff, setUploadsOff] = useState(false);
  const uploading = photos.some((p) => !p.url && !p.error);
  const ready = photos.filter((p) => p.url);

  function addFiles(files: FileList | null) {
    if (!files) return;
    setError("");
    const room = MAX_QUOTE_PHOTOS - photos.length;
    const picked = Array.from(files).slice(0, Math.max(0, room));
    for (const file of picked) {
      const id = crypto.randomUUID();
      setPhotos((xs) => [...xs, { id, name: file.name, preview: URL.createObjectURL(file) }]);
      uploadPhoto(file)
        .then((url) => setPhotos((xs) => xs.map((p) => (p.id === id ? { ...p, url } : p))))
        .catch((err: Error) => {
          if (/aren't set up/i.test(err.message)) setUploadsOff(true);
          setPhotos((xs) => xs.map((p) => (p.id === id ? { ...p, error: err.message } : p)));
        });
    }
  }

  async function send(body: { photos: string[] } | { sendLater: true }) {
    setSending(true);
    setError("");
    try {
      const res = await fetch(`/api/offer-leads/${leadId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      onDone("photos" in body);
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
      setSending(false);
    }
  }

  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-widest text-sky">Last step · You&apos;re in!</p>
      <p className="mt-2 text-2xl font-bold leading-tight">Snap a photo of your quote</p>
      <p className="mt-2 text-sm leading-6 text-white/80">
        A clear photo or screenshot of every page lets us check it before we call. We&apos;ll still call or text within 15 minutes.
      </p>

      {uploadsOff ? (
        <p className="mt-5 border-l-4 border-sky bg-white/10 px-3 py-2 text-sm">
          Photo upload isn&apos;t available right now. No problem: send it to us when we contact you.
        </p>
      ) : (
        <>
          {photos.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {photos.map((p) => (
                <li key={p.id} className="relative h-20 w-20 overflow-hidden border border-white/30 bg-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                  <img src={p.preview} alt={p.name} className="h-full w-full object-cover" />
                  {!p.url && !p.error && (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/70 text-[10px] font-bold uppercase">Uploading…</span>
                  )}
                  {p.error && (
                    <span className="absolute inset-0 flex items-center justify-center bg-red-700/85 p-1 text-center text-[10px] font-bold">Failed</span>
                  )}
                  <button
                    type="button"
                    aria-label={`Remove ${p.name}`}
                    onClick={() => setPhotos((xs) => xs.filter((x) => x.id !== p.id))}
                    className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center bg-ink text-sm font-bold"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          {photos.some((p) => p.error) && (
            <p className="mt-2 text-xs font-bold text-red-300">{photos.find((p) => p.error)?.error}</p>
          )}
          {photos.length < MAX_QUOTE_PHOTOS && (
            <label className="mt-5 flex h-14 cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-white/40 text-sm font-bold uppercase transition hover:border-sky has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky">
              <Camera width={20} height={20} /> {photos.length ? "Add another page" : "Take or upload a photo"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(ev) => {
                  addFiles(ev.target.files);
                  ev.target.value = "";
                }}
              />
            </label>
          )}
          <button
            type="button"
            disabled={sending || uploading || ready.length === 0}
            onClick={() => void send({ photos: ready.map((p) => p.url!) })}
            className="mt-4 flex h-14 w-full items-center justify-center gap-2 bg-sky px-6 text-sm font-bold uppercase text-ink transition hover:bg-sky-600 disabled:opacity-50"
          >
            {sending ? "Sending…" : uploading ? "Uploading…" : (
              <>
                Send my quote <ArrowUpRight />
              </>
            )}
          </button>
        </>
      )}

      {error && (
        <p role="alert" className="mt-4 border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={sending}
        onClick={() => void send({ sendLater: true })}
        className={
          uploadsOff
            ? "mt-5 flex h-14 w-full items-center justify-center bg-sky px-6 text-sm font-bold uppercase text-ink transition hover:bg-sky-600 disabled:opacity-50"
            : "mt-4 w-full py-2 text-sm font-bold text-white underline underline-offset-4 hover:text-sky disabled:opacity-50"
        }
      >
        I&apos;ll send it when you contact me
      </button>
    </div>
  );
}

type FieldProps = { id: string; "aria-invalid": boolean; "aria-describedby"?: string };

function Field({
  label,
  error,
  valid,
  children,
}: {
  label: string;
  error?: string;
  /** Shows a check in the input once it's filled in correctly. */
  valid?: boolean;
  children: (p: FieldProps) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-white">
        {label}
      </label>
      <div className="relative">
        {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-err` : undefined })}
        {valid && !error && (
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <Check width={18} height={18} />
          </span>
        )}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-bold text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
