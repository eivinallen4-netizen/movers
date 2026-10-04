import type { ReactNode } from "react";
import Link from "next/link";
import {
  BadgeCareBox,
  BadgeOnTime,
  BadgePriceTag,
  BadgeSameDay,
  BoxMark,
  BoxyMascot,
  IconBin,
  IconBuildings,
  IconDiamond,
  IconGloves,
  IconHourglass,
  IconPins,
  IconSofa,
  IconTapeBox,
  IconTruckRoute,
  Instagram,
  Play,
} from "@/components/icons";
import { Accordion, PhotoStrip, ReviewPager, VideoCarousel } from "@/components/interactive";
import { QuoteHeroForm } from "@/components/QuoteHeroForm";
import { MediaFill, hasMedia } from "@/components/media-fill";
import { SiteShell } from "@/components/site";
import { BrandButton, Container, JsonLd, LearnMore, Photo, ReviewCard } from "@/components/ui";
import { REVIEWS } from "@/content/reviews";
import { businessSchema } from "@/content/schema";
import { INSTAGRAM, PHONE, PHONE_HREF } from "@/content/site";
import { media } from "@/lib/media";

export const metadata = { alternates: { canonical: "/" } };

/*
 * NOTE: Copy follows the Movers and Junk Removal brand brief. Reviews are still placeholders:
 * swap in your own Google reviews (src/content/reviews.ts) before launch. Photos/videos: see src/content/media.ts.
 */

export default function Home() {
  return (
    <SiteShell quoteHref="#quote">
      <JsonLd data={businessSchema()} />
      <Hero />
      <RatingsBar />
      {/* Confirm we do what they need, answer the #1 worry (price), then prove it */}
      <Services />
      <HonestPricing />
      <Reviews />
      <PressMarquee />
      {/* Second service + engagement */}
      <JunkRemoval />
      <section className="py-12 lg:py-16">
        <VideoCarousel
          items={[
            { caption: "POV: your movers actually show up on time", media: media("reel-1") },
            { caption: "Movers broke your stuff and said nothing? Not here.", media: media("reel-2") },
            { caption: "The quote said one thing… the bill said another?", media: media("reel-3") },
            { caption: "Paying by the hour and they're standing around?", media: media("reel-4") },
            { caption: "Your garage called. It wants to be a garage again.", media: media("reel-5") },
          ]}
        />
      </section>
      {/* Not ready to book yet? Give them a next step */}
      <CostCalculator />
      <ServiceArea />
      {/* Close: reliability + direct call CTA */}
      <OnTime />
      <About />
      {/* Long-tail content for researchers */}
      <FreeTools />
      <PhotoStrip items={([1, 2, 3, 4, 5, 6, 7, 8] as const).map((n) => media(`gallery-${n}`))} />
      <InstagramCta />
    </SiteShell>
  );
}

/* ================= Sections ================= */

function HeroArt() {
  // Original illustration: stacked sky-blue bins + cardboard boxes
  const bin = (x: number, y: number, w = 170) => (
    <g key={`${x}-${y}`}>
      <path d={`M${x} ${y}h${w}l-6 16H${x + 6}z`} fill="#7cc4ff" stroke="#0b72c6" strokeWidth="2" />
      <path d={`M${x + 6} ${y + 16}h${w - 12}l-8 58H${x + 14}z`} fill="#31a2fd" stroke="#0b72c6" strokeWidth="2" />
      <g transform={`translate(${x + w / 2 - 22} ${y + 26}) scale(.7)`} fill="none" stroke="#000" strokeWidth="4">
        <path d="M8 22 32 10l24 12-24 12z" />
        <path d="M8 22v26l24 12 24-12V22M32 34v26" />
      </g>
    </g>
  );
  const box = (x: number, y: number, w: number, h: number) => (
    <g key={`b${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} fill="#d2a679" stroke="#a87c51" strokeWidth="2" />
      <rect x={x} y={y + 8} width={w} height="10" fill="#31a2fd" />
      <g transform={`translate(${x + w / 2 - 20} ${y + h / 2 - 16}) scale(.6)`} fill="none" stroke="#000" strokeWidth="5">
        <path d="M8 22 32 10l24 12-24 12z" />
        <path d="M8 22v26l24 12 24-12V22M32 34v26" />
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 560 440" className="h-auto w-full max-w-[600px]" aria-hidden>
      <ellipse cx="290" cy="420" rx="250" ry="18" fill="#31a2fd" opacity=".18" />
      {box(40, 160, 130, 120)}
      {box(20, 280, 120, 130)}
      {box(400, 60, 100, 80)}
      {box(385, 140, 130, 270)}
      {bin(100, 250)}
      {bin(100, 330)}
      {bin(240, 100)}
      {bin(240, 180)}
      {bin(240, 260)}
      {bin(240, 340)}
    </svg>
  );
}

function Hero() {
  const hero = media("hero");
  return (
    <section className="bg-ink pb-16 pt-10 lg:pb-20 lg:pt-12">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="order-2 lg:order-1">
          {hasMedia(hero) ? (
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg offset-sky">
              <MediaFill media={hero} sizes="(min-width: 1024px) 600px, 100vw" />
            </div>
          ) : (
            <HeroArt />
          )}
        </div>
        <div className="order-1 lg:order-2">
          <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[54px]">
            Moving shouldn&apos;t be a headache.
          </h1>
          <p className="mt-5 text-lg font-bold leading-snug text-sky sm:text-xl">
            Local Las Vegas movers &amp; junk removal. Honest pricing, no surprises.
            <span className="block text-white">Tell us where you&apos;re moving and get a free quote in minutes.</span>
          </p>
          <QuoteHeroForm />
        </div>
      </Container>
    </section>
  );
}

function RatingsBar() {
  const sites = [
    { name: "Upfront pricing", score: "Upfront", count: "No hidden fees", icon: <BadgePriceTag /> },
    { name: "On time", score: "On Time", count: "We call when we're on the way", icon: <BadgeOnTime /> },
    { name: "Careful", score: "Careful", count: "Handled like it's our own", icon: <BadgeCareBox /> },
    { name: "Same day", score: "Same Day", count: "Last-minute moves & pickups", icon: <BadgeSameDay /> },
  ];
  return (
    <section className="bg-white py-8">
      <Container className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
        <p className="shrink-0 text-center text-base font-bold leading-snug text-sky-700 lg:text-left">
          Local crew. Real people.
          <br />
          Real care.
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 lg:gap-x-10">
          {sites.map((s) => (
            <div key={s.name} className="flex items-center gap-3" title={s.name}>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100">
                {s.icon}
              </span>
              <span>
                <span className="block text-xl font-semibold leading-none text-ink">{s.score}</span>
                <span className="mt-1 block text-[11px] leading-snug text-ink-600">{s.count}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PressMarquee() {
  const quotes = [
    "Moving Shouldn't Be a Headache",
    "Handled With Care, Like It's Our Own",
    "Honest Pricing. No Surprises.",
    "On Time. Fast. Careful.",
    "Booked Last Minute? We've Got You.",
    "Junk Gone Today",
  ];
  const row = [...quotes, ...quotes];
  return (
    <div className="overflow-hidden bg-sky py-5">
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
        {row.map((q, i) => (
          <span key={i} className="flex items-center gap-12 text-xl font-bold text-ink">
            {q}
            <BoxMark className="h-9 w-9 text-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: <IconPins />,
    title: "Local Las Vegas Moves",
    href: "/moving/local-moving",
    body: "Houses, apartments and condos anywhere in the valley. We show up on time, get right to work and finish the job, not leave it in your garage.",
  },
  {
    icon: <IconHourglass />,
    title: "Same-Day & Last-Minute Moves",
    href: "/moving/same-day-moving",
    body: "Other movers canceled? Lease ending sooner than planned? Call us. We've saved plenty of moving days on short notice.",
  },
  {
    icon: <IconBuildings />,
    title: "Apartment & Condo Moves",
    href: "/moving/apartment-condo-moving",
    body: "Stairs, elevators and tight hallways don't slow us down. We protect the walls and floors on the way out and on the way in.",
  },
  {
    icon: <IconGloves />,
    title: "Moving Labor",
    href: "/moving/moving-labor",
    body: "Already have a truck? Our crew does the heavy lifting, loading and unloading so you and your family don't have to.",
  },
  {
    icon: <IconSofa />,
    title: "Furniture Wrapping & Setup",
    href: "/moving/furniture-wrapping-setup",
    body: "Every piece is wrapped and protected. Beds and tables go back together and every box lands in the right room.",
  },
  {
    icon: <IconTruckRoute />,
    title: "Move + Junk Haul-Away",
    href: "/moving/move-and-junk-haul-away",
    body: "Don't pay to move stuff you don't want. We move what you keep and haul away the rest in the same trip.",
  },
];

function ServiceGrid({ items }: { items: { icon: ReactNode; title: string; href: string; body: string }[] }) {
  return (
    <div className="grid gap-x-9 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <div key={s.title}>
          <div className="flex h-24 items-end">{s.icon}</div>
          <h3 className="mt-6 text-[26px] font-bold leading-tight text-ink">
            <Link href={s.href} className="hover:text-sky-700">
              {s.title}
            </Link>
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-ink">{s.body}</p>
          <LearnMore href={s.href} />
        </div>
      ))}
    </div>
  );
}

function Services() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="max-w-[600px] text-3xl font-bold leading-tight text-ink sm:text-[40px]">
          Stress-free moves from start to finish
        </h2>
        <p className="mt-6 text-lg font-medium text-ink">
          We carry the weight so you don&apos;t have to. On time, fast and careful, every time.
        </p>
        <div className="mt-12">
          <ServiceGrid items={SERVICES} />
        </div>
        <div className="mt-10">
          <LearnMore href="/moving" label="See all moving services" />
        </div>
      </Container>
    </section>
  );
}

function HonestPricing() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <h2 className="text-4xl font-bold leading-tight text-ink sm:text-[44px]">
            <span className="text-sky-600">Honest pricing</span>. No surprises on move day.
          </h2>
          <Photo
            media={media("pricing-photo")}
            label="Add public/media/pricing-photo.jpg"
            className="aspect-[16/10] lg:mr-4"
          >
            <TruckArt />
          </Photo>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <p className="text-xl font-semibold leading-snug text-sky-700">
            You&apos;ll know what you&apos;re paying before we lift a thing. No &ldquo;double the
            quote,&rdquo; no fees snuck in at the end. Competitive pricing, and more of your stuff
            moved for it.
          </p>
          <div>
            <h3 className="text-xl font-bold text-ink">What you get with every move:</h3>
            <Accordion
              items={[
                {
                  title: "Your things handled like they're our own",
                  points: [
                    "Furniture wrapped in moving blankets before it leaves the room",
                    "TVs, mirrors and framed art protected and kept upright",
                    "Careful loading, so nothing shifts or breaks on the road",
                    "If anything ever goes wrong, we tell you. No hiding it.",
                  ],
                },
                {
                  title: "A crew that shows up and gets to work",
                  points: [
                    "We arrive on time and call you when we're on the way",
                    "No standing around or dragging out the clock on your dime",
                  ],
                },
                {
                  title: "The job finished, not half done",
                  points: [
                    "Every box goes to the right room, not dumped in the garage",
                    "Beds and tables put back together",
                    "You don't have to lift a finger",
                  ],
                },
                {
                  title: "Honest pricing with no hidden fees",
                  points: [
                    "Your price explained upfront, before we start",
                    "No surprise charges at the end",
                    "No pushy tip requests, no attitude",
                  ],
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function TruckArt() {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect x="40" y="60" width="230" height="130" rx="6" fill="#31a2fd" stroke="#fff" strokeWidth="3" />
      <path d="M270 100h60l40 45v45H270z" fill="#fff" />
      <rect x="290" y="110" width="40" height="30" fill="#a9d7ff" />
      <circle cx="100" cy="200" r="22" fill="#000" stroke="#fff" strokeWidth="5" />
      <circle cx="320" cy="200" r="22" fill="#000" stroke="#fff" strokeWidth="5" />
      <text x="72" y="130" fill="#fff" fontSize="36" fontWeight="800" fontFamily="Montserrat, sans-serif">
        MOVERS
      </text>
    </svg>
  );
}

function CostCalculator() {
  return (
    <section className="py-12 lg:py-16">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Photo
          media={media("calculator-photo")}
          offset="ink"
          label="Add public/media/calculator-photo.jpg"
          className="aspect-[4/3.3] lg:mr-4"
        >
          <svg viewBox="0 0 400 330" className="absolute inset-0 h-full w-full" aria-hidden>
            {[
              [60, 160, 120, 110],
              [190, 120, 140, 150],
              [120, 60, 110, 100],
            ].map(([x, y, w, h]) => (
              <g key={x}>
                <rect x={x} y={y} width={w} height={h} fill="#c8955f" stroke="#9c6d3e" strokeWidth="3" />
                <rect x={x} y={y + 10} width={w} height="12" fill="#31a2fd" />
              </g>
            ))}
          </svg>
        </Photo>
        <div>
          <h2 className="text-4xl font-bold leading-tight text-ink sm:text-[44px]">
            How much should your move cost? Try our free{" "}
            <span className="text-sky-600 underline decoration-2 underline-offset-4">moving cost calculator</span>
          </h2>
          <p className="mt-6 text-[15px] leading-7 text-ink">
            Pick your home size, how far you&apos;re going and what&apos;s coming with you, and get a
            ballpark price in under a minute. Want an exact number? Leave your phone number and
            we&apos;ll call you back with a real quote. No pressure, no runaround.
          </p>
          <div className="mt-6">
            <BrandButton href="/free-tools/moving-cost-calculator">Try the Calculator</BrandButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

const JUNK = [
  {
    icon: <IconSofa />,
    title: "Furniture Removal",
    href: "/junk-removal/furniture-removal",
    body: "Old couches, mattresses, dressers and tables. Point to it and it's gone. We do all the lifting and carrying.",
  },
  {
    icon: <IconDiamond />,
    title: "Appliance Removal",
    href: "/junk-removal/appliance-removal",
    body: "Fridges, washers, dryers and water heaters hauled out without scratching your floors or walls.",
  },
  {
    icon: <IconTapeBox />,
    title: "Garage Cleanouts",
    href: "/junk-removal/garage-cleanouts",
    body: "Your garage called. It wants to be a garage again. We clear it out top to bottom so you can park in it.",
  },
  {
    icon: <IconBuildings />,
    title: "Estate Cleanouts",
    href: "/junk-removal/estate-cleanouts",
    body: "A respectful, patient crew for a hard time. We clear the whole home and treat every room with care.",
  },
  {
    icon: <IconBin />,
    title: "Move-Out Junk Haul",
    href: "/junk-removal/move-out-junk-haul",
    body: "Leaving stuff behind? We haul away everything that isn't coming to the new place.",
  },
  {
    icon: <IconHourglass />,
    title: "Same-Day Junk Pickup",
    href: "/junk-removal/same-day-junk-pickup",
    body: "Call in the morning, junk gone today. Upfront pricing before we load a single thing.",
  },
];

function JunkRemoval() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-ink sm:text-[44px]">
              <span className="text-sky-600">Junk gone today.</span> We haul it, you relax
            </h2>
            <p className="mt-6 text-lg font-semibold leading-snug text-ink">
              Junk removal across Las Vegas, Henderson and Summerlin. One item or a whole house,
              honest pricing and no heavy lifting for you.
            </p>
          </div>
          <Photo
            media={media("junk-photo")}
            label="Add public/media/junk-photo.jpg"
            className="aspect-[4/3] lg:mr-4"
          >
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
              <rect x="90" y="150" width="220" height="120" fill="#c8955f" stroke="#9c6d3e" strokeWidth="3" />
              <path d="M80 150c20-40 220-40 240 0" fill="#1c1f24" />
              <g transform="translate(170 180) scale(1)" fill="none" stroke="#000" strokeWidth="4">
                <path d="M8 22 32 10l24 12-24 12z" />
                <path d="M8 22v26l24 12 24-12V22M32 34v26" />
              </g>
            </svg>
          </Photo>
        </div>
        <div className="mt-12">
          <ServiceGrid items={JUNK} />
        </div>
        <div className="mt-10">
          <LearnMore href="/junk-removal" label="See all junk removal services" />
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section className="bg-ink py-12 lg:py-16 text-white">
      <Container className="flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-white/60">
          <BoxMark className="h-14 w-14 text-sky" />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-extrabold uppercase">
            Local Crew. <span className="text-sky">Real Care.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm">
            Moving is stressful enough. We&apos;re a local Las Vegas crew that shows up on time,
            treats your things like our own, and keeps it honest from the first call to the last
            box. God First.
          </p>
        </div>
        <BrandButton href={PHONE_HREF}>Call {PHONE}</BrandButton>
      </Container>
    </section>
  );
}

function ServiceArea() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="max-w-[640px] text-4xl font-bold leading-tight text-ink sm:text-[44px]">
          Proudly serving the <span className="text-sky-600">whole Las Vegas valley</span>
        </h2>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Photo
            media={media("area-video")}
            label="Add public/media/area-video.mp4"
            className="aspect-[16/9] lg:mr-4"
          >
            <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden>
              {[
                [10, 40, 60],
                [80, 20, 50],
                [140, 70, 70],
                [290, 30, 60],
                [350, 60, 50],
              ].map(([x, y, w]) => (
                <rect key={x} x={x} y={y} width={w} height={225 - y} fill="#000" opacity=".6" />
              ))}
              <path d="M235 20v30h-8v140h26V50h-8V20z" fill="#cfd8e3" opacity=".9" />
              <rect x="60" y="150" width="130" height="50" fill="#31a2fd" />
              <rect x="190" y="162" width="36" height="38" fill="#000" />
              <circle cx="90" cy="203" r="10" fill="#111" />
              <circle cx="205" cy="203" r="10" fill="#111" />
            </svg>
            <button aria-label="Play video" className="absolute bottom-4 right-4 text-white">
              <Play className="h-14 w-14 [&>circle]:fill-white [&>path]:fill-sky-700" />
            </button>
          </Photo>
          <div>
            <p className="text-[15px] leading-7 text-ink">
              We live here too. Las Vegas, Henderson, Summerlin, Paradise, North Las Vegas and
              everywhere in between. We know the valley, so we show up on time and get right to
              work. Moving across town or clearing out the garage, one call gets it handled.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <BrandButton href="#quote">Get a Free Quote</BrandButton>
              <LearnMore href="/service-areas" label="See our service areas" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Reviews() {
  const cards = REVIEWS.map((r, i) => <ReviewCard key={i} r={r} i={i % 6} />);
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="max-w-[780px] text-2xl font-bold leading-tight text-ink sm:text-[28px]">
          Moving shouldn&apos;t be a headache. Here&apos;s what our customers have to say.
        </h2>
        <a href="#quote" className="mt-4 inline-block text-lg font-bold text-sky-700 underline">
          Ready for a stress-free move? Get your free quote
        </a>
        <Link href="/reviews" className="mt-2 block text-sm font-bold text-ink underline">
          Read all reviews
        </Link>
        <div className="mt-10">
          <ReviewPager pages={[cards.slice(0, 6), cards.slice(6)]} />
        </div>
      </Container>
    </section>
  );
}

function OnTime() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="max-w-[540px] text-4xl font-bold leading-tight text-ink sm:text-[40px]">
          <span className="text-sky-600">POV:</span> your movers actually show up on time
        </h2>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <p className="text-[15px] leading-7 text-ink">
            Paying by the hour while the crew stands around? Not with us. We show up when we say we
            will, call when we&apos;re on the way and keep moving until the last box is in. Fast,
            friendly and respectful in your home.{" "}
            <a href="#quote" className="font-bold text-sky-700 underline">
              Get a callback in minutes
            </a>
          </p>
          <Photo
            media={media("ontime-video")}
            label="Add public/media/ontime-video.mp4"
            className="aspect-[16/9] lg:mr-4"
          >
            <BoxyMascot className="absolute inset-x-0 bottom-2 mx-auto h-[88%]" />
            <button aria-label="Play video" className="absolute bottom-4 right-4">
              <Play className="h-14 w-14 [&>circle]:fill-white [&>path]:fill-sky-700" />
            </button>
          </Photo>
        </div>
      </Container>
    </section>
  );
}

function FreeTools() {
  const posts = [
    {
      title: "Las Vegas Moving Cost Calculator [2026]",
      body: "Answer a few quick questions and see what your local move should cost before you call anyone.",
      href: "/free-tools/moving-cost-calculator",
      media: media("guide-1"),
    },
    {
      title: "Moving Day Checklist (Free Printable)",
      body: "Everything to do eight weeks out, one week out and on moving day so nothing gets missed.",
      href: "/guides/moving-day-checklist",
      media: media("guide-2"),
    },
    {
      title: "How Much Does Junk Removal Cost in Las Vegas?",
      body: "Typical prices for furniture, appliances and full garage cleanouts, and what drives the cost.",
      href: "/guides/junk-removal-cost-las-vegas",
      media: media("guide-3"),
    },
    {
      title: "7 Red Flags When Hiring Las Vegas Movers",
      body: "Hidden fees, no-shows and slow crews on the clock. How to spot a bad mover before you book.",
      href: "/guides/red-flags-hiring-movers",
      media: media("guide-4"),
    },
  ];
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="text-3xl font-bold text-ink sm:text-[34px]">Free Moving Tools and Guides</h2>
        <p className="mt-4 max-w-[560px] text-lg font-bold leading-snug text-ink">
          Planning ahead? Use our{" "}
          <Link href="/free-tools/moving-cost-calculator" className="text-sky-700 underline">
            cost calculator
          </Link>{" "}
          and{" "}
          <Link href="/free-tools" className="text-sky-700 underline">
            checklists
          </Link>{" "}
          to plan your move, then get an exact quote in minutes
        </p>
        <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <article key={p.title}>
              <div className="relative aspect-[8/5.6] overflow-hidden rounded-lg" style={{ background: p.media.tone }}>
                {hasMedia(p.media) ? (
                  <MediaFill media={p.media} sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw" />
                ) : (
                  <BoxMark className="absolute right-3 top-3 h-14 w-14 text-white/80" />
                )}
              </div>
              <h3 className="mt-5 text-base font-bold leading-snug text-ink">
                <Link href={p.href} className="hover:text-sky-700">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-4 text-sm leading-6 text-ink">{p.body}</p>
              <LearnMore href={p.href} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function InstagramCta() {
  return (
    <section className="py-12 lg:py-16">
      <Container className="flex items-center gap-4">
        <Instagram />
        <div>
          <p className="text-lg font-bold text-ink">Moving Shouldn&apos;t Be a Headache.</p>
          <p className="text-sm font-semibold text-ink">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">
              Follow us
            </a>{" "}
            on Instagram for moving tips and junk removal before-and-afters
          </p>
        </div>
      </Container>
    </section>
  );
}
