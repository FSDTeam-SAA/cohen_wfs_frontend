"use client";

import React from "react";
import { motion } from "framer-motion";
import { WelfareData } from "@/data/welfare.data";

export default function FarmingStandards() {
  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-24">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline"
          >
            Farming Standards and Welfare
          </motion.h2>
          <div className="space-y-2">
            <h3 className="subheading">Commitment to Standards & Ethics</h3>
            <p className="max-w-4xl mx-auto">
              At Witklip Farm, our 160-year legacy is built on the principle of
              &quot;doing things right.&quot; We adhere to the highest South
              African and international agricultural benchmarks to ensure food
              safety, environmental health, and the compassionate treatment of
              our livestock.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-4">
          {WelfareData.map((item, index) => (
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
      </div>
    </section>
  );
}
