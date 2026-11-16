/*
 * Meta Pixel events from the browser. The pixel itself is loaded in app/layout.tsx and is skipped for
 * visitors whose browser sends Global Privacy Control, so every call checks it's there first.
 */

type Fbq = (...args: unknown[]) => void;

/** A form was sent: lets Meta optimise the ads for leads instead of clicks. */
export function trackLead(params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", "Lead", params);
}
