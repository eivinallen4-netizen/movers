"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressInput, emptyAddress, type AddressValue } from "./AddressInput";
import { ArrowUpRight, Phone } from "./icons";
import type { Address } from "@/lib/quote";

const toRef = (a: Address) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(a))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

/**
 * The site's only quote form: from/to addresses, then hands off to the full /quote wizard.
 * The home hero renders it bare; inner pages wrap it in <QuoteCard>.
 */
export function QuoteHeroForm({ id = "quote", className = "mt-8 max-w-[460px]" }: { id?: string; className?: string }) {
  const router = useRouter();
  const [from, setFrom] = useState<AddressValue>(emptyAddress);
  const [to, setTo] = useState<AddressValue>(emptyAddress);
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});

  return (
    <form
      id={id}
      noValidate
      className={`flex flex-col gap-4 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const next = {
          from: from.selected ? undefined : "Pick your pickup address from the list.",
          to: to.selected ? undefined : "Pick your drop-off address from the list.",
        };
        setErrors(next);
        if (next.from || next.to) return;
        const params = new URLSearchParams({
          from: from.selected!.label,
          fromRef: toRef(from.selected!),
          to: to.selected!.label,
          toRef: toRef(to.selected!),
        });
        router.push(`/quote?${params}`);
      }}
    >
      <AddressInput
        tone="dark"
        hideLabel
        label="Moving from"
        placeholder="Moving from (address)"
        value={from}
        onChange={(v) => {
          setFrom(v);
          if (v.selected) setErrors((x) => ({ ...x, from: undefined }));
        }}
        error={errors.from}
      />
      <AddressInput
        tone="dark"
        hideLabel
        label="Moving to"
        placeholder="Moving to (address)"
        value={to}
        onChange={(v) => {
          setTo(v);
          if (v.selected) setErrors((x) => ({ ...x, to: undefined }));
        }}
        error={errors.to}
      />
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          className="flex h-12 items-center gap-2 bg-sky px-8 text-sm font-bold uppercase text-ink transition hover:bg-sky-600"
        >
          Get Quote <ArrowUpRight />
        </button>
        <a href="tel:+17025278565" className="flex items-center gap-2 text-sm font-bold text-white">
          <Phone className="text-sky" width={22} height={22} /> Or call us now
        </a>
      </div>
    </form>
  );
}

/** Dark panel holding the hero quote form, for inner pages and sidebars. */
export function QuoteCard({
  heading = "Get your free quote",
  sub = "Tell us where you're moving and get an honest, upfront price in minutes.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <div className="border border-ink bg-ink p-5 text-white offset-sky-sm sm:p-7">
      <p className="text-2xl font-bold leading-tight">{heading}</p>
      <p className="mt-2 text-sm leading-6 text-white/80">{sub}</p>
      <QuoteHeroForm id="quote-form" className="mt-6" />
    </div>
  );
}
