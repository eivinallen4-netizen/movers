import type { Metadata } from "next";
import { BUSINESS } from "@/content/site";
import { pagePhoto } from "@/content/photos";

/**
 * Title, description, canonical URL and social preview for one page. Titles are used as-is (no suffix).
 * A page's openGraph replaces the layout's rather than merging with it, so the share image is set here too.
 * `photo` is a key in src/content/photos.ts; pages with one get a large photo preview, the rest the logo.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  photo,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  photo?: string;
}): Metadata {
  const p = photo ? pagePhoto(photo) : undefined;
  const images = p ? [{ url: p.src, alt: p.alt }] : [{ url: "/logo.png", alt: BUSINESS }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: BUSINESS, type, locale: "en_US", images },
    twitter: { card: p ? "summary_large_image" : "summary", title, description, images },
  };
}
