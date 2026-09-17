import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "Junk & Clutter Removal | MOVERS & JUNK REMOVAL",
  description: "Fast junk and clutter removal services. Same-day or next-day removal. Donations, recycling, and proper disposal handled.",
};

export default function JunkRemovalPage() {
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
            {junkData.heading}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            {junkData.description}
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
            <div className="relative h-72 sm:h-80 md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={junkData.image}
                alt="Junk and clutter removal"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="text-center lg:text-left">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                We Handle All Types of Clutter
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed">
                Whether it's decades of garage clutter, old furniture, or broken appliances, we remove it all responsibly. Eco-friendly disposal and donation handled.
              </p>

              <h3 className="heading-md mb-6 text-lg sm:text-xl font-bold text-blue-400">What We Remove</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {junkData.checklist.map((item, idx) => (
                  <li key={idx} className="flex gap-3 justify-center lg:justify-start items-start">
                    <span className="text-blue-400 font-bold flex-shrink-0 text-lg">✓</span>
                    <span className="text-gray-300 text-sm sm:text-base">{item.item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-xl p-6 sm:p-8 border border-blue-400/30">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Same-day service available.</span> Call for availability in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-gradient-to-b from-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
            How Our Removal Process Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-navy-700/50 rounded-2xl p-8 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="heading-lg text-blue-400 mb-4 text-5xl">1️⃣</div>
              <h3 className="heading-md mb-3 text-lg font-bold">Call or Quote</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Get a quote in 60 seconds. No hidden fees.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="heading-lg text-blue-400 mb-4 text-5xl">📅</div>
              <h3 className="heading-md mb-3 text-lg font-bold">Schedule</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Same-day or next-day service available.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="heading-lg text-blue-400 mb-4 text-5xl">🚚</div>
              <h3 className="heading-md mb-3 text-lg font-bold">We Remove</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Complete removal and hauling. Nothing left behind.
              </p>
            </div>
            <div className="bg-navy-700/50 rounded-2xl p-8 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="heading-lg text-blue-400 mb-4 text-5xl">♻️</div>
              <h3 className="heading-md mb-3 text-lg font-bold">Recycle & Donate</h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                What's good gets donated. What can be recycled gets recycled.
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
