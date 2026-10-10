"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AddressInput, type AddressValue } from "@/components/AddressInput";
import { ArrowUpRight, Camera, Check, Phone } from "@/components/icons";
import { PHONE, PHONE_HREF } from "@/content/site";
import { uploadPhoto } from "@/lib/image";
import {
  ACCESS_TYPES,
  DEFAULT_ROOMS,
  FLOOR_LEVELS,
  HEAR_ABOUT_US,
  ITEM_CATEGORIES,
  LIMITS,
  MOVE_SIZES,
  MOVE_TYPES,
  PICKUP_WINDOWS,
  STEP_FIELDS,
  errorsForStep,
  itemNameFor,
  labelOf,
  todayInVegas,
  validateQuote,
  type Errors,
  type Option,
  type QuotePayload,
} from "@/lib/quote";

const STEPS = ["Addresses", "Move details", "Contact", "Items & photos", "Review"];

const HEADINGS: [title: string, sub: string][] = [
  ["Where are you moving?", "Start typing, then pick your address from the list."],
  ["Tell us about your move", "Tap the options that fit. Stairs and floors help us send the right crew."],
  ["Where should we send your quote?", "We only use this to send your price and confirm details."],
  ["What are we moving?", "A photo of each room lets us price it exactly, with no surprises on moving day."],
  ["Review & send", "Check everything looks right, then send it over."],
];

type Photo = { id: string; preview: string; url?: string; error?: string };
type Item = { id: string; name: string; category: string; notes: string; photos: Photo[] };

type Details = Omit<QuotePayload, "from" | "to" | "items">;

const without = (e: Errors, key: string) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== key));

const newId = () => Math.random().toString(36).slice(2, 10);

const roomsFor = (size: string): Item[] =>
  (DEFAULT_ROOMS[size] ?? []).map(([category, name]) => ({ id: newId(), name, category, notes: "", photos: [] }));

export function QuoteWizard({
  initialFrom,
  initialTo,
}: {
  initialFrom: AddressValue;
  initialTo: AddressValue;
}) {
  // Both addresses already verified from the homepage → start on step 2.
  const [step, setStep] = useState(initialFrom.selected && initialTo.selected ? 1 : 0);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [d, setD] = useState<Details>({
    moveDate: "",
    pickupWindow: "",
    moveType: "",
    moveSize: "",
    fromAccess: "",
    fromFloor: "",
    toAccess: "",
    toFloor: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    hearAboutUs: "",
    additionalNotes: "",
    company: "",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [itemsEdited, setItemsEdited] = useState(false);
  const [seededFor, setSeededFor] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  // Free the in-memory photo previews when leaving the page.
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  useEffect(
    () => () => itemsRef.current.forEach((it) => it.photos.forEach((p) => URL.revokeObjectURL(p.preview))),
    [],
  );

  const set = <K extends keyof Details>(k: K, v: Details[K]) => {
    setD((x) => ({ ...x, [k]: v }));
    setErrors((e) => without(e, k));
  };

  const payload = (): QuotePayload => ({
    ...d,
    from: from.selected,
    to: to.selected,
    items: items.map((it) => ({
      id: it.id,
      name: it.name,
      category: it.category,
      notes: it.notes,
      photos: it.photos.flatMap((p) => (p.url ? [p.url] : [])),
    })),
  });

  const uploading = items.some((it) => it.photos.some((p) => !p.url && !p.error));

  /** Full validation, plus a clearer message for items whose only photo is still uploading. */
  const check = () => {
    const all = validateQuote(payload());
    items.forEach((it, i) => {
      if (all[`items.${i}.photos`] && it.photos.some((p) => !p.url && !p.error))
        all[`items.${i}.photos`] = "Hang on, this photo is still uploading.";
    });
    return all;
  };

  const goTo = (n: number) => {
    setStep(n);
    setSubmitError("");
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      cardRef.current?.querySelector<HTMLElement>("h2")?.focus();
    });
  };

  const next = () => {
    const stepErrors = errorsForStep(check(), step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      // Tile groups are fieldsets, which can't take focus: land on their first tile instead.
      requestAnimationFrame(() => {
        const bad = cardRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
        (bad?.tagName === "FIELDSET" ? bad.querySelector<HTMLElement>("button") : bad)?.focus();
      });
      return;
    }
    // Pre-fill rooms from the move size, unless the customer already edited the list.
    if (step === 1 && (!itemsEdited || items.length === 0) && seededFor !== d.moveSize) {
      setItems(roomsFor(d.moveSize));
      setSeededFor(d.moveSize);
      setItemsEdited(false);
    }
    goTo(step + 1);
  };

  const submit = async () => {
    const all = check();
    if (Object.keys(all).length > 0) {
      setErrors(all);
      goTo(STEP_FIELDS.findIndex((_, i) => Object.keys(errorsForStep(all, i)).length > 0));
      return;
    }
    setStatus("sending");
    setSubmitError("");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: Errors };
      if (res.ok) {
        setStatus("sent");
        requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
      setStatus("idle");
      if (data.errors) {
        setErrors(data.errors);
        const first = STEP_FIELDS.findIndex((_, i) => Object.keys(errorsForStep(data.errors!, i)).length > 0);
        if (first >= 0 && first !== step) goTo(first);
      }
      setSubmitError(data.error ?? "Something went wrong. Please try again or call us.");
    } catch {
      setStatus("idle");
      setSubmitError("You seem to be offline. Check your connection and try again.");
    }
  };

  /* ----- items ----- */
  const editItems = (fn: (list: Item[]) => Item[]) => {
    setItems(fn);
    setItemsEdited(true);
  };
  const updateItem = (id: string, patch: Partial<Item>) =>
    editItems((list) => list.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  /** Picking a category names the item after it ("Bedroom 2" if there's already one). "Other" is typed in. */
  const setCategory = (id: string, category: string) =>
    editItems((list) => {
      const base = itemNameFor(category);
      const taken = new Set(list.filter((x) => x.id !== id).map((x) => x.name.trim().toLowerCase()));
      let name = base;
      for (let n = 2; base && taken.has(name.toLowerCase()); n++) name = `${base} ${n}`;
      return list.map((it) => (it.id === id ? { ...it, category, name } : it));
    });
  const setPhoto = (itemId: string, photoId: string, patch: Partial<Photo>) =>
    setItems((list) =>
      list.map((it) =>
        it.id === itemId ? { ...it, photos: it.photos.map((p) => (p.id === photoId ? { ...p, ...patch } : p)) } : it,
      ),
    );

  const addPhotos = (itemId: string, files: FileList | null) => {
    if (!files) return;
    const item = items.find((it) => it.id === itemId);
    const room = LIMITS.photosPerItem - (item?.photos.length ?? 0);
    const accepted = Array.from(files)
      .filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name))
      .slice(0, Math.max(0, room));
    const added = accepted.map((file) => ({ file, photo: { id: newId(), preview: URL.createObjectURL(file) } }));
    editItems((list) =>
      list.map((it) => (it.id === itemId ? { ...it, photos: [...it.photos, ...added.map((a) => a.photo)] } : it)),
    );
    if (added.length > 0) {
      const i = items.findIndex((it) => it.id === itemId);
      setErrors((x) => without(x, `items.${i}.photos`));
    }
    for (const { file, photo } of added) {
      uploadPhoto(file)
        .then((url) => setPhoto(itemId, photo.id, { url }))
        .catch((err: Error) => setPhoto(itemId, photo.id, { error: err.message }));
    }
  };

  const removePhoto = (itemId: string, photo: Photo) => {
    URL.revokeObjectURL(photo.preview);
    editItems((list) =>
      list.map((it) => (it.id === itemId ? { ...it, photos: it.photos.filter((p) => p.id !== photo.id) } : it)),
    );
  };

  if (status === "sent") {
    return (
      <Shell cardRef={cardRef}>
        <div className="py-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center bg-sky text-ink">
            <Check width={28} height={28} />
          </span>
          <h2 className="mt-5 text-3xl font-bold">Got it, {d.firstName.trim()}!</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-600">
            Your quote request is in. A real person from our Las Vegas crew will reach out at{" "}
            <strong className="text-ink">{d.phone}</strong> shortly with your price. No surprises.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center gap-2 bg-sky px-8 text-sm font-bold uppercase text-ink hover:bg-sky-600"
          >
            Back to home <ArrowUpRight />
          </Link>
        </div>
      </Shell>
    );
  }

  const e = errors;
  const last = step === STEPS.length - 1;
  return (
    <Shell
      cardRef={cardRef}
      aside={
        <MoveSummary
          from={from.selected?.label}
          to={to.selected?.label}
          date={formatDate(d.moveDate, true)}
          time={d.pickupWindow && labelOf(PICKUP_WINDOWS, d.pickupWindow)}
          size={d.moveSize && labelOf(MOVE_SIZES, d.moveSize)}
          items={step >= 3 ? items.length : 0}
        />
      }
    >
      <Progress step={step} onJump={(n) => n < step && goTo(n)} />

      <p className="mt-8 text-xs font-extrabold uppercase tracking-widest text-sky-700">
        Step {step + 1} of {STEPS.length}
      </p>
      <h2 tabIndex={-1} className="mt-1 text-2xl font-bold leading-tight outline-none sm:text-3xl">
        {HEADINGS[step][0]}
      </h2>
      <p className="mt-2 text-[15px] leading-6 text-ink-600">{HEADINGS[step][1]}</p>

      <form
        noValidate
        className="mt-7"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (step < STEPS.length - 1) next();
          else void submit();
        }}
      >
        {/* Honeypot: invisible to people, tempting to bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" value={d.company} onChange={(ev) => set("company", ev.target.value)} />
          </label>
        </div>

        {step === 0 && (
          <div className="grid gap-5">
            <AddressInput
              label="Moving from *"
              value={from}
              onChange={(v) => {
                setFrom(v);
                if (v.selected) setErrors((x) => without(x, "from"));
              }}
              error={e.from}
            />
            <AddressInput
              label="Moving to *"
              value={to}
              onChange={(v) => {
                setTo(v);
                if (v.selected) setErrors((x) => without(x, "to"));
              }}
              error={e.to}
            />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 sm:grid-cols-2 [&>*]:min-w-0">
            <Field label="Move date *" error={e.moveDate}>
              {(p) => (
                <input
                  {...p}
                  type="date"
                  min={todayInVegas()}
                  value={d.moveDate}
                  onChange={(ev) => set("moveDate", ev.target.value)}
                  className={`${inputCls(p["aria-invalid"])} block min-w-0 max-w-full appearance-none [&::-webkit-date-and-time-value]:text-left`}
                />
              )}
            </Field>
            <OneOf label="Type of move *" options={MOVE_TYPES} value={d.moveType} onChange={(v) => set("moveType", v)} error={e.moveType} />
            <div className="sm:col-span-2">
              <OneOf label="Pickup time *" cols={4} options={PICKUP_WINDOWS} value={d.pickupWindow} onChange={(v) => set("pickupWindow", v)} error={e.pickupWindow} />
            </div>
            <div className="sm:col-span-2">
              <OneOf label="Size of move *" cols={3} options={MOVE_SIZES} value={d.moveSize} onChange={(v) => set("moveSize", v)} error={e.moveSize} />
            </div>

            <Location
              title="Pickup location"
              address={from.selected?.label}
              access={d.fromAccess}
              floor={d.fromFloor}
              onAccess={(v) => {
                set("fromAccess", v);
                // Ground needs no floor question; stairs/elevator can't be on the ground floor.
                if (v === "ground") set("fromFloor", "ground");
                else if (d.fromFloor === "ground") set("fromFloor", "");
              }}
              onFloor={(v) => set("fromFloor", v)}
              errors={{ access: e.fromAccess, floor: e.fromFloor }}
            />
            <Location
              title="Drop-off location"
              address={to.selected?.label}
              access={d.toAccess}
              floor={d.toFloor}
              onAccess={(v) => {
                set("toAccess", v);
                if (v === "ground") set("toFloor", "ground");
                else if (d.toFloor === "ground") set("toFloor", "");
              }}
              onFloor={(v) => set("toFloor", v)}
              errors={{ access: e.toAccess, floor: e.toFloor }}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
            <Text label="First name *" autoComplete="given-name" value={d.firstName} onChange={(v) => set("firstName", v)} error={e.firstName} />
            <Text label="Last name *" autoComplete="family-name" value={d.lastName} onChange={(v) => set("lastName", v)} error={e.lastName} />
            <Text
              label="Phone *"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="(702) 555-0123"
              value={d.phone}
              onChange={(v) => set("phone", formatPhoneInput(v, d.phone))}
              error={e.phone}
            />
            <Text label="Email *" type="email" autoComplete="email" inputMode="email" placeholder="you@email.com" value={d.email} onChange={(v) => set("email", v)} error={e.email} />
            <p className="flex items-start gap-2.5 border border-l-4 border-ink-200 border-l-sky px-4 py-3 text-sm leading-6 text-ink sm:col-span-2">
              <Check className="mt-1 shrink-0" />
              <span>
                <strong>No spam, no sales calls.</strong> We never share your info. We just text or call with your
                price.
              </span>
            </p>
            <div className="sm:col-span-2">
              <Select
                label="How did you hear about us?"
                placeholder="Choose one (optional)"
                options={HEAR_ABOUT_US}
                value={d.hearAboutUs}
                onChange={(v) => set("hearAboutUs", v)}
                error={e.hearAboutUs}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <p className="text-sm leading-6 text-ink-600">
              We filled in rooms for a {labelOf(MOVE_SIZES, d.moveSize).toLowerCase()} move. Remove or add anything, then{" "}
              <strong className="text-ink">take at least one picture of each</strong>. Pick &ldquo;Other&rdquo; to name
              something yourself.
            </p>
            {e.items && <p className="text-sm font-bold text-red-600">{e.items}</p>}
            {items.length > 0 && <PhotoProgress items={items} />}
            {items.map((it, i) => (
              <ItemCard
                key={it.id}
                index={i}
                item={it}
                errors={e}
                onChange={(patch) => {
                  if (patch.category !== undefined) setCategory(it.id, patch.category);
                  else updateItem(it.id, patch);
                  setErrors((x) =>
                    Object.fromEntries(Object.entries(x).filter(([k]) => k !== "items" && !k.startsWith(`items.${i}.`))),
                  );
                }}
                onRemove={() => {
                  it.photos.forEach((p) => URL.revokeObjectURL(p.preview));
                  editItems((list) => list.filter((x) => x.id !== it.id));
                  setErrors({});
                }}
                onAddPhotos={(files) => addPhotos(it.id, files)}
                onRemovePhoto={(p) => removePhoto(it.id, p)}
              />
            ))}
            {items.length < LIMITS.items && (
              <button
                type="button"
                onClick={() =>
                  editItems((list) => [...list, { id: newId(), name: "", category: "", notes: "", photos: [] }])
                }
                className="h-12 border-2 border-dashed border-ink-200 bg-white text-sm font-bold hover:border-sky"
              >
                + Add a room or item
              </button>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-5">
            <Summary title="Addresses" onEdit={() => goTo(0)}>
              <p>
                <strong>From:</strong> {from.selected?.label}
                <br />
                <span className="text-ink-600">
                  {labelOf(ACCESS_TYPES, d.fromAccess)} · {labelOf(FLOOR_LEVELS, d.fromFloor)}
                </span>
              </p>
              <p className="mt-2">
                <strong>To:</strong> {to.selected?.label}
                <br />
                <span className="text-ink-600">
                  {labelOf(ACCESS_TYPES, d.toAccess)} · {labelOf(FLOOR_LEVELS, d.toFloor)}
                </span>
              </p>
            </Summary>
            <Summary title="Move" onEdit={() => goTo(1)}>
              <p>
                {formatDate(d.moveDate)}, {labelOf(PICKUP_WINDOWS, d.pickupWindow)} pickup
                <br />
                {labelOf(MOVE_TYPES, d.moveType)} · {labelOf(MOVE_SIZES, d.moveSize)}
              </p>
            </Summary>
            <Summary title="Contact" onEdit={() => goTo(2)}>
              <p>
                {d.firstName} {d.lastName}
                <br />
                {d.phone} · {d.email}
              </p>
            </Summary>
            <Summary title={`Items (${items.length})`} onEdit={() => goTo(3)}>
              <ul className="space-y-1">
                {items.map((it) => {
                  const done = it.photos.filter((p) => p.url).length;
                  const failed = it.photos.filter((p) => p.error).length;
                  return (
                    <li key={it.id}>
                      {it.name} <span className="text-ink-600">({labelOf(ITEM_CATEGORIES, it.category)})</span>
                      {done > 0 && <span className="text-ink-600"> · {done} photo{done > 1 ? "s" : ""}</span>}
                      {failed > 0 && <span className="text-red-600"> · {failed} failed, won&apos;t be sent</span>}
                    </li>
                  );
                })}
              </ul>
            </Summary>
            <Field label="Anything else we should know?" error={e.additionalNotes}>
              {(p) => (
                <textarea
                  {...p}
                  rows={4}
                  maxLength={LIMITS.additionalNotesLength}
                  placeholder="Gate codes, fragile or heavy items, tight deadlines…"
                  value={d.additionalNotes}
                  onChange={(ev) => set("additionalNotes", ev.target.value)}
                  className={`${inputCls(p["aria-invalid"])} h-auto py-3`}
                />
              )}
            </Field>
          </div>
        )}

        {submitError && (
          <p role="alert" className="mt-6 border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
            {submitError}
          </p>
        )}

        <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-ink-200 bg-white px-4 py-4 sm:static sm:mx-0 sm:px-0 sm:pb-0 sm:pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="h-12 px-1 text-sm font-bold uppercase tracking-wider text-sky-700 hover:underline"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={status === "sending" || (last && uploading)}
            className="flex h-12 flex-1 items-center justify-center gap-2 bg-sky px-6 text-sm font-bold uppercase text-ink transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-60 sm:flex-none sm:px-8"
          >
            {!last ? (
              <>
                <span className="sm:hidden">Next</span>
                <span className="hidden sm:inline">Next: {STEPS[step + 1]}</span>
              </>
            ) : status === "sending" ? (
              "Sending…"
            ) : uploading ? (
              "Uploading photos…"
            ) : (
              "Get my free quote"
            )}
            <ArrowUpRight />
          </button>
        </div>
        {last && (
          <p className="mt-3 text-center text-xs text-ink-600 sm:text-right">Free and no obligation. We reply with your price.</p>
        )}
      </form>
    </Shell>
  );
}

/* ---------------- pieces ---------------- */

function Shell({
  children,
  cardRef,
  aside,
}: {
  children: ReactNode;
  cardRef: React.RefObject<HTMLDivElement | null>;
  aside?: ReactNode;
}) {
  return (
    <div
      className={`mx-auto -mt-16 grid w-full gap-10 px-4 pb-16 sm:-mt-20 sm:px-6 sm:pb-24 ${
        aside ? "max-w-[1164px] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start" : "max-w-[760px]"
      }`}
    >
      <div ref={cardRef} className="min-w-0 scroll-mt-4 border border-ink bg-white p-4 offset-sky-sm sm:p-10 lg:mr-2">
        {children}
      </div>
      {aside && <aside className="grid gap-6 lg:sticky lg:top-6">{aside}</aside>}
    </div>
  );
}

/** Numbered stepper: done steps show a check and can be clicked to go back. */
function Progress({ step, onJump }: { step: number; onJump: (n: number) => void }) {
  return (
    <ol className="flex items-start" aria-label="Quote progress">
      {STEPS.map((s, i) => {
        const done = i < step;
        const now = i === step;
        return (
          <li key={s} className="relative flex flex-1 flex-col items-center">
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-1/2 top-4 h-0.5 w-full ${done ? "bg-sky" : "bg-ink-200"}`}
              />
            )}
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={!done}
              aria-current={now ? "step" : undefined}
              aria-label={`${s}${done ? " (done, go back)" : ""}`}
              className="relative flex flex-col items-center gap-2 disabled:cursor-default"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center border-2 text-sm font-extrabold transition ${
                  done
                    ? "border-ink bg-ink hover:border-sky"
                    : now
                      ? "border-ink bg-sky text-ink"
                      : "border-ink-200 bg-white text-ink-600"
                }`}
              >
                {done ? <Check width={14} height={14} /> : i + 1}
              </span>
              <span
                className={`hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-wider sm:block ${
                  now ? "text-ink" : "text-ink-600"
                }`}
              >
                {s}
              </span>
            </button>
          </li>
        );
      })}
      <li className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </li>
    </ol>
  );
}

const inputCls = (invalid?: boolean) =>
  `h-12 w-full min-w-0 border bg-white px-3 text-base text-ink sm:text-sm outline-none focus:ring-2 focus:ring-sky read-only:cursor-default read-only:bg-sky-100/50 read-only:focus:ring-0 ${
    invalid ? "border-red-500 ring-1 ring-red-500" : "border-ink-200"
  }`;

type FieldProps = { id: string; "aria-invalid": boolean; "aria-describedby"?: string };

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: (p: FieldProps) => ReactNode;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-err` : undefined })}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-bold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
  error,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <Field label={label} error={error}>
      {(p) => (
        <input
          {...rest}
          {...p}
          value={value}
          maxLength={rest.type === "email" ? 254 : LIMITS.nameLength}
          onChange={(ev) => onChange(ev.target.value)}
          className={inputCls(p["aria-invalid"])}
        />
      )}
    </Field>
  );
}

function Select({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Choose one",
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} error={error}>
      {(p) => (
        <select {...p} value={value} onChange={(ev) => onChange(ev.target.value)} className={inputCls(p["aria-invalid"])}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

/** Toggle buttons where at most one can be on: ticking one unticks the other, ticking it again clears it. */
function OneOf({
  label,
  options,
  value,
  onChange,
  error,
  cols = 2,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  cols?: 1 | 2 | 3 | 4;
}) {
  const id = useId();
  const grid = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-1 sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-4" }[cols];
  return (
    <fieldset className="min-w-0" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-1.5 text-sm font-bold">{label}</legend>
      <div className={`grid gap-2 ${grid}`}>
        {options.map((o) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? "" : o.value)}
              className={`flex min-h-12 min-w-0 touch-manipulation items-center gap-2.5 border px-3 py-2 text-left text-sm font-bold leading-tight outline-none transition focus-visible:ring-2 focus-visible:ring-sky ${
                on
                  ? "border-ink bg-sky-100 shadow-[3px_3px_0_0_var(--color-sky)]"
                  : error
                    ? "border-red-500 bg-white"
                    : "border-ink-200 bg-white hover:border-ink"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 ${on ? "border-ink bg-ink text-white" : "border-ink-200 bg-white"}`}
              >
                {on && <Check width={12} height={12} />}
              </span>
              <span className="min-w-0">{o.label}</span>
            </button>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs font-bold text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Shorter floor labels for the tiles; "ground" is implied by the access choice. */
const UPPER_FLOORS: Option[] = [
  { value: "2", label: "2nd" },
  { value: "3", label: "3rd" },
  { value: "4-plus", label: "4+" },
];

function Location({
  title,
  address,
  access,
  floor,
  onAccess,
  onFloor,
  errors,
}: {
  title: string;
  address?: string;
  access: string;
  floor: string;
  onAccess: (v: string) => void;
  onFloor: (v: string) => void;
  errors: { access?: string; floor?: string };
}) {
  return (
    <section className="grid min-w-0 content-start gap-4 border border-ink-200 bg-white p-4">
      <div className="min-w-0">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-sky-700">{title}</h3>
        {address && <p className="mt-1 truncate text-sm text-ink-600">{address}</p>}
      </div>
      <OneOf label="How do we get in? *" cols={1} options={ACCESS_TYPES} value={access} onChange={onAccess} error={errors.access} />
      {access && access !== "ground" && (
        <OneOf label="Which floor? *" cols={3} options={UPPER_FLOORS} value={floor} onChange={onFloor} error={errors.floor} />
      )}
    </section>
  );
}

/** Sidebar: the move so far, plus why to trust us. Fills in as the customer goes. */
function MoveSummary({
  from,
  to,
  date,
  time,
  size,
  items,
}: {
  from?: string;
  to?: string;
  date: string;
  time: string;
  size: string;
  items: number;
}) {
  const rows: [string, string][] = [
    ["Date", [date, time].filter(Boolean).join(" · ")],
    ["Size", size],
    ["Rooms & items", items ? String(items) : ""],
  ];
  return (
    <>
      <div className="border border-ink bg-ink p-5 text-white offset-sky-sm sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-sky">Your move</p>
        <ol className="mt-4 grid gap-3 border-l-2 border-sky pl-4 text-sm">
          <li>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-white/60">From</span>
            <span className="font-bold">{from ?? "—"}</span>
          </li>
          <li>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-white/60">To</span>
            <span className="font-bold">{to ?? "—"}</span>
          </li>
        </ol>
        <dl className="mt-5 grid gap-2 border-t border-white/15 pt-4 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-white/60">{k}</dt>
              <dd className="text-right font-bold">{v || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hidden border border-ink-200 p-5 sm:block sm:p-6">
        <ul className="grid gap-3 text-[15px] leading-6">
          {["Upfront pricing, no hidden fees", "Free quote, no obligation", "Local Las Vegas crew", "Same-day moves available"].map(
            (t) => (
              <li key={t} className="flex gap-2.5">
                <Check className="mt-1 shrink-0" />
                {t}
              </li>
            ),
          )}
        </ul>
        <a
          href={PHONE_HREF}
          className="mt-5 flex items-center gap-2 border-t border-ink-200 pt-4 text-sm font-bold text-ink hover:text-sky-700"
        >
          <Phone className="text-sky-700" width={18} height={18} /> Rather talk? {PHONE}
        </a>
      </div>
    </>
  );
}

/** "(702) 555-0123" as they type. Leaves the text alone when deleting or for anything that isn't a plain 10-digit number. */
function formatPhoneInput(next: string, prev: string) {
  if (next.length < prev.length) return next;
  const digits = next.replace(/\D/g, "");
  if (digits.length > 10 || digits.startsWith("1")) return next;
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** "3 of 5 have photos" bar above the item list. */
function PhotoProgress({ items }: { items: Item[] }) {
  const done = items.filter(hasPhoto).length;
  const complete = done === items.length;
  return (
    <div
      role="status"
      className={`flex items-center gap-3 border-l-4 px-3 py-2 text-sm font-bold ${
        complete ? "border-sky bg-sky-100 text-ink" : "border-amber-500 bg-amber-50 text-amber-900"
      }`}
    >
      {complete ? <Check /> : <Camera />}
      {complete
        ? "All set: every room and item has a photo."
        : `${done} of ${items.length} have a photo. ${items.length - done} still need one.`}
    </div>
  );
}

/** An item counts as done once at least one photo is uploaded or uploading. */
const hasPhoto = (it: Item) => it.photos.some((p) => !p.error);

function ItemCard({
  index,
  item,
  errors,
  onChange,
  onRemove,
  onAddPhotos,
  onRemovePhoto,
}: {
  index: number;
  item: Item;
  errors: Errors;
  onChange: (patch: Partial<Item>) => void;
  onRemove: () => void;
  onAddPhotos: (files: FileList | null) => void;
  onRemovePhoto: (p: Photo) => void;
}) {
  const e = (k: string) => errors[`items.${index}.${k}`];
  const full = item.photos.length >= LIMITS.photosPerItem;
  const done = hasPhoto(item);
  return (
    <div className={`border-l-4 border bg-white p-4 ${done ? "border-ink-200 border-l-sky" : "border-ink-200 border-l-amber-500"}`}>
      <p
        className={`mb-3 inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold uppercase ${
          done ? "bg-sky-100 text-ink" : "bg-amber-100 text-amber-900"
        }`}
      >
        {done ? (
          <>
            <Check width={12} height={12} /> Photo added
          </>
        ) : (
          "Photo needed"
        )}
      </p>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
        <Select
          label="Category"
          options={ITEM_CATEGORIES}
          value={item.category}
          onChange={(v) => onChange({ category: v })}
          error={e("category")}
        />
        <Text
          label="Name"
          value={item.name}
          onChange={(v) => onChange({ name: v })}
          error={e("name")}
          readOnly={item.category !== "other"}
          tabIndex={item.category === "other" ? undefined : -1}
          placeholder={item.category === "other" ? "What is it? e.g. Treadmill" : "Pick a category first"}
          title={item.category === "other" ? undefined : "Choose “Other” to type your own name"}
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name || "this item"}`}
          className="h-12 px-3 text-sm font-bold text-ink-600 hover:text-red-600 sm:mt-[26px]"
        >
          Remove
        </button>
      </div>

      <input
        aria-label={`Notes for ${item.name || "this item"}`}
        placeholder="Notes (optional): big or fragile items, piano, safe…"
        maxLength={LIMITS.itemNotesLength}
        value={item.notes}
        onChange={(ev) => onChange({ notes: ev.target.value })}
        className={`${inputCls(Boolean(e("notes")))} mt-3`}
      />

      <div className="mt-3">
        {item.photos.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2">
            {item.photos.map((p) => (
              <li key={p.id} className="relative h-20 w-20 overflow-hidden border border-ink-200 bg-sky-100">
                {/* Local object-URL preview, so next/image doesn't apply. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt="" className={`h-full w-full object-cover ${p.url ? "" : "opacity-50"}`} />
                {!p.url && !p.error && (
                  <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-0.5 text-center text-[10px] font-bold text-white">
                    Uploading…
                  </span>
                )}
                {p.error && (
                  <span
                    title={p.error}
                    className="absolute inset-x-0 bottom-0 bg-red-600 py-0.5 text-center text-[10px] font-bold text-white"
                  >
                    Failed
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onRemovePhoto(p)}
                  aria-label="Remove photo"
                  className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center bg-ink text-xs font-bold text-white"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        {item.photos.some((p) => p.error) && (
          <p className="mb-2 text-xs font-bold text-red-600">
            {item.photos.find((p) => p.error)!.error} Remove it and try again.
          </p>
        )}
        {e("photos") && <p className="mb-2 text-xs font-bold text-red-600">{e("photos")}</p>}
        {!full && (
          <PhotoButton label={item.photos.length > 0 ? "Take another picture" : "Take a picture"} onFiles={onAddPhotos} />
        )}
      </div>
    </div>
  );
}

/** One button. On phones the OS offers camera or photo library; on desktop it opens the file picker. */
function PhotoButton({ label, onFiles }: { label: string; onFiles: (f: FileList | null) => void }) {
  return (
    <label className="inline-flex h-11 cursor-pointer items-center gap-2 border border-ink bg-white px-4 text-xs font-bold uppercase hover:bg-sky-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky">
      <Camera />
      {label}
      <input
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(ev) => {
          onFiles(ev.target.files);
          ev.target.value = "";
        }}
      />
    </label>
  );
}

function Summary({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <section className="border border-ink-200 p-4 text-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wide text-ink-600">{title}</h3>
        <button type="button" onClick={onEdit} className="text-xs font-bold text-sky-700 hover:underline">
          Edit
        </button>
      </div>
      {children}
    </section>
  );
}

const formatDate = (iso: string, short = false) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString(
        "en-US",
        short
          ? { weekday: "short", month: "short", day: "numeric" }
          : { weekday: "long", month: "long", day: "numeric", year: "numeric" },
      )
    : "";
