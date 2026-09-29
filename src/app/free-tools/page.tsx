import { SiteShell } from "@/components/site";
import { PageHero } from "@/components/templates";
import { BrandButton, Container, CtaBand, LinkCards, SectionTitle } from "@/components/ui";
import { GUIDES } from "@/content/guides";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Free Moving Tools | Cost Calculator & Checklists for Las Vegas",
  description:
    "Free moving tools for Las Vegas: moving cost calculator, junk removal cost guide, printable moving day and garage cleanout checklists.",
  path: "/free-tools",
});

export default function ToolsHub() {
  return (
    <SiteShell>
      <PageHero
        trail={[{ label: "Free Tools", href: "/free-tools" }]}
        h1="Free Moving Tools & Checklists"
        tagline="Plan your move, see what it should cost, then get an exact quote in minutes."
        points={["Moving cost calculator: ballpark in under a minute", "Printable moving day & garage checklists", "Real Las Vegas junk removal prices"]}
        lead={{ service: "local-move", heading: "Want an exact price instead?" }}
      />
      <section className="py-12 lg:py-16">
        <Container className="grid items-center gap-10 border border-ink p-6 offset-sky sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-sky-700">Most popular</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-[40px]">Las Vegas Moving Cost Calculator</h2>
            <p className="mt-4 text-[16px] leading-7 text-ink">
              Pick your home size, how far you&apos;re going, stairs and extras, and get a ballpark price right away. No email
              needed to see your number.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <BrandButton href="/free-tools/moving-cost-calculator">Try the Calculator</BrandButton>
          </div>
        </Container>
      </section>
      <section className="pb-12 lg:pb-16">
        <Container>
          <SectionTitle>Checklists &amp; guides</SectionTitle>
          <div className="mt-8">
            <LinkCards links={GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.title, body: g.excerpt }))} />
          </div>
        </Container>
      </section>
      <CtaBand />
    </SiteShell>
  );
}
