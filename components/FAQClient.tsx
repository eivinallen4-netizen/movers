"use client";

import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "How much does moving cost?",
    a: "Costs vary based on distance and volume. Get a free quote in 60 seconds using our quote form.",
  },
  {
    q: "What areas do you service?",
    a: "We service the entire metropolitan area and surrounding regions. Check our service areas page for details.",
  },
  {
    q: "Do you move large appliances?",
    a: "Yes, we have the equipment and expertise for all appliances including refrigerators, washers, dryers, and more.",
  },
  {
    q: "Do you provide packing materials?",
    a: "We can provide packing materials, or you can bring your own. Discuss this when you get your quote.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Same-day service is available subject to availability. Contact us directly to check scheduling.",
  },
  {
    q: "What items can't you take?",
    a: "We cannot remove hazardous materials, ammunition, or dangerous items. We also follow all local regulations for disposal.",
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-lg text-center mb-16">FREQUENTLY ASKED QUESTIONS</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={`faq-${i}`} className="border-2 border-navy-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full bg-navy-800 hover:bg-navy-700 p-6 flex justify-between items-center transition-colors text-left"
                aria-expanded={openIndex === i}
              >
                <h3 className="font-bold text-base md:text-lg text-white">{faq.q}</h3>
                <span className="text-2xl text-blue-400 flex-shrink-0 ml-4">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="bg-navy-900 p-6 border-t border-navy-800">
                  <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
