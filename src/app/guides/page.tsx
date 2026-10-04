import Link from "next/link";
import { SiteShell } from "@/components/site";
import { QuoteCard } from "@/components/QuoteHeroForm";
import { Breadcrumbs, Container, CtaBand, LearnMore } from "@/components/ui";
import { BoxMark } from "@/components/icons";
import { GUIDES } from "@/content/guides";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Las Vegas Moving & Junk Removal Guides | Local Mover Tips",
  description:
    "Free Las Vegas moving guides, checklists and cost breakdowns from a local moving and junk removal crew. Plan smarter, spend less, skip the headache.",
  path: "/guides",
});

export default function GuidesHub() {
  return (
    <SiteShell>
      <section className="bg-ink pb-12 pt-8 text-white lg:pb-16 lg:pt-10">
        <Container>
          <Breadcrumbs trail={[{ label: "Guides", href: "/guides" }]} />
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl">Moving &amp; Junk Removal Guides</h1>
          <p className="mt-5 max-w-[720px] text-lg font-bold leading-snug text-sky">
            Straight answers from a local Las Vegas crew: checklists, real costs and how to avoid a bad mover.
          </p>
        </Container>
      </section>
      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2">
          <article>
            <Link href="/free-tools/moving-cost-calculator" className="relative block aspect-[8/5] overflow-hidden rounded-lg bg-sky">
              <BoxMark className="absolute right-3 top-3 h-14 w-14 text-ink" />
              <span className="absolute bottom-3 left-3 bg-ink px-2 py-1 text-xs font-bold uppercase text-sky">Free tool</span>
            </Link>
            <h2 className="mt-5 text-lg font-bold leading-snug text-ink">
              <Link href="/free-tools/moving-cost-calculator" className="hover:text-sky-700">
                Las Vegas Moving Cost Calculator
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink">See what your local move should cost before you call anyone.</p>
            <LearnMore href="/free-tools/moving-cost-calculator" label="Try it" />
          </article>
          {GUIDES.map((g, i) => (
            <article key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="relative block aspect-[8/5] overflow-hidden rounded-lg"
                style={{ background: i % 2 ? "linear-gradient(160deg,#7cc4ff,#1c1f24)" : "linear-gradient(160deg,#31a2fd,#000000)" }}
              >
                <BoxMark className="absolute right-3 top-3 h-14 w-14 text-white/80" />
                {g.printable && <span className="absolute bottom-3 left-3 bg-white px-2 py-1 text-xs font-bold uppercase text-ink">Printable</span>}
              </Link>
              <h2 className="mt-5 text-lg font-bold leading-snug text-ink">
                <Link href={`/guides/${g.slug}`} className="hover:text-sky-700">
                  {g.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink">{g.excerpt}</p>
              <LearnMore href={`/guides/${g.slug}`} label="Read the guide" />
            </article>
          ))}
        </div>
        <aside id="get-quote" className="scroll-mt-6">
          <div className="lg:sticky lg:top-6">
            <QuoteCard heading="Skip the planning. Get a quote." />
          </div>
        </aside>
      </Container>
      <CtaBand />
    </SiteShell>
  );
}
