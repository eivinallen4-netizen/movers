import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site";
import { ServiceView } from "@/components/templates";
import { findService, servicesIn, serviceHref } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesIn("junk-removal").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/junk-removal/[slug]">) {
  const s = findService("junk-removal", (await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: serviceHref(s) });
}

export default async function Page({ params }: PageProps<"/junk-removal/[slug]">) {
  const s = findService("junk-removal", (await params).slug);
  if (!s) notFound();
  return (
    <SiteShell>
      <ServiceView s={s} />
    </SiteShell>
  );
}
