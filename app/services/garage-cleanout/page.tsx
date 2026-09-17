import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import content from "@/app/content.json";

export const metadata = {
  title: "Garage Cleanout Services | Junk Removal & Organization",
  description: "Professional garage cleanout services. Years of junk removed and hauled away. Donations, recycling, and proper disposal handled.",
};

export default function GarageCleanoutPage() {
  const heroData = content.hero;

  return (
    <div className="w-full">
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            Garage Cleanout in One Day
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Years of junk cleared. You get your space back. Donations and recycling handled.
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
                src="/images/garage-cleanout.jpg"
                alt="Professional garage cleanout"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Reclaim Your Garage
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary">
                Garage packed with decades of clutter? We remove everything, donate what's good, recycle what we can, and leave the space completely empty.
              </p>

              <h3 className="heading-md mb-4 text-lg sm:text-xl">We Handle</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Complete junk removal & hauling</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Donation sorting (to local nonprofits)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Recycling of metals, cardboard, etc.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Proper disposal of hazardous items</span>
                </li>
              </ul>

              <div className="bg-navy-800 rounded-lg p-4 sm:p-6 border border-blue-400/20">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Same-day available.</span> One flat rate covers everything.
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
            Why Professional Cleanout
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">⚡</div>
              <h3 className="heading-md mb-2 text-lg">One-Day Service</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                What takes you months, we do in hours. One crew handles the entire project.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">🌍</div>
              <h3 className="heading-md mb-2 text-lg">Responsible Disposal</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Donations to nonprofits, recycling programs, and proper waste disposal.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">💰</div>
              <h3 className="heading-md mb-2 text-lg">One Price</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Flat-rate estimate. Everything included. No surprise charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Idea */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-xl mb-6 text-2xl sm:text-3xl lg:text-4xl">
            From Packed to Perfect
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            See what a professional garage cleanout looks like. One call, one team, one day—and your garage is yours again.
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
