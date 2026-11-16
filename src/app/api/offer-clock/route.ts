import { cookies } from "next/headers";
import { FORGET_MS, HOLD_COOKIE, parseHoldStart } from "@/lib/offer-clock";

/*
 * First visit for the offer hold timer (see lib/offer-clock.ts). Set here, not by page script, because
 * Safari deletes script-set cookies after 7 days, which is exactly when the hold needs it.
 * `?start=` (from the browser's localStorage) is only used when the cookie is gone.
 * The cookie is never refreshed, so it expires 60 days after the first visit and a later visit starts over.
 */

export async function GET(req: Request) {
  const now = Date.now();
  const jar = await cookies();
  let start = parseHoldStart(jar.get(HOLD_COOKIE)?.value, now);
  if (start === null) {
    start = parseHoldStart(new URL(req.url).searchParams.get("start"), now) ?? now;
    jar.set(HOLD_COOKIE, String(start), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.max(60, Math.floor((start + FORGET_MS - now) / 1000)),
    });
  }
  return Response.json({ start, now }, { headers: { "Cache-Control": "no-store" } });
}
