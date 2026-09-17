"use client";

import { useState } from "react";
import QuoteHeroForm from "./QuoteHeroForm";

export default function FloatingQuoteButton({ phone }: { phone: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 z-40 hover:scale-110"
        aria-label="Get a quote"
      >
        💬
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Quote Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-96 max-w-sm z-50 animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900">Get Your Free Quote</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Tell us where you're moving from and to. We'll get you a flat rate in 60 seconds.
          </p>

          <QuoteHeroForm phone={phone} />
        </div>
      )}
    </>
  );
}
