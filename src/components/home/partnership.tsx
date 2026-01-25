"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnershipSection() {
  return (
    <section
      id="partnership"
      className="relative py-16 lg:py-24 overflow-hidden bg-[url('/images/partnership-bg.jpg')] bg-cover bg-center z-20"
    >
      <div className="absolute inset-0 bg-primary opacity-60 -z-10" />

      <div className="container mx-auto relative z-10">
        {/* Main Frosted Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F9FAFB99] backdrop-blur-xl rounded-3xl p-4 lg:p-12 shadow-2xl shadow-primary/20 border border-white/20"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="headline mb-2">The Modern Partnership</h2>
            <h5 className="subheading">
              Driving Transformation and Innovation
            </h5>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column: Narrative */}
            <div className="space-y-6">
              <p>
                In 2025, tradition met a new vision. The partnership between Mr.
                Burger and Mr. Van der Berg was forged to propel Witklip Farm
                into the future of South African agriculture.
              </p>
              <p>
                Supported by the Land Bank, the Department of Agriculture, and
                Potatoes SA, this collaboration has successfully transitioned
                the farm into one of the largest BBBEE-certified potato
                operations in the country.
              </p>
              <p>
                Today, we combine 160 years of farming wisdom with modern
                empowerment goals, ensuring that Witklip remains a beacon of
                commercial success and social transformation.
              </p>
            </div>

            {/* Right Column: B-BBEE Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#FFFFFF66] rounded-2xl p-6 lg:p-8 shadow-xl border border-primary/10"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BadgeCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    B-BBEE Profile & Compliance
                  </h3>
                  <p>A Leader in Agricultural Transformation</p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  As one of the largest empowered potato operations in South
                  Africa, Witklip Farm is a certified{" "}
                  <span className="font-bold text-gray-800">
                    Level 2 B-BBEE contributor
                  </span>
                  .
                </p>
                <p>
                  Following our successful transition in 2025 under the Burger
                  and Van Der Berg partnership, we have achieved a{" "}
                  <span className="font-bold text-gray-800">
                    {" "}
                    125% procurement recognition status
                  </span>
                  .
                </p>
                <p>
                  This achievement reflects our dedication to the Department of
                  Agriculture&apos;s transformation goals and our role in
                  fostering an inclusive and sustainable agricultural sector in
                  the Western Cape.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer Quote Area */}
          <div className="mt-12 bg-primary/5 rounded-xl p-6 border border-primary/10">
            <p className="text-gray-600 text-center italic text-sm lg:text-base px-4">
              &quot;The partnership photo showing Gysbert Burger, Landbank
              Regional Manager, and Cohen Van Der Berg represents the
              collaborative spirit that drives our transformation forward.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
