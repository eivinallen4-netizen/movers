import { notFound } from "next/navigation";
import { ClaimCta, FunnelShell, NextSteps, OfferHero, SellingPoints } from "@/components/funnel";
import { StickyClaimBar } from "@/components/OfferForm";
import { CtaBand, FaqSection, ReviewRow } from "@/components/ui";
import { OFFERS, OFFER_FAQS, findOffer } from "@/content/offers";
import { reviewsFor } from "@/content/reviews";
import { pageMeta } from "@/lib/seo";

// Ad landing pages: kept out of search (noindex + not in the sitemap) so they don't compete with the SEO pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return OFFERS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/offers/[slug]">) {
  const o = findOffer((await params).slug);
  if (!o) return {};
  return {
    ...pageMeta({ title: o.metaTitle, description: o.metaDescription, path: `/offers/${o.slug}` }),
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: PageProps<"/offers/[slug]">) {
  const o = findOffer((await params).slug);
  if (!o) notFound();
  return (
    <FunnelShell>
      <OfferHero offer={o} />
      <NextSteps offer={o} />
      <SellingPoints offer={o} />
      <ReviewRow reviews={reviewsFor("moving")} more={false} />
      <ClaimCta offer={o} className="-mt-4 pb-12 lg:-mt-6 lg:pb-16" />
      <FaqSection faqs={OFFER_FAQS} title="Questions we get a lot" />
      <div id="claim-end">
        <CtaBand title={o.headline} sub={o.urgency ?? "We'll call or text you within 15 minutes."} href="#claim" button={o.button} />
      </div>
      <StickyClaimBar button={o.button} />
    </FunnelShell>
  );
}
