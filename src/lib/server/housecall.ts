import {
  ACCESS_TYPES,
  FLOOR_LEVELS,
  HEAR_ABOUT_US,
  ITEM_CATEGORIES,
  MOVE_SIZES,
  MOVE_TYPES,
  PICKUP_WINDOWS,
  formatPhone,
  labelOf,
  normalizePhone,
  type Address,
  type QuotePayload,
} from "@/lib/quote";
import { LEAD_SERVICES, type LeadPayload } from "@/lib/lead";
import { OFFER_LABELS, splitName, type OfferLeadPayload } from "@/lib/offer";

/*
 * HouseCall Pro public API (requires the MAX plan).
 * Env: HOUSECALL_PRO_API_KEY — Settings → App Store → API → Generate API key.
 */

const API = "https://api.housecallpro.com";

export const housecallEnabled = () => Boolean(process.env.HOUSECALL_PRO_API_KEY);

/** Readable summary the office sees on the customer record, including every photo link. */
export function quoteNotes(q: QuotePayload) {
  const floor = (access: string, level: string) =>
    `${labelOf(ACCESS_TYPES, access)}, ${labelOf(FLOOR_LEVELS, level).toLowerCase()}`;
  const lines = [
    "WEBSITE QUOTE REQUEST",
    `Move date: ${q.moveDate} (${labelOf(PICKUP_WINDOWS, q.pickupWindow)} pickup)`,
    `Type: ${labelOf(MOVE_TYPES, q.moveType)} · Size: ${labelOf(MOVE_SIZES, q.moveSize)}`,
    `From: ${q.from!.label} [${floor(q.fromAccess, q.fromFloor)}]`,
    `To: ${q.to!.label} [${floor(q.toAccess, q.toFloor)}]`,
    q.hearAboutUs ? `Heard about us: ${labelOf(HEAR_ABOUT_US, q.hearAboutUs)}` : null,
    "",
    `ITEMS / ROOMS (${q.items.length}):`,
    ...q.items.flatMap((it, i) => [
      `${i + 1}. ${it.name.trim()} (${labelOf(ITEM_CATEGORIES, it.category)})${it.notes?.trim() ? ` – ${it.notes.trim()}` : ""}`,
      ...it.photos.map((url, n) => `   Photo ${n + 1}: ${url}`),
    ]),
    q.additionalNotes?.trim() ? `\nCUSTOMER NOTES:\n${q.additionalNotes.trim()}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

const hcpAddress = (a: Address) => ({
  street: a.street || a.label.split(",")[0],
  city: a.city,
  state: a.state,
  zip: a.zip,
  country: "US",
  type: "service",
});

async function hcp<T>(path: string, body: unknown): Promise<T> {
  console.log(`[HouseCall Pro] POST ${API}${path}\n${JSON.stringify(body, null, 2)}`);
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.HOUSECALL_PRO_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HouseCall Pro ${path} failed (${res.status}): ${text.slice(0, 500)}`);
  }
  return (await res.json()) as T;
}

export async function createQuoteCustomer(q: QuotePayload) {
  const customer = await hcp<{ id: string }>("/customers", {
    first_name: q.firstName.trim(),
    last_name: q.lastName.trim(),
    email: q.email.trim(),
    mobile_number: formatPhone(normalizePhone(q.phone)!),
    notifications_enabled: true,
    lead_source: "Website quote form",
    tags: [
      "web-quote",
      q.moveType,
    ],
    notes: quoteNotes(q),
    addresses: [hcpAddress(q.from!), hcpAddress(q.to!)],
  });
  return customer.id;
}

/** Summary for a short lead-form request. */
export function leadNotes(l: LeadPayload) {
  return [
    "WEBSITE LEAD (short form)",
    `Service: ${labelOf(LEAD_SERVICES, l.service)}`,
    l.page ? `Sent from: ${l.page}` : null,
    l.details?.trim() ? `\nCUSTOMER NOTES:\n${l.details.trim()}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export async function createLeadCustomer(l: LeadPayload) {
  const customer = await hcp<{ id: string }>("/customers", {
    first_name: l.firstName.trim(),
    last_name: l.lastName.trim(),
    email: l.email.trim(),
    mobile_number: formatPhone(normalizePhone(l.phone)!),
    notifications_enabled: true,
    lead_source: "Website lead form",
    tags: ["web-lead", l.service],
    notes: leadNotes(l),
  });
  return customer.id;
}

/** Summary for an ad-funnel (/offers/*) request. */
export function offerLeadNotes(l: OfferLeadPayload) {
  const ad = Object.entries(l.ad ?? {}).map(([k, v]) => `${k}=${v}`).join(", ");
  return [
    `AD FUNNEL LEAD: ${OFFER_LABELS[l.offer]}`,
    "Promised a call or text within 15 minutes.",
    `Move size: ${l.moveSize || "not given"}`,
    l.moveDate ? `Move date: ${l.moveDate}` : "Move date: not given",
    `SMS consent: ${l.smsConsent ? "yes" : "no"}`,
    l.page ? `Sent from: ${l.page}` : null,
    ad ? `Ad: ${ad}` : null,
    l.offer === "second-opinion" ? "Wants a second opinion on another mover's quote. Photo of the quote may follow on the website." : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export async function createOfferLeadCustomer(l: OfferLeadPayload) {
  const { first, last } = splitName(l.name);
  const customer = await hcp<{ id: string }>("/customers", {
    first_name: first,
    last_name: last,
    email: l.email.trim(),
    mobile_number: formatPhone(normalizePhone(l.phone)!),
    notifications_enabled: l.smsConsent,
    lead_source: `Ad funnel: ${OFFER_LABELS[l.offer]}`,
    tags: ["web-offer", l.offer],
    notes: offerLeadNotes(l),
  });
  return customer.id;
}
