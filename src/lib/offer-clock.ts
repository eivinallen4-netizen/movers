/*
 * The hold timer on clocked ad offers (CLOCKED_OFFERS in lib/offer.ts).
 *
 * A visitor's rate is held for 7 days from their first visit, then extended once by 3 days, then the
 * hold ends. 60 days after the first visit (the ad's "moving in the next 60 days" window) the visitor is
 * forgotten, so a later visit starts a fresh hold. The first visit is kept in a server-set cookie
 * (Safari clears script-set cookies after 7 days) and mirrored in localStorage.
 *
 * Shared by the timer bar, /api/offer-clock and /api/offer-leads. No server-only imports.
 */

const DAY = 86_400_000;

export const HOLD_DAYS = 7;
export const EXTEND_DAYS = 3;
export const FORGET_DAYS = 60;
export const FORGET_MS = FORGET_DAYS * DAY;

export const HOLD_COOKIE = "mjr_offer_hold";
export const HOLD_STORAGE_KEY = "mjr-offer-hold";

export type HoldPhase = {
  phase: "hold" | "extended" | "ended";
  /** When the current phase runs out (ms). */
  endsAt: number;
  /** Day of the hold they're on, starting at 1. */
  day: number;
};

export function holdPhase(start: number, now: number): HoldPhase {
  const holdEnd = start + HOLD_DAYS * DAY;
  const extendEnd = holdEnd + EXTEND_DAYS * DAY;
  const day = Math.max(1, Math.floor((now - start) / DAY) + 1);
  if (now < holdEnd) return { phase: "hold", endsAt: holdEnd, day };
  if (now < extendEnd) return { phase: "extended", endsAt: extendEnd, day };
  return { phase: "ended", endsAt: extendEnd, day };
}

/** A first-visit time (ms) from a cookie, query string or storage, or null if missing, in the future or forgotten. */
export function parseHoldStart(raw: string | null | undefined, now: number): number | null {
  if (!raw || !/^\d{12,14}$/.test(raw)) return null;
  const start = Number(raw);
  if (start > now + 60_000 || start <= now - FORGET_MS) return null;
  return Math.min(start, now);
}

/** "2d 23h 14m 09s" */
export function formatCountdown(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86_400);
  const h = Math.floor((s % 86_400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return `${d}d ${h}h ${m}m ${sec}s`;
}

const vegasDate = (ms: number) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", month: "short", day: "numeric" }).format(ms);

/** One line for the HouseCall Pro note, so the office knows whether the hold was still running. */
export function holdNote(start: number | null, now: number) {
  if (start === null) return "Offer hold: no first-visit date on record (cookies may be off).";
  const p = holdPhase(start, now);
  const first = `first visit ${vegasDate(start)}`;
  if (p.phase === "hold") return `Offer hold: ${first}, held until ${vegasDate(p.endsAt)} (day ${p.day} of ${HOLD_DAYS}).`;
  if (p.phase === "extended") return `Offer hold: ${first}, sent during the ${EXTEND_DAYS}-day extension (ends ${vegasDate(p.endsAt)}).`;
  return `Offer hold: ${first}. SENT AFTER THE HOLD ENDED on ${vegasDate(p.endsAt)}. Office decides whether to honor the offer price.`;
}
