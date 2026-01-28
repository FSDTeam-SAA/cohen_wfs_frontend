import Image from "next/image";
import React from "react";

export default function LucerneProduction() {
  return (
    <section className="bg-white py-16 lg:py-24" id="livestock">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-8 gap-4 bg-[#F9FAFB] shadow-xl rounded-md">
          <div className="space-y-2 lg:space-y-8 rounded-l-md p-4">
            <h2 className="headline mb-2 lg:text-4xl">
              Sustainable Lucerne Cultivation
            </h2>
            <h5 className="subheading">
              Precision Agriculture and Soil Management
            </h5>
            <p>
              At Witklip Farm, our lucerne production is a cornerstone of our
              commitment to agricultural excellence.
            </p>
            <p>
              Known for its high nutritional value and deep-rooting
              capabilities, our lucerne is managed with the same precision as
              our elite sheep genetics. This crop serves a dual purpose: it acts
              as a high-protein feed source that ensures the health and vitality
              of our flock, and it functions as a vital soil-builder, naturally
              fixing nitrogen to enhance land fertility. By maintaining our own
              lucerne stands, we guarantee a consistent, premium forage supply
              that supports both our farm&apos;s productivity and its long-term
              ecological balance.
            </p>
          </div>
          <div className="relative w-full aspect-4/3 overflow-hidden lg:rounded-r-md">
            <Image
              src={"/images/corp3.jpg"}
              alt={"Livestock"}
              fill
              className="object-cover lg:rounded-r-md transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
