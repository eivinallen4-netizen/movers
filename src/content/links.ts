import { AREAS } from "./areas";
import { GUIDES } from "./guides";
import { SERVICES, serviceHref } from "./services";

/** Every internal content page → its title and short blurb, for "related" link cards. */
const PAGES: Record<string, { label: string; body?: string }> = {
  "/free-tools/moving-cost-calculator": {
    label: "Moving Cost Calculator",
    body: "See what your Las Vegas move should cost in under a minute.",
  },
  ...Object.fromEntries(SERVICES.map((s) => [serviceHref(s), { label: s.name, body: s.short }])),
  ...Object.fromEntries(AREAS.map((a) => [`/service-areas/${a.slug}`, { label: `${a.name} Movers & Junk Removal`, body: a.tagline }])),
  ...Object.fromEntries(GUIDES.map((g) => [`/guides/${g.slug}`, { label: g.title, body: g.excerpt }])),
};

export const linkCard = (href: string) => ({ href, ...(PAGES[href] ?? { label: href }) });
