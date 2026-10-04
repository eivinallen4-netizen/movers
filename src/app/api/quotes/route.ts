import { validateQuote, type QuotePayload } from "@/lib/quote";
import { verifyAddress } from "@/lib/server/address-token";
import { dbEnabled, markHousecall, saveQuote } from "@/lib/server/db";
import { createQuoteCustomer, housecallEnabled, quoteNotes } from "@/lib/server/housecall";
import { photoUrlPrefix } from "@/lib/server/photos";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";

export async function POST(req: Request) {
  if (!rateLimit(`quote:${clientIp(req)}`, 5, 10 * 60_000)) return tooMany();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const errors = validateQuote(body, {
    photoUrlPrefix: photoUrlPrefix() ?? "https://invalid.local/",
  });
  const q = body as QuotePayload;
  if (!errors.from && !verifyAddress(q.from)) errors.from = "Pick your pickup address from the suggestions list.";
  if (!errors.to && !verifyAddress(q.to)) errors.to = "Pick your drop-off address from the suggestions list.";
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  // Honeypot filled in → almost certainly a bot. Pretend it worked so it doesn't retry.
  if (typeof q.company === "string" && q.company.trim()) return Response.json({ ok: true });

  if (!dbEnabled() && !housecallEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quotes] Turso and HouseCall Pro not set. Quote that would have been sent:\n" + quoteNotes(q));
      return Response.json({ ok: true, dryRun: true });
    }
    console.error("[quotes] Neither TURSO_* nor HOUSECALL_PRO_API_KEY is set; quote dropped.");
    return Response.json({ error: "We couldn't send your quote. Please call us instead." }, { status: 503 });
  }

  // 1. Save to our own database first, so the lead is never lost.
  let quoteId: string | null = null;
  if (dbEnabled()) {
    try {
      quoteId = await saveQuote(q);
    } catch (err) {
      console.error("[quotes] Turso save failed", err);
    }
  }

  // 2. Hand off to HouseCall Pro. If it fails but the quote is saved, the customer still succeeds.
  let sentToHousecall = false;
  if (housecallEnabled()) {
    try {
      const customerId = await createQuoteCustomer(q);
      sentToHousecall = true;
      if (quoteId) await markHousecall(quoteId, { customerId }).catch((e) => console.error("[quotes]", e));
    } catch (err) {
      console.error("[quotes] HouseCall Pro failed", err);
      if (quoteId) await markHousecall(quoteId, { error: String(err) }).catch((e) => console.error("[quotes]", e));
    }
  }

  if (quoteId || sentToHousecall) return Response.json({ ok: true });
  return Response.json({ error: "We couldn't send your quote. Please try again or call us." }, { status: 502 });
}
