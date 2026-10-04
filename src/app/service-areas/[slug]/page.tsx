import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site";
import { AreaView } from "@/components/templates";
import { AREAS, findArea } from "@/content/areas";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/service-areas/[slug]">) {
  const a = findArea((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.metaTitle, description: a.metaDescription, path: `/service-areas/${a.slug}` });
}

export default async function Page({ params }: PageProps<"/service-areas/[slug]">) {
  const a = findArea((await params).slug);
  if (!a) notFound();
  return (
    <SiteShell>
      <AreaView a={a} />
    </SiteShell>
  );
}
