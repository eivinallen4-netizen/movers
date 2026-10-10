import type { Faq } from "@/components/ui";
import type { OfferSlug } from "@/lib/offer";

/*
 * Copy for the /offers/* ad landing pages. Each page is one ad offer; the form, trust strip
 * and FAQ are shared. These pages are noindex and stay out of the sitemap.
 */

export type Offer = {
  slug: OfferSlug;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  pointsTitle: string;
  /** Each point gets an icon from /public/icons/offers. */
  points: { title: string; body: string; icon: string }[];
  /** Heading on the form card. */
  formTitle: string;
  /** Step 3 of the "How it works" strip (steps 1 and 2 are the same on every offer). */
  finalStep: { title: string; body: string; icon: string };
  button: string;
  urgency?: string;
  /** Asks for a photo of their current quote after the form is sent. */
  askForQuotePhoto?: boolean;
};

export const OFFERS: Offer[] = [
  {
    slug: "move-out-special",
    metaTitle: "$1,500 Move-Out Special | Movers and Junk Removal",
    metaDescription:
      "Your whole move-out for one price: a 3-person crew, full furniture protection and setup at your new place, for up to 4 bedrooms in Las Vegas.",
    eyebrow: "$1,500 Move-Out Special",
    headline: "Your Whole Move-Out. One Price. Zero Headaches.",
    subheadline:
      "A 3-person crew, full furniture protection, and setup at your new place, all included for up to 4 bedrooms.",
    pointsTitle: "What's in the $1,500 Move-Out Special",
    points: [
      {
        icon: "everything-included", title: "Everything's included.",
        body: "Wrapping, floor protection, and taking apart and putting back together your beds and furniture. Other movers charge extra for each one. We don't.",
      },
      {
        icon: "protect-deposit", title: "Protect your deposit.",
        body: "We cover floors and protect walls and doorways, so you hand back the keys without damage charges.",
      },
      { icon: "wrapped-furniture", title: "Your furniture arrives the way it left.", body: "Every piece is wrapped before it leaves the house." },
      { icon: "crew-of-three", title: "A crew of 3, not 2.", body: "More hands means a faster move and less risk of dropped items." },
      { icon: "junk-haul", title: "Leave nothing behind.", body: "Add junk removal and we haul off what you don't want to take." },
      { icon: "same-day", title: "Need it today?", body: "Same-day moves are available." },
      {
        icon: "local-family", title: "Local, family-values movers.",
        body: "We serve the whole Las Vegas valley.",
      },
    ],
    formTitle: "Claim Your $1,500 Move-Out Special",
    finalStep: { icon: "calendar-lock", title: "Your date and price, locked in.", body: "One price for the whole move-out, in writing, before moving day." },
    button: "Claim My Move-Out Special",
    urgency: "Limited move-out dates each month. Lock yours in now.",
  },
  {
    slug: "second-opinion",
    metaTitle: "Free Second Opinion on Your Moving Quote | Movers and Junk Removal",
    metaDescription:
      "Already got a moving quote? Send it to us and we'll tell you what's really in it, free, with no pressure.",
    eyebrow: "Free Second Opinion",
    headline: "Already Got a Moving Quote? Let Us Check It Before You Sign.",
    subheadline: "Send us your quote and we'll tell you what's really in it, free, with no pressure.",
    pointsTitle: "What we check in your quote",
    points: [
      {
        icon: "hidden-fees", title: "We spot the hidden fees.",
        body: "Stair fees, long-carry fees, fuel charges, and “estimates” that double on moving day.",
      },
      {
        icon: "broker-check", title: "Know who's actually showing up.",
        body: "Some companies are brokers who sell your move to a crew you've never met. We'll tell you if that's what you're looking at.",
      },
      {
        icon: "side-by-side", title: "A side-by-side comparison.",
        body: "Crew size, truck fee, wrapping, assembly, and travel time, laid out so you can see what you're paying for.",
      },
      { icon: "straight-answers", title: "Straight answers, no sales pitch.", body: "If your quote is fair, we'll tell you to take it." },
      { icon: "two-minutes", title: "Takes 2 minutes.", body: "Snap a photo of the quote, send it in, and we'll get back to you fast." },
      {
        icon: "free-bonus", title: "Free bonus:",
        body: "our “5 Red Flags in a Moving Quote” checklist, sent right after you submit.",
      },
    ],
    formTitle: "Get Your Free Second Opinion",
    finalStep: { icon: "straight-answers", title: "Get straight answers.", body: "We show you what's in your quote and what's missing. If it's fair, we'll tell you." },
    button: "Check My Quote Free",
    askForQuotePhoto: true,
  },
  {
    slug: "flat-rate",
    metaTitle: "Free Flat Rate Moving Quote | Movers and Junk Removal",
    metaDescription:
      "One price, locked in, no clock running. Know exactly what your Las Vegas move costs before the truck shows up.",
    eyebrow: "Free Flat Rate Quote",
    headline: "One Price. Locked In. No Clock Running.",
    subheadline: "Know exactly what your move costs before the truck shows up.",
    pointsTitle: "Why a flat rate beats the clock",
    points: [
      {
        icon: "no-clock", title: "No hourly surprises.",
        body: "A slow crew can't run up your bill, because the price doesn't change with the clock.",
      },
      { icon: "price-locked", title: "The price we quote is the price you pay.", body: "No add-ons sprung on you at the new house." },
      {
        icon: "photo-quote", title: "Get your quote fast.",
        body: "Send a few photos or a quick video of your home, or have us come out in person.",
      },
      { icon: "stairs-handled", title: "Big stuff and stairs handled upfront.", body: "Tell us once and it's in the price." },
      {
        icon: "three-levels", title: "Pick the level you want.",
        body: "Basic, Standard, or Premium, and we'll show you exactly what each includes.",
      },
      {
        icon: "more-value", title: "Competitive pricing, more value.",
        body: "You get more crew, more protection, and more included for your money.",
      },
    ],
    formTitle: "Get Your Free Flat Rate Quote",
    finalStep: { icon: "price-locked", title: "Your flat rate, locked in.", body: "One price in writing. No clock running on moving day." },
    button: "Get My Flat Rate",
  },
];

export const findOffer = (slug: string) => OFFERS.find((o) => o.slug === slug);

export const OFFER_FAQS: Faq[] = [
  {
    q: "Are there hidden fees?",
    a: "No. We go over everything before moving day: crew size, truck, wrapping, stairs, big items and assembly. The price we agree on is the price you pay. Nothing gets added at the new house.",
  },
  {
    q: "What if something gets damaged?",
    a: "We wrap every piece and protect floors, walls and doorways so it doesn't happen. If something does get damaged, tell us right away and we'll make it right.",
  },
  {
    q: "How soon can you move me?",
    a: "Often the same day. Send the form and we'll call or text you within 15 minutes to check our schedule and lock in your date.",
  },
];

export const RED_FLAGS: { title: string; body: string; icon: string }[] = [
  {
    icon: "big-deposit", title: "They want a big deposit upfront.",
    body: "A real local mover doesn't need hundreds of dollars before they've lifted a box. A large deposit, especially cash or a wire, is the classic setup for a mover who never shows or holds your stuff hostage.",
  },
  {
    icon: "no-walkthrough", title: "They priced it without seeing your stuff.",
    body: "A quote given over a 2-minute call, with no photos, video or walkthrough, is a guess. Guesses grow on moving day. Ask how they came up with the number.",
  },
  {
    icon: "broker-check", title: "It's a broker, not the actual mover.",
    body: "Brokers sell your move to whatever crew is cheapest that day. Look for the company's own trucks and crew, and ask straight out: “Are your people the ones showing up?”",
  },
  {
    icon: "loose-estimate", title: "It's a loose “estimate” or an hourly rate with no cap.",
    body: "Non-binding estimates and open-ended hourly rates can double once the truck is loaded. Get the price in writing, and ask what could make it change.",
  },
  {
    icon: "no-license", title: "No license or insurance info.",
    body: "Ask for their license and proof of insurance before you sign. A legit mover sends it without a fuss. Silence or excuses means walk away.",
  },
];
