"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import content from "@/app/content.json";

export default function FinalCTAClient() {
  const router = useRouter();
  const ctaData = content.finalCTA;

  return (
    <section className="relative section-hero flex items-center justify-center overflow-hidden">
      <Image
        src={ctaData.image}
        alt="Clean space ready for move"
        fill
        className="object-cover absolute inset-0 -z-10"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12 sm:py-16 md:py-20">
        <h2 className="heading-display mb-6 sm:mb-8 text-3xl sm:text-4xl lg:text-5xl">{ctaData.heading}</h2>
        <p className="text-body-lg max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base lg:text-lg">
          {ctaData.description}
        </p>
        <button
          onClick={() => router.push("/quote")}
          className="btn-cta text-base sm:text-lg lg:text-xl font-bold py-3 sm:py-4 md:py-5 px-6 sm:px-8 lg:px-10"
        >
          {ctaData.buttonText}
        </button>
        <p className="text-xs sm:text-sm text-gray-300 mt-6 sm:mt-8 italic">
          ✓ We trust you to give us the details, you can trust us to get your quote right.
        </p>
      </div>
    </section>
  );
}
