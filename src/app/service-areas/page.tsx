import { SiteShell } from "@/components/site";
import { PageHero, ProseSection } from "@/components/templates";
import { Container, CtaBand, JsonLd, LinkCards, SectionTitle } from "@/components/ui";
import { AREAS } from "@/content/areas";
import { businessSchema } from "@/content/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Service Areas | Las Vegas Valley Movers & Junk Removal",
  description:
    "We serve Las Vegas, Henderson, Summerlin, Paradise, North Las Vegas, Spring Valley, Enterprise and the whole valley. Local movers and junk removal, upfront pricing.",
  path: "/service-areas",
});

export default function AreasHub() {
  return (
    <SiteShell>
      <JsonLd data={businessSchema()} />
      <PageHero
        trail={[{ label: "Service Areas", href: "/service-areas" }]}
        h1="Proudly Serving the Whole Las Vegas Valley"
        tagline="We live here too. Moving across town or clearing out the garage, one call gets it handled."
        points={["Las Vegas, Henderson, Summerlin, Paradise & North Las Vegas", "Same-day service in most of the valley", "Same honest pricing everywhere we go"]}
        lead={{ heading: "Get your free quote" }}
      />
      <section className="py-12 lg:py-16">
        <Container>
          <SectionTitle sub="Pick your city for local tips, neighborhoods we serve and answers to common questions.">
            Where we work
          </SectionTitle>
          <div className="mt-8">
            <LinkCards links={AREAS.map((a) => ({ href: `/service-areas/${a.slug}`, label: a.name, body: a.tagline }))} />
          </div>
        </Container>
      </section>
      <ProseSection
        title="Local knowledge saves you time (and money)"
        paras={[
          "Knowing the valley means knowing which HOAs need a guard-gate list, which high-rises need a loading dock reservation, which freeways jam at 5pm and when summer heat makes an afternoon move a bad idea.",
          "We plan every move and junk pickup around those details, so the crew shows up on time and gets right to work. On an hourly job, that's money back in your pocket.",
          "Not sure if we cover your street? If it's in the Las Vegas valley, we almost certainly do. Send the form or call and we'll confirm right away.",
        ]}
      />
      <CtaBand />
    </SiteShell>
  );
}
