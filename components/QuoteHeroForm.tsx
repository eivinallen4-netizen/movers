"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="space-y-4 pt-6 max-w-2xl">
      <AddressAutocomplete
        label=""
        placeholder="Moving from address"
        value={fromAddress.value}
        error={fromAddress.error}
        onAddressChange={(value) => setFromAddress({ ...fromAddress, value, error: "" })}
        onAddressSelect={(placeData) => setFromAddress({ value: placeData.formatted_address, placeData, error: "" })}
      />

      <AddressAutocomplete
        label=""
        placeholder="Moving to address"
        value={toAddress.value}
        error={toAddress.error}
        onAddressChange={(value) => setToAddress({ ...toAddress, value, error: "" })}
        onAddressSelect={(placeData) => setToAddress({ value: placeData.formatted_address, placeData, error: "" })}
      />

      {/* Button and Call Text */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
        <button
          onClick={validateAndProceed}
          className="btn-cta text-sm sm:text-lg font-bold whitespace-nowrap"
        >
          Get Quote →
        </button>

        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${phone}`} className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Call Us Today
          </a>
        </div>
      </div>

      {/* Trust Disclaimer */}
      <div className="pt-4 text-[0.65rem] sm:text-xs text-gray-600 border-t border-gray-300 italic">
        ✓ We trust you to give us the details, you can trust us to get your quote right.
      </div>
    </div>
  );
}
