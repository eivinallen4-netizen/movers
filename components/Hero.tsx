import Image from "next/image";
import content from "@/app/content.json";
import QuoteHeroForm from "./QuoteHeroForm";

export default function Hero(): React.ReactElement {
  const heroData = content.hero;
  const headingLines = heroData.heading.split("\n");
  const lastLineIdx = headingLines.length - 1;

  return (
    <section className="relative section-hero bg-gradient-to-b from-navy-900 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1 flex flex-col items-center lg:items-start">
            <h1 className="heading-display text-center lg:text-left">
              {headingLines.map((line, idx) => (
                <span key={idx}>
                  {idx === lastLineIdx ? <span className="text-blue-400">{line}</span> : line}
                  {idx < lastLineIdx && <br />}
                </span>
              ))}
            </h1>

            <p className="text-body-lg text-sm sm:text-base lg:text-lg max-w-lg text-center lg:text-left">
              {heroData.subheading}
            </p>

            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <QuoteHeroForm phone={heroData.callButtonPhone} />
            </div>

            {/* Trust Signal */}
            <div className="pt-3 sm:pt-4 lg:pt-6 flex flex-col md:flex-row md:items-start gap-2 sm:gap-3 lg:gap-4 border-t border-navy-800 w-full">
              <div className="text-center lg:text-left">
                <div className="font-bold text-xs sm:text-sm lg:text-base">{heroData.trustSignalTitle}</div>
                <p className="text-text-secondary text-[0.7rem] sm:text-xs">{heroData.trustSignalDescription}</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden lg:block relative h-64 sm:h-80 md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-[14px_14px_0_0_rgba(49,162,253,1)]">
            <Image
              src={heroData.heroImage}
              alt="Professional movers carrying furniture"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
