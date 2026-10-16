import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Phone, Star } from "./icons";
import { MediaFill, hasMedia, type ResolvedMedia } from "./media-fill";
import { PHONE, PHONE_HREF, SITE_URL } from "@/content/site";
import { REVIEW_SOURCES, type Review } from "@/content/reviews";

/* Shared building blocks for every page. Server components only (no hooks). */

/** Plain copy with optional inline links written as [anchor](/path), so content files can carry internal links. */
export function Linked({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\(\/[^)]*\))/).map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="font-semibold text-sky-700 underline underline-offset-2 hover:text-ink">
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1164px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function LearnMore({ href, label = "Learn More" }: { href: string; label?: string }) {
  return (
    <Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
      {label} <ArrowUpRight />
    </Link>
  );
}

export function BrandButton({ children, href = "#get-quote" }: { children: ReactNode; href?: string }) {
  const cls =
    "inline-flex h-[52px] items-center gap-2 bg-sky px-9 text-sm font-bold uppercase text-ink transition hover:bg-sky-600";
  // Hash, tel: and absolute links don't need client-side routing.
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={cls}>
        {children} <ArrowUpRight />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children} <ArrowUpRight />
    </Link>
  );
}

export function CallButton({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex h-[52px] items-center gap-2 px-6 text-sm font-bold transition ${
        tone === "dark" ? "bg-white text-ink hover:bg-sky-100" : "border-2 border-ink bg-white text-ink hover:bg-sky-100"
      }`}
    >
      <Phone width={16} height={16} /> Call {PHONE}
    </a>
  );
}

/**
 * Photo/video slot with the signature offset block behind it. Shows the file from
 * public/media/ when one exists, otherwise the placeholder tone + illustration (children).
 */
export function Photo({
  media: m,
  offset = "sky",
  label,
  children,
  className = "",
}: {
  media: ResolvedMedia;
  offset?: "sky" | "ink";
  label?: string;
  children?: ReactNode;
  className?: string;
}) {
  const filled = hasMedia(m);
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${offset === "sky" ? "offset-sky" : "offset-ink"} ${className}`}
      style={{ background: m.tone }}
    >
      {filled ? <MediaFill media={m} sizes="(min-width: 1024px) 560px, 100vw" /> : children}
      {!filled && label && (
        <span className="absolute bottom-3 left-3 rounded bg-white/85 px-2 py-1 text-[11px] font-semibold text-ink">
          {label}
        </span>
      )}
    </div>
  );
}

/** Structured data for search engines. `<` is escaped so content can't break out of the tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; href: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs font-semibold text-white/70">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-sky">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}

/*
 * Locked type scale + section kit (see BRAND.md §8). Use these instead of hand-rolled sizes.
 *   h2 (SectionTitle) 30 → 40px bold · lead text-lg medium · body 15px / leading-7
 *   Highlight words: sky-600 on light, sky on dark.
 */
type Tone = "light" | "soft" | "dark";

export function Section({
  children,
  tone = "light",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  const bg = tone === "dark" ? "bg-ink text-white" : tone === "soft" ? "bg-sky-100" : "";
  return (
    <section id={id} className={`py-12 lg:py-16 ${bg} ${className}`}>
      {children}
    </section>
  );
}

export function Highlight({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return <span className={tone === "dark" ? "text-sky" : "text-sky-600"}>{children}</span>;
}

export function SectionTitle({
  eyebrow,
  children,
  sub,
  tone = "light",
  className = "max-w-[760px]",
}: {
  eyebrow?: string;
  children: ReactNode;
  sub?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      {eyebrow && (
        <p className={`mb-2 text-xs font-extrabold uppercase tracking-widest ${dark ? "text-sky" : "text-sky-700"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold leading-tight sm:text-[40px] ${dark ? "text-white" : "text-ink"}`}>{children}</h2>
      {sub && <Lead tone={tone} className="mt-5">{sub}</Lead>}
    </div>
  );
}

export function Lead({ children, tone = "light", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={`text-lg font-medium leading-snug ${tone === "dark" ? "text-white/85" : "text-ink"} ${className}`}>{children}</p>
  );
}

export function Body({ children, tone = "light", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={`text-[15px] leading-7 ${tone === "dark" ? "text-white/85" : "text-ink"} ${className}`}>{children}</p>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((p) => (
        <li key={p} className="flex gap-2.5 text-[15px] leading-6 text-ink">
          <Check className="mt-1 shrink-0" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export type Faq = { q: string; a: string };

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** FAQ list as native <details> so answers are in the HTML for search engines, plus FAQPage schema. */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  schema = true,
}: {
  faqs: Faq[];
  title?: string;
  /** Turn off when a page has several FAQ sections, and emit one faqSchema() for all of them. */
  schema?: boolean;
}) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-8 divide-y divide-ink-200 border-y border-ink-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="mt-0.5 text-2xl leading-none text-sky-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[820px] text-[15px] leading-7 text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
      {schema && <JsonLd data={faqSchema(faqs)} />}
    </section>
  );
}

export function ReviewCard({ r, i }: { r: Review; i: number }) {
  // Alternates sky / ink offset in a checkerboard
  const sky = (Math.floor(i / 2) + i) % 2 === 0;
  const source = REVIEW_SOURCES[r.src];
  return (
    <article
      className={`flex min-h-[220px] flex-col rounded-lg border bg-white p-4 ${
        sky ? "offset-sky-sm border-sky" : "offset-ink-sm border-ink"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} />
          ))}
        </div>
        <SourceLogo src={r.src} height={28} />
      </div>
      <p className="mt-6 flex-1 text-[13px] leading-[1.45] text-ink">{r.text}</p>
      <p className="mt-6 text-xs font-bold text-ink">
        {r.who}, via {source.label}
      </p>
    </article>
  );
}

/** A review site's logo, linking to our profile there. */
export function SourceLogo({ src, height }: { src: Review["src"]; height: number }) {
  const s = REVIEW_SOURCES[src];
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Our reviews on ${s.label}`}>
      <Image src={s.logo.src} alt={s.label} width={s.logo.width} height={s.logo.height} className="w-auto" style={{ height: height * s.logo.scale }} />
    </a>
  );
}

export function Stars({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`flex shrink-0 gap-0.5 ${className}`} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((s) => (
        <Star key={s} width={size} height={size} />
      ))}
    </span>
  );
}

/** The 5-star banner: stars + "5-star rated on" + the review-site logos. */
export function RatingBadge({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark";
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border px-4 py-2.5 ${
        dark ? "border-white/20 bg-white/10 text-white" : "border-ink bg-white text-ink offset-sky-sm"
      } ${className}`}
    >
      <Stars size={20} />
      <span className="text-sm font-extrabold uppercase tracking-wide">5-star rated on</span>
      <span className="flex items-center gap-2">
        {(Object.keys(REVIEW_SOURCES) as Review["src"][]).map((src) => (
          <span key={src} className={`rounded px-1.5 py-1 ${dark ? "bg-white" : ""}`}>
            <SourceLogo src={src} height={20} />
          </span>
        ))}
      </span>
    </div>
  );
}

/** One-line rating for tight spots: under forms, in the closing band. */
export function RatingLine({
  tone = "light",
  link = true,
  className = "",
}: {
  tone?: "dark" | "light";
  /** Off on the ad funnels, which have no links away from the offer. */
  link?: boolean;
  className?: string;
}) {
  const cls = `flex flex-wrap items-center gap-2 text-sm font-bold ${tone === "dark" ? "text-white" : "text-ink"} ${className}`;
  const body = (
    <>
      <Stars size={16} /> 5-star rated on Yelp &amp; Thumbtack
    </>
  );
  return link ? (
    <Link href="/reviews" className={`${cls} hover:underline`}>
      {body}
    </Link>
  ) : (
    <p className={cls}>{body}</p>
  );
}

/** Compact review quote; pick short ones with shortReviews(). */
export function MiniReview({ r, tone = "light", className = "" }: { r: Review; tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark";
  return (
    <figure
      className={`flex flex-col rounded-lg border p-4 ${
        dark ? "border-white/15 bg-white/5 text-white" : "border-ink bg-white text-ink"
      } ${className}`}
    >
      <Stars size={16} />
      <blockquote className="mt-2 flex-1 text-sm leading-snug">&ldquo;{r.text}&rdquo;</blockquote>
      <figcaption className={`mt-3 text-xs font-bold ${dark ? "text-sky" : "text-sky-700"}`}>
        {r.who}, via {REVIEW_SOURCES[r.src].label}
      </figcaption>
    </figure>
  );
}

/** Slim band of three short reviews under the 5-star banner, to drop between sections. */
export function ReviewStrip({
  reviews,
  title,
  more = true,
}: {
  reviews: Review[];
  title?: ReactNode;
  more?: boolean;
}) {
  return (
    <section className="bg-sky-100 py-10 lg:py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div>
            {title && <p className="mb-3 text-2xl font-bold leading-tight text-ink sm:text-[28px]">{title}</p>}
            <RatingBadge tone="light" />
          </div>
          {more && (
            <Link href="/reviews" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
              Read all reviews <ArrowUpRight />
            </Link>
          )}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <MiniReview key={r.text} r={r} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** "Read our reviews on" row of review-site logos. */
export function ReviewSourceLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <span className="text-sm font-bold text-ink">Read our reviews on</span>
      {(Object.keys(REVIEW_SOURCES) as Review["src"][]).map((src) => (
        <SourceLogo key={src} src={src} height={36} />
      ))}
    </div>
  );
}

export function ReviewRow({
  reviews,
  title = "What our customers say",
  more = true,
}: {
  reviews: Review[];
  title?: string;
  /** Off on the ad funnels, which have no links away from the offer. */
  more?: boolean;
}) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {reviews.map((r, i) => (
            <ReviewCard key={r.text} r={r} i={i} />
          ))}
        </div>
        {more && <LearnMore href="/reviews" label="Read more reviews" />}
      </Container>
    </section>
  );
}

/** Dark closing band: one last push to the form or the phone. */
export function CtaBand({
  title = "Ready for a stress-free move?",
  sub = "Get an honest, upfront price in minutes. No pressure, no runaround.",
  href = "#get-quote",
  button = "Get a Free Quote",
  more = true,
}: {
  title?: ReactNode;
  sub?: ReactNode;
  href?: string;
  button?: string;
  /** Off on the ad funnels, which have no links away from the offer. */
  more?: boolean;
}) {
  return (
    <section className="bg-ink py-12 text-white lg:py-16">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[640px]">
          <h2 className="text-3xl font-bold leading-tight sm:text-[36px]">{title}</h2>
          <p className="mt-3 text-base text-white/85">{sub}</p>
          <RatingLine tone="dark" link={more} className="mt-4" />
        </div>
        <div className="flex flex-wrap gap-4">
          <BrandButton href={href}>{button}</BrandButton>
          <CallButton />
        </div>
      </Container>
    </section>
  );
}

export function LinkCards({ links }: { links: { label: string; href: string; body?: string; image?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group flex flex-col overflow-hidden border border-ink bg-white transition hover:bg-sky-100"
        >
          {l.image && <span className="relative block aspect-[8/5] overflow-hidden"><Image src={l.image} alt="" fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform group-hover:scale-105" /></span>}
          <span className="flex flex-col p-5">
            <span className="flex items-center justify-between gap-3 text-lg font-bold text-ink">
              {l.label} <ArrowUpRight className="shrink-0 text-sky-700" />
            </span>
            {l.body && <span className="mt-2 text-sm leading-6 text-ink-600">{l.body}</span>}
          </span>
        </Link>
      ))}
    </div>
  );
}
