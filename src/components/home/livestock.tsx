import Image from "next/image";
import React from "react";

export default function LiveStock() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-8 gap-4 bg-[#F9FAFB] shadow-xl rounded-md">
          <div className="relative w-full aspect-4/3 overflow-hidden rounded-l-md">
            <Image
              src={"/images/livestock.png"}
              alt={"Livestock"}
              fill
              className="object-cover rounded-l-md transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="space-y-2 lg:space-y-8 rounded-l-md p-4">
            <h2 className="headline mb-2">Livestock</h2>
            <h5 className="subheading">Nurturing Quality from Farm to Table</h5>
            <p>
              Witklip Farm is home to a significant and well-managed livestock
              division, specializing in the breeding of rare Merino sheep.
            </p>
            <p>
              Our large-scale flock is a core component of our diversified
              farming model, contributing to the farm&apos;s circular economy
              and sustainable agricultural practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
