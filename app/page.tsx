import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import BeforeAfterClient from "@/components/BeforeAfterClient";
import FAQClient from "@/components/FAQClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FooterClient from "@/components/FooterClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export default function Home() {
  return (
    <div className="w-full">
      {/* Floating Quote Button */}
      <FloatingQuoteButton phone={content.hero.callButtonPhone} />

      {/* Header */}
      <HeaderClient />

      {/* Hero */}
      <Hero />

      {/* Trust Bar */}
      <TrustBar />

      {/* Services */}
      <Services />

      {/* Before/After */}
      <BeforeAfterClient />
      
      {/* Your Move Matters */}
      <YourMoveMattersBanner />
      
      {/* Process */}
      <Process />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Service Showcase */}
      <ServiceShowcase />

      {/* Reviews */}
      <Reviews />


      {/* Final CTA */}
      <FinalCTAClient />

      {/* FAQ */}
      <FAQClient />

      {/* Footer */}
      <FooterClient />
    </div>
  );
}
function Hero() {
  const heroData = content.hero;
  return (
    <section className="relative section-hero bg-gradient-to-b from-navy-900 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-6 lg:space-y-10 order-2 lg:order-1">
            <h1 className="heading-display text-2xl sm:text-4xl lg:text-5xl text-center md:text-left">
              {heroData.heading.split('\n').map((line, idx) => (
                <span key={idx}>
                  {idx === heroData.heading.split('\n').length - 1 ? (
                    <span className="text-blue-400">{line}</span>
                  ) : (
                    line
                  )}
                  {idx < heroData.heading.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="text-body-lg text-xs sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 text-center md:text-left">
              {heroData.subheading}
            </p>

            <div className="flex justify-center sm:justify-start">
              <QuoteHeroForm phone={heroData.callButtonPhone} />
            </div>

{/* Trust Signal */}
            <div className="pt-8 flex flex-col md:flex-row md:items-start gap-4 border-t border-navy-800">
              <div className="text-center md:text-left">
                <div className="font-bold text-base sm:text-xl">{heroData.trustSignalTitle}</div>
                <p className="text-text-secondary text-xs sm:text-sm">{heroData.trustSignalDescription}</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden lg:block relative h-64 sm:h-80 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src={heroData.heroImage}
              alt="Professional movers carrying furniture"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = content.trustBar.stats;

  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-navy-800 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0">
        <Image
          src="/images/statsbannerbg.svg"
          alt="Stats banner background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="heading-lg text-blue-400 text-2xl sm:text-3xl md:text-4xl">{stat.number}</div>
              <p className="text-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const servicesData = content.services;

  return (
    <section id="services" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl">{servicesData.heading}</h2>
        <p className="text-center text-text-secondary mb-12 sm:mb-20 max-w-2xl mx-auto text-sm sm:text-base">
          {servicesData.subheading}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {servicesData.items.map((service) => {
            const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={service.title} className="flex flex-col">
                <div
                  className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-64 sm:h-72 md:h-80"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-4 sm:p-6">
                    <h3 className="heading-sm text-white text-center text-sm sm:text-base">{service.title}</h3>
                    <p className="text-xs text-gray-300 mt-1 sm:mt-2 text-center">{service.description}</p>
                  </div>
                </div>
                <a
                  href={`/services/${serviceSlug}`}
                  className="mt-3 text-center text-sm text-blue-400 hover:text-blue-300 transition-colors underline font-semibold"
                >
                  Learn more →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = content.process.steps;

  return (
    <section className="section-padding bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-12 sm:mb-20 text-2xl sm:text-3xl lg:text-4xl">{content.process.heading}</h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-8">
          {steps.map((step, idx) => (
            <div key={step.number} className="text-center relative">
              <div className="heading-display text-blue-400 mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl">{step.number}</div>
              <h3 className="heading-md mb-2 sm:mb-3 text-lg sm:text-xl">{step.title}</h3>
              <p className="text-text-secondary text-sm sm:text-base">{step.description}</p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2 text-blue-400 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = content.whyChooseUs.reasons;

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-12 sm:mb-20 text-2xl sm:text-3xl lg:text-4xl">{content.whyChooseUs.heading}</h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {reasons.map((reason) => (
            <div key={reason.number} className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 text-center md:text-left items-center md:items-start">
              <div className="heading-lg text-blue-400 flex-shrink-0 leading-none text-2xl sm:text-3xl lg:text-4xl">{reason.number}</div>
              <div>
                <h3 className="heading-md mb-2 sm:mb-3 text-lg sm:text-xl">{reason.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceShowcase() {
  const furnitureData = content.furnitureMoving;
  const junkData = content.junkRemoval;

  return (
    <section className="section-padding bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20 md:space-y-32">
        {/* Furniture Moving */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-64 sm:h-80 md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={furnitureData.image}
              alt="Professional furniture moving"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h3 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">{furnitureData.heading}</h3>
            <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              {furnitureData.description}
            </p>
            <ul className="space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start">
              {furnitureData.checklist.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Junk Removal */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="relative h-64 sm:h-80 md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden order-2 lg:order-1">
            <Image
              src={junkData.image}
              alt="Garage junk removal"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h3 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">{junkData.heading}</h3>
            <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              {junkData.description}
            </p>
            <ul className="space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start">
              {junkData.checklist.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviewsData = content.reviews;

  return (
    <section id="reviews" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-12 sm:mb-20 text-2xl sm:text-3xl lg:text-4xl">{reviewsData.heading}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsData.items.map((review, idx) => (
            <div key={idx} className="bg-navy-800 rounded-xl p-6 sm:p-8 md:p-10">
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg sm:text-xl">
                    ■
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed italic text-sm sm:text-base">
                "{review.text}"
              </p>
              <p className="font-bold text-white text-sm sm:text-base">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function YourMoveMattersBanner() {
  const bannerData = content.yourMoveMattersBanner;
  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-navy-900 text-center overflow-hidden min-h-80 sm:min-h-96">
      {/* Background image positioned at bottom */}
      <div className="absolute bottom-0 right-0 w-full h-full opacity-60 sm:opacity-70">
        <Image
          src="/images/faithbannerbg.png"
          alt="Faith banner background"
          width={1200}
          height={600}
          className="w-full aspect-[2/1] object-cover object-bottom h-full"
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-md mb-2 sm:mb-4 text-white text-xl sm:text-2xl lg:text-3xl">{bannerData.heading}</h2>
        <p className="text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 max-w-3xl mx-auto">
          {bannerData.description}
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 max-w-3xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-white italic mb-2 sm:mb-3">
            "{bannerData.quote}"
          </p>
          <p className="text-xs sm:text-sm text-blue-300 font-bold">
            {bannerData.quoteSource}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 inline-block">
          <p className="text-base sm:text-lg md:text-xl font-bold text-white">
            {bannerData.ctaMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
