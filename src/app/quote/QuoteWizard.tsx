"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AddressInput, type AddressValue } from "@/components/AddressInput";
import { ArrowUpRight, Camera, Check } from "@/components/icons";
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
      requestAnimationFrame(() => cardRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
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
  return (
    <Shell cardRef={cardRef}>
      <Progress step={step} onJump={(n) => n < step && goTo(n)} />

      <h2 tabIndex={-1} className="mt-8 text-2xl font-bold outline-none sm:text-3xl">
        {
          [
            "Where are you moving?",
            "Tell us about your move",
            "How do we reach you?",
            "What are we moving?",
            "Review & send",
          ][step]
        }
      </h2>

      <form
        noValidate
        className="mt-6"
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
            <p className="text-xs text-ink-600">Start typing, then pick your address from the list.</p>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Move date *" error={e.moveDate}>
              {(p) => (
                <input
                  {...p}
                  type="date"
                  min={todayInVegas()}
                  value={d.moveDate}
                  onChange={(ev) => set("moveDate", ev.target.value)}
                  className={inputCls(p["aria-invalid"])}
                />
              )}
            </Field>
            <Select label="Pickup time *" options={PICKUP_WINDOWS} value={d.pickupWindow} onChange={(v) => set("pickupWindow", v)} error={e.pickupWindow} />
            <OneOf label="Type of move *" options={MOVE_TYPES} value={d.moveType} onChange={(v) => set("moveType", v)} error={e.moveType} />
            <Select label="Size of move *" options={MOVE_SIZES} value={d.moveSize} onChange={(v) => set("moveSize", v)} error={e.moveSize} />

            <fieldset className="grid gap-4 border border-ink-200 bg-white p-4 sm:col-span-1">
              <legend className="px-1 text-sm font-bold">Pickup location</legend>
              <Select
                label="Access *"
                options={ACCESS_TYPES}
                value={d.fromAccess}
                onChange={(v) => {
                  set("fromAccess", v);
                  if (v === "ground") set("fromFloor", "ground");
                }}
                error={e.fromAccess}
              />
              <Select label="Floor *" options={FLOOR_LEVELS} value={d.fromFloor} onChange={(v) => set("fromFloor", v)} error={e.fromFloor} />
            </fieldset>
            <fieldset className="grid gap-4 border border-ink-200 bg-white p-4 sm:col-span-1">
              <legend className="px-1 text-sm font-bold">Drop-off location</legend>
              <Select
                label="Access *"
                options={ACCESS_TYPES}
                value={d.toAccess}
                onChange={(v) => {
                  set("toAccess", v);
                  if (v === "ground") set("toFloor", "ground");
                }}
                error={e.toAccess}
              />
              <Select label="Floor *" options={FLOOR_LEVELS} value={d.toFloor} onChange={(v) => set("toFloor", v)} error={e.toFloor} />
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Text label="First name *" autoComplete="given-name" value={d.firstName} onChange={(v) => set("firstName", v)} error={e.firstName} />
            <Text label="Last name *" autoComplete="family-name" value={d.lastName} onChange={(v) => set("lastName", v)} error={e.lastName} />
            <Text label="Phone *" type="tel" autoComplete="tel" inputMode="tel" value={d.phone} onChange={(v) => set("phone", v)} error={e.phone} />
            <Text label="Email *" type="email" autoComplete="email" inputMode="email" value={d.email} onChange={(v) => set("email", v)} error={e.email} />
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
            <p className="text-sm text-ink-600">
              We filled in rooms for a {labelOf(MOVE_SIZES, d.moveSize).toLowerCase()} move. Remove or add anything, then{" "}
              <strong className="text-ink">take at least one picture of each</strong> so we can give you an exact price.
              Pick &ldquo;Other&rdquo; to name something yourself.
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="text-sm font-bold text-sky-700 hover:underline">
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={status === "sending" || (step === STEPS.length - 1 && uploading)}
            className="flex h-12 items-center gap-2 bg-sky px-8 text-sm font-bold uppercase text-ink transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-60"
          >
            {step < STEPS.length - 1
              ? "Next"
              : status === "sending"
                ? "Sending…"
                : uploading
                  ? "Uploading photos…"
                  : "Get My Quote"}
            <ArrowUpRight />
          </button>
        </div>
      </form>
    </Shell>
  );
}

/* ---------------- pieces ---------------- */

function Shell({ children, cardRef }: { children: ReactNode; cardRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-10 sm:px-6 sm:py-14">
      <div ref={cardRef} className="scroll-mt-4 border border-ink bg-white p-5 offset-sky-sm sm:p-10">
        {children}
      </div>
    </div>
  );
}

function Progress({ step, onJump }: { step: number; onJump: (n: number) => void }) {
  return (
    <ol className="flex gap-1.5" aria-label="Quote progress">
      {STEPS.map((s, i) => (
        <li key={s} className="flex-1">
          <button
            type="button"
            onClick={() => onJump(i)}
            disabled={i >= step}
            aria-current={i === step ? "step" : undefined}
            className="block w-full text-left disabled:cursor-default"
          >
            <span className={`block h-1.5 ${i <= step ? "bg-sky" : "bg-ink-200"}`} />
            <span
              className={`mt-2 hidden text-[11px] font-bold uppercase sm:block ${i === step ? "text-ink" : "text-ink-600"}`}
            >
              {s}
            </span>
          </button>
        </li>
      ))}
      <li className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </li>
    </ol>
  );
}

const inputCls = (invalid?: boolean) =>
  `h-12 w-full border bg-white px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-sky read-only:cursor-default read-only:bg-sky-100/50 read-only:focus:ring-0 ${
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
    <div>
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

/** Checkboxes where at most one can be ticked: ticking one unticks the other, ticking it again clears it. */
function OneOf({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <fieldset aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-1.5 text-sm font-bold">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex h-12 cursor-pointer items-center gap-2.5 border px-3 text-sm font-bold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky ${
                on ? "border-ink bg-sky-100" : error ? "border-red-500 bg-white" : "border-ink-200 bg-white hover:border-sky"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => onChange(on ? "" : o.value)}
                className="h-5 w-5 shrink-0 cursor-pointer accent-ink"
              />
              {o.label}
            </label>
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

const formatDate = (iso: string) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";
