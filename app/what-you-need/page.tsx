import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import content from "@/app/content.json";

export const metadata = {
  title: "What Do You Need Removed? | MOVERS & JUNK REMOVAL",
  description: "Local moving, junk removal, furniture moving, appliance removal, and garage cleanout services in Las Vegas.",
};

export default function WhatYouNeedPage() {
  const servicesData = content.services;

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={content.hero.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
            {servicesData.heading}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            {servicesData.subheading}
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={content.hero.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-b from-background via-background to-navy-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {servicesData.items.map((service) => (
              <div
                key={service.title}
                className="group flex flex-col h-full"
              >
                <div className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 h-72 sm:h-80 md:h-96 shadow-lg hover:shadow-2xl flex-1">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col items-center justify-end p-6 sm:p-8">
                    <h3 className="heading-sm text-white text-center text-base sm:text-lg font-bold">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-200 mt-3 text-center leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <a href={`/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    Learn more →
                  </a>
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
