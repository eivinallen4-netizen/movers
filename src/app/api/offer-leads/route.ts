import { after } from "next/server";
import { validateOfferLead, type OfferLeadPayload } from "@/lib/offer";
import { dbEnabled, saveOfferLead } from "@/lib/server/db";
import { pushOfferLead } from "@/lib/server/handoff";
import { housecallEnabled, offerLeadNotes, sendOfferLead } from "@/lib/server/housecall";
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
      console.info(`[offer-leads] Turso and HouseCall Pro not set. Lead that would have been sent:\n${l.name}\n${offerLeadNotes(l)}`);
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

  if (housecallEnabled()) {
    if (leadId) {
      // These leads were promised a reply within 15 minutes, so it goes straight to the Job inbox.
      const id = leadId;
      after(() => pushOfferLead(id, l));
      return Response.json({ ok: true, id });
    }
    try {
      await sendOfferLead(l);
      return Response.json({ ok: true, id: null });
    } catch (err) {
      console.error(`[offer-leads] HouseCall Pro failed and the lead isn't saved anywhere:\n${l.name}\n${offerLeadNotes(l)}`, err);
    }
  }

  if (leadId) return Response.json({ ok: true, id: leadId });
  return Response.json({ error: "We couldn't send your request. Please try again or call us." }, { status: 502 });
}
