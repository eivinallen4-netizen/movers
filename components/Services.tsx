import Image from "next/image";
import content from "@/app/content.json";
import SectionHeading from "./SectionHeading";

export default function Services(): React.ReactElement {
  const servicesData = content.services;

  return (
    <section id="services" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading={servicesData.heading}
          subheading={servicesData.subheading}
          className="mb-12 sm:mb-20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {servicesData.items.map((service) => {
            const serviceSlug = service.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <div key={service.title} className="flex flex-col">
                <div className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-64 sm:h-72 md:h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-4 sm:p-6">
                    <h3 className="heading-sm text-white text-center text-sm sm:text-base">{service.title}</h3>
                    <p className="text-xs text-gray-300 mt-1 sm:mt-2 text-center">{service.description}</p>
                  </div>
                </div>
                <a
                  href={`/services/${serviceSlug}`}
                  className="mt-3 text-center text-sm text-blue-400 hover:text-blue-300 transition-colors underline font-semibold"
                >
                  Learn more →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
