import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Phone } from "./icons";
import { LeadForm } from "./LeadForm";
import { PrintButton } from "./PrintButton";
import {
  Breadcrumbs,
  CheckList,
  Container,
  CtaBand,
  FaqSection,
  JsonLd,
  LearnMore,
  LinkCards,
  ReviewRow,
  SectionTitle,
} from "./ui";
import { AREA_LINKS, BUSINESS, PHONE, PHONE_HREF, SITE_URL } from "@/content/site";
import { JUNK_STEPS, MOVING_STEPS, servicesIn, serviceHref, type Service } from "@/content/services";
import type { Area } from "@/content/areas";
import type { Guide } from "@/content/guides";
import { linkCard } from "@/content/links";
import { reviewsFor } from "@/content/reviews";
import { businessSchema, serviceSchema, BUSINESS_ID } from "@/content/schema";

/* ============ Hero with the lead form: every inner page opens with a way to get a quote ============ */

export function PageHero({
  trail,
  h1,
  tagline,
  points = [],
  lead,
  children,
}: {
  trail: { label: string; href: string }[];
  h1: ReactNode;
  tagline: ReactNode;
  points?: string[];
  lead: { service: string; heading?: string; sub?: string; details?: string };
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink pb-16 pt-8 text-white lg:pb-20 lg:pt-10">
      <Container className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="lg:pt-6">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[52px]">{h1}</h1>
          <p className="mt-5 text-lg font-bold leading-snug text-sky sm:text-xl">{tagline}</p>
          {points.length > 0 && (
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-base font-semibold">
                  <Check className="mt-1 shrink-0" width={18} height={18} /> {p}
                </li>
              ))}
            </ul>
          )}
          {children}
          <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-sky">
            <Phone className="text-sky" width={22} height={22} /> Rather talk? Call {PHONE}
          </a>
        </div>
        <div id="get-quote" className="scroll-mt-6">
          <LeadForm service={lead.service} heading={lead.heading} sub={lead.sub} details={lead.details} />
        </div>
      </Container>
    </section>
  );
}

/* ============ Shared sections ============ */

export function ProseSection({ title, paras, eyebrow }: { title: ReactNode; paras: string[]; eyebrow?: string }) {
  return (
    <section className="py-12 lg:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <SectionTitle eyebrow={eyebrow}>{title}</SectionTitle>
        <div className="space-y-5 text-[16px] leading-8 text-ink">
          {paras.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProblemsSection({ problems, title }: { problems: { pain: string; fix: string }[]; title: ReactNode }) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <SectionTitle eyebrow="Why people switch to us">{title}</SectionTitle>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {problems.map((p, i) => (
            <div key={p.pain} className={`border bg-white p-6 ${i % 2 ? "border-ink offset-ink-sm" : "border-sky offset-sky-sm"}`}>
              <p className="text-sm font-bold italic leading-6 text-ink-600">{p.pain}</p>
              <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-sky-700">How we do it</p>
              <p className="mt-2 text-[15px] leading-7 text-ink">{p.fix}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function StepsSection({ steps, title = "How it works" }: { steps: { title: string; body: string }[]; title?: ReactNode }) {
  return (
    <section className="bg-sky-100 py-12 lg:py-16">
      <Container>
        <SectionTitle>{title}</SectionTitle>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="flex h-12 w-12 items-center justify-center bg-ink text-lg font-extrabold text-sky">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function RelatedSection({ title, hrefs }: { title: string; hrefs: string[] }) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-8">
          <LinkCards links={hrefs.map(linkCard)} />
        </div>
      </Container>
    </section>
  );
}

function AreaStrip({ label }: { label: string }) {
  return (
    <section className="pb-12 lg:pb-16">
      <Container>
        <p className="text-sm font-bold text-ink">
          {label}{" "}
          {AREA_LINKS.map((a, i) => (
            <span key={a.href}>
              <Link href={a.href} className="text-sky-700 underline hover:no-underline">
                {a.label}
              </Link>
              {i < AREA_LINKS.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}

export function ServiceCards({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-x-9 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <div key={s.slug}>
          <div className="flex h-24 items-end">{s.icon}</div>
          <h3 className="mt-6 text-[26px] font-bold leading-tight text-ink">
            <Link href={serviceHref(s)} className="hover:text-sky-700">
              {s.name}
            </Link>
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-ink">{s.short}</p>
          <LearnMore href={serviceHref(s)} />
        </div>
      ))}
    </div>
  );
}

/* ============ Service page (/moving/<slug>, /junk-removal/<slug>) ============ */

export function ServiceView({ s }: { s: Service }) {
  const isMove = s.category === "moving";
  const hub = isMove ? { label: "Moving", href: "/moving" } : { label: "Junk Removal", href: "/junk-removal" };
  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.metaDescription, url: serviceHref(s) })} />
      <PageHero
        trail={[hub, { label: s.name, href: serviceHref(s) }]}
        h1={s.h1}
        tagline={s.tagline}
        points={s.heroPoints}
        lead={{ service: s.leadService, heading: isMove ? "Get your free moving quote" : "Get your free junk removal quote" }}
      />
      <ProseSection eyebrow={s.name} title={isMove ? "Moving shouldn't be a headache." : "Junk gone. No heavy lifting for you."} paras={s.intro} />
      <ProblemsSection problems={s.problems} title={<>What goes wrong with other companies, <span className="text-sky-600">and what we do instead</span></>} />
      <section className="py-12 lg:py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle>What&apos;s included</SectionTitle>
            <CheckList items={s.included} className="mt-8" />
          </div>
          <div>
            <SectionTitle>Who it&apos;s for</SectionTitle>
            <CheckList items={s.idealFor} className="mt-8" />
          </div>
        </Container>
      </section>
      <StepsSection steps={s.steps ?? (isMove ? MOVING_STEPS : JUNK_STEPS)} />
      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <SectionTitle>
            <span className="text-sky-600">Honest pricing.</span> No surprises.
          </SectionTitle>
          <div>
            <p className="text-[16px] leading-8 text-ink">
              You&apos;ll know what you&apos;re paying before we lift a thing. No &ldquo;double the quote,&rdquo; no fees snuck in
              at the end, no pushy tip requests. Here&apos;s what actually moves the price:
            </p>
            <CheckList items={s.priceFactors} className="mt-6" />
            <p className="mt-6 text-[15px] font-semibold text-ink">
              {isMove ? (
                <>
                  Want a ballpark right now? Try our{" "}
                  <Link href="/free-tools/moving-cost-calculator" className="text-sky-700 underline">
                    free moving cost calculator
                  </Link>
                  .
                </>
              ) : (
                <>
                  See typical prices in our{" "}
                  <Link href="/guides/junk-removal-cost-las-vegas" className="text-sky-700 underline">
                    Las Vegas junk removal cost guide
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </Container>
      </section>
      <ReviewRow reviews={reviewsFor(isMove ? "moving" : "junk")} />
      <FaqSection faqs={s.faqs} title={`${s.name}: common questions`} />
      <RelatedSection title="Related services & guides" hrefs={s.related} />
      <AreaStrip label={`${s.name} across the valley:`} />
      <CtaBand title={isMove ? "Ready for a stress-free move?" : "Ready to get your space back?"} />
    </>
  );
}

/* ============ Service-area page (/service-areas/<slug>) ============ */

export function AreaView({ a }: { a: Area }) {
  const href = `/service-areas/${a.slug}`;
  return (
    <>
      <JsonLd
        data={{
          ...businessSchema(),
          "@id": `${SITE_URL}${href}#business`,
          url: `${SITE_URL}${href}`,
          name: `${BUSINESS} (${a.name})`,
          areaServed: { "@type": "City", name: `${a.name}, NV` },
          parentOrganization: { "@id": BUSINESS_ID },
        }}
      />
      <PageHero
        trail={[{ label: "Service Areas", href: "/service-areas" }, { label: a.name, href }]}
        h1={a.h1}
        tagline={a.tagline}
        points={["Local crew that knows the area", "Upfront pricing, no hidden fees", "Same-day moves & junk pickup available"]}
        lead={{ service: "local-move", heading: `Get your free ${a.name} quote` }}
      />
      <ProseSection eyebrow={`${a.name}, Nevada`} title={<>Your local crew in <span className="text-sky-600">{a.name}</span></>} paras={a.intro} />
      <section className="py-12 lg:py-16">
        <Container>
          <SectionTitle>Moving services in {a.name}</SectionTitle>
          <div className="mt-8">
            <LinkCards links={servicesIn("moving").map((s) => ({ href: serviceHref(s), label: s.name, body: s.short }))} />
          </div>
          <div className="mt-14">
            <SectionTitle>Junk removal in {a.name}</SectionTitle>
          </div>
          <div className="mt-8">
            <LinkCards links={servicesIn("junk-removal").map((s) => ({ href: serviceHref(s), label: s.name, body: s.short }))} />
          </div>
        </Container>
      </section>
      <section className="bg-sky-100 py-12 lg:py-16">
        <Container>
          <SectionTitle>{a.name} moving tips from our crew</SectionTitle>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {a.localTips.map((t) => (
              <div key={t.title} className="border border-ink bg-white p-6">
                <h3 className="text-lg font-bold text-ink">{t.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink">{t.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle>Neighborhoods we serve</SectionTitle>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {a.neighborhoods.map((n) => (
                <li key={n} className="flex gap-2 text-[15px] text-ink">
                  <Check className="mt-1 shrink-0" /> {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle>ZIP codes</SectionTitle>
            <p className="mt-8 text-[15px] leading-8 text-ink">{a.zips.join(" · ")}</p>
            <p className="mt-4 text-sm text-ink-600">Don&apos;t see yours? We cover the whole valley. Just ask.</p>
          </div>
        </Container>
      </section>
      <StepsSection steps={MOVING_STEPS} />
      <ReviewRow reviews={reviewsFor("moving")} title={`What our customers say`} />
      <FaqSection faqs={a.faqs} title={`Moving & junk removal in ${a.name}: FAQ`} />
      <AreaStrip label="We also serve" />
      <CtaBand title={`Moving in ${a.name}? Let's make it easy.`} />
    </>
  );
}

/* ============ Guide / blog post (/guides/<slug>) ============ */

export function GuideView({ g }: { g: Guide }) {
  const href = `/guides/${g.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.metaDescription,
          dateModified: g.updated,
          mainEntityOfPage: `${SITE_URL}${href}`,
          author: { "@type": "Organization", name: BUSINESS, url: SITE_URL },
          publisher: { "@id": BUSINESS_ID, "@type": "Organization", name: BUSINESS },
        }}
      />
      <section className="bg-ink pb-12 pt-8 text-white lg:pb-16 lg:pt-10 print:bg-white print:pb-4 print:text-ink">
        <Container>
          <div className="print:hidden">
            <Breadcrumbs trail={[{ label: "Guides", href: "/guides" }, { label: g.title, href }]} />
          </div>
          <h1 className="mt-6 max-w-[860px] text-4xl font-bold leading-[1.1] sm:text-5xl">{g.title}</h1>
          <p className="mt-5 max-w-[760px] text-lg font-bold leading-snug text-sky print:text-ink">{g.excerpt}</p>
          <p className="mt-4 text-xs font-semibold text-white/70 print:hidden">
            Updated {new Date(`${g.updated}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · By the {BUSINESS} crew
          </p>
          {g.printable && (
            <div className="mt-6 print:hidden">
              <PrintButton />
            </div>
          )}
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
        <article className="min-w-0">
          <div className="space-y-5 text-[17px] leading-8 text-ink">
            {g.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {g.blocks.map((b) => (
            <section key={b.h2} className="mt-12 break-inside-avoid">
              <h2 className="text-2xl font-bold leading-tight text-ink sm:text-[28px]">{b.h2}</h2>
              {b.paras?.map((p) => (
                <p key={p} className="mt-4 text-[16px] leading-8 text-ink">
                  {p}
                </p>
              ))}
              {b.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-7 text-ink marker:text-sky-700">
                  {b.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
              {b.checklist && (
                <ul className="mt-5 space-y-3">
                  {b.checklist.map((l) => (
                    <li key={l} className="flex gap-3 text-[16px] leading-7 text-ink">
                      <span aria-hidden className="mt-1 h-5 w-5 shrink-0 border-2 border-ink" />
                      {l}
                    </li>
                  ))}
                </ul>
              )}
              {b.table && (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
                    <thead>
                      <tr className="bg-ink text-white">
                        {b.table.head.map((h) => (
                          <th key={h} className="px-4 py-3 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.table.rows.map((r) => (
                        <tr key={r.join()} className="border-b border-ink-200 even:bg-sky-100/50">
                          {r.map((c, i) => (
                            <td key={i} className={`px-4 py-3 ${i === r.length - 1 ? "whitespace-nowrap font-bold" : ""}`}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-xs text-ink-600">
                    Typical Las Vegas ranges, for planning only. Your exact price is confirmed upfront, before we start.
                  </p>
                </div>
              )}
            </section>
          ))}
        </article>
        <aside className="print:hidden">
          <div id="get-quote" className="scroll-mt-6 lg:sticky lg:top-6">
            <LeadForm
              service={g.leadService}
              heading={g.ctaHeading}
              sub="Tell us what you need. A real local person calls you back with an honest, upfront price."
            />
          </div>
        </aside>
      </Container>

      <div className="print:hidden">
        {g.faqs && <FaqSection faqs={g.faqs} />}
        <RelatedSection title="Keep reading" hrefs={g.related} />
        <CtaBand />
      </div>
    </>
  );
}
