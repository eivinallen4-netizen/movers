import { createClient, type Client } from "@libsql/client/web";
import { formatPhone, normalizePhone, type Address, type QuotePayload } from "@/lib/quote";
import type { LeadPayload } from "@/lib/lead";

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
  `CREATE INDEX IF NOT EXISTS quotes_created_at ON quotes(created_at)`,
  `CREATE INDEX IF NOT EXISTS leads_created_at ON leads(created_at)`,
  `CREATE INDEX IF NOT EXISTS quote_items_quote ON quote_items(quote_id)`,
  `CREATE INDEX IF NOT EXISTS quote_photos_item ON quote_photos(item_id)`,
];

async function db() {
  if (!dbEnabled()) throw new Error("Turso is not configured.");
  client ??= createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  ready ??= client.batch(SCHEMA, "write").then(
    () => undefined,
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

/** Records how the HouseCall Pro hand-off went, so failed ones can be followed up by hand. */
export async function markHousecall(
  id: string,
  result: { customerId?: string; error?: string },
  table: "quotes" | "leads" = "quotes",
) {
  const c = await db();
  await c.execute({
    sql: `UPDATE ${table} SET housecall_customer_id = ?, housecall_error = ? WHERE id = ?`,
    args: [result.customerId ?? null, result.error?.slice(0, 1000) ?? null, id],
  });
}
