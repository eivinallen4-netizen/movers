import Image from "next/image";
import React from "react";

interface ArticleLayoutProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  sidebarCTA?: React.ReactNode;
  children: React.ReactNode;
}

export default function ArticleLayout({
  title,
  subtitle,
  heroImage,
  sidebarCTA,
  children,
}: ArticleLayoutProps) {
  return (
    <>
      {/* Hero Section */}
      {heroImage && (
        <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-navy-900 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-body-lg text-center text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-text-secondary mb-12">
                {subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Article Section with Sidebar */}
      <section className="section-padding bg-gradient-to-b from-background to-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Article Content */}
            <div className="lg:col-span-2 prose prose-invert max-w-none prose-headings:text-white prose-p:text-text-secondary prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-blue-400 prose-li:text-text-secondary">
              {children}
            </div>

            {/* Sidebar CTA */}
            {sidebarCTA && (
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-2xl p-6 sm:p-8 border border-blue-400/30 h-fit">
                  {sidebarCTA}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
