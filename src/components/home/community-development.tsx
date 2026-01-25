"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WorkforceStats } from "@/data/workforce.data";

export default function CommunityDevelopment() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center lg:mb-16 mb-8 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline"
          >
            Community Development & Economic Impact
          </motion.h2>
          <p className="max-w-4xl mx-auto">
            At Witklip Farm, we believe that true agricultural success is
            measured by the prosperity of the people who work the land. Our
            operation is a vital source of livelihood in the Cederberg
            municipality, and we take our role as a regional employer seriously.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:mb-16 mb-8">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/community.png"
              alt="Witklip Farm Workforce"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Right Column: Content */}
          <div className="space-y-4">
            <h3 className="title">Building a Sustainable Workforce</h3>
            <p>
              We provide a balanced employment model that offers both long-term
              career stability and broad-scale seasonal opportunity:
            </p>

            <div className="lg:space-y-8 space-y-4">
              {WorkforceStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1">{stat.icon}</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#364153] text-lg">
                      {stat.title}
                    </h4>
                    <p>{stat.description}</p>
                    {stat.subPoints && (
                      <ul className="list-disc list-inside text-gray-500 text-sm space-y-1 ml-1">
                        {stat.subPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F0FDF4] border-l-4 border-[#008236] p-5 lg:p-10 mt-6 lg:mt-20 rounded-md space-y-2 lg:space-y-5"
        >
          <p>
            &quot;Our workforce is our greatest asset. By providing stable jobs
            for our 12 permanent team members and creating over 100 seasonal
            opportunities, we aren&apos;t just harvesting potatoes and
            carrots—we are growing the local economy of Graafwater.&quot;
          </p>
          <p>— Mr. Burger & Mr. Van Der Berg</p>
        </motion.div>
      </div>
    </section>
  );
}
