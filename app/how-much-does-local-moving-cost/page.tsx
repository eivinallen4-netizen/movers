import Image from "next/image";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";
import FinalCTAClient from "@/components/FinalCTAClient";
import FAQClient from "@/components/FAQClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import ArticleFAQ from "@/components/ArticleFAQ";
import InternalLinkCluster from "@/components/InternalLinkCluster";
import CostEstimatorSidebar from "@/components/CostEstimatorSidebar";
import content from "@/app/content.json";
import articles from "@/app/content-articles.json";
import { buildMetadata, FAQItem } from "@/lib/seo";

export const metadata = buildMetadata({
  title: articles.localMovingCost.metaTitle,
  description: articles.localMovingCost.metaDescription,
  path: "/how-much-does-local-moving-cost",
  keywords: [articles.localMovingCost.primaryKeyword, ...articles.localMovingCost.secondaryKeywords],
  image: "/images/cost-guide-og.jpg",
});

export default function MovingCostPage() {
  const articleData = articles.localMovingCost;
  const heroData = content.hero;
  const faqData = articleData.faq as FAQItem[];

  return (
    <div className="w-full">
      <FloatingQuoteButton phone={heroData.callButtonPhone} />
      <HeaderClient />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
            {articleData.h1}
          </h1>
          <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
            {articleData.intro}
          </p>
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

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 h-fit">
                <CostEstimatorSidebar phone={heroData.callButtonPhone} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <InternalLinkCluster
        title="More Moving Resources"
        links={articleData.internalLinks.map((link: any) => ({
          href: link.href,
          title: link.title,
          blurb: link.blurb,
        }))}
      />

      {/* FAQ */}
      <ArticleFAQ
        title="Frequently Asked Questions About Moving Costs"
        questions={faqData}
      />

      {/* CTA Section */}
      <FinalCTAClient />

      {/* Footer */}
      <FooterClient />
    </div>
  );
}
