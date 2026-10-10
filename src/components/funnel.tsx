import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../public/logo white.png";
import { Phone, Star } from "./icons";
import { OfferForm } from "./OfferForm";
import { BrandButton, Container, SectionTitle, SourceLogo } from "./ui";
import { LEGAL_LINKS, PHONE, PHONE_HREF } from "@/content/site";
import { RED_FLAGS, type Offer } from "@/content/offers";
import { REVIEW_SOURCES, type Review } from "@/content/reviews";

/*
 * Ad landing pages (/offers/*). No site menu and no links off the page (the logo isn't one either),
 * so visitors from an ad stay on the offer: the logo, a call button, the form, and a slim legal footer.
 */

export function FunnelShell({ children }: { children: ReactNode }) {
  return (
    <main className="overflow-x-hidden">
      <header className="bg-ink print:hidden">
        <div className="mx-auto flex h-16 w-full max-w-[1164px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
          <Image src={logoWhite} alt="Movers and Junk Removal" preload className="h-10 w-auto sm:h-12" />
          <a
            href={PHONE_HREF}
            className="flex h-11 items-center gap-2 whitespace-nowrap bg-white px-4 text-sm font-bold text-ink transition hover:bg-sky-100"
          >
            <Phone width={15} height={15} /> <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Call now</span>
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
  return (
    <section className="bg-ink pb-14 pt-5 text-white sm:pt-8 lg:pb-20 lg:pt-14">
      <Container className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="lg:pt-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky">{offer.eyebrow}</p>
          <h1 className="mt-3 text-[28px] font-bold leading-[1.1] sm:text-5xl lg:text-[52px]">{offer.headline}</h1>
          <p className="mt-3 text-[15px] font-semibold leading-snug text-white/90 sm:mt-5 sm:text-xl">{offer.subheadline}</p>
          <ul className="mt-8 hidden gap-4 lg:grid">
            {offer.points.slice(0, 4).map((p) => (
              <li key={p.title} className="flex items-center gap-4 text-base font-semibold">
                <IconTile name={p.icon} size={36} className="h-14 w-14 bg-white" /> {p.title}
              </li>
            ))}
          </ul>
        </div>
        <div id="claim" className="scroll-mt-4">
          <div className="border border-ink-800 bg-ink-800 p-4 offset-sky-sm sm:p-7">
            <OfferForm
              offer={offer.slug}
              title={offer.formTitle}
              button={offer.button}
              askForQuotePhoto={offer.askForQuotePhoto}
              checklist={offer.askForQuotePhoto ? <RedFlagsChecklist /> : undefined}
            />
          </div>
          {offer.urgency && (
            <p className="mt-5 border-l-4 border-sky pl-3 text-sm font-bold text-white">{offer.urgency}</p>
          )}
          <TrustStrip />
        </div>
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
  const steps = [
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

export function SellingPoints({ offer }: { offer: Offer }) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <SectionTitle>{offer.pointsTitle}</SectionTitle>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offer.points.map((p) => (
            <li key={p.title} className="flex gap-4 border border-ink bg-white p-5 offset-sky-sm">
              <IconTile name={p.icon} size={40} className="h-16 w-16 bg-sky-100" />
              <span>
                <span className="block text-lg font-bold leading-snug text-ink">{p.title}</span>
                <span className="mt-1.5 block text-[15px] leading-6 text-ink">{p.body}</span>
              </span>
            </li>
          ))}
        </ul>
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
