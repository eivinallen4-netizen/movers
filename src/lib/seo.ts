import type { Metadata } from "next";
import { BUSINESS } from "@/content/site";

/**
 * Title, description, canonical URL and social preview for one page. Titles are used as-is (no suffix).
 * A page's openGraph replaces the layout's rather than merging with it, so the share image is set here too.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: BUSINESS, type, locale: "en_US", images: ["/logo.png"] },
    twitter: { card: "summary", title, description, images: ["/logo.png"] },
  };
}
