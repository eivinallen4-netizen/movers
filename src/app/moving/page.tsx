import Link from "next/link";
import { SiteShell } from "@/components/site";
import { PageHero, ProblemsSection, ProseSection, ServiceCards, StepsSection } from "@/components/templates";
import { BrandButton, Container, CtaBand, FaqSection, JsonLd, ReviewRow, SectionTitle } from "@/components/ui";
import { MOVING_STEPS, servicesIn } from "@/content/services";
import { reviewsFor } from "@/content/reviews";
import { serviceSchema } from "@/content/schema";
import { AREA_LINKS } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const TITLE = "Las Vegas Movers | Honest, On-Time Local Moving Company";
const DESCRIPTION =
  "Local Las Vegas movers for apartments, houses and last-minute moves. On time, careful, upfront pricing with no hidden fees. Henderson, Summerlin & the whole valley.";

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/moving" });

export default function MovingHub() {
  return (
    <SiteShell>
      <JsonLd data={serviceSchema({ name: "Local moving", description: DESCRIPTION, url: "/moving" })} />
      <PageHero
        trail={[{ label: "Moving", href: "/moving" }]}
        h1="Las Vegas Movers Who Make Moving Easy"
        tagline="Stress-free moves from start to finish. We carry the weight so you don't have to."
        points={["Honest, upfront pricing. No surprises", "On time, and we call when we're on the way", "Handled with care, like it's our own"]}
        lead={{ heading: "Get your free moving quote" }}
      />
      <section className="py-12 lg:py-16">
        <Container>
          <SectionTitle sub="Pick the move that fits. Every one comes with the same careful crew and honest pricing.">
            Our moving services
          </SectionTitle>
          <div className="mt-12">
            <ServiceCards services={servicesIn("moving")} />
          </div>
        </Container>
      </section>
      <ProblemsSection
        title={<>We read 200+ Las Vegas moving reviews. <span className="text-sky-600">Here&apos;s what we fixed.</span></>}
        problems={[
          { pain: "\"The final bill was more than double the original quote.\"", fix: "Your price is explained upfront. If anything could change it, you hear about it before moving day, not after." },
          { pain: "\"They all just stand around and waste time… on my dime.\"", fix: "On time and fast. We keep working until the last box is in, so your move costs less." },
          { pain: "\"Everything left in the garage for me to move into the house.\"", fix: "Every box goes to the right room and beds get put back together. That's what you pay movers for." },
        ]}
      />
      <StepsSection steps={MOVING_STEPS} />
      <ProseSection
        eyebrow="Local movers, Las Vegas NV"
        title="A local crew, not a call center"
        paras={[
          "We're a Las Vegas moving company made up of local people who live here too. When you call, you talk to someone who knows the difference between moving in Anthem and moving near the Strip, and who can actually book your move.",
          "We move studios, apartments, condos and houses anywhere in the valley, including same-day and last-minute moves when your plans change. We also do junk removal, so you never have to pay to move something you're going to throw away.",
        ]}
      />
      <section className="bg-ink py-12 text-white lg:py-16">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[640px]">
            <h2 className="text-3xl font-bold leading-tight sm:text-[36px]">
              How much should your move cost? <span className="text-sky">Find out in a minute.</span>
            </h2>
            <p className="mt-3 text-white/85">Pick your home size, distance and extras for a ballpark price. No email needed to see it.</p>
          </div>
          <BrandButton href="/free-tools/moving-cost-calculator">Try the Calculator</BrandButton>
        </Container>
      </section>
      <ReviewRow reviews={reviewsFor("moving")} />
      <FaqSection
        faqs={[
          { q: "How much do movers cost in Las Vegas?", a: "Most local moves are priced by crew size and time, plus a truck fee. A studio might take a couple of hours; a 4-bedroom house most of a day. Try our cost calculator for a ballpark, then get an exact upfront quote from us." },
          { q: "Do you do long-distance moves?", a: "We focus on local moves across the Las Vegas valley. For long-distance moves we can load or unload your rental truck or container with our moving labor service." },
          { q: "Do you move on weekends?", a: "Yes. Weekends book up fast, especially at month-end, so reach out early." },
          { q: "What do I need to do before the movers arrive?", a: "Have boxes packed and labeled, set aside anything that rides with you, and clear parking for the truck. Our moving day checklist covers the rest." },
        ]}
        title="Moving FAQ"
      />
      <section className="pb-12 lg:pb-16">
        <Container>
          <p className="text-sm font-bold text-ink">
            Movers serving{" "}
            {AREA_LINKS.map((a, i) => (
              <span key={a.href}>
                <Link href={a.href} className="text-sky-700 underline">
                  {a.label}
                </Link>
                {i < AREA_LINKS.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </Container>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
