"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TRUST_DISCLAIMER } from "@/lib/constants";
import AddressAutocomplete, { PlaceResult } from "./AddressAutocomplete";

interface AddressField {
  value: string;
  placeData: PlaceResult | null;
  error: string;
}

export default function QuoteHeroForm({ phone }: { phone: string }) {
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
    <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-6 w-full max-w-2xl">
      <AddressAutocomplete
        label=""
        placeholder="Moving from address"
        value={fromAddress.value}
        error={fromAddress.error}
        inputClassName="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        onAddressChange={(value) => setFromAddress({ ...fromAddress, value, error: "" })}
        onAddressSelect={(placeData) => setFromAddress({ value: placeData.formatted_address, placeData, error: "" })}
      />

      <AddressAutocomplete
        label=""
        placeholder="Moving to address"
        value={toAddress.value}
        error={toAddress.error}
        inputClassName="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        onAddressChange={(value) => setToAddress({ ...toAddress, value, error: "" })}
        onAddressSelect={(placeData) => setToAddress({ value: placeData.formatted_address, placeData, error: "" })}
      />

      {/* Button and Call Text */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-center pt-1 sm:pt-2">
        <button
          onClick={validateAndProceed}
          className="btn-cta text-sm sm:text-base font-bold whitespace-nowrap px-4 sm:px-8 py-2 sm:py-4 w-full sm:w-auto rounded-lg sm:rounded-xl"
        >
          Get Quote →
        </button>

        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${phone}`} className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Call Us Today
          </a>
        </div>
      </div>

      {/* Mobile Call Link */}
      <a href={`tel:${phone}`} className="sm:hidden flex items-center justify-center gap-2 text-xs text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Us Today
      </a>

      {/* Trust Disclaimer */}
      <div className="pt-2 sm:pt-3 text-[0.65rem] sm:text-xs text-gray-600 border-t border-gray-300 italic">
        {TRUST_DISCLAIMER}
      </div>
    </div>
  );
}
