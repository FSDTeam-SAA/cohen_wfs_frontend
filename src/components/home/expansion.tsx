"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExpansionOverview, PotentialProducts } from "@/data/expansion.data";

export default function AgroEcologicalPotential() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="lg:space-y-12 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="headline mb-6 text-center"
          >
            Agro-Ecological Potential & Future Expansion
          </motion.h2>
          <p>
            While our current focus remains on our core potato, carrot, and
            livestock operations, the unique soil profile and Mediterranean
            climate of the West Coast provide Witklip Farm with significant
            potential for further diversification.
          </p>
          <p>
            Our technical soil assessments indicate high suitability for a wide
            range of high-value agrarian products, including:
          </p>
        </div>

        {/* Detailed Categories List */}
        <div className="grid grid-cols-1 gap-y-2 my-4 lg:my-8 pl-3 lg:pl-10">
          {PotentialProducts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col lg:flex-row items-baseline space-x-2"
            >
              <span className="font-bold text-[#364153] whitespace-nowrap">
                {item.category}:
              </span>
              <span className="text-gray-600 text-sm lg:text-base">
                {item.description}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mb-12">
          This inherent land versatility allows us to remain agile, responding
          to global market trends and ensuring the long-term commercial
          sustainability of the estate.
        </p>

        {/* Potential Expansion Overview Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F9FAFB] rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-50 text-center">
            <h3 className="title">Potential Expansion Overview</h3>
          </div>

          <div className="overflow-x-auto px-6 pb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="py-4 font-bold text-[#364153] text-xs md:text-base">
                    Potential Product
                  </th>
                  <th className="py-4 font-bold text-[#364153] text-xs md:text-base">
                    Soil Suitability
                  </th>
                  <th className="py-4 font-bold text-[#364153] text-xs md:text-base">
                    Market Focus
                  </th>
                </tr>
              </thead>
              <tbody>
                {ExpansionOverview.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-6 text-gray-700 font-medium text-xs md:text-base">
                      {row.product}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] md:text-base font-bold uppercase tracking-wider ${row.color}`}
                      >
                        {row.suitability}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600 text-xs md:text-base">
                      {row.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
