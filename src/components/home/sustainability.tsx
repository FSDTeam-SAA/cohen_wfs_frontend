"use client";

import React from "react";
import { SustainabilityData } from "@/data/sustainability.data";
import Image from "next/image";
import ReusableInfo from "../shared/info-reusable";

export default function Sustainability() {
  return (
    <section id="sustainability" className="bg-[#F8FAF8] py-16 lg:py-24">
      <div className="flex justify-center lg:mb-12 mb-4">
        <Image
          src={"/images/sustainability.png"}
          alt="Sustainability"
          width={700}
          height={400}
        />
      </div>
      <ReusableInfo
        title="Sustainability & Environmental Practices"
        subtitle="Our Commitment to the Land: Sustainability in Action"
        description="At Witklip Farm, we recognize that our 160-year history is a direct result of the land's health. As custodians of over 930 hectares in the Graafwater region, we are committed to farming practices that protect our unique West Coast environment for another century to come."
        data={SustainabilityData}
      />
    </section>
  );
}
