import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import content from "@/app/content.json";

export const metadata = {
  title: "Local Moving Services in Las Vegas | Same-Day & Scheduled",
  description: "Professional local moving services in Las Vegas. Same-day or scheduled moves completed in one day. Licensed, insured, no hidden fees.",
};

export default function LocalMovingPage() {
  const heroData = content.hero;

  return (
    <div className="w-full">
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            Local Moving Done Right
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Same-day or scheduled. Start and finish in one day. Professional crews, flat-rate quotes, no hidden fees.
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={heroData.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="relative h-64 sm:h-80 md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/furniture-moving.jpg"
                alt="Professional local moving"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Your Local Vegas Move
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary">
                Moving across town? We specialize in same-day and next-day local moves. Pack, load, transport, and unload—all in one day.
              </p>

              <h3 className="heading-md mb-4 text-lg sm:text-xl">What's Included</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Professional loading and transport</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Furniture protection and wrapping</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Full unload and placement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Licensed & insured for your peace of mind</span>
                </li>
              </ul>

              <div className="bg-navy-800 rounded-lg p-4 sm:p-6 border border-blue-400/20">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Same-day available.</span> Call for availability and get a flat-rate quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 text-2xl sm:text-3xl lg:text-4xl">
            Why Choose Us for Local Moving
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">⏱️</div>
              <h3 className="heading-md mb-2 text-lg">One-Day Moves</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Start in the morning, sleep in your new place. Most local moves finish in one day.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">💰</div>
              <h3 className="heading-md mb-2 text-lg">Flat-Rate Pricing</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Quote in 60 seconds. If it runs long, you don't get surprised. No hidden fees.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">👥</div>
              <h3 className="heading-md mb-2 text-lg">Professional Crews</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Experienced teams that treat your stuff like their own. Licensed and insured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 text-2xl sm:text-3xl lg:text-4xl">
            Our Local Moving Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">1️⃣</div>
              <h3 className="heading-md mb-2 text-lg">Get Your Quote</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                60-second quote. Flat rate or hourly.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">📅</div>
              <h3 className="heading-md mb-2 text-lg">Schedule Your Move</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Pick your date. Same-day available.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">🚚</div>
              <h3 className="heading-md mb-2 text-lg">We Move You</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Professional crew handles everything.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">✅</div>
              <h3 className="heading-md mb-2 text-lg">Done & Settled</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Unloaded, placed, and finished on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCTAClient />

      {/* FAQ */}
      <FAQClient />

      {/* Footer */}
      <FooterClient />
    </div>
  );
}
