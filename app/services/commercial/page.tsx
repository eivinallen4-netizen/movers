import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import content from "@/app/content.json";

export const metadata = {
  title: "Commercial Moving Services | Office Relocation Las Vegas",
  description: "Professional office and commercial moving services. Minimize downtime. Expert planning and execution. Licensed and insured.",
};

export default function CommercialPage() {
  const heroData = content.hero;

  return (
    <div className="w-full">
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            Commercial Moving Without Downtime
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            Office moves that don't shut down your business. Expert planning, professional crews, minimal disruption.
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
                alt="Professional commercial office moving"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Expert Office Relocation
              </h2>
              <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-text-secondary">
                Moving your office? We specialize in corporate relocations that minimize downtime and keep your team productive.
              </p>

              <h3 className="heading-md mb-4 text-lg sm:text-xl">We Handle</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Full office furniture and equipment moving</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">IT equipment relocation & setup</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">After-hours and weekend moves</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm sm:text-base">Professional coordination & planning</span>
                </li>
              </ul>

              <div className="bg-navy-800 rounded-lg p-4 sm:p-6 border border-blue-400/20">
                <p className="text-sm sm:text-base text-text-secondary">
                  <span className="text-blue-400 font-bold">Minimize disruption.</span> We work after-hours to keep your business running smoothly.
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
            Why Choose Us for Commercial Moves
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">📋</div>
              <h3 className="heading-md mb-2 text-lg">Expert Planning</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                We coordinate with your team to plan every detail and minimize business disruption.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">🕐</div>
              <h3 className="heading-md mb-2 text-lg">Flexible Scheduling</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                After-hours, weekends, or phased moves. Whatever works best for your business.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">🔒</div>
              <h3 className="heading-md mb-2 text-lg">Licensed & Secure</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Full insurance, background-checked crews, and secure equipment handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-center mb-12 text-2xl sm:text-3xl lg:text-4xl">
            Our Commercial Move Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">1️⃣</div>
              <h3 className="heading-md mb-2 text-lg">Consultation</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Assess your office and discuss timeline.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">📅</div>
              <h3 className="heading-md mb-2 text-lg">Planning</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Create detailed move schedule with your team.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">🚚</div>
              <h3 className="heading-md mb-2 text-lg">Execution</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Professional crew handles move seamlessly.
              </p>
            </div>
            <div className="text-center">
              <div className="heading-lg text-blue-400 mb-3 text-3xl">✅</div>
              <h3 className="heading-md mb-2 text-lg">Setup</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Everything placed and ready to go.
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
