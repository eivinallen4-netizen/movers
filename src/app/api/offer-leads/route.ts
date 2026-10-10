import { validateOfferLead, type OfferLeadPayload } from "@/lib/offer";
import { dbEnabled, markHousecall, saveOfferLead } from "@/lib/server/db";
import { createOfferLeadCustomer, housecallEnabled, offerLeadNotes } from "@/lib/server/housecall";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";

/* Short form on the /offers/* ad pages. Same flow as /api/leads: save first, then hand off. */

export async function POST(req: Request) {
  if (!rateLimit(`offer:${clientIp(req)}`, 5, 10 * 60_000)) return tooMany();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const errors = validateOfferLead(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }
  const l = body as OfferLeadPayload;

  // Honeypot filled in → almost certainly a bot. Pretend it worked so it doesn't retry.
  if (typeof l.company === "string" && l.company.trim()) return Response.json({ ok: true, id: crypto.randomUUID() });

  if (!dbEnabled() && !housecallEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[offer-leads] Turso and HouseCall Pro not set. Lead that would have been sent:\n${l.name} · ${l.phone} · ${l.email}\n${offerLeadNotes(l)}`);
      return Response.json({ ok: true, id: crypto.randomUUID(), dryRun: true });
    }
    console.error("[offer-leads] Neither TURSO_* nor HOUSECALL_PRO_API_KEY is set; lead dropped.");
    return Response.json({ error: "We couldn't send your request. Please call us instead." }, { status: 503 });
  }

  let leadId: string | null = null;
  if (dbEnabled()) {
    try {
      leadId = await saveOfferLead(l);
    } catch (err) {
      console.error("[offer-leads] Turso save failed", err);
    }
  }

  let sentToHousecall = false;
  if (housecallEnabled()) {
    try {
      const customerId = await createOfferLeadCustomer(l);
      sentToHousecall = true;
      if (leadId) await markHousecall(leadId, { customerId }, "offer_leads").catch((e) => console.error("[offer-leads]", e));
    } catch (err) {
      console.error("[offer-leads] HouseCall Pro failed", err);
      if (leadId) await markHousecall(leadId, { error: String(err) }, "offer_leads").catch((e) => console.error("[offer-leads]", e));
    }
  }

  if (leadId || sentToHousecall) return Response.json({ ok: true, id: leadId });
  return Response.json({ error: "We couldn't send your request. Please try again or call us." }, { status: 502 });
}
