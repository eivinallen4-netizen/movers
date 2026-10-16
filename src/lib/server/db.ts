import { createClient, type Client } from "@libsql/client/web";
import { formatPhone, normalizePhone, type Address, type QuotePayload } from "@/lib/quote";
import type { LeadPayload } from "@/lib/lead";
import type { OfferLeadPayload } from "@/lib/offer";

/*
 * Turso (hosted SQLite) database: every quote request is saved here, including each item and
 * its photo links, so nothing is lost if HouseCall Pro is down or not set up.
 * Free plan: https://turso.tech (no card). Create a database, then copy its URL and a token.
 *
 * Env: TURSO_DATABASE_URL (libsql://…), TURSO_AUTH_TOKEN
 *
 * Tables are created automatically on first use.
 */

let client: Client | null = null;
let ready: Promise<void> | null = null;

export const dbEnabled = () => Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    status TEXT NOT NULL DEFAULT 'new',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    hear_about_us TEXT,
    move_date TEXT NOT NULL,
    pickup_window TEXT NOT NULL,
    move_type TEXT NOT NULL,
    move_size TEXT NOT NULL,
    in_person_estimate INTEGER NOT NULL,
    storage_needed INTEGER NOT NULL,
    from_label TEXT NOT NULL,
    from_street TEXT, from_city TEXT, from_state TEXT, from_zip TEXT,
    from_lat REAL, from_lon REAL,
    from_access TEXT NOT NULL,
    from_floor TEXT NOT NULL,
    to_label TEXT NOT NULL,
    to_street TEXT, to_city TEXT, to_state TEXT, to_zip TEXT,
    to_lat REAL, to_lon REAL,
    to_access TEXT NOT NULL,
    to_floor TEXT NOT NULL,
    additional_notes TEXT,
    housecall_customer_id TEXT,
    housecall_error TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS quote_items (
    id TEXT PRIMARY KEY,
    quote_id TEXT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    notes TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS quote_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id TEXT NOT NULL REFERENCES quote_items(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    url TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    status TEXT NOT NULL DEFAULT 'new',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT NOT NULL,
    details TEXT,
    page TEXT,
    housecall_customer_id TEXT,
    housecall_error TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS offer_leads (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    status TEXT NOT NULL DEFAULT 'new',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    move_size TEXT,
    move_date TEXT,
    sms_consent INTEGER NOT NULL,
    offer TEXT NOT NULL,
    page TEXT,
    ad_params TEXT,
    quote_photos TEXT,
    quote_send_later INTEGER NOT NULL DEFAULT 0,
    housecall_customer_id TEXT,
    housecall_error TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS quotes_created_at ON quotes(created_at)`,
  `CREATE INDEX IF NOT EXISTS leads_created_at ON leads(created_at)`,
  `CREATE INDEX IF NOT EXISTS offer_leads_created_at ON offer_leads(created_at)`,
  `CREATE INDEX IF NOT EXISTS quote_items_quote ON quote_items(quote_id)`,
  `CREATE INDEX IF NOT EXISTS quote_photos_item ON quote_photos(item_id)`,
];

const MIGRATIONS = [
  "ALTER TABLE offer_leads ADD COLUMN move_size TEXT",
  ...["quotes", "leads", "offer_leads"].flatMap((t) => [
    // HouseCall Pro lead id, or "estimateId/optionId" for estimates.
    `ALTER TABLE ${t} ADD COLUMN housecall_record_id TEXT`,
    `ALTER TABLE ${t} ADD COLUMN housecall_attempts INTEGER NOT NULL DEFAULT 0`,
  ]),
  // Second-opinion quote photos: null = nothing to send, then 'pending', 'sent' or the error text.
  "ALTER TABLE offer_leads ADD COLUMN housecall_quote_status TEXT",
];

async function db() {
  if (!dbEnabled()) throw new Error("Turso is not configured.");
  client ??= createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  ready ??= client.batch(SCHEMA, "write").then(
    // Columns added after the tables were first made. Each fails harmlessly once it's there.
    () => Promise.all(MIGRATIONS.map((sql) => client!.execute(sql).catch(() => undefined))).then(() => undefined),
    (err) => {
      ready = null; // try again next request
      throw err;
    },
  );
  await ready;
  return client;
}

const addr = (a: Address) => [a.label, a.street, a.city, a.state, a.zip, a.lat, a.lon];

/** Saves the whole quote in one transaction. Returns the new quote id. */
export async function saveQuote(q: QuotePayload): Promise<string> {
  const c = await db();
  const quoteId = crypto.randomUUID();
  await c.batch(
    [
      {
        sql: `INSERT INTO quotes (
          id, first_name, last_name, phone, email, hear_about_us,
          move_date, pickup_window, move_type, move_size, in_person_estimate, storage_needed,
          from_label, from_street, from_city, from_state, from_zip, from_lat, from_lon, from_access, from_floor,
          to_label, to_street, to_city, to_state, to_zip, to_lat, to_lon, to_access, to_floor,
          additional_notes
        ) VALUES (${Array(31).fill("?").join(", ")})`,
        args: [
          quoteId,
          q.firstName.trim(),
          q.lastName.trim(),
          formatPhone(normalizePhone(q.phone)!),
          q.email.trim(),
          q.hearAboutUs || null,
          q.moveDate,
          q.pickupWindow,
          q.moveType,
          q.moveSize,
          0, // in_person_estimate: no longer asked
          0, // storage_needed: no longer asked
          ...addr(q.from!),
          q.fromAccess,
          q.fromFloor,
          ...addr(q.to!),
          q.toAccess,
          q.toFloor,
          q.additionalNotes?.trim() || null,
        ],
      },
      ...q.items.flatMap((it, i) => {
        const itemId = crypto.randomUUID();
        return [
          {
            sql: "INSERT INTO quote_items (id, quote_id, position, name, category, notes) VALUES (?, ?, ?, ?, ?, ?)",
            args: [itemId, quoteId, i, it.name.trim(), it.category, it.notes?.trim() || null],
          },
          ...it.photos.map((url, n) => ({
            sql: "INSERT INTO quote_photos (item_id, position, url) VALUES (?, ?, ?)",
            args: [itemId, n, url],
          })),
        ];
      }),
    ],
    "write",
  );
  return quoteId;
}

/** Saves a short lead-form request (name, phone, email, service). Returns the new lead id. */
export async function saveLead(l: LeadPayload): Promise<string> {
  const c = await db();
  const id = crypto.randomUUID();
  await c.execute({
    sql: `INSERT INTO leads (id, first_name, last_name, phone, email, service, details, page)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      l.firstName.trim(),
      l.lastName.trim(),
      formatPhone(normalizePhone(l.phone)!),
      l.email.trim(),
      l.service,
      l.details?.trim() || null,
      l.page?.trim() || null,
    ],
  });
  return id;
}

/** Saves an ad-funnel form (/offers/*). Returns the new lead id, which the second-opinion step uses. */
export async function saveOfferLead(l: OfferLeadPayload): Promise<string> {
  const c = await db();
  const id = crypto.randomUUID();
  await c.execute({
    sql: `INSERT INTO offer_leads (id, name, phone, email, move_size, move_date, sms_consent, offer, page, ad_params)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      l.name.trim(),
      formatPhone(normalizePhone(l.phone)!),
      l.email.trim(),
      l.moveSize || null,
      l.moveDate?.trim() || null,
      l.smsConsent ? 1 : 0,
      l.offer,
      l.page?.trim() || null,
      l.ad && Object.keys(l.ad).length ? JSON.stringify(l.ad) : null,
    ],
  });
  return id;
}

/** Second-opinion step: photos of their current quote, or "send it when you contact me". False if no such lead. */
export async function setOfferQuote(id: string, q: { photos: string[] } | { sendLater: true }): Promise<boolean> {
  const c = await db();
  const res = await c.execute({
    sql: "UPDATE offer_leads SET quote_photos = ?, quote_send_later = ?, housecall_quote_status = ? WHERE id = ? AND offer = 'second-opinion'",
    args: "photos" in q ? [JSON.stringify(q.photos), 0, "pending", id] : [null, 1, null, id],
  });
  return res.rowsAffected > 0;
}

export type HousecallTable = "quotes" | "leads" | "offer_leads";

/** Records how the HouseCall Pro hand-off went, so failed ones are retried and can be followed up by hand. */
export async function markHousecall(
  table: HousecallTable,
  id: string,
  result: { customerId: string; recordId: string } | { error: string },
) {
  const c = await db();
  await c.execute({
    sql: `UPDATE ${table} SET housecall_customer_id = ?, housecall_record_id = ?, housecall_error = ?,
          housecall_attempts = housecall_attempts + 1 WHERE id = ?`,
    args: "error" in result ? [null, null, result.error.slice(0, 1000), id] : [result.customerId, result.recordId, null, id],
  });
}

/** Where a second-opinion lead stands in HouseCall Pro, plus its quote photos. Null if no such lead. */
export async function getOfferLeadHousecall(id: string) {
  const c = await db();
  const { rows } = await c.execute({
    sql: "SELECT housecall_customer_id, housecall_record_id, quote_photos FROM offer_leads WHERE id = ?",
    args: [id],
  });
  const r = rows[0];
  if (!r) return null;
  return {
    customerId: (r.housecall_customer_id as string | null) ?? null,
    recordId: (r.housecall_record_id as string | null) ?? null,
    photos: r.quote_photos ? (JSON.parse(r.quote_photos as string) as string[]) : [],
  };
}

export async function markOfferQuoteHousecall(id: string, result: { recordId: string } | { error: string }) {
  const c = await db();
  await c.execute(
    "error" in result
      ? { sql: "UPDATE offer_leads SET housecall_quote_status = ? WHERE id = ?", args: [result.error.slice(0, 1000), id] }
      : { sql: "UPDATE offer_leads SET housecall_quote_status = 'sent', housecall_record_id = ? WHERE id = ?", args: [result.recordId, id] },
  );
}

/* ---------- retries (see /api/cron/housecall-retry) ---------- */

export const MAX_HOUSECALL_ATTEMPTS = 6;

/**
 * Rows from the last 14 days that never made it into HouseCall Pro. Rows under 10 minutes old are
 * skipped so a retry never races the hand-off that runs right after the form is sent.
 */
export async function pendingHousecall(table: HousecallTable): Promise<string[]> {
  const c = await db();
  const { rows } = await c.execute({
    sql: `SELECT id FROM ${table}
          WHERE housecall_record_id IS NULL AND housecall_attempts < ?
            AND created_at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-10 minutes')
            AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-14 days')
          ORDER BY created_at LIMIT 20`,
    args: [MAX_HOUSECALL_ATTEMPTS],
  });
  return rows.map((r) => r.id as string);
}

/** Second-opinion quote photos whose lead is in HouseCall Pro but the photos aren't yet. */
export async function pendingOfferQuotes(): Promise<string[]> {
  const c = await db();
  const { rows } = await c.execute(
    `SELECT id FROM offer_leads
     WHERE quote_photos IS NOT NULL AND housecall_record_id IS NOT NULL
       AND (housecall_quote_status IS NULL OR housecall_quote_status <> 'sent')
       AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-14 days')
     ORDER BY created_at LIMIT 20`,
  );
  return rows.map((r) => r.id as string);
}

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

const rowAddress = (r: Record<string, unknown>, p: "from" | "to"): Address => ({
  label: str(r[`${p}_label`]),
  street: str(r[`${p}_street`]),
  city: str(r[`${p}_city`]),
  state: str(r[`${p}_state`]),
  zip: str(r[`${p}_zip`]),
  lat: Number(r[`${p}_lat`] ?? 0),
  lon: Number(r[`${p}_lon`] ?? 0),
  token: "",
});

/** Rebuilds a saved quote as the form sent it, for a retry. */
export async function loadQuote(id: string): Promise<QuotePayload | null> {
  const c = await db();
  const [quote, items, photos] = await c.batch(
    [
      { sql: "SELECT * FROM quotes WHERE id = ?", args: [id] },
      { sql: "SELECT * FROM quote_items WHERE quote_id = ? ORDER BY position", args: [id] },
      {
        sql: `SELECT p.item_id, p.url FROM quote_photos p JOIN quote_items i ON i.id = p.item_id
              WHERE i.quote_id = ? ORDER BY p.position`,
        args: [id],
      },
    ],
    "read",
  );
  const r = quote.rows[0] as Record<string, unknown> | undefined;
  if (!r) return null;
  return {
    from: rowAddress(r, "from"),
    to: rowAddress(r, "to"),
    moveDate: str(r.move_date),
    pickupWindow: str(r.pickup_window),
    moveType: str(r.move_type),
    moveSize: str(r.move_size),
    fromAccess: str(r.from_access),
    fromFloor: str(r.from_floor),
    toAccess: str(r.to_access),
    toFloor: str(r.to_floor),
    firstName: str(r.first_name),
    lastName: str(r.last_name),
    phone: str(r.phone),
    email: str(r.email),
    hearAboutUs: str(r.hear_about_us),
    items: items.rows.map((it) => ({
      id: str(it.id),
      name: str(it.name),
      category: str(it.category),
      notes: str(it.notes),
      photos: photos.rows.filter((p) => p.item_id === it.id).map((p) => str(p.url)),
    })),
    additionalNotes: str(r.additional_notes),
    company: "",
  };
}

export async function loadLead(id: string): Promise<LeadPayload | null> {
  const c = await db();
  const r = (await c.execute({ sql: "SELECT * FROM leads WHERE id = ?", args: [id] })).rows[0];
  if (!r) return null;
  return {
    firstName: str(r.first_name),
    lastName: str(r.last_name),
    phone: str(r.phone),
    email: str(r.email),
    service: str(r.service),
    details: str(r.details),
    page: str(r.page),
    company: "",
  };
}

export async function loadOfferLead(id: string): Promise<OfferLeadPayload | null> {
  const c = await db();
  const r = (await c.execute({ sql: "SELECT * FROM offer_leads WHERE id = ?", args: [id] })).rows[0];
  if (!r) return null;
  return {
    name: str(r.name),
    phone: str(r.phone),
    email: str(r.email),
    moveSize: str(r.move_size) as OfferLeadPayload["moveSize"],
    moveDate: str(r.move_date),
    smsConsent: Number(r.sms_consent) === 1,
    offer: str(r.offer) as OfferLeadPayload["offer"],
    page: str(r.page),
    ad: r.ad_params ? (JSON.parse(str(r.ad_params)) as Record<string, string>) : {},
    company: "",
  };
}
