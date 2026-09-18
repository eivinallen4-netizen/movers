import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}

export function buildMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://moversvegas.com";
  const canonicalUrl = `${baseUrl}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords || [],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: config.title,
      description: config.description,
      siteName: "MOVERS & JUNK REMOVAL",
      images: config.image
        ? [
            {
              url: config.image,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : [],
    },
  };
}

export interface FAQItem {
  q: string;
  a: string;
}

export function buildFAQJsonLd(faqs: FAQItem[], pageTitle?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
