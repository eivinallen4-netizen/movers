import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "Furniture Moving Services | MOVERS & JUNK REMOVAL",
  description: "Professional furniture moving with expert wrapping and protection. Handle stairs, tight doorways, pianos, and delicate items safely.",
};

export default function FurnitureMovingPage() {
  const furnitureData = content.furnitureMoving;
  const heroData = content.hero;

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            {furnitureData.heading}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            {furnitureData.description}
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
                src={furnitureData.image}
                alt="Professional furniture moving"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Expert Furniture Handling
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                From delicate antiques to heavy sofas and pianos, we treat every piece like it's our own. Our experienced team uses professional-grade equipment and protective materials to ensure your furniture arrives in perfect condition.
              </p>

              <h3 className="heading-md mb-6 text-lg sm:text-xl font-bold text-blue-400">What We Handle</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {furnitureData.checklist.map((item, idx) => (
                  <li key={idx} className="flex gap-3 justify-center lg:justify-start items-start">
                    <span className="text-blue-400 font-bold flex-shrink-0 text-lg">•</span>
                    <span className="text-gray-300 text-sm sm:text-base">{item.item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-xl p-6 sm:p-8 border border-blue-400/30">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Pro Tip:</span> Call ahead with a photo of your furniture, and we'll let you know exactly how we'll move it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding bg-gradient-to-b from-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
            Why Choose Us for Furniture Moving
          </h2>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-md mb-3 text-lg font-bold">Licensed & Insured</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Full coverage on your belongings with simple damage claims.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-md mb-3 text-lg font-bold">Professional Wrapping</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Every piece gets wrapped and protected before leaving your home.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-md mb-3 text-lg font-bold">Fast & Efficient</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                On-time service. We respect your schedule and your furniture.
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
