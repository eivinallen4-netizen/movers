import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "Clutter Removal Services | MOVERS & JUNK REMOVAL",
  description: "Professional clutter removal for garages, basements, and attics. We haul it away, donate what we can, and recycle responsibly.",
};

export default function ClutterRemovalPage() {
  const junkData = content.junkRemoval;
  const heroData = content.hero;

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            Clutter Removal You Can Trust
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Reclaim your space. We remove decades of clutter, donate what's good, and leave your garage or attic completely empty.
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={heroData.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding bg-gradient-to-b from-background to-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="relative h-72 sm:h-80 md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1 shadow-2xl">
              <Image
                src={junkData.image}
                alt="Professional clutter removal"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Get Your Space Back
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                Years of accumulated clutter? We handle the whole project—sorting, hauling, donating, and recycling. One phone call, and your space is clear.
              </p>

              <h3 className="heading-md mb-6 text-lg sm:text-xl font-bold text-blue-400">What We Remove</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex gap-3 justify-center lg:justify-start items-start">
                  <span className="text-blue-400 font-bold flex-shrink-0 text-lg">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">Garage clutter (old tools, boxes, storage)</span>
                </li>
                <li className="flex gap-3 justify-center lg:justify-start items-start">
                  <span className="text-blue-400 font-bold flex-shrink-0 text-lg">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">Attic junk and old furniture</span>
                </li>
                <li className="flex gap-3 justify-center lg:justify-start items-start">
                  <span className="text-blue-400 font-bold flex-shrink-0 text-lg">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">Basement storage overflow</span>
                </li>
                <li className="flex gap-3 justify-center lg:justify-start items-start">
                  <span className="text-blue-400 font-bold flex-shrink-0 text-lg">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">Donations to local nonprofits</span>
                </li>
              </ul>

              <div className="bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-xl p-6 sm:p-8 border border-blue-400/30">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Next-day service available.</span> Call for an estimate and scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Service */}
      <section className="section-padding bg-gradient-to-b from-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
            Why Hire Professionals for Clutter Removal
          </h2>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-md mb-3 text-lg font-bold">Saves Time</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                What would take you weeks takes us a day. One crew, one trip.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-md mb-3 text-lg font-bold">Eco-Responsible</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                We donate usable items and recycle what we can. Proper disposal of the rest.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-md mb-3 text-lg font-bold">Affordable</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Flat-rate quotes with no hidden fees. Pay one price, we handle everything.
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
