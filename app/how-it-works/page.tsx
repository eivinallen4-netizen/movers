import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "How It Works | MOVERS & JUNK REMOVAL",
  description: "Our simple 3-step process to get your move or junk removal done. Get a quote in 60 seconds, book your move, and we handle the rest.",
};

export default function HowItWorksPage() {
  const processData = content.process;
  const heroData = content.hero;

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            {processData.heading}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Our simple process makes moving and junk removal stress-free.
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={heroData.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-gradient-to-b from-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-8">
            {processData.steps.map((step, idx) => (
              <div key={step.number} className="relative">
                <div className="bg-navy-700/50 rounded-2xl p-8 sm:p-10 text-center border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 h-full flex flex-col justify-center">
                  <div className="heading-display text-blue-400 mb-4 text-4xl sm:text-5xl lg:text-6xl">
                    {step.number}
                  </div>
                  <h3 className="heading-md mb-3 text-lg sm:text-xl font-bold">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < processData.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2 text-blue-400 text-3xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="section-padding bg-gradient-to-b from-background to-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
            Why Our Process Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            <div className="bg-navy-800/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="text-4xl">•</div>
                <div>
                  <h3 className="heading-md mb-3 text-lg sm:text-xl font-bold text-blue-400">No Hidden Fees</h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    Get a flat rate quote in 60 seconds. If the move runs long, you don't get surprised at checkout.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-navy-800/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div>
                <h3 className="heading-md mb-3 text-lg sm:text-xl font-bold text-blue-400">Professional Teams</h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    Licensed, insured crews that introduce themselves, wrap items before moving, and call ahead.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-navy-800/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div>
                <h3 className="heading-md mb-3 text-lg sm:text-xl font-bold text-blue-400">On-Time Service</h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    We respect your schedule. In and out on time, every time.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-navy-800/50 rounded-2xl p-8 sm:p-10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div>
                <h3 className="heading-md mb-3 text-lg sm:text-xl font-bold text-blue-400">Simple Claims</h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    If something breaks, we handle the insurance claim. No gotchas, no surprises.
                  </p>
                </div>
              </div>
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
