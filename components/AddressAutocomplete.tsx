"use client";

import { useEffect, useRef, useState } from "react";

export interface PlaceResult {
  formatted_address: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface HerePlaceSuggestion {
  title: string;
  id: string;
  resultType: string;
  address?: {
    label: string;
    countryCode?: string;
  };
  position?: {
    lat: number;
    lng: number;
  };
}

interface AddressAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onAddressChange: (value: string) => void;
  onAddressSelect: (placeData: PlaceResult) => void;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
}

export default function AddressAutocomplete({
  label,
  placeholder,
  value,
  error,
  onAddressChange,
  onAddressSelect,
  inputClassName = "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
  containerClassName = "",
  errorClassName = "text-red-500 text-sm mt-1",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<HerePlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = async (inputValue: string) => {
    onAddressChange(inputValue);
    setShowSuggestions(true);

    if (inputValue.length > 2) {
      try {
        const url = `/api/autocomplete?q=${encodeURIComponent(inputValue)}`;
        const response = await fetch(url);
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

  const handleSelectPlace = (suggestion: HerePlaceSuggestion) => {
    const placeData: PlaceResult = {
      formatted_address: suggestion.address?.label || suggestion.title,
      geometry: {
        location: {
          lat: suggestion.position?.lat || 0,
          lng: suggestion.position?.lng || 0,
        },
      },
    };

    onAddressSelect(placeData);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={containerClassName}>
      {label && <label className="block text-sm font-semibold mb-3">{label}</label>}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={inputClassName}
          aria-label={label}
        />
        {error && <p className={errorClassName}>{error}</p>}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 overflow-y-auto"
            style={{ zIndex: 15 }}
          >
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPlace(suggestion)}
                className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
              >
                {suggestion.address?.label || suggestion.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
