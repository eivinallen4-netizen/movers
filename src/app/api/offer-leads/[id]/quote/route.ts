import { MAX_QUOTE_PHOTOS } from "@/lib/offer";
import { dbEnabled, setOfferQuote } from "@/lib/server/db";
import { photoUrlPrefix } from "@/lib/server/photos";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";

/*
 * Second-opinion step 2: photos of the customer's current moving quote ({ photos }), or
 * { sendLater: true } when they'd rather send it when we contact them.
 * The lead id is a random UUID only the browser that sent the form knows.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export async function POST(req: Request, ctx: RouteContext<"/api/offer-leads/[id]/quote">) {
  if (!rateLimit(`offerq:${clientIp(req)}`, 10, 10 * 60_000)) return tooMany();

  const { id } = await ctx.params;
  if (!UUID.test(id)) return Response.json({ error: "Invalid request." }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  let update: { photos: string[] } | { sendLater: true };
  if (body.sendLater === true) {
    update = { sendLater: true };
  } else {
    const prefix = photoUrlPrefix();
    const photos = body.photos;
    const ok =
      prefix &&
      Array.isArray(photos) &&
      photos.length > 0 &&
      photos.length <= MAX_QUOTE_PHOTOS &&
      photos.every((u) => typeof u === "string" && u.startsWith(prefix) && u.length < 500);
    if (!ok) return Response.json({ error: "Upload a photo of your quote." }, { status: 422 });
    update = { photos: photos as string[] };
  }

  // Logged too, so the photo links are never lost if the database is down or not set up.
  console.info(`[offer-leads] second-opinion ${id}: ${"photos" in update ? update.photos.join(" ") : "will send when contacted"}`);

  if (!dbEnabled()) return Response.json({ ok: true, dryRun: true });
  try {
    if (!(await setOfferQuote(id, update))) return Response.json({ error: "We couldn't find your request." }, { status: 404 });
  } catch (err) {
    console.error("[offer-leads] Turso quote update failed", err);
    return Response.json({ error: "We couldn't save that. Please try again or call us." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
