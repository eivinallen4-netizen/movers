import type { MetadataRoute } from "next";
import { AREAS } from "@/content/areas";
import { GUIDES } from "@/content/guides";
import { SERVICES, serviceHref } from "@/content/services";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified?: string) => ({
    url: `${SITE_URL}${path}`,
    priority,
    ...(lastModified && { lastModified }),
  });
  return [
    page("", 1),
    page("/quote", 0.9),
    page("/moving", 0.9),
    page("/junk-removal", 0.9),
    ...SERVICES.map((s) => page(serviceHref(s), 0.8)),
    page("/service-areas", 0.8),
    ...AREAS.map((a) => page(`/service-areas/${a.slug}`, 0.8)),
    page("/free-tools", 0.6),
    page("/free-tools/moving-cost-calculator", 0.7),
    page("/guides", 0.6),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.6, g.updated)),
    page("/reviews", 0.6),
    page("/about", 0.5),
    page("/contact", 0.5),
    page("/faq", 0.5),
    page("/privacy", 0.1),
    page("/terms", 0.1),
    page("/accessibility", 0.1),
  ];
}
