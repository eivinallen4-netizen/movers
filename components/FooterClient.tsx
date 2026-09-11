"use client";

import { useRouter } from "next/navigation";
import content from "@/app/content.json";

export default function FooterClient() {
  const router = useRouter();
  const footerData = content.footer;

  return (
    <footer className="bg-black py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl mb-2">{footerData.companyName}</h3>
            <p className="text-gray-400 text-sm">{footerData.tagline}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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
          <div>
            <h4 className="font-bold mb-4">Get in Touch</h4>
            <p className="text-gray-400 text-sm mb-4">
              <a href={footerData.contact.phoneHref} className="hover:text-white transition-colors">
                {footerData.contact.phone}
              </a>
            </p>
            <button
              onClick={() => router.push("/quote")}
              className="btn-cta w-full text-sm"
            >
              {footerData.contact.buttonText}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>{footerData.copyright}</p>
            <div className="flex gap-6">
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
