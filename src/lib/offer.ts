/*
 * Short form on the /offers/* ad funnel pages: a one-tap move size first, then name, phone and SMS consent.
 * We call or text within 15 minutes, so that's all we ask for.
 * Shared by <OfferForm> (browser checks) and /api/offer-leads (the real check). No server-only imports.
 */

import { EMAIL, LIMITS, normalizePhone, type Errors } from "@/lib/quote";

export const OFFER_SLUGS = ["move-out-special", "second-opinion", "flat-rate", "1499-flat-rate"] as const;
export type OfferSlug = (typeof OFFER_SLUGS)[number];

export const OFFER_LABELS: Record<OfferSlug, string> = {
  "move-out-special": "$1,500 Move-Out Special",
  "second-opinion": "Free Second Opinion",
  "flat-rate": "Free Flat Rate Quote",
  "1499-flat-rate": "$1,499 Flat Rate Move Special",
};

/**
 * Offers that ask for photos after the form is sent: of the customer's current quote (second opinion)
 * or of their home (so we can lock in a flat rate). `max` is the most photos they can add.
 */
/** What customers can tag each home photo with, so the office knows what they're looking at. */
export const HOME_ROOMS = [
  "Living room",
  "Kitchen",
  "Bedroom",
  "Dining room",
  "Garage",
  "Office",
  "Bathroom",
  "Patio or yard",
  "Storage or closet",
  "Other",
] as const;

export type PhotoKind = "quote" | "home";
export const PHOTO_STEPS: Partial<Record<OfferSlug, { kind: PhotoKind; max: number; labels?: readonly string[] }>> = {
  "move-out-special": { kind: "home", max: 10, labels: HOME_ROOMS },
  "second-opinion": { kind: "quote", max: 5 },
  "1499-flat-rate": { kind: "home", max: 10, labels: HOME_ROOMS },
};

/** One photo from the photo step, with the room (or other label) the customer picked for it. */
export type OfferPhoto = { url: string; label: string };
export const PHOTO_LABEL_MAX = 40;
export const MAX_OFFER_PHOTOS = Math.max(...Object.values(PHOTO_STEPS).map((s) => s.max));

/** Offers with a per-visitor hold timer (see lib/offer-clock.ts). */
export const CLOCKED_OFFERS: readonly OfferSlug[] = ["1499-flat-rate"];

/** Step 1 of the form: one easy tap before we ask for contact details. */
export const MOVE_SIZES = ["Studio or 1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms"] as const;
export type MoveSize = (typeof MOVE_SIZES)[number];

/** URL params worth keeping so the office can tell which ad a lead came from. */
export const AD_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

export type OfferLeadPayload = {
  name: string;
  phone: string;
  /** No longer asked on the form; "" when not given. Kept for older clients and the database column. */
  email?: string;
  /** From step 1, or "" if missing. */
  moveSize: MoveSize | "";
  /** YYYY-MM-DD, or "" / missing. No longer asked on the form. */
  moveDate?: string;
  smsConsent: boolean;
  offer: OfferSlug;
  /** Page the form was sent from. */
  page: string;
  /** Ad tracking params from the landing URL (see AD_PARAMS). */
  ad: Record<string, string>;
  /** Honeypot: must stay empty. */
  company: string;
  /**
   * Where the visitor's offer hold stood when they sent the form, for the office. Set by the server
   * from its own cookie, never taken from the request body.
   */
  holdNote?: string;
};

const NAME_LIMIT = LIMITS.nameLength * 2;

export function validateOfferLead(input: unknown): Errors {
  const e: Errors = {};
  const q = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof q[k] === "string" ? (q[k] as string).trim() : "");

  const name = str("name");
  if (!name) e.name = "Enter your name.";
  else if (name.length > NAME_LIMIT) e.name = "That name is too long.";
  if (!normalizePhone(str("phone"))) e.phone = "Enter a 10-digit US phone number.";
  const email = str("email");
  if (email && (!EMAIL.test(email) || email.length > 254)) e.email = "Enter a valid email address.";
  const size = str("moveSize");
  if (size && !(MOVE_SIZES as readonly string[]).includes(size)) e.moveSize = "Pick a move size.";
  const date = str("moveDate");
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) e.moveDate = "Pick a valid date.";
  if (typeof q.smsConsent !== "boolean") e.smsConsent = "Invalid consent value.";
  if (!OFFER_SLUGS.includes(q.offer as OfferSlug)) e.offer = "Unknown offer.";
  if (str("page").length > 200) e.page = "Invalid page.";
  const ad = q.ad;
  if (ad !== undefined) {
    const ok =
      ad !== null &&
      typeof ad === "object" &&
      Object.entries(ad).every(([k, v]) => (AD_PARAMS as readonly string[]).includes(k) && typeof v === "string" && v.length <= 300);
    if (!ok) e.ad = "Invalid tracking data.";
  }
  return e;
}

/** Splits one "Name" field into the first/last pair the CRM wants. */
export function splitName(full: string) {
  const [first, ...rest] = full.trim().split(/\s+/);
  return { first, last: rest.join(" ") || "-" };
}
