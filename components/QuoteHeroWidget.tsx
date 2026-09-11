"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PlaceResult {
  formatted_address: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface AddressField {
  value: string;
  placeData: PlaceResult | null;
  error: string;
}

interface HerePlaceSuggestion {
  title: string;
  id: string;
  resultType: string;
  address?: {
    label: string;
    countryCode?: string;
  };
}

export default function QuoteHeroWidget() {
  const router = useRouter();
  const [fromAddress, setFromAddress] = useState<AddressField>({
    value: "",
    placeData: null,
    error: "",
  });
  const [toAddress, setToAddress] = useState<AddressField>({
    value: "",
    placeData: null,
    error: "",
  });
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<HerePlaceSuggestion[]>([]);
  const [activeSuggestionField, setActiveSuggestionField] = useState<"from" | "to" | null>(null);

  const handleAddressInput = async (
    value: string,
    fieldType: "from" | "to"
  ) => {
    if (fieldType === "from") {
      setFromAddress({ ...fromAddress, value, error: "" });
      setActiveSuggestionField("from");
      setShowFromSuggestions(true);
    } else {
      setToAddress({ ...toAddress, value, error: "" });
      setActiveSuggestionField("to");
      setShowToSuggestions(true);
    }

    if (value.length > 2) {
      try {
        const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(value)}`);
        const data = await response.json();
        setSuggestions(data.items || []);
      } catch (error) {
        console.error("Autocomplete error:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectPlace = async (suggestion: HerePlaceSuggestion, fieldType: "from" | "to") => {
    try {
      const response = await fetch(`/api/lookup?id=${suggestion.id}`);
      const data = await response.json();

      if (data.position) {
        const placeData: PlaceResult = {
          formatted_address: suggestion.address?.label || suggestion.title,
          geometry: {
            location: {
              lat: data.position.lat,
              lng: data.position.lng,
            },
          },
        };

        if (fieldType === "from") {
          setFromAddress({ value: suggestion.address?.label || suggestion.title, placeData, error: "" });
          setShowFromSuggestions(false);
        } else {
          setToAddress({ value: suggestion.address?.label || suggestion.title, placeData, error: "" });
          setShowToSuggestions(false);
        }
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Place lookup error:", error);
    }
  };

  const validateAndProceed = () => {
    let isValid = true;

    if (!fromAddress.placeData) {
      setFromAddress({ ...fromAddress, error: "Please select a valid moving-from address" });
      isValid = false;
    }

    if (!toAddress.placeData) {
      setToAddress({ ...toAddress, error: "Please select a valid moving-to address" });
      isValid = false;
    }

    if (isValid) {
      const params = new URLSearchParams({
        from: fromAddress.placeData?.formatted_address || "",
        to: toAddress.placeData?.formatted_address || "",
      });
      router.push(`/quote?${params.toString()}`);
    }
  };

  return (
    <section className="relative section-hero bg-gradient-to-b from-navy-900 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Quote Form */}
          <div className="space-y-8 lg:space-y-10">
            <div>
              <h1 className="heading-display mb-6">
                GET YOUR
                <br />
                <span className="text-blue-400">FREE QUOTE</span>
              </h1>
              <p className="text-body-lg text-gray-300">
                Tell us where you're moving from and to. We'll get you a flat rate in 60 seconds.
              </p>
            </div>

            {/* Address Fields */}
            <div className="space-y-6 bg-navy-800/50 p-8 rounded-xl border border-navy-700">
              {/* From Address */}
              <div className="relative">
                <label htmlFor="from-address" className="block text-sm font-semibold mb-2">
                  Moving from address
                </label>
                <input
                  id="from-address"
                  type="text"
                  value={fromAddress.value}
                  onChange={(e) => handleAddressInput(e.target.value, "from")}
                  onFocus={() => setShowFromSuggestions(true)}
                  placeholder="Enter your current address"
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  aria-label="Moving from address"
                />
                {fromAddress.error && (
                  <p className="text-red-400 text-sm mt-2">{fromAddress.error}</p>
                )}
                {showFromSuggestions && activeSuggestionField === "from" && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-10">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPlace(suggestion, "from")}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-navy-600 transition-colors border-b border-navy-600 last:border-b-0"
                      >
                        {suggestion.address?.label || suggestion.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* To Address */}
              <div className="relative">
                <label htmlFor="to-address" className="block text-sm font-semibold mb-2">
                  Moving to address
                </label>
                <input
                  id="to-address"
                  type="text"
                  value={toAddress.value}
                  onChange={(e) => handleAddressInput(e.target.value, "to")}
                  onFocus={() => setShowToSuggestions(true)}
                  placeholder="Enter your new address"
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  aria-label="Moving to address"
                />
                {toAddress.error && (
                  <p className="text-red-400 text-sm mt-2">{toAddress.error}</p>
                )}
                {showToSuggestions && activeSuggestionField === "to" && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-navy-700 border border-navy-600 rounded-lg shadow-lg z-10">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPlace(suggestion, "to")}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-navy-600 transition-colors border-b border-navy-600 last:border-b-0"
                      >
                        {suggestion.address?.label || suggestion.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-4">
                <button
                  onClick={validateAndProceed}
                  className="w-full btn-cta text-lg font-bold py-4 px-6"
                >
                  Get Quote →
                </button>

                <div className="flex items-center gap-3 justify-center pt-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">Or get a call from us</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Professional movers carrying furniture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
