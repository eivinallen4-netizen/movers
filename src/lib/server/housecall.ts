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
 *
 * What lands where in HouseCall Pro:
 *  - Quote form (/quote)    → Estimate ("needs scheduling") on the pickup address, with every item
 *                             photo attached and the full move details as a private note.
 *  - Short / ad-funnel form → Lead in the Job inbox, details as the lead note.
 *  - Second-opinion photos  → that Lead is converted to an Estimate and the photos attached.
 * Customers are matched by email or phone first, so a repeat customer doesn't get a duplicate.
 * Lead sources must exist in HouseCall Pro before they can be used; missing ones are created.
 */

const API = "https://api.housecallpro.com";

export const housecallEnabled = () => Boolean(process.env.HOUSECALL_PRO_API_KEY);

export const LEAD_SOURCES = {
  quote: "Website Quote Form",
  lead: "Website Contact Form",
  offer: "Website Ad Funnel",
  googleAds: "Google Ads",
  metaAds: "Facebook / Instagram Ads",
} as const;

/* ---------- notes the office reads ---------- */

const prettyDate = (ymd: string) =>
  new Date(`${ymd}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/** Readable summary the office sees on the estimate. Photos are attached separately. */
export function quoteNotes(q: QuotePayload) {
  const floor = (access: string, level: string) =>
    `${labelOf(ACCESS_TYPES, access)}, ${labelOf(FLOOR_LEVELS, level).toLowerCase()}`;
  const photoCount = q.items.reduce((n, it) => n + it.photos.length, 0);
  const lines = [
    "WEBSITE QUOTE REQUEST",
    `Move date: ${prettyDate(q.moveDate)} (${labelOf(PICKUP_WINDOWS, q.pickupWindow)} pickup)`,
    `Type: ${labelOf(MOVE_TYPES, q.moveType)} · Size: ${labelOf(MOVE_SIZES, q.moveSize)}`,
    `From: ${q.from!.label} [${floor(q.fromAccess, q.fromFloor)}]`,
    `To: ${q.to!.label} [${floor(q.toAccess, q.toFloor)}]`,
    `Phone: ${formatPhone(normalizePhone(q.phone)!)} · Email: ${q.email.trim()}`,
    q.hearAboutUs ? `Heard about us: ${labelOf(HEAR_ABOUT_US, q.hearAboutUs)}` : null,
    "",
    `ITEMS / ROOMS (${q.items.length}) · ${photoCount} photo${photoCount === 1 ? "" : "s"} attached:`,
    ...q.items.map(
      (it, i) =>
        `${i + 1}. ${it.name.trim()} (${labelOf(ITEM_CATEGORIES, it.category)}, ${it.photos.length} photo${it.photos.length === 1 ? "" : "s"})${it.notes?.trim() ? ` – ${it.notes.trim()}` : ""}`,
    ),
    q.additionalNotes?.trim() ? `\nCUSTOMER NOTES:\n${q.additionalNotes.trim()}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

/** Summary for a short lead-form request. */
export function leadNotes(l: LeadPayload) {
  return [
    "WEBSITE LEAD (short form)",
    `Service: ${labelOf(LEAD_SERVICES, l.service)}`,
    `Phone: ${formatPhone(normalizePhone(l.phone)!)} · Email: ${l.email.trim()}`,
    l.page ? `Sent from: ${l.page}` : null,
    l.details?.trim() ? `\nCUSTOMER NOTES:\n${l.details.trim()}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

/** Summary for an ad-funnel (/offers/*) request. */
export function offerLeadNotes(l: OfferLeadPayload) {
  const ad = Object.entries(l.ad ?? {}).map(([k, v]) => `${k}=${v}`).join(", ");
  return [
    `AD FUNNEL LEAD: ${OFFER_LABELS[l.offer]}`,
    "Promised a call or text within 15 minutes.",
    `Phone: ${formatPhone(normalizePhone(l.phone)!)} · Email: ${l.email.trim()}`,
    `Move size: ${l.moveSize || "not given"}`,
    l.moveDate ? `Move date: ${prettyDate(l.moveDate)}` : "Move date: not given",
    `SMS consent: ${l.smsConsent ? "yes" : "no"}`,
    l.page ? `Sent from: ${l.page}` : null,
    ad ? `Ad: ${ad}` : null,
    l.offer === "second-opinion" ? "Wants a second opinion on another mover's quote. Photo of the quote may follow on the website." : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

/** Ad-funnel leads are credited to the ad network when the click IDs / UTM tags say so. */
export function offerLeadSource(l: OfferLeadPayload) {
  const ad = l.ad ?? {};
  const src = (ad.utm_source ?? "").toLowerCase();
  if (ad.gclid || /google|adwords|youtube/.test(src)) return LEAD_SOURCES.googleAds;
  if (ad.fbclid || /facebook|^fb$|instagram|^ig$|meta/.test(src)) return LEAD_SOURCES.metaAds;
  return LEAD_SOURCES.offer;
}

/* ---------- HTTP ---------- */

export class HousecallError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function hcp<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Token ${process.env.HOUSECALL_PRO_API_KEY}`,
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HousecallError(`HouseCall Pro ${method} ${path.split("?")[0]} failed (${res.status}): ${text.slice(0, 300)}`, res.status);
  }
  return (await res.json()) as T;
}

async function hcpUpload(path: string, file: Blob, fileName: string) {
  const form = new FormData();
  form.append("file", file, fileName);
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: `Token ${process.env.HOUSECALL_PRO_API_KEY}`, Accept: "application/json" },
    body: form,
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HousecallError(`HouseCall Pro attachment upload failed (${res.status}): ${text.slice(0, 200)}`, res.status);
  }
}

/* ---------- lead sources ---------- */

const sourceCache = new Map<string, string>();

/** Returns the lead source name to send, creating it in HouseCall Pro if needed. Undefined if that fails. */
async function leadSource(name: string): Promise<string | undefined> {
  if (sourceCache.has(name)) return name;
  try {
    const { lead_sources } = await hcp<{ lead_sources: { name: string }[] }>("GET", "/lead_sources?page_size=200");
    for (const s of lead_sources) sourceCache.set(s.name, s.name);
    if (!sourceCache.has(name)) {
      await hcp("POST", "/lead_sources", { name });
      sourceCache.set(name, name);
    }
    return name;
  } catch (err) {
    // A record without a lead source beats no record at all.
    console.error(`[HouseCall Pro] couldn't set up lead source "${name}"`, err);
    return undefined;
  }
}

/* ---------- customers ---------- */

type HcpAddress = { id: string; street: string | null; zip: string | null };
type HcpCustomer = {
  id: string;
  email: string | null;
  mobile_number: string | null;
  home_number: string | null;
  work_number: string | null;
  addresses?: HcpAddress[];
};

const digits = (s: string | null | undefined) => (s ?? "").replace(/\D/g, "").slice(-10);
const ABBR: Record<string, string> = {
  avenue: "ave", street: "st", boulevard: "blvd", drive: "dr", road: "rd", lane: "ln", court: "ct",
  circle: "cir", parkway: "pkwy", place: "pl", highway: "hwy", terrace: "ter", trail: "trl",
  north: "n", south: "s", east: "e", west: "w", apartment: "apt", suite: "ste",
};
/** "3600 South Las Vegas Boulevard" and "3600 S Las Vegas Blvd" compare equal. */
const normStreet = (s: string) =>
  s
    .toLowerCase()
    .replace(/[.,#]/g, " ")
    .split(/s+/)
    .filter(Boolean)
    .map((w) => ABBR[w] ?? w)
    .join(" ");
const sameAddress = (h: HcpAddress, a: Address) =>
  (h.zip ?? "").slice(0, 5) === a.zip.slice(0, 5) && normStreet(h.street ?? "") === normStreet(streetOf(a));
const streetOf = (a: Address) => a.street || a.label.split(",")[0];

const hcpAddress = (a: Address) => ({
  street: streetOf(a),
  city: a.city,
  state: a.state,
  zip: a.zip,
  country: "US",
  type: "service",
});

/** Existing customer with this email or phone, so repeat customers keep one record. */
async function findCustomer(email: string, phone: string): Promise<HcpCustomer | null> {
  const search = (q: string) =>
    hcp<{ customers: HcpCustomer[] }>("GET", `/customers?q=${encodeURIComponent(q)}&page_size=25`).then((r) => r.customers);
  const e = email.trim().toLowerCase();
  const byEmail = (await search(e)).find((c) => c.email?.trim().toLowerCase() === e);
  if (byEmail) return byEmail;
  return (await search(phone)).find((c) => [c.mobile_number, c.home_number, c.work_number].some((n) => digits(n) === phone)) ?? null;
}

type CustomerInput = {
  first: string;
  last: string;
  email: string;
  phone: string; // 10 digits
  notificationsEnabled: boolean;
  leadSource?: string;
  tags: string[];
  addresses?: Address[];
};

/** Finds or creates the customer. Returns its id and the HouseCall Pro id of each given address, in order. */
async function upsertCustomer(c: CustomerInput): Promise<{ customerId: string; addressIds: string[] }> {
  const addresses = c.addresses ?? [];
  const existing = await findCustomer(c.email, c.phone);
  if (existing) {
    const known = existing.addresses ?? [];
    const addressIds: string[] = [];
    for (const a of addresses) {
      const match = known.find((h) => sameAddress(h, a));
      if (match) {
        addressIds.push(match.id);
      } else {
        const added = await hcp<HcpAddress>("POST", `/customers/${existing.id}/addresses`, hcpAddress(a));
        known.push(added);
        addressIds.push(added.id);
      }
    }
    return { customerId: existing.id, addressIds };
  }

  const created = await hcp<HcpCustomer>("POST", "/customers", {
    first_name: c.first,
    last_name: c.last,
    email: c.email.trim(),
    mobile_number: formatPhone(c.phone),
    notifications_enabled: c.notificationsEnabled,
    lead_source: c.leadSource,
    tags: c.tags,
    addresses: addresses.map(hcpAddress),
  });
  const known = created.addresses ?? [];
  return { customerId: created.id, addressIds: addresses.map((a, i) => (known.find((h) => sameAddress(h, a)) ?? known[i]).id) };
}

/* ---------- photos ---------- */

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "photo";

/** Cloudinary converts on the fly, so iPhone HEIC photos open as normal JPGs in HouseCall Pro. */
const asJpg = (url: string) => url.replace("/image/upload/", "/image/upload/f_jpg,q_85/");

async function fetchPhoto(url: string): Promise<Blob> {
  for (const u of [asJpg(url), url]) {
    const res = await fetch(u, { signal: AbortSignal.timeout(30_000) }).catch(() => null);
    if (res?.ok) return res.blob();
  }
  throw new Error(`Couldn't download ${url}`);
}

/** Attaches photos to an estimate option, 4 at a time. Returns the ones that failed, so they can be noted. */
async function attachPhotos(estimateId: string, optionId: string, photos: { url: string; name: string }[]) {
  const failed: typeof photos = [];
  const queue = [...photos];
  const worker = async () => {
    for (let p = queue.shift(); p; p = queue.shift()) {
      try {
        const blob = await fetchPhoto(p.url);
        await hcpUpload(`/estimates/${estimateId}/options/${optionId}/attachments`, blob, `${p.name}.jpg`);
      } catch (err) {
        console.error("[HouseCall Pro] photo attach failed", p.url, err);
        failed.push(p);
      }
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  return failed;
}

async function noteFailedPhotos(estimateId: string, optionId: string, failed: { url: string; name: string }[]) {
  if (failed.length === 0) return;
  await hcp("POST", `/estimates/${estimateId}/options/${optionId}/notes`, {
    content: `${failed.length} photo(s) couldn't be attached automatically. Open them here:\n${failed.map((p) => `${p.name}: ${p.url}`).join("\n")}`,
  }).catch((err) => console.error("[HouseCall Pro] failed-photo note", err));
}

/* ---------- the three hand-offs ---------- */

export type HousecallResult = { customerId: string; recordId: string };

type Estimate = { id: string; options: { id: string }[] };

/** Quote form → customer + Estimate with every item photo attached. recordId is "estimateId/optionId". */
export async function sendQuote(q: QuotePayload): Promise<HousecallResult> {
  const source = await leadSource(LEAD_SOURCES.quote);
  const tags = ["web-quote", q.moveType];
  const { customerId, addressIds } = await upsertCustomer({
    first: q.firstName.trim(),
    last: q.lastName.trim(),
    email: q.email,
    phone: normalizePhone(q.phone)!,
    notificationsEnabled: true,
    leadSource: source,
    tags,
    addresses: [q.from!, q.to!],
  });

  const estimate = await hcp<Estimate>("POST", "/estimates", {
    customer_id: customerId,
    address_id: addressIds[0],
    lead_source: source,
    note: quoteNotes(q),
    options: [
      {
        name: `${labelOf(MOVE_TYPES, q.moveType)} move – ${labelOf(MOVE_SIZES, q.moveSize)} – ${prettyDate(q.moveDate)}`,
        tags,
      },
    ],
  });
  const optionId = estimate.options[0].id;

  const photos = q.items.flatMap((it, i) =>
    it.photos.map((url, n) => ({ url, name: `${String(i + 1).padStart(2, "0")}-${slug(it.name)}-${n + 1}` })),
  );
  await noteFailedPhotos(estimate.id, optionId, await attachPhotos(estimate.id, optionId, photos));
  return { customerId, recordId: `${estimate.id}/${optionId}` };
}

async function sendInboxLead(c: CustomerInput, note: string): Promise<HousecallResult> {
  const { customerId } = await upsertCustomer(c);
  const lead = await hcp<{ id: string }>("POST", "/leads", {
    customer_id: customerId,
    lead_source: c.leadSource,
    note,
    tags: c.tags,
  });
  return { customerId, recordId: lead.id };
}

/** Short lead form → customer + Lead in the Job inbox. */
export async function sendLead(l: LeadPayload): Promise<HousecallResult> {
  return sendInboxLead(
    {
      first: l.firstName.trim(),
      last: l.lastName.trim(),
      email: l.email,
      phone: normalizePhone(l.phone)!,
      notificationsEnabled: true,
      leadSource: await leadSource(LEAD_SOURCES.lead),
      tags: ["web-lead", l.service],
    },
    leadNotes(l),
  );
}

/** Ad-funnel form → customer + Lead in the Job inbox, credited to the ad network when known. */
export async function sendOfferLead(l: OfferLeadPayload): Promise<HousecallResult> {
  const { first, last } = splitName(l.name);
  return sendInboxLead(
    {
      first,
      last,
      email: l.email,
      phone: normalizePhone(l.phone)!,
      notificationsEnabled: l.smsConsent,
      leadSource: await leadSource(offerLeadSource(l)),
      tags: ["web-offer", l.offer],
    },
    offerLeadNotes(l),
  );
}

/**
 * Second-opinion photos: the Lead becomes an Estimate (keeping its note) and the photos of the other
 * mover's quote are attached. `recordId` is the lead id, or "estimateId/optionId" if already converted.
 * Returns the estimate's recordId to store.
 */
export async function sendOfferQuotePhotos(customerId: string, recordId: string, photos: string[]): Promise<string> {
  let [estimateId, optionId] = recordId.split("/");
  if (!optionId) {
    // Converting twice makes a second estimate, so reuse an earlier conversion (e.g. on a retry).
    const lead = await hcp<{ conversions?: { type: string; id: string }[] }>("GET", `/leads/${recordId}`);
    const estimate_id =
      lead.conversions?.find((c) => c.type.toLowerCase() === "estimate")?.id ??
      (await hcp<{ estimate_id: string }>("POST", `/leads/${recordId}/convert`, { type: "estimate" })).estimate_id;
    // Both give the estimate's option id; find the estimate it belongs to.
    const { estimates } = await hcp<{ estimates: Estimate[] }>(
      "GET",
      `/estimates?customer_id=${encodeURIComponent(customerId)}&page_size=50&sort_direction=desc`,
    );
    const parent = estimates.find((e) => e.options.some((o) => o.id === estimate_id));
    if (!parent) throw new Error(`Converted lead ${recordId} but couldn't find estimate option ${estimate_id}`);
    [estimateId, optionId] = [parent.id, estimate_id];
  }
  await hcp("POST", `/estimates/${estimateId}/options/${optionId}/notes`, {
    content: `Customer uploaded ${photos.length} photo(s) of the other mover's quote (attached).`,
  });
  const failed = await attachPhotos(
    estimateId,
    optionId,
    photos.map((url, n) => ({ url, name: `competitor-quote-${n + 1}` })),
  );
  await noteFailedPhotos(estimateId, optionId, failed);
  return `${estimateId}/${optionId}`;
}
