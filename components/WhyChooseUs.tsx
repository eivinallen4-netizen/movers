import content from "@/app/content.json";
import SectionHeading from "./SectionHeading";

export default function WhyChooseUs(): React.ReactElement {
  const reasons = content.whyChooseUs.reasons;

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={content.whyChooseUs.heading} className="mb-12 sm:mb-20" />

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 text-center md:text-left items-center md:items-start"
            >
              <div className="heading-lg text-blue-400 flex-shrink-0 leading-none text-2xl sm:text-3xl lg:text-4xl">
                {reason.number}
              </div>
              <div>
                <h3 className="heading-md mb-2 sm:mb-3 text-lg sm:text-xl">{reason.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
