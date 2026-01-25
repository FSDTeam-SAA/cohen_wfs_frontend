"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Partnership", href: "#partnership" },
  { name: "Operations", href: "#operations" },
  { name: "Sustainability", href: "#sustainability" },
  { name: "Team", href: "#team" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FFFFFFF2] border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="witklip logo"
                width={200}
                height={1500}
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#364153] hover:text-[#5A8D45] font-medium transition-colors text-sm lg:text-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button className="bg-[#52A454] hover:bg-[#458e47] text-white px-10 rounded-md font-semibold py-6">
                Enquiry
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger (Sheet) */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#364153]">
                  <Menu className="h-10! w-7! font-bold" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[calc(100%-7rem)] px-5 bg-white"
              >
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <Image
                      src="/images/logo.png"
                      alt="witklip logo"
                      width={100}
                      height={70}
                      className="h-14 w-auto mb-4"
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-6 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-[#5A8D45] border-b border-gray-50 pb-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button
                    className="bg-[#52A454] hover:bg-[#458e47] text-white w-full py-6 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Enquiry
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
