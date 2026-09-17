"use client";

import { useRouter } from "next/navigation";
import content from "@/app/content.json";

export default function FooterClient() {
  const router = useRouter();
  const footerData = content.footer;

  return (
    <footer className="bg-black py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg sm:text-xl mb-2">{footerData.companyName}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{footerData.tagline}</p>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              {footerData.services.map((service) => (
                <li key={service.label}>
                  <a href={service.href} className="hover:text-white transition-colors">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              {footerData.company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Get in Touch</h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              <a href={footerData.contact.phoneHref} className="hover:text-white transition-colors">
                {footerData.contact.phone}
              </a>
            </p>
            <button
              onClick={() => router.push("/quote")}
              className="btn-cta w-full text-xs sm:text-sm"
            >
              {footerData.contact.buttonText}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm">
            <p>{footerData.copyright}</p>
            <div className="flex gap-4 sm:gap-6">
              {footerData.legal.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
