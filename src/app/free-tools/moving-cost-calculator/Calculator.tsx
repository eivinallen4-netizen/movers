"use client";

import { useState } from "react";
import { QuoteCard } from "@/components/QuoteHeroForm";
import { DISTANCES, HOME_SIZES, JUNK_LOADS, PACKING, STAIRS, STAIRS_FEE } from "@/content/pricing";

type Choice = { value: string; label: string };

const round10 = (n: number) => Math.round(n / 10) * 10;
const usd = (n: number) => `$${round10(n).toLocaleString("en-US")}`;
const pick = <T extends Choice>(list: readonly T[], v: string) => list.find((o) => o.value === v) ?? list[0];

/** Ballpark estimate from src/content/pricing.ts, then the quote form for an exact price. */
export function Calculator() {
  const [size, setSize] = useState("2br");
  const [distance, setDistance] = useState("under-25");
  const [stairs, setStairs] = useState("0");
  const [packing, setPacking] = useState("none");
  const [junk, setJunk] = useState("none");

  const h = pick(HOME_SIZES, size);
  const d = pick(DISTANCES, distance);
  const s = pick(STAIRS, stairs);
  const p = pick(PACKING, packing);
  const j = pick(JUNK_LOADS, junk);

  const move = h.base + s.count * STAIRS_FEE + d.fee + h.base * p.share;
  const low = move + j.low;
  const high = move + j.high;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="border border-ink bg-white p-5 offset-ink-sm sm:p-8">
          <Group label="1. How big is your home?" name="size" value={size} onChange={setSize} options={HOME_SIZES} />
          <Group label="2. How far are you moving?" name="distance" value={distance} onChange={setDistance} options={DISTANCES} />
          <Group label="3. How many staircases (both homes)?" name="stairs" value={stairs} onChange={setStairs} options={STAIRS} />
          <Group label="4. Need packing help?" name="packing" value={packing} onChange={setPacking} options={PACKING} />
          <Group label="5. Anything to haul away?" name="junk" value={junk} onChange={setJunk} options={JUNK_LOADS} last />
        </div>

        <div className="mt-10 bg-ink p-6 text-white sm:p-8" aria-live="polite">
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky">Your ballpark estimate</p>
          <p className="mt-2 text-4xl font-bold sm:text-5xl">
            {low === high ? (
              usd(low)
            ) : (
              <>
                {usd(low)} <span className="text-sky">–</span> {usd(high)}
              </>
            )}
          </p>
          <p className="mt-3 text-sm text-white/85">
            About {h.crew} movers, truck included. ${h.base.toLocaleString("en-US")} base
            {s.count > 0 ? ` + $${s.count * STAIRS_FEE} stairs` : ""}
            {d.fee > 0 ? ` + $${d.fee} distance` : ""}
            {p.share > 0 ? ` + $${round10(h.base * p.share).toLocaleString("en-US")} packing` : ""}
            {j.value !== "none" ? " + junk haul-away" : ""}.
          </p>
          <p className="mt-4 border-t border-white/20 pt-4 text-xs leading-5 text-white/70">
            This is a planning estimate based on typical Las Vegas local moves, not a quote. Heavy specialty items, long carries
            and parking can change it. We give you an exact, upfront price before moving day, with no surprises.
          </p>
        </div>
      </div>

      <div id="get-quote" className="scroll-mt-6">
        <div className="lg:sticky lg:top-6">
          <QuoteCard
            heading="Turn this into an exact price"
            sub="Tell us where you're moving from and to, and we'll build your exact, upfront quote."
          />
        </div>
      </div>
    </div>
  );
}

function Group({
  label,
  name,
  value,
  onChange,
  options,
  last,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly Choice[];
  last?: boolean;
}) {
  return (
    <fieldset className={last ? "" : "mb-7"}>
      <legend className="text-base font-bold text-ink">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`cursor-pointer border px-3 py-2 text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky ${
              value === o.value ? "border-ink bg-sky text-ink" : "border-ink-200 bg-white text-ink hover:border-ink"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
