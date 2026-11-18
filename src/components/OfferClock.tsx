"use client";

import { useEffect, useState } from "react";
import { EXTEND_DAYS, HOLD_DAYS, HOLD_STORAGE_KEY, formatCountdown, holdPhase, parseHoldStart } from "@/lib/offer-clock";

/*
 * The hold-timer bar under the header on clocked offers. The server render (and a visitor whose time
 * hasn't loaded yet) shows the plain 7-day line, which is true for a first visit; the live countdown
 * fills in after load. The bar's height is reserved so nothing jumps.
 *
 * The first visit comes from /api/offer-clock (a server-set cookie). localStorage only makes a returning
 * visitor's countdown show at once, and lets the server re-adopt the date if the cookie was cleared.
 */

function readStored(now: number) {
  try {
    return parseHoldStart(localStorage.getItem(HOLD_STORAGE_KEY), now);
  } catch {
    return null;
  }
}

export function OfferClock({ lead, label }: { lead: string; label: string }) {
  const [start, setStart] = useState<number | null>(null);
  // Server time minus browser time, so a wrong phone clock can't bend the deadline.
  const [skew, setSkew] = useState(0);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const local = readStored(Date.now());
    /* eslint-disable react-hooks/set-state-in-effect -- reading browser-only state once on mount */
    if (local !== null) setStart(local);
    setNow(Date.now());
    /* eslint-enable react-hooks/set-state-in-effect */
    const q = local !== null ? `?start=${local}` : "";
    fetch(`/api/offer-clock${q}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ start: number; now: number }>) : null))
      .then((d) => {
        if (!d) return;
        setSkew(d.now - Date.now());
        setStart(d.start);
        try {
          localStorage.setItem(HOLD_STORAGE_KEY, String(d.start));
        } catch {
          /* private mode: the cookie still works */
        }
      })
      .catch(() => undefined);
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const p = start !== null && now ? holdPhase(start, now + skew) : null;
  const left = p ? formatCountdown(p.endsAt - (now + skew)) : null;

  let text: React.ReactNode;
  if (!p || p.phase === "hold") {
    text = (
      <>
        <span className="hidden sm:inline">{lead} </span>Your {label} is held for{" "}
        <span className="whitespace-nowrap tabular-nums font-extrabold">{left ?? `${HOLD_DAYS} days`}</span>
      </>
    );
  } else if (p.phase === "extended") {
    text = (
      <>
        Good news: we added {EXTEND_DAYS} more days to your {label} rate. Ends in{" "}
        <span className="whitespace-nowrap tabular-nums font-extrabold">{left}</span>
      </>
    );
  } else {
    text = <>Your {label} hold has ended. Send your photos and we&apos;ll tell you what we can do.</>;
  }

  return (
    <div className="bg-sky print:hidden">
      <p
        role="timer"
        aria-live="off"
        suppressHydrationWarning
        className="mx-auto flex min-h-11 w-full max-w-[1164px] items-center justify-center px-4 py-2 text-center text-[13px] font-bold leading-snug text-ink sm:min-h-10 sm:px-6 sm:text-sm"
      >
        <span>{text}</span>
      </p>
    </div>
  );
}
