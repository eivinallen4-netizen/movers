import { SiteShell } from "@/components/site";
import { PageHero } from "@/components/templates";
import { CtaBand, FaqSection, JsonLd, faqSchema, type Faq } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ | Las Vegas Moving & Junk Removal Questions Answered",
  description:
    "Answers about moving costs, hidden fees, same-day moves, junk removal pricing, what we take and how to prepare, from a local Las Vegas crew.",
  path: "/faq",
});

const PRICING: Faq[] = [
  { q: "How do you price a move?", a: "Local moves are priced by crew size and time plus a truck fee, and we explain your price upfront before moving day. Try our moving cost calculator for a quick ballpark." },
  { q: "Are there hidden fees?", a: "No. Anything that could change your price is explained upfront. No fees snuck in at the end and no \"double the quote\" surprises." },
  { q: "How is junk removal priced?", a: "By how much truck space your junk takes, plus extra for very heavy items. We confirm the exact price on-site before we load." },
  { q: "Do I have to tip?", a: "Never required. We'll never pressure you for a tip." },
  { q: "What payment methods do you take?", a: "Ask when you book and we'll confirm the options. Payment is due when the job is finished, not before." },
];

const BOOKING: Faq[] = [
  { q: "How far ahead should I book?", a: "Two to four weeks for moves, especially at month-end. But we also do same-day and last-minute moves and junk pickups." },
  { q: "Can you move me today?", a: "Often, yes. Call as early as you can and we'll tell you honestly within a few minutes." },
  { q: "Will you call before you arrive?", a: "Always. We call when we're on the way so you're never guessing." },
  { q: "What areas do you serve?", a: "The whole Las Vegas valley: Las Vegas, Henderson, Summerlin, Paradise, North Las Vegas and nearby." },
];

const MOVING_DAY: Faq[] = [
  { q: "Do you wrap furniture?", a: "Yes, every piece is blanket-wrapped. TVs, mirrors and glass are protected and kept upright." },
  { q: "Do you take apart and put back together furniture?", a: "Yes. Beds, tables and cribs come apart for the move and go back together at your new place." },
  { q: "Where will you put my boxes?", a: "In the room they're labeled for. Not dumped in the garage." },
  { q: "What happens if something gets damaged?", a: "We tell you right away and work with you to make it right. We never hide it." },
  { q: "What won't you move?", a: "Hazardous materials like propane, gasoline, paint and chemicals. Keep valuables, documents and medications with you." },
];

export default function FaqPage() {
  return (
    <SiteShell>
      <JsonLd data={faqSchema([...PRICING, ...BOOKING, ...MOVING_DAY])} />
      <PageHero
        trail={[{ label: "FAQ", href: "/faq" }]}
        h1="Frequently Asked Questions"
        tagline="Straight answers. If yours isn't here, call us. A real person picks up."
        lead={{ heading: "Ready for a price?" }}
      />
      <FaqSection title="Pricing" faqs={PRICING} schema={false} />
      <FaqSection title="Booking & scheduling" faqs={BOOKING} schema={false} />
      <FaqSection title="On moving day" faqs={MOVING_DAY} schema={false} />
      <CtaBand />
    </SiteShell>
  );
}
