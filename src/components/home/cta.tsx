"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="text-center space-y-4 lg:space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline text-white"
          >
            Partner With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="subheading max-w-4xl mx-auto text-[#FFFFFFE5]"
          >
            Whether you&apos;re a buyer, distributor, or potential partner,
            we&apos;d love to hear from you. Let&apos;s discuss how we can work
            together.
          </motion.p>

          <Link href="/contact">
            <Button
              size={"lg"}
              className="bg-white hover:bg-white/80 text-primary py-6 text-lg"
            >
              Get in Touch <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
