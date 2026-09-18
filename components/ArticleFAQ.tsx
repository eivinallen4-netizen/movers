"use client";

import { buildFAQJsonLd, FAQItem } from "@/lib/seo";

interface ArticleFAQProps {
  title: string;
  questions: FAQItem[];
}

export default function ArticleFAQ({ title, questions }: ArticleFAQProps) {
  return (
    <section className="section-padding bg-gradient-to-b from-navy-800 to-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-xl text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {questions.map((faq, index) => (
            <details
              key={index}
              className="group bg-navy-700/50 rounded-xl border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 flex items-center justify-between hover:bg-navy-700/70 transition-colors">
                <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight pr-4">
                  {faq.q}
                </h3>
                <span className="text-blue-400 text-xl flex-shrink-0 group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-4 pt-0 border-t border-blue-400/10 text-text-secondary text-sm sm:text-base leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(buildFAQJsonLd(questions, title))}
      </script>
    </section>
  );
}
