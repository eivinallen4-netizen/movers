import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import QuoteHeroForm from "@/components/QuoteHeroForm";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import ArticleFAQ from "@/components/ArticleFAQ";
import InternalLinkCluster from "@/components/InternalLinkCluster";
import content from "@/app/content.json";
import articles from "@/app/content-articles.json";
import { buildMetadata, FAQItem } from "@/lib/seo";

export const metadata = buildMetadata({
  title: articles.furnitureMoving.metaTitle,
  description: articles.furnitureMoving.metaDescription,
  path: "/furniture-moving",
  keywords: [articles.furnitureMoving.primaryKeyword, ...articles.furnitureMoving.secondaryKeywords],
  image: "/images/furniture-moving-og.jpg",
});

export default function FurnitureMovingPage() {
  const furnitureData = content.furnitureMoving;
  const articleData = articles.furnitureMoving;
  const heroData = content.hero;
  const faqData = articleData.faq as FAQItem[];

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
            {articleData.h1}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            {articleData.intro}
          </p>
          <div className="flex justify-center">
            <QuoteHeroForm phone={heroData.callButtonPhone} />
          </div>
        </div>
      </section>

      {/* Main Article Section */}
      <section className="section-padding bg-gradient-to-b from-background to-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 prose prose-invert max-w-none prose-headings:text-white prose-p:text-text-secondary prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-blue-400 prose-li:text-text-secondary">
              {articleData.sections.map((section, idx) => (
                <div key={idx} className="mb-12">
                  <h2 className="heading-xl text-2xl sm:text-3xl lg:text-4xl mb-6 text-white">
                    {section.h2}
                  </h2>
                  <div className="space-y-4 text-text-secondary whitespace-pre-wrap leading-relaxed">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar with Service Overview */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-2xl p-6 sm:p-8 border border-blue-400/30 h-fit space-y-6">
                <div>
                  <h3 className="heading-md text-lg font-bold text-white mb-3">
                    What We Handle
                  </h3>
                  <ul className="space-y-3">
                    {furnitureData.checklist.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                        <span className="text-text-secondary text-sm">{item.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-blue-400/10 pt-4">
                  <p className="text-xs text-text-secondary mb-3 font-semibold">
                    Ready to move your furniture safely?
                  </p>
                  <QuoteHeroForm phone={heroData.callButtonPhone} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Grid */}
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

      {/* Related Services */}
      <InternalLinkCluster
        title="Other Moving Services"
        links={articleData.internalLinks.map((link: any) => ({
          href: link.href,
          title: link.title,
          blurb: link.blurb,
        }))}
      />

      {/* FAQ */}
      <ArticleFAQ
        title="Frequently Asked Questions About Furniture Moving"
        questions={faqData}
      />

      {/* CTA Section */}
      <FinalCTAClient />

      {/* Footer */}
      <FooterClient />
    </div>
  );
}
