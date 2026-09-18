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
  title: articles.applianceRemoval.metaTitle,
  description: articles.applianceRemoval.metaDescription,
  path: "/services/appliance-removal",
  keywords: [articles.applianceRemoval.primaryKeyword, ...articles.applianceRemoval.secondaryKeywords],
  image: "/images/appliance-removal-og.jpg",
});

export default function ApplianceRemovalPage() {
  const articleData = articles.applianceRemoval;
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

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-2xl p-6 sm:p-8 border border-blue-400/30 h-fit space-y-6">
                <div>
                  <h3 className="heading-md text-lg font-bold text-white mb-3">
                    Fast Removal
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Same-day or scheduled appliance haul-away. EPA-compliant disposal included.
                  </p>
                </div>

                <div className="bg-navy-700/50 rounded-lg p-4 border border-blue-400/20 space-y-3">
                  <p className="text-xs text-text-secondary mb-3 font-semibold">
                    Get a flat-rate quote:
                  </p>
                  <QuoteHeroForm phone={heroData.callButtonPhone} />
                </div>

                <div className="border-t border-blue-400/10 pt-4">
                  <p className="text-xs text-text-secondary mb-3">Or call directly:</p>
                  <a
                    href={`tel:${heroData.callButtonPhone}`}
                    className="block w-full bg-navy-700/50 hover:bg-navy-700 border border-blue-400/30 hover:border-blue-400/50 text-blue-400 font-semibold py-2 px-3 rounded text-center text-sm transition-colors"
                  >
                    {heroData.callButtonPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <InternalLinkCluster
        title="Related Removal Services"
        links={articleData.internalLinks.map((link: any) => ({
          href: link.href,
          title: link.title,
          blurb: link.blurb,
        }))}
      />

      {/* FAQ */}
      <ArticleFAQ
        title="Appliance Removal Questions"
        questions={faqData}
      />

      {/* CTA Section */}
      <FinalCTAClient />

      {/* Footer */}
      <FooterClient />
    </div>
  );
}
