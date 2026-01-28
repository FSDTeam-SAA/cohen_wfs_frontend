"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductionData } from "@/data/corp.data";

export default function CorpProduction() {
  return (
    <section id="operations" className="bg-[#F9FBF9] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-5 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline mb-2"
          >
            Crops Production
          </motion.h2>
          <h5 className="subheading">Excellence in Every Harvest</h5>
        </div>

        {/* Production Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {ProductionData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-primary/5 border border-gray-100 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-4/2 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="p-4 lg:p-8 grow space-y-2 lg:space-y-4">
                <h3 className="title">{item.title}</h3>
                <h4 className="subheading">{item.subtitle}</h4>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm lg:text-base">
                  <p>{item.description}</p>
                  <p>{item.extraInfo}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
