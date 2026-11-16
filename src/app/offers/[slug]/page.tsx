import { notFound } from "next/navigation";
import { ClaimCta, FunnelShell, NextSteps, ObjectionStrip, OfferExtras, OfferHero, OwnerNote, SellingPoints } from "@/components/funnel";
import { OfferClock } from "@/components/OfferClock";
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
  // Offers with an owner note get the longer proof layout: objections first, then what's included,
  // Junior and the reviews, how it works. The others keep the original order.
  const owner = Boolean(o.ownerNote);
  return (
    <FunnelShell>
      {o.clock && <OfferClock lead={o.clock.lead} label={o.clock.label} />}
      <OfferHero offer={o} />
      <ObjectionStrip offer={o} />
      {!owner && <NextSteps offer={o} />}
      <SellingPoints offer={o} compact={owner}>
        <OfferExtras offer={o} />
      </SellingPoints>
      {owner ? (
        <>
          <OwnerNote offer={o} />
          <NextSteps offer={o} />
        </>
      ) : (
        <>
          <ReviewRow reviews={reviewsFor("moving")} more={false} />
          <ClaimCta offer={o} className="-mt-4 pb-12 lg:-mt-6 lg:pb-16" />
        </>
      )}
      <FaqSection faqs={o.faqs ?? OFFER_FAQS} title="Questions we get a lot" />
      <div id="claim-end">
        <CtaBand title={o.headline} sub={o.urgency ?? "We'll call or text you within 15 minutes."} href="#claim" button={o.button} more={false} />
      </div>
      <StickyClaimBar button={o.button} />
    </FunnelShell>
  );
}
