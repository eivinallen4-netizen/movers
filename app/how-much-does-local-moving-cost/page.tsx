"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderClient from "@/components/HeaderClient";
import FooterClient from "@/components/FooterClient";

export default function MovingCostPage() {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");

  const handleGetEstimate = () => {
    if (postalCode.trim()) {
      router.push(`/quote?location=${encodeURIComponent(postalCode)}`);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = "How Much Does Local Moving Cost?";
    const text = "Check out this guide to local moving costs from Las Vegas.";

    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-full">
      <HeaderClient />

      <div className="min-h-screen bg-gradient-to-b from-navy-900 to-background">
        {/* Header Bar with Back & Share */}
        <div className="sticky top-20 z-40 bg-navy-900 border-b border-navy-800 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back
            </button>
            <h1 className="heading-md text-center flex-1">How Much Does Local Moving Cost?</h1>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
              title="Share this article"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.614 14.066 10 15.088 10 16v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4c0-.912.386-1.934 1.316-2.658m0 0a9.988 9.988 0 012.032.165m0 0a9.988 9.988 0 012.032-.165" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* F-Shape Layout: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
          {/* LEFT SIDEBAR - Sticky Lead Magnet */}
          <aside className="w-full lg:w-80 lg:sticky lg:top-40 lg:h-fit px-4 sm:px-6 lg:px-8 py-12">
            <div
              className="bg-cover bg-center rounded-2xl p-8 relative overflow-hidden"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1552881173-5e0eefad4a14?w=600&h=700&fit=crop')",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="heading-sm mb-2">Get Your Estimate</h2>
                  <p className="text-sm text-gray-200">
                    Enter your zip code for instant moving costs.
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleGetEstimate()}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleGetEstimate}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105"
                  >
                    Get Estimate →
                  </button>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-gray-200">
                    • <strong>No hidden fees.</strong> Flat rate quote in 60 seconds.
                  </p>
                </div>

                {/* Storage Credit Badge */}
                <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                  <p className="text-sm font-bold text-blue-300 mb-1">
                    Extra Bonus
                  </p>
                  <p className="text-xs text-gray-200">
                    Get $50 storage credit when you use this guide and book with us.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN ARTICLE */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 lg:max-w-2xl">
            {/* Hero Image */}
            <div className="mb-12 rounded-2xl overflow-hidden h-96 relative">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop"
                alt="Professional movers carrying furniture into a home"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Article Content */}
            <article className="prose prose-invert max-w-none space-y-8">
              {/* Opening */}
              <div className="bg-navy-800 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-lg leading-relaxed">
                  <strong>Moving from Las Vegas?</strong> You can do it yourself or hire a professional moving company—but which option is best depends on your budget, timeline, and how much stuff you're moving. We've put together this guide to help you compare costs for local moves within Las Vegas, regional moves to nearby states, and cross-country relocations.
                </p>
              </div>

              {/* Section 1: Professional Movers */}
              <section>
                <h2 className="heading-lg mb-4">Cost of Professional Movers in Las Vegas</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Hiring Las Vegas movers costs anywhere from <strong>$200 to $4,000 for local moves</strong>, while a cross-country move runs <strong>$4,099 to $13,563</strong>. The final price depends on distance, household size, moving company fees, tips, insurance, and any add-on services.
                </p>

                <div className="bg-navy-800 p-6 rounded-lg border border-navy-700 mb-6">
                  <h3 className="heading-sm mb-4">What Actually Affects Your Price?</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">•</span>
                      <span><strong>Distance:</strong> Local vs. regional vs. cross-country</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">•</span>
                      <span><strong>Home size:</strong> Studio to 5+ bedrooms</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">•</span>
                      <span><strong>Extra services:</strong> Packing, storage, specialty items</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">•</span>
                      <span><strong>Logistics:</strong> Stairs, elevator access, narrow hallways</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">•</span>
                      <span><strong>Season:</strong> Summer costs more than winter</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2: Local Moves */}
              <section>
                <h2 className="heading-lg mb-4">Average Local Moving Costs in Las Vegas</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  For moves <strong>within 50-100 miles</strong>, professional movers typically charge <strong>$25–$50 per hour per mover</strong>, with a minimum number of hours required. Here's what you're looking at by home size:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-blue-500/20 border border-navy-700">
                        <th className="p-4 text-left font-bold text-blue-300">Home Size</th>
                        <th className="p-4 text-left font-bold text-blue-300">Average Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-navy-700 hover:bg-navy-800/50">
                        <td className="p-4">Studio/Dorm Room</td>
                        <td className="p-4 font-semibold">$200 - $400</td>
                      </tr>
                      <tr className="border border-navy-700 hover:bg-navy-800/50">
                        <td className="p-4">1 Bedroom</td>
                        <td className="p-4 font-semibold">$300 - $600</td>
                      </tr>
                      <tr className="border border-navy-700 hover:bg-navy-800/50">
                        <td className="p-4">2 Bedrooms</td>
                        <td className="p-4 font-semibold">$700 - $1,400</td>
                      </tr>
                      <tr className="border border-navy-700 hover:bg-navy-800/50">
                        <td className="p-4">3 Bedrooms</td>
                        <td className="p-4 font-semibold">$1,000 - $2,000</td>
                      </tr>
                      <tr className="border border-navy-700 hover:bg-navy-800/50">
                        <td className="p-4">4 Bedrooms</td>
                        <td className="p-4 font-semibold">$1,500 - $3,000</td>
                      </tr>
                      <tr className="border border-navy-700 hover:bg-navy-800/50">
                        <td className="p-4">5+ Bedrooms</td>
                        <td className="p-4 font-semibold">$2,000 - $4,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm text-green-300">
                    <strong>Pro tip:</strong> Book during off-peak times (late fall/winter) for better rates and more availability.
                  </p>
                </div>
              </section>

              {/* Section 3: Regional Moves */}
              <section>
                <h2 className="heading-lg mb-4">Average Regional Moving Costs (100-500 Miles)</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Moving out of state or within the region costs <strong>$762 to $5,853</strong> depending on distance and household size. Costs scale up because of fuel, longer labor hours, and more complex logistics.
                </p>

                <div className="space-y-8">
                  {/* Riverside */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Riverside, CA</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $762 - $4,936</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$762 - $1,336</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$862 - $1,536</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$1,262 - $2,336</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$1,562 - $2,936</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$2,062 - $3,936</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$2,562 - $4,936</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Los Angeles */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Los Angeles, CA</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $862 - $5,103</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$862 - $1,503</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$962 - $1,703</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$1,362 - $2,503</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$1,662 - $3,103</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$2,162 - $4,103</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$2,662 - $5,103</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Phoenix */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Phoenix, AZ</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $955 - $5,258</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$955 - $1,658</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$1,055 - $1,858</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$1,455 - $2,658</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$1,755 - $3,258</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$2,255 - $4,258</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$2,755 - $5,258</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Salt Lake City */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Salt Lake City, UT</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $1,312 - $5,853</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$1,312 - $2,253</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$1,412 - $2,453</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$1,812 - $3,253</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$2,112 - $3,853</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$2,612 - $4,853</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$3,112 - $5,853</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Cross-Country */}
              <section>
                <h2 className="heading-lg mb-4">Average Cross-Country Moving Costs (500+ Miles)</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Moving across the country costs <strong>$4,099 to $13,563</strong>. Why the jump? Increased labor, fuel costs, and complex logistics add up fast. Most long-distance companies charge a flat fee based on your belongings' weight and the distance.
                </p>

                <div className="space-y-8">
                  {/* Kansas City */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Kansas City, MO</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $4,099 - $10,499</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$4,099 - $6,899</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$4,199 - $7,099</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$4,599 - $7,899</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$4,899 - $8,499</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$5,399 - $9,499</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$5,899 - $10,499</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Chicago */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Chicago, IL</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $5,291 - $12,484</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$5,291 - $8,884</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$5,391 - $9,084</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$5,791 - $9,884</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$6,091 - $10,484</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$6,591 - $11,484</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$7,091 - $12,484</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Atlanta */}
                  <div>
                    <h3 className="heading-sm mb-3">Las Vegas → Atlanta, GA</h3>
                    <p className="text-sm text-gray-400 mb-3">Average: $5,938 - $13,563</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-500/20 border border-navy-700">
                            <th className="p-3 text-left font-bold text-blue-300">Home Size</th>
                            <th className="p-3 text-left font-bold text-blue-300">Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-navy-700"><td className="p-3">Studio</td><td className="p-3">$5,938 - $9,963</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">1 BR</td><td className="p-3">$6,038 - $10,163</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">2 BR</td><td className="p-3">$6,438 - $10,963</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">3 BR</td><td className="p-3">$6,738 - $11,563</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">4 BR</td><td className="p-3">$7,238 - $12,563</td></tr>
                          <tr className="border border-navy-700"><td className="p-3">5+ BR</td><td className="p-3">$7,738 - $13,563</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: DIY vs Professional */}
              <section className="bg-navy-800 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h2 className="heading-lg mb-4">DIY Moving vs. Professional Movers: The Real Cost Difference</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Going DIY for a local move typically runs <strong>$200-$4,000</strong>—similar to hiring movers—because you still rent a truck and buy supplies. But for long-distance, DIY saves 35-63% compared to professional services.
                </p>

                <h3 className="heading-sm mb-3">When DIY Makes Sense</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You have friends or family willing to help</li>
                  <li className="flex gap-2"><span className="text-blue-400">•</span> Time isn't critical (you can take your time)</li>
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You're moving a small apartment or fewer items</li>
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You can find free or cheap boxes locally</li>
                </ul>

                <h3 className="heading-sm mb-3 mt-6">When Professional Movers Make Sense</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You're moving heavy furniture or specialty items</li>
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You need your stuff to arrive on a specific date</li>
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You have a large household or lots of belongings</li>
                  <li className="flex gap-2"><span className="text-blue-400">•</span> You want insurance coverage and liability protection</li>
                </ul>
              </section>

              {/* Section 6: FAQ */}
              <section>
                <h2 className="heading-lg mb-6">Questions People Always Ask</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="heading-sm mb-2">Can I negotiate moving company rates?</h3>
                    <p className="text-gray-300">
                      Yes. Many companies negotiate, especially if you're flexible on dates or services. Comparing quotes and asking about promotions or bundled packages can save you money.
                    </p>
                  </div>

                  <div>
                    <h3 className="heading-sm mb-2">What's the best time to move to save money?</h3>
                    <p className="text-gray-300">
                      Late fall and winter are cheaper—less demand. Summer and month-end dates cost more. Midweek moves also tend to be cheaper than weekends.
                    </p>
                  </div>

                  <div>
                    <h3 className="heading-sm mb-2">How can I save on moving costs?</h3>
                    <p className="text-gray-300 mb-2">Here's what actually works:</p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex gap-2"><span className="text-blue-400">•</span> Reduce items before the move (donate, sell, throw away)</li>
                      <li className="flex gap-2"><span className="text-blue-400">•</span> Pack it yourself instead of hiring full-service packing</li>
                      <li className="flex gap-2"><span className="text-blue-400">•</span> Find free or cheap boxes locally</li>
                      <li className="flex gap-2"><span className="text-blue-400">•</span> Book a moving truck for a few hours, not a full day</li>
                      <li className="flex gap-2"><span className="text-blue-400">•</span> Avoid peak moving dates (end of month, summer)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="heading-sm mb-2">What if something gets damaged during the move?</h3>
                    <p className="text-gray-300">
                      Professional movers carry insurance. When we move your stuff, we insure it. If something breaks, we handle the claim—no questions, no gotchas. That's why hiring licensed, insured movers matters.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Box */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-8 text-center">
                <h3 className="heading-sm mb-3">Ready to Move?</h3>
                <p className="text-sm mb-6">
                  Get a flat-rate quote in 60 seconds. No hidden fees. No surprises at the truck.
                </p>
                <button
                  onClick={() => router.push("/quote")}
                  className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Get My Free Quote →
                </button>
              </div>

              {/* Bible Quote */}
              <div className="bg-navy-800/50 border border-blue-400/30 rounded-lg p-8 text-center space-y-4 mt-12 pt-12 border-t-4 border-t-blue-400">
                <p className="text-lg italic leading-relaxed text-blue-100">
                  "For we know that if the earthly tent we live in is destroyed, we have a building from God, an eternal house in heaven, not built by human hands."
                </p>
                <p className="text-sm font-semibold text-blue-300">
                  — 2 Corinthians 5:1
                </p>
                <p className="text-xs text-gray-400 pt-4">
                  10% of every move supports the world of evangelism. Your new chapter starts here.
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>

      <FooterClient />
    </div>
  );
}
