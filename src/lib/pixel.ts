/*
 * Meta Pixel standard events from the browser. The pixel itself is loaded in app/layout.tsx and is skipped for
 * visitors whose browser sends Global Privacy Control, so nothing here ever loads it or sends without it.
 * `fbq('track', ...)` goes to every pixel initialised in the layout (both ad accounts).
 *
 * What we send, and when:
 *   PageView          first load (layout), then every client-side route change (<MetaPixelEvents>)
 *   ViewContent       an ad landing page (/offers/*) or a service page is viewed (<TrackViewContent>)
 *   InitiateCheckout  someone starts a quote: the move-size tap on an offer form, or step 1 of the /quote wizard
 *   Lead              a quote form was sent and the server accepted it
 *   Contact           a tap on any tel:, sms: or mailto: link anywhere on the site (<MetaPixelEvents>)
 */

type Fbq = (...args: unknown[]) => void;
type Params = Record<string, string | number>;

export type PixelEvent = "PageView" | "ViewContent" | "InitiateCheckout" | "Lead" | "Contact";

const fbqOf = () => (window as unknown as { fbq?: Fbq }).fbq;

/**
 * Send one standard event. The layout's pixel script runs after hydration, so an event fired from a
 * component on first render can arrive before `fbq` exists: wait for it briefly (up to ~5s), then give up.
 */
export function track(event: PixelEvent, params: Params = {}) {
  if (typeof window === "undefined" || navigator.globalPrivacyControl) return;
  let tries = 0;
  const send = () => {
    const fbq = fbqOf();
    if (typeof fbq === "function") fbq("track", event, params);
    else if (tries++ < 20) setTimeout(send, 250);
  };
  send();
}

/** A form was sent: lets Meta optimise the ads for leads instead of clicks. */
export const trackLead = (params: Params = {}) => track("Lead", params);

/** Someone started a quote form. */
export const trackQuoteStart = (params: Params = {}) => track("InitiateCheckout", params);

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}
