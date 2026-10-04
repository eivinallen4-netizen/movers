import { SiteShell } from "@/components/site";
import { PageHero, ProblemsSection, ProseSection, ServiceCards, StepsSection } from "@/components/templates";
import { BrandButton, CheckList, Container, CtaBand, FaqSection, JsonLd, ReviewRow, SectionTitle } from "@/components/ui";
import { JUNK_STEPS, servicesIn } from "@/content/services";
import { reviewsFor } from "@/content/reviews";
import { serviceSchema } from "@/content/schema";
import { pageMeta } from "@/lib/seo";

const TITLE = "Junk Removal Las Vegas | Same-Day Pickup, Upfront Pricing";
const DESCRIPTION =
  "Junk removal in Las Vegas, Henderson & Summerlin. Furniture, appliances, garage and estate cleanouts. Upfront price before we load. Junk gone today.";

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/junk-removal" });

export default function JunkHub() {
  return (
    <SiteShell>
      <JsonLd data={serviceSchema({ name: "Junk removal", description: DESCRIPTION, url: "/junk-removal" })} />
      <PageHero
        trail={[{ label: "Junk Removal", href: "/junk-removal" }]}
        h1="Junk Removal in Las Vegas. Junk Gone Today."
        tagline="One item or a whole house. Honest pricing and no heavy lifting for you."
        points={["Upfront price before we load a thing", "We carry it from any room", "Same-day pickup available"]}
        lead={{ heading: "Get your free junk removal quote" }}
      />
      <section className="py-12 lg:py-16">
        <Container>
          <SectionTitle sub="Point to it and it's gone. We do all the lifting, loading and sweeping up.">
            Junk removal services
          </SectionTitle>
          <div className="mt-12">
            <ServiceCards services={servicesIn("junk-removal")} />
          </div>
        </Container>
      </section>
      <ProblemsSection
        title={<>Junk removal <span className="text-sky-600">without the runaround</span></>}
        problems={[
          { pain: "\"They wouldn't give me a price until the truck showed up.\"", fix: "Ballpark on the phone, exact price on-site before we load. You say yes, or we leave. No pressure." },
          { pain: "\"8-to-5 window and nobody called.\"", fix: "We call when we're on the way so you're not stuck at home all day." },
          { pain: "\"They scraped the walls dragging the couch out.\"", fix: "We carry carefully and protect corners and door frames." },
        ]}
      />
      <section className="py-12 lg:py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle>What we take</SectionTitle>
            <CheckList
              className="mt-8"
              items={[
                "Couches, sectionals, recliners and mattresses",
                "Refrigerators, washers, dryers and water heaters",
                "Dressers, tables, desks and office furniture",
                "Boxes, bags and garage clutter",
                "Exercise equipment, bikes and grills",
                "Patio furniture, yard waste and old fencing",
                "TVs and electronics",
              ]}
            />
          </div>
          <div>
            <SectionTitle>What we can&apos;t take</SectionTitle>
            <p className="mt-8 text-[15px] leading-7 text-ink">
              Hazardous materials can&apos;t go on a junk truck in Nevada. Clark County runs household hazardous waste drop-offs for
              these:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] text-ink marker:text-sky-700">
              <li>Paint, stains and solvents</li>
              <li>Motor oil, fuel and propane tanks</li>
              <li>Pool chemicals and pesticides</li>
              <li>Asbestos and medical waste</li>
            </ul>
          </div>
        </Container>
      </section>
      <StepsSection steps={JUNK_STEPS} />
      <ProseSection
        eyebrow="Junk removal Las Vegas"
        title="Movers who haul junk, too"
        paras={[
          "Because we're a moving company as well, our crews are trained to carry big, heavy things out of tight spaces without damaging your home. That's the same care we bring to every junk removal job.",
          "Moving soon? Add junk haul-away to your move and we'll take what you're keeping to the new place and haul the rest, same day, one price.",
        ]}
      />
      <section className="bg-ink py-12 text-white lg:py-16">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[640px]">
            <h2 className="text-3xl font-bold leading-tight sm:text-[36px]">
              What does junk removal cost in Las Vegas? <span className="text-sky">See typical prices.</span>
            </h2>
            <p className="mt-3 text-white/85">Single items, quarter, half and full truckloads, and how to save.</p>
          </div>
          <BrandButton href="/guides/junk-removal-cost-las-vegas">See the Cost Guide</BrandButton>
        </Container>
      </section>
      <ReviewRow reviews={reviewsFor("junk")} />
      <FaqSection
        title="Junk removal FAQ"
        faqs={[
          { q: "How is junk removal priced?", a: "By how much truck space your junk takes, plus extra for very heavy items. We confirm the exact price on-site before we load anything." },
          { q: "Do I need to be home?", a: "It's best to be there to confirm the price, but for curbside or garage pickups we can often work with a phone call and photos." },
          { q: "Do you donate or recycle?", a: "When items are in usable shape we try to donate them, and we recycle metal appliances where possible." },
          { q: "Can you come today?", a: "Often, yes. Call in the morning for the best chance at a same-day pickup." },
        ]}
      />
      <CtaBand title="Ready to get your space back?" sub="Call in the morning, junk gone today. Upfront price before we lift a thing." />
    </SiteShell>
  );
}
