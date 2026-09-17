import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "Why Choose Us | MOVERS & JUNK REMOVAL",
  description: "Licensed, insured movers with no hidden fees, professional teams, and 24/7 support. 1,200+ moves completed with 4.8★ rating.",
};

export default function WhyChooseUsPage() {
  const whyData = content.whyChooseUs;
  const trustBar = content.trustBar;
  const heroData = content.hero;

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            {whyData.heading}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Trusted by over 1,200+ happy customers in Las Vegas with a 4.8★ rating.
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={heroData.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustBar.stats.map((stat) => (
              <div key={stat.label} className="bg-navy-700/50 rounded-2xl p-6 sm:p-8 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="heading-lg text-blue-400 text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
                  {stat.number}
                </div>
                <p className="text-text-secondary text-xs sm:text-sm font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="section-padding bg-gradient-to-b from-background to-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">Why Customers Trust Us</h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {whyData.reasons.map((reason) => (
              <div
                key={reason.number}
                className="bg-navy-800/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex gap-6"
              >
                <div className="heading-lg text-blue-400 flex-shrink-0 leading-none text-4xl sm:text-5xl font-bold">
                  {reason.number}
                </div>
                <div className="flex-1">
                  <h3 className="heading-md mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                    {reason.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
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
