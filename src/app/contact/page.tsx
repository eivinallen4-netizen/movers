import Link from "next/link";
import { SiteShell } from "@/components/site";
import { PageHero } from "@/components/templates";
import { Container, JsonLd } from "@/components/ui";
import { Building, Phone } from "@/components/icons";
import { businessSchema } from "@/content/schema";
import { PHONE, PHONE_HREF } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us | Movers and Junk Removal Las Vegas",
  description: `Call ${PHONE} or send a quick message to get an honest, upfront quote from a local Las Vegas moving and junk removal crew.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", mainEntity: businessSchema() }} />
      <PageHero
        trail={[{ label: "Contact", href: "/contact" }]}
        h1="Talk to a Real Local Person"
        tagline="Call us, or start your free quote online in minutes. No call centers, no runaround."
        points={["Honest answers on the first call", "Same-day availability checked on the spot", "Upfront pricing, no pressure"]}
        lead={{ heading: "Get your free quote" }}
      />
      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 md:grid-cols-3">
          <div className="border border-ink p-6 offset-sky-sm">
            <Phone className="text-sky-700" width={28} height={28} />
            <h2 className="mt-3 text-xl font-bold text-ink">Call</h2>
            <a href={PHONE_HREF} className="mt-3 block text-xl font-bold text-sky-700 underline">
              {PHONE}
            </a>
            <p className="mt-2 text-sm text-ink-600">Fastest way to book a same-day move or junk pickup.</p>
          </div>
          <div className="border border-ink p-6 offset-ink-sm">
            <Building className="text-sky-700" width={28} height={28} />
            <h2 className="mt-3 text-xl font-bold text-ink">Where we work</h2>
            <p className="mt-3 text-[15px] leading-7 text-ink">
              Las Vegas, Henderson, Summerlin, Paradise, North Las Vegas and{" "}
              <Link href="/service-areas" className="font-bold text-sky-700 underline">
                the whole valley
              </Link>
              .
            </p>
          </div>
          <div className="border border-ink p-6 offset-sky-sm">
            <h2 className="mt-3 text-xl font-bold text-ink">Detailed quote</h2>
            <p className="mt-3 text-[15px] leading-7 text-ink">
              Planning a full move? Use our step-by-step quote builder to list rooms and add photos for the most exact price.
            </p>
            <Link href="/quote" className="mt-3 inline-block font-bold text-sky-700 underline">
              Build a detailed quote
            </Link>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
