/*
 * Shared quote-form schema: option lists, types and validation.
 * Imported by the /quote wizard (per-step checks) AND /api/quotes (the real check),
 * so the browser and the server always agree on what a valid quote is.
 * Keep this file free of server-only imports.
 */

export type Option<V extends string = string> = { value: V; label: string };

const opts = <V extends string>(list: readonly (readonly [V, string])[]): Option<V>[] =>
  list.map(([value, label]) => ({ value, label }));

export const PICKUP_WINDOWS = opts([
  ["6-9am", "6 – 9 AM"],
  ["9am-12pm", "9 AM – 12 PM"],
  ["12-3pm", "12 – 3 PM"],
  ["3-6pm", "3 – 6 PM"],
] as const);

export const MOVE_TYPES = opts([
  ["local", "Local move"],
  ["long-distance", "Long-distance move"],
  ["commercial", "Commercial / office move"],
] as const);

export const MOVE_SIZES = opts([
  ["studio-1br", "Studio / 1 bedroom"],
  ["2-3br", "2 – 3 bedrooms"],
  ["4br-plus", "4+ bedrooms"],
] as const);

export const ACCESS_TYPES = opts([
  ["ground", "Ground floor / house"],
  ["walk-up", "Stairs (walk-up)"],
  ["elevator", "Elevator"],
] as const);

export const FLOOR_LEVELS = opts([
  ["ground", "Ground floor"],
  ["2", "2nd floor"],
  ["3", "3rd floor"],
  ["4-plus", "4th floor or higher"],
] as const);

export const YES_NO = opts([
  ["yes", "Yes"],
  ["no", "No"],
] as const);

export const ITEM_CATEGORIES = opts([
  ["kitchen", "Kitchen"],
  ["living-room", "Living room"],
  ["dining-room", "Dining room"],
  ["bedroom", "Bedroom"],
  ["bathroom", "Bathroom"],
  ["office", "Office"],
  ["garage", "Garage"],
  ["outdoor", "Patio / outdoor"],
  ["storage", "Closet / storage"],
  ["specialty", "Specialty item (piano, safe, pool table…)"],
  ["other", "Other"],
] as const);

/** Name an item gets automatically when this category is picked ("other" lets people type their own). */
export const itemNameFor = (category: string) =>
  category === "other" ? "" : labelOf(ITEM_CATEGORIES, category).replace(/\s*\(.*\)$/, "");

export const HEAR_ABOUT_US = opts([
  ["google", "Google search"],
  ["google-maps", "Google Maps"],
  ["social", "Facebook / Instagram / TikTok"],
  ["yelp", "Yelp"],
  ["referral", "Friend or family"],
  ["truck", "Saw our truck"],
  ["repeat", "I've used you before"],
  ["other", "Other"],
] as const);

/** Rooms pre-filled on the items step, by move size. */
export const DEFAULT_ROOMS: Record<string, [category: string, name: string][]> = {
  "studio-1br": [
    ["kitchen", "Kitchen"],
    ["living-room", "Living room"],
    ["bedroom", "Bedroom"],
    ["bathroom", "Bathroom"],
  ],
  "2-3br": [
    ["kitchen", "Kitchen"],
    ["living-room", "Living room"],
    ["bedroom", "Bedroom 1"],
    ["bedroom", "Bedroom 2"],
    ["bathroom", "Bathroom"],
  ],
  "4br-plus": [
    ["kitchen", "Kitchen"],
    ["living-room", "Living room"],
    ["dining-room", "Dining room"],
    ["bedroom", "Bedroom 1"],
    ["bedroom", "Bedroom 2"],
    ["bedroom", "Bedroom 3"],
    ["bedroom", "Bedroom 4"],
    ["bathroom", "Bathroom 1"],
    ["bathroom", "Bathroom 2"],
    ["garage", "Garage"],
  ],
};

export const LIMITS = {
  items: 30,
  photosPerItem: 8,
  nameLength: 60,
  itemNotesLength: 500,
  additionalNotesLength: 2000,
  /** Largest photo the upload route accepts (stays under Vercel's 4.5 MB request cap). */
  photoBytes: 4 * 1024 * 1024,
} as const;

/** An address picked from autocomplete. `token` is the server's signature over the other fields. */
export type Address = {
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lon: number;
  token: string;
};

export type QuoteItem = {
  id: string;
  name: string;
  category: string;
  notes: string;
  photos: string[]; // hosted image URLs
};

export type QuotePayload = {
  from: Address | null;
  to: Address | null;
  moveDate: string; // YYYY-MM-DD
  pickupWindow: string;
  moveType: string;
  moveSize: string;
  inPersonEstimate: string;
  storageNeeded: string;
  fromAccess: string;
  fromFloor: string;
  toAccess: string;
  toFloor: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hearAboutUs: string;
  items: QuoteItem[];
  additionalNotes: string;
  /** Honeypot: hidden from people, bots fill it in. Must stay empty. */
  company: string;
};

export type Errors = Record<string, string>;

export const labelOf = (list: Option[], value: string) => list.find((o) => o.value === value)?.label ?? value;

const isOneOf = (list: Option[], v: unknown) => typeof v === "string" && list.some((o) => o.value === v);

/** Today's date (YYYY-MM-DD) in Las Vegas, so "today" doesn't flip at 5pm Pacific on a UTC server. */
export function todayInVegas(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(now);
}

export function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return ten.length === 10 && /^[2-9]\d{2}[2-9]/.test(ten) ? ten : null;
}

export const formatPhone = (ten: string) => `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Which payload fields each wizard step owns (used to show only that step's errors). */
export const STEP_FIELDS: string[][] = [
  ["from", "to"],
  [
    "moveDate",
    "pickupWindow",
    "moveType",
    "moveSize",
    "inPersonEstimate",
    "storageNeeded",
    "fromAccess",
    "fromFloor",
    "toAccess",
    "toFloor",
  ],
  ["firstName", "lastName", "phone", "email", "hearAboutUs"],
  ["items"],
  ["additionalNotes"],
];

export const errorsForStep = (errors: Errors, step: number) =>
  Object.fromEntries(
    Object.entries(errors).filter(([k]) => STEP_FIELDS[step].some((f) => k === f || k.startsWith(`${f}.`))),
  );

/**
 * Validates a (possibly untrusted) payload. Returns field-path → message; empty means valid.
 * Address *signatures* are checked separately on the server (see address-token.ts).
 */
export function validateQuote(
  input: unknown,
  opts: { photoUrlPrefix?: string; requirePhotos?: boolean } = {},
): Errors {
  const e: Errors = {};
  const q = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof q[k] === "string" ? (q[k] as string).trim() : "");

  for (const k of ["from", "to"] as const) {
    const a = q[k] as Partial<Address> | null | undefined;
    const ok =
      a &&
      typeof a === "object" &&
      typeof a.label === "string" &&
      a.label.length > 0 &&
      typeof a.token === "string" &&
      Number.isFinite(a.lat) &&
      Number.isFinite(a.lon);
    if (!ok) e[k] = "Pick your address from the suggestions list.";
  }

  const date = str("moveDate");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) e.moveDate = "Choose your move date.";
  else if (date < todayInVegas()) e.moveDate = "Move date can't be in the past.";
  else if (Date.parse(date) - Date.parse(todayInVegas()) > 366 * 86_400_000)
    e.moveDate = "Pick a date within the next year.";

  const choice = (k: string, list: Option[], msg: string) => {
    if (!isOneOf(list, q[k])) e[k] = msg;
  };
  choice("pickupWindow", PICKUP_WINDOWS, "Choose a pickup time.");
  choice("moveType", MOVE_TYPES, "Choose the type of move.");
  choice("moveSize", MOVE_SIZES, "Choose the size of your move.");
  choice("inPersonEstimate", YES_NO, "Let us know yes or no.");
  choice("storageNeeded", YES_NO, "Let us know yes or no.");
  choice("fromAccess", ACCESS_TYPES, "Choose how we get in at pickup.");
  choice("fromFloor", FLOOR_LEVELS, "Choose the pickup floor.");
  choice("toAccess", ACCESS_TYPES, "Choose how we get in at drop-off.");
  choice("toFloor", FLOOR_LEVELS, "Choose the drop-off floor.");
  if (str("hearAboutUs") && !isOneOf(HEAR_ABOUT_US, q.hearAboutUs)) e.hearAboutUs = "Pick one from the list.";

  const first = str("firstName");
  const last = str("lastName");
  if (!first) e.firstName = "Enter your first name.";
  else if (first.length > LIMITS.nameLength) e.firstName = "That name is too long.";
  if (!last) e.lastName = "Enter your last name.";
  else if (last.length > LIMITS.nameLength) e.lastName = "That name is too long.";
  if (!normalizePhone(str("phone"))) e.phone = "Enter a 10-digit US phone number.";
  const email = str("email");
  if (!EMAIL.test(email) || email.length > 254) e.email = "Enter a valid email address.";

  const items = q.items;
  if (!Array.isArray(items) || items.length === 0) e.items = "Add at least one room or item.";
  else if (items.length > LIMITS.items) e.items = `Up to ${LIMITS.items} rooms/items per quote.`;
  else
    items.forEach((raw, i) => {
      const it = (raw && typeof raw === "object" ? raw : {}) as Partial<QuoteItem>;
      if (typeof it.name !== "string" || !it.name.trim()) {
        // Names come from the category, except "Other" where people type their own.
        if (it.category === "other") e[`items.${i}.name`] = "Tell us what this is.";
        else if (isOneOf(ITEM_CATEGORIES, it.category)) e[`items.${i}.name`] = "Give this a name.";
      } else if (it.name.length > LIMITS.nameLength) e[`items.${i}.name`] = "Keep the name short.";
      if (!isOneOf(ITEM_CATEGORIES, it.category)) e[`items.${i}.category`] = "Choose a category.";
      if (it.notes !== undefined && (typeof it.notes !== "string" || it.notes.length > LIMITS.itemNotesLength))
        e[`items.${i}.notes`] = `Notes are limited to ${LIMITS.itemNotesLength} characters.`;
      const photos = it.photos ?? [];
      if (!Array.isArray(photos) || photos.length > LIMITS.photosPerItem)
        e[`items.${i}.photos`] = `Up to ${LIMITS.photosPerItem} photos each.`;
      else if (opts.requirePhotos && photos.length === 0)
        e[`items.${i}.photos`] = "Take or upload at least one photo of this.";
      else if (
        opts.photoUrlPrefix &&
        photos.some((p) => typeof p !== "string" || !p.startsWith(opts.photoUrlPrefix!))
      )
        e[`items.${i}.photos`] = "One of these photos didn't upload correctly. Remove it and try again.";
    });

  const notes = q.additionalNotes;
  if (notes !== undefined && (typeof notes !== "string" || notes.length > LIMITS.additionalNotesLength))
    e.additionalNotes = `Notes are limited to ${LIMITS.additionalNotesLength} characters.`;

  return e;
}
