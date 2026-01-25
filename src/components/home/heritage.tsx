"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeritageSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:py-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 order-2 lg:order-1 lg:pr-20 text-justify"
          >
            <div className="space-y-2">
              <h3 className="headline">
                The Heritage
              </h3>
              <h2 className="text-[#364153] text-3xl sm:text-4xl font-medium leading-tight">
                A Century and a Half of Stewardship
              </h2>
            </div>

            <div className="space-y-5 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                The story of Witklip Farm began over 160 years ago. Since the
                mid-19th century, the Burger family has served as the dedicated
                custodians of this land in Graafwater.
              </p>
              <p>
                Through generations of changing climates and evolving markets,
                the farm has remained a pillar of the Western Cape&apos;s
                agricultural landscape.
              </p>
              <p>
                Our deep-rooted history is not just about time; it is about a
                century-long commitment to the soil, the community, and the
                excellence of the West Coast harvest.
              </p>
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/heritage.jpg"
                alt="The Burger family at Witklip Farm"
                width={800}
                height={500}
                className="w-full aspect-4/3 object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
