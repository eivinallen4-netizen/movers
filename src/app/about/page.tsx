import { SiteShell } from "@/components/site";
import { PageHero, ProseSection } from "@/components/templates";
import { Container, CtaBand, JsonLd, LinkCards, ReviewRow, SectionTitle } from "@/components/ui";
import { BoxMark } from "@/components/icons";
import { REVIEWS } from "@/content/reviews";
import { businessSchema } from "@/content/schema";
import { pageMeta } from "@/lib/seo";
import { editorialImage } from "@/content/editorial-images";

export const metadata = pageMeta({
  title: "About Us | Local Las Vegas Movers & Junk Removal",
  description:
    "We're a local Las Vegas crew that shows up on time, treats your things like our own and keeps it honest from the first call to the last box. God First.",
  path: "/about",
});

const VALUES = [
  { title: "Handled with care", body: "Your things are wrapped, protected and treated like they're our own. If anything ever goes wrong, we tell you." },
  { title: "Honest pricing", body: "You'll know what you're paying before we lift a thing. No hidden fees, no double-the-quote surprises, no pushy tip requests." },
  { title: "On time. Fast. Careful.", body: "We show up when we say we will, call when we're on the way and keep working until the job is done." },
  { title: "Done, not half done", body: "Boxes in the right rooms. Beds back together. You don't lift a finger." },
  { title: "Real people", body: "When you call, a real local person picks up, gives you straight answers and calls you back when they say they will." },
  { title: "Kind and respectful", body: "It's your home. We're friendly, polite and patient, especially on the hard days like estate cleanouts." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", mainEntity: businessSchema() }} />
      <PageHero
        backdrop={editorialImage("about")}
        trail={[{ label: "About", href: "/about" }]}
        h1="Local Crew. Real Care."
        tagline="Moving is stressful enough. We're here to make sure it isn't a headache."
        points={["Local to Las Vegas", "Movers and junk removal under one roof", "God First"]}
        lead={{ heading: "Let's talk about your move" }}
      />
      <ProseSection
        eyebrow="Our story"
        title={<>Moving shouldn&apos;t be <span className="text-sky-600">a headache.</span></>}
        paras={[
          "At Movers and Junk Removal, we're a local Las Vegas crew that shows up on time, treats your things like our own, and keeps it honest from the first call to the last box.",
          "Before we started, we read more than 200 real Google reviews of Las Vegas moving companies. The same stories kept coming up: broken furniture nobody owned up to, final bills double the quote, crews standing around on the clock, offices that never called back, and boxes dumped in the garage. We built our company to be the opposite of every one of those reviews.",
          "We do moving and junk removal because they go together. Nobody should have to pay to move stuff they don't want, or call two companies to get one job done.",
          "Competitive pricing, more of your stuff moved for it, and no headaches. God First.",
        ]}
      />
      <section className="bg-ink py-12 text-white lg:py-16">
        <Container>
          <div className="flex items-center gap-4">
            <BoxMark className="h-12 w-12 text-sky" />
            <h2 className="text-3xl font-extrabold uppercase">
              What we <span className="text-sky">promise</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="border-l-4 border-sky pl-5">
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-white/85">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <ReviewRow reviews={REVIEWS.slice(0, 3)} />
      <section className="pb-12 lg:pb-16">
        <Container>
          <SectionTitle>How we can help</SectionTitle>
          <div className="mt-8">
            <LinkCards
              links={[
                { href: "/moving", label: "Moving", body: "Local, same-day and last-minute moves across the valley." },
                { href: "/junk-removal", label: "Junk Removal", body: "Furniture, appliances, garage and estate cleanouts." },
                { href: "/service-areas", label: "Service Areas", body: "Las Vegas, Henderson, Summerlin, Paradise and North Las Vegas." },
              ]}
            />
          </div>
        </Container>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
