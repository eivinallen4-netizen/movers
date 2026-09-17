import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import content from "@/app/content.json";

export const metadata = {
  title: "Long-Distance Moving from Las Vegas | Cross-Country Moves",
  description: "Professional long-distance moving services from Las Vegas. Cross-country moves with flat-rate quotes, full insurance, and on-time delivery.",
};

export default function LongDistancePage() {
  const heroData = content.hero;

  return (
    <div className="w-full">
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            Long-Distance Moving Made Simple
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Cross-country without surprises. Flat-rate quote, full insurance, on-time delivery.
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
                src="/images/commercial.jpg"
                alt="Professional long-distance moving"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Cross-Country with Confidence
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary">
                Moving across the country? We handle packing, loading, transport, and delivery to your new home with full insurance coverage.
              </p>

              <h3 className="heading-md mb-4 text-lg sm:text-xl">What's Included</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Professional packing and wrapping</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Full insurance coverage during transit</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Real-time delivery tracking</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Flat-rate quote—no surprises</span>
                </li>
              </ul>

              <div className="bg-navy-800 rounded-lg p-4 sm:p-6 border border-blue-400/20">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Moving nationwide.</span> Get a flat quote and delivery date estimate.
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
            Why Choose Us for Long-Distance Moving
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">🔒</div>
              <h3 className="heading-md mb-2 text-lg">Full Insurance</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Your belongings are protected. Simple claims process if anything happens.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">📍</div>
              <h3 className="heading-md mb-2 text-lg">Tracking & Updates</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Know where your stuff is. Real-time updates from pickup to delivery.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">💰</div>
              <h3 className="heading-md mb-2 text-lg">No Hidden Fees</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Flat-rate quote upfront. Delivery date commitment. No surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-8 text-2xl sm:text-3xl lg:text-4xl">
            We Move Nationwide
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            Moving from Las Vegas to anywhere in the USA? We've got you covered. Get a free quote for your destination.
          </p>
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
