"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/pixel";

/**
 * Site-wide pixel events, mounted once in the root layout:
 * - PageView on client-side navigation (the layout's base code only fires it on the first load).
 * - Contact on any tel:, sms: or mailto: tap, so every call button counts without wiring each one.
 */
export function MetaPixelEvents() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    track("PageView");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href")?.toLowerCase() ?? "";
      const method = href.startsWith("tel:") ? "phone" : href.startsWith("sms:") ? "sms" : href.startsWith("mailto:") ? "email" : "";
      if (method) track("Contact", { content_name: method, content_category: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

/** ViewContent for a page worth knowing about (an ad landing page, a service page). Renders nothing. */
export function TrackViewContent({ name, category }: { name: string; category?: string }) {
  useEffect(() => {
    track("ViewContent", category ? { content_name: name, content_category: category } : { content_name: name });
  }, [name, category]);
  return null;
}
