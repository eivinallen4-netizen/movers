"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Address } from "@/lib/quote";

/** Text the customer typed, plus the suggestion they picked (null until they pick one). */
export type AddressValue = { text: string; selected: Address | null };

export const emptyAddress: AddressValue = { text: "", selected: null };

/**
 * Autocomplete address box. Only a picked suggestion counts: typing after picking
 * clears the selection, so the value can't drift away from the verified address.
 */
export function AddressInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  tone = "light",
  hideLabel = false,
}: {
  label: string;
  placeholder?: string;
  value: AddressValue;
  onChange: (v: AddressValue) => void;
  error?: string;
  tone?: "light" | "dark";
  hideLabel?: boolean;
}) {
  const id = useId();
  const [results, setResults] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const query = value.selected ? "" : value.text.trim();
  useEffect(() => {
    if (query.length < 3) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`, { signal: ctrl.signal });
        const data = (await res.json()) as { results?: Address[]; error?: string };
        setResults(data.results ?? []);
        setLookupError(data.error ?? "");
        setActive(-1);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setLookupError("Address lookup is unavailable right now.");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const pick = (a: Address) => {
    onChange({ text: a.label, selected: a });
    setOpen(false);
    setResults([]);
  };

  const showList = open && !value.selected && query.length >= 3;
  const listId = `${id}-list`;
  const dark = tone === "dark";
  const message = error || lookupError;

  return (
    <div ref={boxRef} className="relative">
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : `mb-1.5 block text-sm font-bold ${dark ? "text-white" : "text-ink"}`}
      >
        {label}
      </label>
      <div className="relative">
      <input
        id={id}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? `${id}-msg` : undefined}
        autoComplete="off"
        placeholder={placeholder ?? "Start typing your address"}
        value={value.text}
        onChange={(e) => {
          onChange({ text: e.target.value, selected: null });
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!showList || results.length === 0) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (a + 1) % results.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (a <= 0 ? results.length - 1 : a - 1));
          } else if (e.key === "Enter" && active >= 0) {
            e.preventDefault();
            pick(results[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`h-14 w-full bg-white px-3 pr-10 text-sm text-ink outline-none placeholder:text-ink-600 focus:ring-2 focus:ring-sky ${
          error ? "ring-2 ring-red-500" : dark ? "" : "border border-ink-200"
        }`}
      />
      {value.selected && (
        <span aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-sky-700">
          ✓
        </span>
      )}
      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute left-0 right-0 top-full z-30 max-h-72 overflow-y-auto border border-ink-200 bg-white text-sm text-ink shadow-[8px_8px_0_0_var(--color-sky)]"
        >
          {loading && results.length === 0 && <li className="px-3 py-3 text-ink-600">Searching…</li>}
          {!loading && results.length === 0 && !lookupError && (
            <li className="px-3 py-3 text-ink-600">No matches yet. Keep typing your street address.</li>
          )}
          {results.map((r, i) => (
            <li
              key={r.token}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onPointerDown={(e) => {
                e.preventDefault();
                pick(r);
              }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-3 py-3 ${i === active ? "bg-sky-100" : ""}`}
            >
              {r.label}
            </li>
          ))}
        </ul>
      )}
      </div>
      {message && (
        <p id={`${id}-msg`} className={`mt-1.5 text-xs font-bold ${dark ? "text-red-300" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
