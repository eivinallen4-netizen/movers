import Image from "next/image";
import content from "@/app/content.json";

export default function YourMoveMattersBanner(): React.ReactElement {
  const bannerData = content.yourMoveMattersBanner;

  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-navy-900 text-center overflow-hidden min-h-80 sm:min-h-96">
      {/* Background image positioned at bottom */}
      <div className="absolute bottom-0 right-0 w-full h-full opacity-60 sm:opacity-70">
        <Image
          src="/images/faithbannerbg.png"
          alt="Faith banner background"
          width={1200}
          height={600}
          className="w-full aspect-[2/1] object-cover object-bottom h-full"
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-md mb-2 sm:mb-4 text-white text-xl sm:text-2xl lg:text-3xl">{bannerData.heading}</h2>
        <p className="text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 max-w-3xl mx-auto">
          {bannerData.description}
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 max-w-3xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-white italic mb-2 sm:mb-3">
            "{bannerData.quote}"
          </p>
          <p className="text-xs sm:text-sm text-blue-300 font-bold">{bannerData.quoteSource}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 inline-block">
          <p className="text-base sm:text-lg md:text-xl font-bold text-white">{bannerData.ctaMessage}</p>
        </div>
      </div>
    </section>
  );
}
