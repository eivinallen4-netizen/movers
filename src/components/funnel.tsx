import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../public/logo white.png";
import { Phone, Star } from "./icons";
import { OfferForm } from "./OfferForm";
import { BrandButton, Container, MiniReview, SectionTitle, SourceLogo } from "./ui";
import { LEGAL_LINKS, PHONE, PHONE_HREF } from "@/content/site";
import { RED_FLAGS, type Offer } from "@/content/offers";
import { REVIEWS, REVIEW_SOURCES, type Review } from "@/content/reviews";
import { PHOTO_STEPS } from "@/lib/offer";

/** Reviews by reviewer name, in the order given. */
const reviewsNamed = (names: string[] = []) =>
  names.flatMap((n) => REVIEWS.filter((r) => r.who === n).slice(0, 1));

/*
 * Ad landing pages (/offers/*). No site menu, so visitors from an ad stay on the offer: the logo
 * (which goes to the home page), a call button, the form, and a slim legal footer.
 */

export function FunnelShell({ children }: { children: ReactNode }) {
  return (
    <main className="overflow-x-hidden">
      <header className="bg-ink print:hidden">
        <div className="mx-auto flex h-16 w-full max-w-[1164px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
          <Link href="/" className="flex items-center" aria-label="Movers and Junk Removal home">
            <Image src={logoWhite} alt="Movers and Junk Removal" preload className="h-10 w-auto sm:h-12" />
          </Link>
          <a
            href={PHONE_HREF}
            className="flex h-11 items-center gap-2 whitespace-nowrap bg-white px-4 text-sm font-bold text-ink transition hover:bg-sky-100"
          >
            <Phone width={15} height={15} /> {PHONE}
          </a>
        </div>
      </header>
      {children}
      {/* Extra bottom room on mobile so the sticky claim bar doesn't cover the legal links. */}
      <footer className="bg-ink pb-24 pt-8 text-white print:hidden lg:pb-8">
        <Container className="flex flex-col gap-4 text-[11px] leading-5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Movers and Junk Removal. Moving Shouldn&apos;t Be a Headache. God First.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-sky">
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </footer>
    </main>
  );
}

/** Headline on the left; the form card, urgency line and trust strip on the right (first on mobile after the headline). */
export function OfferHero({ offer }: { offer: Offer }) {
  const photo = offer.heroPhoto;
  const review = reviewsNamed(offer.heroReview ? [offer.heroReview] : [])[0];
  return (
    <section className={`bg-ink pb-14 text-white lg:pb-20 lg:pt-14 ${photo ? "pt-4 sm:pt-8" : "pt-5 sm:pt-8"}`}>
      <Container className={`grid items-start lg:grid-cols-[1.1fr_1fr] lg:gap-14 ${photo ? "gap-4 sm:gap-8" : "gap-6 sm:gap-8"}`}>
        <div className="lg:pt-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky">{offer.eyebrow}</p>
          <h1 className={`font-bold leading-[1.1] sm:text-5xl lg:text-[52px] ${photo ? "mt-2 text-[27px]" : "mt-3 text-[28px]"}`}>
            {offer.headline}
          </h1>
          {/* The rating sits above the form so it's on the first screen of a phone, where ad visitors decide. */}
          {offer.rating && <RatingCount rating={offer.rating} short className="mt-2 text-white sm:mt-4" />}
          {photo ? (
            // No photo on phones: the form's first tap has to fit on the first screen of an in-app browser.
            <div className="mt-2 flex items-start gap-3 sm:mt-5 lg:flex-col lg:items-stretch lg:gap-0">
              <div className="relative hidden h-40 w-40 shrink-0 overflow-hidden rounded-lg offset-sky-sm sm:block lg:order-last lg:mt-8 lg:aspect-[3/2] lg:h-auto lg:w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 560px, 160px"
                  className="object-cover"
                />
              </div>
              <p className="text-[14px] font-semibold leading-snug text-white/90 sm:text-xl lg:mt-0">{offer.subheadline}</p>
            </div>
          ) : (
            <p className="mt-3 text-[15px] font-semibold leading-snug text-white/90 sm:mt-5 sm:text-xl">{offer.subheadline}</p>
          )}
          {!photo && (
            <ul className="mt-8 hidden gap-4 lg:grid">
              {offer.points.slice(0, 4).map((p) => (
                <li key={p.title} className="flex items-center gap-4 text-base font-semibold">
                  <IconTile name={p.icon} size={36} className="h-14 w-14 bg-white" /> {p.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div id="claim" className="scroll-mt-4">
          <div className="border border-ink-800 bg-ink-800 p-4 offset-sky-sm sm:p-7">
            <OfferForm
              offer={offer.slug}
              title={offer.formTitle}
              button={offer.button}
              sizePrompt={offer.sizePrompt}
              checklist={PHOTO_STEPS[offer.slug]?.kind === "quote" ? <RedFlagsChecklist /> : undefined}
            />
          </div>
          {offer.urgency && (
            <p className="mt-5 border-l-4 border-sky pl-3 text-sm font-bold text-white">{offer.urgency}</p>
          )}
          {review && <MiniReview r={review} tone="dark" className="mt-5" />}
          <TrustStrip />
        </div>
      </Container>
    </section>
  );
}

/** The three biggest worries (price, trust, timing) answered right under the hero. */
export function ObjectionStrip({ offer }: { offer: Offer }) {
  if (!offer.objections) return null;
  return (
    <section className="border-b border-ink-200 py-10 lg:py-12">
      <Container>
        <ul className="grid gap-5 md:grid-cols-3">
          {offer.objections.map((o) => {
            const r = reviewsNamed(o.review ? [o.review] : [])[0];
            return (
              <li key={o.q} className="flex flex-col border border-ink bg-white p-5 offset-sky-sm">
                <span className="flex items-center gap-3">
                  <IconTile name={o.icon} size={32} className="h-12 w-12 bg-sky-100" />
                  <span className="text-lg font-bold leading-snug text-ink">{o.q}</span>
                </span>
                <span className="mt-3 block text-[15px] leading-6 text-ink">{o.a}</span>
                {r && (
                  <span className="mt-3 block border-l-4 border-sky pl-3 text-sm leading-6 text-ink-600">
                    &ldquo;{r.text}&rdquo; <span className="font-bold text-sky-700">{r.who}, via {REVIEW_SOURCES[r.src].label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** The bonus and the named guarantee, side by side under the selling points. */
export function OfferExtras({ offer }: { offer: Offer }) {
  if (!offer.bonus && !offer.promise) return null;
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      {offer.bonus && (
        <div className="border-2 border-ink bg-sky-100 p-6">
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky-700">Bonus</p>
          <p className="mt-2 text-xl font-bold leading-snug text-ink">{offer.bonus.title}</p>
          <p className="mt-2 text-[15px] leading-6 text-ink">{offer.bonus.body}</p>
        </div>
      )}
      {offer.promise && (
        <div className="bg-ink p-6 text-white offset-sky-sm">
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky">Our guarantee</p>
          <p className="mt-2 text-xl font-bold leading-snug">{offer.promise.title}</p>
          <p className="mt-2 text-[15px] leading-6 text-white/90">{offer.promise.body}</p>
        </div>
      )}
    </div>
  );
}

/** "★★★★★ 4.9 from 33 reviews on Thumbtack · Top Pro". The real score and count, no links off the page. */
function RatingCount({
  rating,
  short = false,
  className = "",
}: {
  rating: NonNullable<Offer["rating"]>;
  /** Drops the extra ("Top Pro · Hired 48 times") on phones so the line stays on one row. */
  short?: boolean;
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-bold ${short ? "text-[13px] sm:text-sm" : "text-sm"} ${className}`}>
      <span className="flex gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} />
        ))}
      </span>
      <span>
        {rating.score} from {rating.count} reviews on {rating.source}
        {rating.extra && <span className={`font-semibold opacity-80 ${short ? "hidden sm:inline" : ""}`}> · {rating.extra}</span>}
      </span>
    </p>
  );
}

/** The owner in his own words (matching the ad video), next to real customer reviews. */
export function OwnerNote({ offer }: { offer: Offer }) {
  const n = offer.ownerNote;
  if (!n) return null;
  const reviews = reviewsNamed(offer.reviewNames);
  return (
    <section className="bg-sky-100 py-12 lg:py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[220px_1fr] lg:gap-12">
          <div className="relative mx-auto aspect-[3/4] w-40 overflow-hidden rounded-lg offset-ink-sm md:w-full">
            <Image src={n.photo.src} alt={n.photo.alt} fill sizes="(min-width: 768px) 220px, 160px" className="object-cover" />
          </div>
          <figure>
            <SectionTitle>{n.title}</SectionTitle>
            <blockquote className="mt-5 space-y-3 text-lg font-semibold leading-relaxed text-ink sm:text-xl">
              {n.quote.map((line) => (
                <p key={line}>&ldquo;{line}&rdquo;</p>
              ))}
            </blockquote>
            <figcaption className="mt-4 text-sm font-bold text-sky-700">{n.sign}</figcaption>
          </figure>
        </div>
        {offer.crewPhotos && (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {offer.crewPhotos.map((p) => (
              <li key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 270px, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        )}
        {offer.rating && <RatingCount rating={offer.rating} className="mt-10 text-ink" />}
        {reviews.length > 0 && (
          <div className={`grid gap-5 md:grid-cols-3 ${offer.rating ? "mt-4" : "mt-10"}`}>
            {reviews.map((r) => (
              <MiniReview key={r.who} r={r} />
            ))}
          </div>
        )}
        <ClaimCta offer={offer} className="mt-10" />
      </Container>
    </section>
  );
}

export function TrustStrip() {
  return (
    <div className="mt-6 grid gap-4 border-t border-white/15 pt-5 text-sm">
      <p className="text-lg font-bold text-sky">Moving Shouldn&apos;t Be a Headache</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="flex items-center gap-2">
          <span className="flex gap-0.5" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} />
            ))}
          </span>
          <span className="font-bold">5-star rated on</span>
        </span>
        {(Object.keys(REVIEW_SOURCES) as Review["src"][]).map((src) => (
          <span key={src} className="rounded bg-white px-2 py-1">
            <SourceLogo src={src} height={22} />
          </span>
        ))}
      </div>
      <p className="font-semibold text-white/85">Serving Las Vegas, Henderson, Summerlin &amp; the whole valley</p>
    </div>
  );
}

/** Takes the mystery out of sending the form: what happens, and how fast. */
export function NextSteps({ offer }: { offer: Offer }) {
  const steps = offer.steps ?? [
    { title: "Send the form.", body: "About 30 seconds: your move size and how to reach you.", icon: "send-form" },
    {
      title: "We call or text within 15 minutes.",
      body: "Someone from our team checks the schedule with you and answers your questions.",
      icon: "call-text",
    },
    offer.finalStep,
  ];
  return (
    <section className="border-b border-ink-200 py-10 lg:py-12">
      <Container>
        <p className="text-xs font-extrabold uppercase tracking-widest text-sky-700">How it works</p>
        <ol className="mt-5 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((st, i) => (
            <li key={st.title} className="flex gap-4">
              <span className="relative shrink-0">
                <IconTile name={st.icon} size={36} className="h-14 w-14 border border-ink bg-sky-100" />
                <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center bg-ink text-xs font-bold text-sky">{i + 1}</span>
              </span>
              <span>
                <span className="block text-lg font-bold leading-snug text-ink">{st.title}</span>
                <span className="mt-1 block text-[15px] leading-6 text-ink">{st.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** A second (and third) chance to claim, further down the page. Jumps back up to the form. */
export function ClaimCta({ offer, className = "" }: { offer: Offer; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <BrandButton href="#claim">{offer.button}</BrandButton>
      <a href={PHONE_HREF} className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-sky-700">
        or call {PHONE}
      </a>
    </div>
  );
}

export function SellingPoints({
  offer,
  compact = false,
  children,
}: {
  offer: Offer;
  /** Two small tiles per row on phones, to keep a long proof page short. */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <SectionTitle>{offer.pointsTitle}</SectionTitle>
        <ul className={`grid lg:grid-cols-3 ${compact ? "mt-8 grid-cols-2 gap-3 sm:gap-5 lg:mt-10" : "mt-10 gap-5 sm:grid-cols-2"}`}>
          {offer.points.map((p) =>
            compact ? (
              <li key={p.title} className="flex flex-col gap-2 border border-ink bg-white p-3 offset-sky-sm sm:flex-row sm:gap-4 sm:p-5">
                <IconTile name={p.icon} size={28} className="h-10 w-10 bg-sky-100 sm:h-16 sm:w-16" />
                <span>
                  <span className="block text-[15px] font-bold leading-snug text-ink sm:text-lg">{p.title}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-ink sm:mt-1.5 sm:text-[15px] sm:leading-6">{p.body}</span>
                </span>
              </li>
            ) : (
              <li key={p.title} className="flex gap-4 border border-ink bg-white p-5 offset-sky-sm">
                <IconTile name={p.icon} size={40} className="h-16 w-16 bg-sky-100" />
                <span>
                  <span className="block text-lg font-bold leading-snug text-ink">{p.title}</span>
                  <span className="mt-1.5 block text-[15px] leading-6 text-ink">{p.body}</span>
                </span>
              </li>
            ),
          )}
        </ul>
        {children}
        <ClaimCta offer={offer} className="mt-10" />
      </Container>
    </section>
  );
}

/** One of the /public/icons/offers icons on a square tile; decorative, so no alt text. */
export function IconTile({ name, size, className = "" }: { name: string; size: number; className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center ${className}`}>
      <Image src={`/icons/offers/${name}.svg`} alt="" width={size} height={size} />
    </span>
  );
}

/** The free bonus on the second-opinion thank-you screen. */
export function RedFlagsChecklist() {
  return (
    <div className="mt-7 border-t border-white/15 pt-6">
      <p className="text-xs font-extrabold uppercase tracking-widest text-sky">Your free bonus</p>
      <p className="mt-2 text-xl font-bold leading-tight">5 Red Flags in a Moving Quote</p>
      <ol className="mt-4 space-y-3">
        {RED_FLAGS.map((f, i) => (
          <li key={f.title} className="flex gap-3 text-sm leading-6">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-sky text-xs font-bold text-ink">{i + 1}</span>
            <span>
              <span className="font-bold">{f.title}</span> <span className="text-white/80">{f.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <Link href="/offers/red-flags" target="_blank" className="mt-5 inline-flex text-sm font-bold text-sky underline underline-offset-4">
        Open the printable checklist
      </Link>
    </div>
  );
}
