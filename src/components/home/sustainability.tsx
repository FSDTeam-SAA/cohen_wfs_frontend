"use client";

import React from "react";
import { motion } from "framer-motion";
import { SustainabilityData } from "@/data/sustainability.data";
import Image from "next/image";

export default function Sustainability() {
  return (
    <section className="bg-[#F8FAF8] py-16 lg:py-24">
      <div className="flex justify-center lg:mb-12 mb-4">
        <Image
          src={"/images/sustainability.png"}
          alt="Sustainability"
          width={700}
          height={400}
        />
      </div>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline"
          >
            Sustainability & Environmental Practices
          </motion.h2>
          <div className="space-y-2">
            <h3 className="subheading">
              Our Commitment to the Land: Sustainability in Action
            </h3>
            <p className="max-w-4xl mx-auto">
              At Witklip Farm, we recognize that our 160-year history is a
              direct result of the land&apos;s health. As custodians of over 930
              hectares in the Graafwater region, we are committed to farming
              practices that protect our unique West Coast environment for
              another century to come.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-4">
          {SustainabilityData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white lg:px-6 px-3 lg:py-12 py-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-50 flex flex-col space-y-4 lg:space-y-8"
            >
              {/* Card Title Area */}
              <div className="flex items-center gap-3 mb-6">
                {item.icon}
                <h4 className="title">{item.title}</h4>
              </div>

              {/* Description */}
              <p>{item.description}</p>

              {/* Bullet Points */}
              <div className="space-y-4">
                {item.points.map((point, pIndex) => (
                  <div key={pIndex} className="text-sm lg:text-base">
                    <span className="font-bold text-[#364153] block sm:inline mr-1">
                      {point.label}:
                    </span>
                    <span className="text-gray-500">{point.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#F0FDF4] border-l-4 border-[#008236] p-5 lg:p-10 mt-6 lg:mt-20 rounded-md space-y-2 lg:space-y-5">
          <p className="italic">
            &quot;Sustainability is not just a policy at Witklip Farm; it is our
            legacy. By balancing 160 years of family tradition with modern
            ecological science, we are ensuring that Witklip remains a thriving,
            green, and productive heart of the Graafwater community.&quot;
          </p>
          <p>— Mr. Burger & Mr. Van Der Berg</p>
        </div>
      </div>
    </section>
  );
}
