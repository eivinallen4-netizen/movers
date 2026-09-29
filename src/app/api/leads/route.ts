import { validateLead, type LeadPayload } from "@/lib/lead";
import { dbEnabled, markHousecall, saveLead } from "@/lib/server/db";
import { createLeadCustomer, housecallEnabled, leadNotes } from "@/lib/server/housecall";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";

export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`, 5, 10 * 60_000)) return tooMany();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const errors = validateLead(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }
  const l = body as LeadPayload;

  // Honeypot filled in → almost certainly a bot. Pretend it worked so it doesn't retry.
  if (typeof l.company === "string" && l.company.trim()) return Response.json({ ok: true });

  if (!dbEnabled() && !housecallEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[leads] Turso and HouseCall Pro not set. Lead that would have been sent:\n${l.firstName} ${l.lastName} · ${l.phone} · ${l.email}\n${leadNotes(l)}`);
      return Response.json({ ok: true, dryRun: true });
    }
    console.error("[leads] Neither TURSO_* nor HOUSECALL_PRO_API_KEY is set; lead dropped.");
    return Response.json({ error: "We couldn't send your request. Please call us instead." }, { status: 503 });
  }

  // Same order as /api/quotes: save first so the lead is never lost, then hand off.
  let leadId: string | null = null;
  if (dbEnabled()) {
    try {
      leadId = await saveLead(l);
    } catch (err) {
      console.error("[leads] Turso save failed", err);
    }
  }

  let sentToHousecall = false;
  if (housecallEnabled()) {
    try {
      const customerId = await createLeadCustomer(l);
      sentToHousecall = true;
      if (leadId) await markHousecall(leadId, { customerId }, "leads").catch((e) => console.error("[leads]", e));
    } catch (err) {
      console.error("[leads] HouseCall Pro failed", err);
      if (leadId) await markHousecall(leadId, { error: String(err) }, "leads").catch((e) => console.error("[leads]", e));
    }
  }

  if (leadId || sentToHousecall) return Response.json({ ok: true });
  return Response.json({ error: "We couldn't send your request. Please try again or call us." }, { status: 502 });
}
