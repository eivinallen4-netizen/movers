"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CostEstimatorSidebarProps {
  phone: string;
}

export default function CostEstimatorSidebar({ phone }: CostEstimatorSidebarProps) {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");

  const handleGetEstimate = () => {
    if (postalCode.trim()) {
      router.push(`/quote?location=${encodeURIComponent(postalCode)}`);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = "How Much Does Local Moving Cost in Las Vegas?";
    const text = "Check out this moving cost guide.";

    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-navy-800 rounded-2xl p-6 sm:p-8 border border-blue-400/30 space-y-6">
      <div>
        <h3 className="heading-md text-lg sm:text-xl font-bold text-white mb-3">
          Get Your Free Quote
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          Enter your postal code to see estimates based on thousands of Vegas moves.
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGetEstimate()}
          className="w-full px-4 py-3 rounded-lg bg-navy-700 border border-blue-400/30 text-foreground placeholder-text-secondary focus:outline-none focus:border-blue-400 transition-colors"
        />

        <button
          onClick={handleGetEstimate}
          className="w-full bg-blue-400 hover:bg-blue-500 text-navy-900 font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Get My Estimate →
        </button>
      </div>

      <div className="border-t border-blue-400/10 pt-4">
        <p className="text-xs text-text-secondary mb-3">Or call us directly:</p>
        <a
          href={`tel:${phone}`}
          className="block w-full bg-navy-700/50 hover:bg-navy-700 border border-blue-400/30 hover:border-blue-400/50 text-blue-400 font-semibold py-3 px-4 rounded-lg text-center transition-colors"
        >
          {phone}
        </a>
      </div>

      <button
        onClick={handleShare}
        className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors py-2"
      >
        Share this guide →
      </button>

      <div className="bg-navy-700/50 rounded-lg p-4 border border-blue-400/20">
        <p className="text-xs text-text-secondary">
          <span className="text-blue-400 font-bold">💡 Pro Tip:</span> Most Las Vegas moves cost $800–$2,500. Get a binding quote in 60 seconds.
        </p>
      </div>
    </div>
  );
}
