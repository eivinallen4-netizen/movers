import { redirect } from "next/navigation";
import { CONFIRMED_URL_OFFERS } from "@/lib/offer";

/*
 * /offers/<slug>/confirmed is only ever set in the address bar by <OfferForm> once the form is sent.
 * Nothing renders here: a refresh or a shared link goes back to the offer page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CONFIRMED_URL_OFFERS.map((slug) => ({ slug }));
}

export const metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: PageProps<"/offers/[slug]/confirmed">) {
  redirect(`/offers/${(await params).slug}`);
}
