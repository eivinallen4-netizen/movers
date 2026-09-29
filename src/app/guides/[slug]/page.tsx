import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site";
import { GuideView } from "@/components/templates";
import { GUIDES, findGuide } from "@/content/guides";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const g = findGuide((await params).slug);
  if (!g) return {};
  return {
    ...pageMeta({ title: g.metaTitle, description: g.metaDescription, path: `/guides/${g.slug}` }),
    openGraph: { type: "article", title: g.metaTitle, description: g.metaDescription, url: `/guides/${g.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/guides/[slug]">) {
  const g = findGuide((await params).slug);
  if (!g) notFound();
  return (
    <SiteShell>
      <GuideView g={g} />
    </SiteShell>
  );
}
