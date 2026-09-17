import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "How We Can Help | MOVERS & JUNK REMOVAL",
  description: "Explore all the ways we can help with your moving and junk removal needs. From furniture moving to clutter removal.",
};

export default function HowWeCanHelpPage() {
  const heroData = content.hero;
  const servicesData = content.services;

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            How We Can Help
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Whether you're moving across town or clearing decades of clutter, we've got a solution for you.
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={heroData.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="section-padding bg-gradient-to-b from-background to-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 mb-16">
            {/* Moving Services */}
            <div className="bg-gradient-to-br from-navy-800/70 to-navy-900/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-lg mb-6 text-blue-400 text-2xl sm:text-3xl">🚚 Moving Services</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    <a href="/furniture-moving" className="text-blue-400 hover:text-blue-300 font-semibold">
                      Furniture Moving
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">Local Moving (Same-Day)</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">Long-Distance Moving</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">Commercial Office Moves</span>
                </li>
              </ul>
              <a href="/furniture-moving" className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">
                Learn more →
              </a>
            </div>

            {/* Removal Services */}
            <div className="bg-gradient-to-br from-navy-800/70 to-navy-900/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <h3 className="heading-lg mb-6 text-blue-400 text-2xl sm:text-3xl">🧹 Removal Services</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    <a href="/junk-removal" className="text-blue-400 hover:text-blue-300 font-semibold">
                      Junk Removal
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    <a href="/clutter-removal" className="text-blue-400 hover:text-blue-300 font-semibold">
                      Clutter Removal
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">Appliance Removal</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl flex-shrink-0">→</span>
                  <span className="text-gray-300 text-sm sm:text-base">Garage Cleanouts</span>
                </li>
              </ul>
              <a href="/junk-removal" className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">
                Learn more →
              </a>
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="bg-gradient-to-r from-navy-800/50 to-navy-900/50 rounded-2xl p-8 sm:p-12 text-center mb-16 border border-blue-400/20">
            <h3 className="heading-lg mb-8 text-xl sm:text-2xl font-bold">Why Work With Us?</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-sm font-semibold text-blue-400 mb-1">Licensed & Insured</p>
                <p className="text-xs text-text-secondary">Full coverage on all items</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">💰</div>
                <p className="text-sm font-semibold text-blue-400 mb-1">No Hidden Fees</p>
                <p className="text-xs text-text-secondary">Flat rate quotes</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">⚡</div>
                <p className="text-sm font-semibold text-blue-400 mb-1">Fast Service</p>
                <p className="text-xs text-text-secondary">Same-day available</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-sm font-semibold text-blue-400 mb-1">Professional Teams</p>
                <p className="text-xs text-text-secondary">Expert, trained crews</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-500/10 to-blue-400/5 rounded-2xl p-10 sm:p-12 border border-blue-400/30">
            <h3 className="heading-md mb-4 text-lg sm:text-2xl font-bold">Ready to Get Started?</h3>
            <p className="text-text-secondary mb-8 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Get a free quote in 60 seconds. No hidden fees, no surprises. Just honest, professional service.
            </p>
            <a href="/what-you-need" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300">
              Explore All Services →
            </a>
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
