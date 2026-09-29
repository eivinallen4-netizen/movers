import type { Metadata } from "next";
import { BUSINESS } from "@/content/site";

/** Title, description, canonical URL and social preview for one page. Titles are used as-is (no suffix). */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: BUSINESS, type: "website", locale: "en_US" },
  };
}
