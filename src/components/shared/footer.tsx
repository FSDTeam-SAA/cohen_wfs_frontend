import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4AA251] text-white py-12 lg:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10 mb-12">
          {/* Column 1: Brand & Info */}
          <div className="space-y-6">
            <div className="">
              <Image
                src="/images/logo.png"
                alt="Witklip Logo"
                width={100}
                height={80}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-white/80 max-w-xs">
              Leading the way in sustainable and diversified agricultural
              production across South Africa.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b border-white/20 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3 text-base text-white/80">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#livestock"
                  className="hover:text-white transition-colors"
                >
                  Livestock
                </Link>
              </li>
              <li>
                <Link
                  href="#partnership"
                  className="hover:text-white transition-colors"
                >
                  BBBEE Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b border-white/20 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-4 text-base text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <span>Witklip Farm, Graafwater, 8120</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>admin@witklipfarm.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Partners */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b border-white/20 pb-2 inline-block">
              Partners
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/images/partner1.png"
                alt="Potatoes SA"
                width={100}
                height={50}
                className="object-contain"
              />
              <Image
                src="/images/sustainability.png"
                alt="Land Bank"
                width={1000}
                height={1000}
                className="object-contain w-32 aspect-4/3"
              />
              <Image
                src="/images/partner2.png"
                alt="Land Bank"
                width={80}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/70">
            © {currentYear} WITKLIP Farm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
