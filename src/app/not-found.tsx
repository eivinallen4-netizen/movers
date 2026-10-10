import { SiteShell } from "@/components/site";
import { BrandButton, CallButton, Container, LinkCards } from "@/components/ui";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="bg-ink py-16 text-white lg:py-24">
        <Container>
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky">404</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">This page moved out.</h1>
          <p className="mt-4 max-w-[560px] text-lg text-white/85">
            We couldn&apos;t find what you were looking for. Try one of these, or get a free quote.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <BrandButton href="/quote">Get a Free Quote</BrandButton>
            <CallButton />
          </div>
        </Container>
      </section>
      <section className="py-12">
        <Container>
          <LinkCards
            links={[
              { href: "/moving", label: "Moving" },
              { href: "/junk-removal", label: "Junk Removal" },
              { href: "/free-tools/moving-cost-calculator", label: "Moving Cost Calculator" },
            ]}
          />
        </Container>
      </section>
    </SiteShell>
  );
}
