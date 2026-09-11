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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="heading-display mb-8">{ctaData.heading}</h2>
        <p className="text-body-lg max-w-2xl mx-auto mb-12">
          {ctaData.description}
        </p>
        <button
          onClick={() => router.push("/quote")}
          className="btn-cta text-xl font-bold py-5 px-10"
        >
          {ctaData.buttonText}
        </button>
        <p className="text-sm text-gray-300 mt-8 italic">
          ✓ We trust you to give us the details, you can trust us to get your quote right.
        </p>
      </div>
    </section>
  );
}
