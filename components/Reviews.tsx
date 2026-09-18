import content from "@/app/content.json";
import SectionHeading from "./SectionHeading";

export default function Reviews(): React.ReactElement {
  const reviewsData = content.reviews;

  return (
    <section id="reviews" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading heading={reviewsData.heading} className="mb-12 sm:mb-20" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsData.items.map((review, idx) => (
            <div key={idx} className="bg-navy-800 rounded-xl p-6 sm:p-8 md:p-10">
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg sm:text-xl">
                    ■
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed italic text-sm sm:text-base">
                "{review.text}"
              </p>
              <p className="font-bold text-white text-sm sm:text-base">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
