import Image from "next/image";
import content from "@/app/content.json";

interface ShowcaseData {
  heading: string;
  description: string;
  image: string;
  checklist: { item: string }[];
}

interface ShowcaseBlockProps {
  data: ShowcaseData;
  alt: string;
}

function ShowcaseBlock({ data, alt }: ShowcaseBlockProps): React.ReactElement {
  return (
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
      <div className="order-2 lg:order-1 relative h-64 sm:h-80 md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-[-14px_14px_0_0_rgba(49,162,253,1)]">
        <Image
          src={data.image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="order-1 lg:order-2 text-center lg:text-left">
        <h3 className="heading-xl mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">{data.heading}</h3>
        <p className="text-body-lg mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">{data.description}</p>
        <ul className="space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start">
          {data.checklist.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-blue-400 font-bold flex-shrink-0">•</span>
              <span className="text-gray-300 text-sm sm:text-base">{item.item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServiceShowcase(): React.ReactElement {
  return (
    <section className="section-padding bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20 md:space-y-32">
        <ShowcaseBlock data={content.furnitureMoving} alt="Professional furniture moving" />
        <ShowcaseBlock data={content.junkRemoval} alt="Garage junk removal" />
      </div>
    </section>
  );
}
