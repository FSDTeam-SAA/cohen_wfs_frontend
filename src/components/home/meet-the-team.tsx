"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TeamData } from "@/data/team.data";

export default function MeetTheTeam() {
  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-24">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline"
          >
            Meet the Team
          </motion.h2>
          <p>The People Behind Witklip Farm&apos;s Success</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4 justify-items-center">
          {TeamData.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white w-full p-10 rounded-2xl shadow-xl border border-gray-50 flex flex-col items-center text-center transition-transform hover:scale-[1.02] duration-300 ${
                index >= 3 ? "lg:translate-x-1/2" : ""
              }`}
            >
              {/* Profile Image Wrapper */}
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 mb-6 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Member Details */}
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-[#364153]">
                  {member.name}
                </h4>
                <p className="text-primary">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
