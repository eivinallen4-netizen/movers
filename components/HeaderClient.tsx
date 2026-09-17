"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderClient() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-900 border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="inline-block">
              <Image
                src="/logo.png"
                alt="Movers and Junk Removal"
                width={180}
                height={50}
                className="h-10 sm:h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex flex-1 justify-center gap-6 lg:gap-8 items-center">
            <a href="#services" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors text-sm lg:text-base">
              Services
            </a>
            <a href="#reviews" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors text-sm lg:text-base">
              Reviews
            </a>
            <a href="#faq" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors text-sm lg:text-base">
              FAQ
            </a>
          </nav>

          {/* Phone and CTA Button */}
          <div className="hidden md:flex gap-4 lg:gap-8 items-center">
            <a href="tel:+17025551234" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors p-2">
              <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold text-xs lg:text-sm whitespace-nowrap">(702) 555-1234</span>
            </a>
            <button onClick={() => router.push("/quote")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-all transform hover:scale-105 flex items-center gap-1 lg:gap-2 text-xs lg:text-base">
              Get Quote
              <span>→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-navy-800 space-y-1">
            <a href="#services" className="block py-2 px-2 font-semibold text-sm text-gray-300 hover:text-blue-400 hover:bg-navy-800 rounded transition-colors">
              Services
            </a>
            <a href="#reviews" className="block py-2 px-2 font-semibold text-sm text-gray-300 hover:text-blue-400 hover:bg-navy-800 rounded transition-colors">
              Reviews
            </a>
            <a href="#faq" className="block py-2 px-2 font-semibold text-sm text-gray-300 hover:text-blue-400 hover:bg-navy-800 rounded transition-colors">
              FAQ
            </a>
            <a href="tel:+17025551234" className="flex items-center gap-2 py-2 px-2 font-semibold text-sm text-gray-300 hover:text-blue-400 hover:bg-navy-800 rounded transition-colors">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="whitespace-nowrap">(702) 555-1234</span>
            </a>
            <button onClick={() => router.push("/quote")} className="w-full mt-3 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Get Quote
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
