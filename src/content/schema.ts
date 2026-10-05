import { THUMBTACK_URL, YELP_URL } from "./reviews";
import { BUSINESS, CITIES, HOURS, PHONE_E164, SITE_URL } from "./site";

/*
 * schema.org structured data. No ratings/reviews: Google ignores self-serving LocalBusiness review markup.
 * TODO: add "address" (if you have a public office) and more "sameAs" links (Google Business, Instagram).
 */

export const BUSINESS_ID = `${SITE_URL}/#business`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": BUSINESS_ID,
    name: BUSINESS,
    slogan: "Moving Shouldn't Be a Headache.",
    url: SITE_URL,
    telephone: PHONE_E164,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    priceRange: "$$",
    sameAs: [YELP_URL, THUMBTACK_URL],
    areaServed: CITIES.map((name) => ({ "@type": "City", name: `${name}, NV` })),
    ...(HOURS.length > 0 && {
      openingHoursSpecification: HOURS.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    }),
    description:
      "Local Las Vegas movers and junk removal. On time, fast and careful, with honest upfront pricing and no hidden fees.",
  };
}

export function serviceSchema({ name, description, url, area }: { name: string; description: string; url: string; area?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${url}`,
    provider: { "@id": BUSINESS_ID, "@type": "MovingCompany", name: BUSINESS, telephone: PHONE_E164 },
    areaServed: (area ? [area] : CITIES).map((c) => ({ "@type": "City", name: `${c}, NV` })),
  };
}
