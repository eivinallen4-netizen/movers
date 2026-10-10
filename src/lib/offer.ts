/*
 * Short form on the /offers/* ad funnel pages: a one-tap move size first, then name, phone, email,
 * optional move date and SMS consent.
 * Shared by <OfferForm> (browser checks) and /api/offer-leads (the real check). No server-only imports.
 */

import { EMAIL, LIMITS, normalizePhone, type Errors } from "@/lib/quote";

export const OFFER_SLUGS = ["move-out-special", "second-opinion", "flat-rate"] as const;
export type OfferSlug = (typeof OFFER_SLUGS)[number];

export const OFFER_LABELS: Record<OfferSlug, string> = {
  "move-out-special": "$1,500 Move-Out Special",
  "second-opinion": "Free Second Opinion",
  "flat-rate": "Free Flat Rate Quote",
};

/** Step 1 of the form: one easy tap before we ask for contact details. */
export const MOVE_SIZES = ["Studio or 1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms"] as const;
export type MoveSize = (typeof MOVE_SIZES)[number];

/** URL params worth keeping so the office can tell which ad a lead came from. */
export const AD_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

export type OfferLeadPayload = {
  name: string;
  phone: string;
  email: string;
  /** From step 1, or "" if missing. */
  moveSize: MoveSize | "";
  /** YYYY-MM-DD, or "" when they skip it. */
  moveDate: string;
  smsConsent: boolean;
  offer: OfferSlug;
  /** Page the form was sent from. */
  page: string;
  /** Ad tracking params from the landing URL (see AD_PARAMS). */
  ad: Record<string, string>;
  /** Honeypot: must stay empty. */
  company: string;
};

export const MAX_QUOTE_PHOTOS = 5;

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
  if (!EMAIL.test(email) || email.length > 254) e.email = "Enter a valid email address.";
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
