import { dbEnabled, loadLead, loadOfferLead, loadQuote, pendingHousecall, pendingOfferQuotes } from "@/lib/server/db";
import { pushLead, pushOfferLead, pushOfferQuote, pushQuote } from "@/lib/server/handoff";
import { housecallEnabled } from "@/lib/server/housecall";

/*
 * Re-sends anything that didn't make it into HouseCall Pro (it was down, the key was missing, …).
 * Runs on the Vercel cron in vercel.json. Vercel sends "Authorization: Bearer $CRON_SECRET".
 * To run it by hand: curl -H "Authorization: Bearer $CRON_SECRET" https://<site>/api/cron/housecall-retry
 */

export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!dbEnabled() || !housecallEnabled()) return Response.json({ skipped: "Turso or HouseCall Pro not configured" });

  const report = { quotes: [0, 0], leads: [0, 0], offerLeads: [0, 0], offerQuotes: [0, 0] }; // [sent, failed]
  const tally = (k: keyof typeof report, ok: boolean) => report[k][ok ? 0 : 1]++;

  for (const id of await pendingHousecall("quotes")) {
    const q = await loadQuote(id);
    if (q) tally("quotes", await pushQuote(id, q));
  }
  for (const id of await pendingHousecall("leads")) {
    const l = await loadLead(id);
    if (l) tally("leads", await pushLead(id, l));
  }
  for (const id of await pendingHousecall("offer_leads")) {
    const l = await loadOfferLead(id);
    if (l) tally("offerLeads", await pushOfferLead(id, l));
  }
  // After the leads, so a lead sent just now gets its quote photos in the same run.
  for (const id of await pendingOfferQuotes()) tally("offerQuotes", await pushOfferQuote(id));

  console.info("[housecall-retry]", JSON.stringify(report));
  return Response.json(report);
}
