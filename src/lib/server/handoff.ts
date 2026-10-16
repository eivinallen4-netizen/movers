import type { QuotePayload } from "@/lib/quote";
import type { LeadPayload } from "@/lib/lead";
import type { OfferLeadPayload } from "@/lib/offer";
import {
  getOfferLeadHousecall,
  markHousecall,
  markOfferQuoteHousecall,
  type HousecallTable,
} from "@/lib/server/db";
import {
  sendLead,
  sendOfferLead,
  sendOfferQuotePhotos,
  sendQuote,
  type HousecallResult,
} from "@/lib/server/housecall";

/*
 * Sends a saved form to HouseCall Pro and records the outcome on its database row. A failure is
 * stored (housecall_error) and retried by /api/cron/housecall-retry, so a HouseCall Pro outage
 * never loses a lead. Never throws.
 */

async function push<T>(table: HousecallTable, id: string, payload: T, send: (p: T) => Promise<HousecallResult>) {
  try {
    const result = await send(payload);
    await markHousecall(table, id, result);
    return true;
  } catch (err) {
    console.error(`[handoff] ${table} ${id} → HouseCall Pro failed`, err);
    await markHousecall(table, id, { error: String(err) }).catch((e) => console.error("[handoff]", e));
    return false;
  }
}

export const pushQuote = (id: string, q: QuotePayload) => push("quotes", id, q, sendQuote);
export const pushLead = (id: string, l: LeadPayload) => push("leads", id, l, sendLead);
export const pushOfferLead = (id: string, l: OfferLeadPayload) => push("offer_leads", id, l, sendOfferLead);

/**
 * Second-opinion quote photos → the lead's estimate in HouseCall Pro. If the lead itself is still
 * being sent (the customer was quick), waits briefly; otherwise the retry job picks it up.
 */
export async function pushOfferQuote(id: string, { wait = false } = {}) {
  try {
    let row = await getOfferLeadHousecall(id);
    for (let i = 0; wait && row && !row.recordId && i < 6; i++) {
      await new Promise((r) => setTimeout(r, 2500));
      row = await getOfferLeadHousecall(id);
    }
    if (!row?.recordId || !row.customerId || row.photos.length === 0) return false;
    const recordId = await sendOfferQuotePhotos(row.customerId, row.recordId, row.photos);
    await markOfferQuoteHousecall(id, { recordId });
    return true;
  } catch (err) {
    console.error(`[handoff] offer quote ${id} → HouseCall Pro failed`, err);
    await markOfferQuoteHousecall(id, { error: String(err) }).catch((e) => console.error("[handoff]", e));
    return false;
  }
}
