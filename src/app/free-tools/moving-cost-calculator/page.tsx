import { SiteShell } from "@/components/site";
import { Breadcrumbs, CheckList, Container, CtaBand, FaqSection, JsonLd, LinkCards, SectionTitle } from "@/components/ui";
import { linkCard } from "@/content/links";
import { SITE_URL } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { Calculator } from "./Calculator";

const TITLE = "Las Vegas Moving Cost Calculator [2026] | Free Estimate";
const DESCRIPTION =
  "Free Las Vegas moving cost calculator. Pick your home size, distance, stairs and extras to see what your local move should cost in 2026. No email needed.";

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/free-tools/moving-cost-calculator" });

export default function CalculatorPage() {
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Las Vegas Moving Cost Calculator",
          url: `${SITE_URL}/free-tools/moving-cost-calculator`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: DESCRIPTION,
        }}
      />
      <section className="bg-ink pb-12 pt-8 text-white lg:pb-14 lg:pt-10">
        <Container>
          <Breadcrumbs
            trail={[
              { label: "Free Tools", href: "/free-tools" },
              { label: "Moving Cost Calculator", href: "/free-tools/moving-cost-calculator" },
            ]}
          />
          <h1 className="mt-6 max-w-[860px] text-4xl font-bold leading-[1.1] sm:text-5xl">
            How much should your Las Vegas move cost?
          </h1>
          <p className="mt-5 max-w-[720px] text-lg font-bold leading-snug text-sky">
            Answer five quick questions for a ballpark price. No email needed to see it.
          </p>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container>
          <Calculator />
        </Container>
      </section>
      <section className="bg-sky-100 py-12 lg:py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle>How local moving is priced in Las Vegas</SectionTitle>
            <p className="mt-6 text-[16px] leading-8 text-ink">
              Most local Las Vegas movers charge by the hour for the crew, plus a truck or travel fee. The biggest things that change
              your price are how much you have, how many people it takes to move it efficiently, and how long it takes to get it from
              the door to the truck.
            </p>
          </div>
          <div>
            <SectionTitle>Ways to lower your moving cost</SectionTitle>
            <CheckList
              className="mt-8"
              items={[
                "Be fully packed and labeled before the crew arrives",
                "Get rid of what you don't want before you move it",
                "Reserve parking close to the door at both places",
                "Book mid-month and mid-week when you can",
                "Hire a crew that works fast. Hourly moves reward efficiency",
              ]}
            />
          </div>
        </Container>
      </section>
      <FaqSection
        title="Moving cost questions"
        faqs={[
          { q: "How accurate is the moving cost calculator?", a: "It's a planning estimate based on typical local moves in Las Vegas. Your exact price depends on your actual inventory, access and specialty items, and we'll give it to you upfront before moving day." },
          { q: "Why do movers charge a truck fee?", a: "It covers the truck, fuel, equipment like dollies and moving blankets, and travel to your home. We tell you the fee upfront. It's never snuck in at the end." },
          { q: "Is it cheaper to move on a weekday?", a: "Often, yes. Weekdays and mid-month dates are easier to schedule and give you more flexibility." },
          { q: "Do I have to tip movers?", a: "Tipping is always your choice. We'll never pressure you for a tip." },
        ]}
      />
      <section className="py-12 lg:py-16">
        <Container>
          <SectionTitle>More free tools</SectionTitle>
          <div className="mt-8">
            <LinkCards
              links={["/guides/moving-day-checklist", "/guides/red-flags-hiring-movers", "/guides/junk-removal-cost-las-vegas"].map(linkCard)}
            />
          </div>
        </Container>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
