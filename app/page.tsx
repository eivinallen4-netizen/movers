import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import BeforeAfterClient from "@/components/BeforeAfterClient";
import FAQClient from "@/components/FAQClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FooterClient from "@/components/FooterClient";
import content from "@/app/content.json";

export default function Home() {
  return (
    <div className="w-full">
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8 lg:space-y-10">
            <h1 className="heading-display">
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

            <p className="text-body-lg max-w-xl">
              {heroData.subheading}
            </p>

            <QuoteHeroForm phone={heroData.callButtonPhone} />

            {/* Trust Signal */}
            <div className="pt-8 flex items-start gap-4 border-t border-navy-800">
              <div className="text-4xl">⭐</div>
              <div>
                <div className="font-bold text-xl">{heroData.trustSignalTitle}</div>
                <p className="text-text-secondary text-sm">{heroData.trustSignalDescription}</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={heroData.heroImage}
              alt="Professional movers carrying furniture"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
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
    <section className="bg-navy-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="heading-lg text-blue-400">{stat.number}</div>
              <p className="text-text-secondary text-sm mt-2">{stat.label}</p>
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
        <h2 className="heading-xl text-center mb-4">{servicesData.heading}</h2>
        <p className="text-center text-text-secondary mb-20 max-w-2xl mx-auto">
          {servicesData.subheading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {servicesData.items.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-72 md:h-80"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-6">
                <h3 className="heading-sm text-white text-center">{service.title}</h3>
                <p className="text-xs text-gray-300 mt-2 text-center">{service.description}</p>
              </div>
            </div>
          ))}
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
        <h2 className="heading-xl text-center mb-20">{content.process.heading}</h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, idx) => (
            <div key={step.number} className="text-center relative">
              <div className="heading-display text-blue-400 mb-4">{step.number}</div>
              <h3 className="heading-md mb-3">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>

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
        <h2 className="heading-xl text-center mb-20">{content.whyChooseUs.heading}</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {reasons.map((reason) => (
            <div key={reason.number} className="flex gap-6 lg:gap-8">
              <div className="heading-lg text-blue-400 flex-shrink-0 leading-none">{reason.number}</div>
              <div>
                <h3 className="heading-md mb-3">{reason.title}</h3>
                <p className="text-text-secondary leading-relaxed">{reason.description}</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32">
        {/* Furniture Moving */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-80 md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={furnitureData.image}
              alt="Professional furniture moving"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="heading-xl mb-6">{furnitureData.heading}</h3>
            <p className="text-body-lg mb-8">
              {furnitureData.description}
            </p>
            <ul className="space-y-4">
              {furnitureData.checklist.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span className="text-gray-300">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Junk Removal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={junkData.image}
              alt="Garage junk removal"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="heading-xl mb-6">{junkData.heading}</h3>
            <p className="text-body-lg mb-8">
              {junkData.description}
            </p>
            <ul className="space-y-4">
              {junkData.checklist.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span className="text-gray-300">{item.item}</span>
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
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-20">{reviewsData.heading}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviewsData.items.map((review, idx) => (
            <div key={idx} className="bg-navy-800 rounded-xl p-8 md:p-10">
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed italic">
                "{review.text}"
              </p>
              <p className="font-bold text-white">{review.author}</p>
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
    <section className="relative py-12 md:py-16 bg-navy-900 text-center overflow-hidden min-h-96">
      {/* Background image positioned at bottom */}
      <div className="absolute bottom-0  right-0 h-full">
        <Image
          src="/images/faithbannerbg.png"
          alt="Faith banner background"
          width={1200}
          height={600}
          className="w-full aspect-[2/1] object-cover object-bottom h-[100%]"
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-md mb-4 text-white">{bannerData.heading}</h2>
        <p className="text-base md:text-lg text-white mb-8 max-w-3xl mx-auto">
          {bannerData.description}
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8 max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-white italic mb-3">
            "{bannerData.quote}"
          </p>
          <p className="text-sm text-blue-300 font-bold">
            {bannerData.quoteSource}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 inline-block">
          <p className="text-lg md:text-xl font-bold text-white">
            {bannerData.ctaMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
