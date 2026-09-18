import Image from "next/image";
import content from "@/app/content.json";

export default function TrustBar(): React.ReactElement {
  const stats = content.trustBar.stats;

  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-navy-800 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0">
        <Image
          src="/images/statsbannerbg.svg"
          alt="Stats banner background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content on top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="heading-lg text-blue-400 text-2xl sm:text-3xl md:text-4xl">{stat.number}</div>
              <p className="text-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
