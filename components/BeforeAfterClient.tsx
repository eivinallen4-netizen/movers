"use client";

import Image from "next/image";
import { useState } from "react";

export default function BeforeAfterClient() {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="section-padding bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-lg text-center mb-4">POINT. WE HANDLE THE REST.</h2>
        <p className="text-center text-text-secondary mb-16 max-w-2xl mx-auto">
          Drag the slider to see the incredible transformations we've completed for our customers.
        </p>

        <div className="relative bg-gray-700 rounded-xl overflow-hidden h-96 md:h-[500px] cursor-col-resize">
          {/* Before side - always visible */}
          <div className="absolute inset-0">
            <Image
              src="/images/before.jpg"
              alt="Before - cluttered space"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="font-bold text-2xl md:text-4xl">BEFORE</p>
              </div>
            </div>
          </div>

          {/* After side - clipped to slider position */}
          <div
            className="absolute inset-0 overflow-hidden transition-all duration-75"
            style={{ right: 0, width: `${100 - sliderPos}%` }}
          >
            <Image
              src="/images/after.jpg"
              alt="After - clean space"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="font-bold text-2xl md:text-4xl">AFTER</p>
              </div>
            </div>
          </div>

          {/* Slider handle - positioned based on percentage */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-blue-400 opacity-80 pointer-events-none transition-all duration-75 z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-400 rounded-full p-3 shadow-lg">
              <span className="text-white font-bold text-sm">⟨  ⟩</span>
            </div>
          </div>

          {/* Invisible input for slider interaction */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full cursor-col-resize opacity-0 z-30"
            aria-label="Before and after slider"
          />
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">Drag to see the transformation →</p>
      </div>
    </section>
  );
}
