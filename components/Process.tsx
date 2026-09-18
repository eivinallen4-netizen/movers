import content from "@/app/content.json";
import SectionHeading from "./SectionHeading";

export default function Process(): React.ReactElement {
  const steps = content.process.steps;

  return (
    <section className="section-padding bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={content.process.heading} className="mb-12 sm:mb-20" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-8">
          {steps.map((step, idx) => (
            <div key={step.number} className="text-center relative">
              <div className="heading-display text-blue-400 mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl">
                {step.number}
              </div>
              <h3 className="heading-md mb-2 sm:mb-3 text-lg sm:text-xl">{step.title}</h3>
              <p className="text-text-secondary text-sm sm:text-base">{step.description}</p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2 text-blue-400 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
