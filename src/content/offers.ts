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
  /*
   * Optional extras (only the $1,499 page uses them so far). Photo steps live in PHOTO_STEPS and the
   * hold timer in CLOCKED_OFFERS (lib/offer.ts), since the API routes need those too.
   */
  /** Text for the hold-timer bar: `lead` opens it, `label` is what's held ("$1,499"). */
  clock?: { lead: string; label: string };
  /** A real photo in the hero (left column on desktop, a band under the headline on phones). */
  heroPhoto?: { src: string; alt: string; width: number; height: number };
  /** Step-1 prompt on the form (default: "How big is your move?"). */
  sizePrompt?: string;
  /** Reviewer (`who` in content/reviews.ts) quoted under the form. */
  heroReview?: string;
  /** Price, trust and timing answered right under the hero, most common first. */
  objections?: { q: string; a: string; icon: string; review?: string }[];
  bonus?: { title: string; body: string };
  promise?: { title: string; body: string };
  /** All three "How it works" steps (default: send the form, we call, then finalStep). */
  steps?: { title: string; body: string; icon: string }[];
  /** A note from the owner in his own words, with reviews beside it. */
  ownerNote?: { title: string; quote: string[]; sign: string; photo: { src: string; alt: string; width: number; height: number } };
  /** Reviewers (`who`) shown with the owner note. */
  reviewNames?: string[];
  /** A real rating with its count, copied from the review site (check it before changing). */
  rating?: { score: string; count: number; source: string; extra?: string };
  /** Real photos of the crew on real jobs (never generated). */
  crewPhotos?: { src: string; alt: string }[];
  /** Replaces the shared OFFER_FAQS. */
  faqs?: Faq[];
};

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

export const OFFERS: Offer[] = [
  {
    slug: "move-out-special",
    metaTitle: "$1,500 Move-Out Special | Movers and Junk Removal",
    metaDescription:
      "Your whole move-out for one price: a 3-person crew, full furniture protection and setup at your new place, anywhere in Las Vegas.",
    eyebrow: "$1,500 Move-Out Special",
    headline: "Your Whole Move-Out. One Price. Zero Headaches.",
    subheadline:
      "A 3-person crew, full furniture protection, and setup at your new place, all included.",
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
  {
    // The page behind Junior's Meta video ad ("$1,499 flat rate moving special... submit your photos").
    slug: "1499-flat-rate",
    metaTitle: "$1,499 Flat Rate Move for Las Vegas Homeowners | Movers and Junk Removal",
    metaDescription:
      "Moving in the next 60 days? Your whole Las Vegas move for $1,499 flat. Send photos of everything you're moving and we'll lock in your price in writing.",
    eyebrow: "The 60-Day Homeowner Move Special",
    headline: "Las Vegas homeowners: your whole move for $1,499 flat.",
    subheadline:
      "A crew of 3 packs, wraps and sets up your furniture. Send photos of everything you're moving and we'll call or text within 15 minutes to lock in your price in writing.",
    heroPhoto: {
      src: "/media/pricing-photo.jpg",
      alt: "Movers and Junk Removal crew loading plastic-wrapped furniture into a moving truck stacked with boxes",
      width: 1536,
      height: 1024,
    },
    clock: { lead: "We take 10 flat rate moves a week.", label: "$1,499" },
    formTitle: "Get your $1,499 flat rate in 30 seconds",
    sizePrompt: "Tap your home size to start",
    button: "Get my $1,499 flat rate",
    urgency: "We take 10 flat rate moves a week. Lock yours in now.",
    heroReview: "Jesse M.",
    objections: [
      {
        icon: "price-locked",
        q: "Is $1,499 really the whole price?",
        a: "Yes, for everything in your photos. We confirm it in writing before moving day, and nothing gets added at the new house. Leave something out of your photos and the flat rate won't apply.",
      },
      {
        icon: "wrapped-furniture",
        q: "Will my things be safe?",
        a: "Every piece is wrapped before it leaves the house, and we cover floors and doorways.",
        review: "Emily K.",
      },
      {
        icon: "calendar-lock",
        q: "How soon can you move me?",
        a: "We call or text within 15 minutes to pick your date. We only take 10 flat rate moves a week, so the sooner you send photos, the more dates you can choose from.",
      },
    ],
    pointsTitle: "What's in your $1,499",
    points: [
      { icon: "no-clock", title: "No clock running.", body: "One flat price, so a long day never costs you more." },
      { icon: "crew-of-three", title: "A crew of 3, not 2.", body: "More hands means a faster move and less risk of dropped items." },
      { icon: "wrapped-furniture", title: "Every piece wrapped.", body: "Your furniture arrives the way it left." },
      { icon: "protect-deposit", title: "Floors and doorways protected.", body: "Hand back the keys without damage charges." },
      {
        icon: "everything-included", title: "Set up at your new place.",
        body: "Beds and furniture go back together where you want them, not left in pieces.",
      },
      {
        icon: "photo-quote", title: "Priced from your photos.",
        body: "No home visit needed. Photograph everything you're moving, or your quote won't be accurate and the flat rate won't apply.",
      },
    ],
    bonus: {
      title: "Bonus, no extra charge: packing and furniture help",
      body: "We help pack, wrap, take apart and put back together all your items if you need it. It's part of your $1,499.",
    },
    promise: {
      title: "The $1,499 Price-Lock Promise",
      body: "We confirm your $1,499 in writing before moving day. If anything in your photos gets added on moving day, you don't pay it.",
    },
    ownerNote: {
      title: "A note from Junior",
      quote: [
        "We take extra steps to help our homeowners move.",
        "We're faith-based and we can work miracles for you. If you're moving out in the next 60 days, send us photos of your house and we'll send you a flat rate.",
      ],
      sign: "Junior, Movers and Junk Removal",
      photo: {
        src: "/media/gallery-1.jpg",
        alt: "Mover in a Movers and Junk Removal shirt carrying moving boxes through a Las Vegas home",
        width: 768,
        height: 1024,
      },
    },
    reviewNames: ["Cassandra L.", "Stephen B.", "Pamela J."],
    // From the Thumbtack profile on Nov 15, 2026. Update when the count changes.
    rating: { score: "4.9", count: 33, source: "Thumbtack", extra: "Top Pro · Hired 48 times" },
    crewPhotos: [
      { src: "/media/gallery-4.jpg", alt: "Crew loading a plastic-wrapped dresser into a packed moving truck" },
      { src: "/media/gallery-2.jpg", alt: "Crew member carrying wrapped furniture up a staircase" },
      { src: "/media/gallery-6.jpg", alt: "Two movers carrying a mattress past the staircase" },
      { src: "/media/gallery-8.jpg", alt: "Crew member carrying a bed frame down the stairs" },
    ],
    steps: [
      { icon: "send-form", title: "Send the form.", body: "About 30 seconds: your home size and how to reach you." },
      {
        icon: "photo-quote", title: "Photograph everything you're moving.",
        body: "Every room, closet, the garage and patio. Anything missing means no accurate quote and no flat rate.",
      },
      {
        icon: "calendar-lock", title: "We lock in $1,499 in writing.",
        body: "We call or text within 15 minutes, pick your date and send your price in writing.",
      },
    ],
    finalStep: {
      icon: "calendar-lock", title: "We lock in $1,499 in writing.",
      body: "We call or text within 15 minutes, pick your date and send your price in writing.",
    },
    faqs: [
      {
        q: "Why do you need photos?",
        a: "Photos show us how much there is and anything big or tricky, like a piano or a long walk to the truck. That's how we lock in a flat price without visiting your home first.",
      },
      {
        q: "What if I leave something out of my photos?",
        a: "Then we can't give you an accurate quote, and the $1,499 flat rate won't apply. Take photos of everything you're moving: every room, closet, the garage, the patio and any storage, even if you're only taking a few things from it.",
      },
      {
        q: "How long is my $1,499 held?",
        a: "7 days from your first visit to this page. The timer at the top shows how long you have left. Send the form before it runs out and we'll hold your rate while we pick your date.",
      },
      OFFER_FAQS[1],
    ],
  },
];

export const findOffer = (slug: string) => OFFERS.find((o) => o.slug === slug);

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
