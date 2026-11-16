import { after } from "next/server";
import { MAX_OFFER_PHOTOS, PHOTO_LABEL_MAX, type OfferPhoto } from "@/lib/offer";
import { dbEnabled, setOfferQuote } from "@/lib/server/db";
import { pushOfferQuote } from "@/lib/server/handoff";
import { housecallEnabled } from "@/lib/server/housecall";
import { photoUrlPrefix } from "@/lib/server/photos";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";

/*
 * The photo step after an ad-funnel form (offers in PHOTO_STEPS): photos of the customer's current
 * moving quote or of their home ({ photos }), or { sendLater: true } when they'd rather send them when
 * we contact them. The lead id is a random UUID only the browser that sent the form knows.
 */

export const maxDuration = 60;

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

  let update: { photos: OfferPhoto[] } | { sendLater: true };
  if (body.sendLater === true) {
    update = { sendLater: true };
  } else {
    const prefix = photoUrlPrefix();
    // Each photo is { url, label }; a bare URL string (older pages still open in a tab) has no label.
    const photos = Array.isArray(body.photos)
      ? body.photos.map((p: unknown): OfferPhoto | null => {
          if (typeof p === "string") return { url: p, label: "" };
          const o = p as Record<string, unknown> | null;
          if (!o || typeof o.url !== "string") return null;
          return { url: o.url, label: typeof o.label === "string" ? o.label.trim().slice(0, PHOTO_LABEL_MAX) : "" };
        })
      : [];
    const ok =
      prefix &&
      photos.length > 0 &&
      photos.length <= MAX_OFFER_PHOTOS &&
      photos.every((p) => p !== null && p.url.startsWith(prefix) && p.url.length < 500);
    if (!ok) return Response.json({ error: "Add at least one photo." }, { status: 422 });
    update = { photos: photos as OfferPhoto[] };
  }

  // Logged too, so the photo links are never lost if the database is down or not set up.
  console.info(`[offer-leads] photos ${id}: ${"photos" in update ? update.photos.map((p) => `${p.label || "-"}: ${p.url}`).join(" ") : "will send when contacted"}`);

  if (!dbEnabled()) return Response.json({ ok: true, dryRun: true });
  try {
    if (!(await setOfferQuote(id, update))) return Response.json({ error: "We couldn't find your request." }, { status: 404 });
  } catch (err) {
    console.error("[offer-leads] Turso quote update failed", err);
    return Response.json({ error: "We couldn't save that. Please try again or call us." }, { status: 502 });
  }
  // Converts their HouseCall Pro lead into an estimate with these photos attached.
  if ("photos" in update && housecallEnabled()) after(() => pushOfferQuote(id, { wait: true }));
  return Response.json({ ok: true });
}
