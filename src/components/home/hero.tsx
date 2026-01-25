import React from "react";

export default function HeroHome() {
  return (
    <section className="bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat relative z-20">
      <div className="absolute inset-0 bg-[#4AA251] opacity-60 -z-10"></div>
      <div className="container mx-auto min-h-[calc(100vh-16rem)] flex flex-col justify-center items-center text-center px-4">
        <div className="space-y-2 text-white">
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl">
            WITKLIP FARM
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl">
            A Century and a Half of Stewardship
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl">
            160 Years of Agricultural Excellence in Graafwater
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-6 text-[#5A6C3A]">
          <div className="w-36 md:w-48 py-5 space-y-2 rounded-md bg-[#FFFFFFCC]">
            <p className="text-sm sm:text-base lg:text-2xl font-medium">
              B-BBEE Level
            </p>
            <p className="text-sm sm:text-base lg:text-xl font-bold">2</p>
          </div>
          <div className="w-36 md:w-48 py-5 space-y-2 rounded-md bg-[#FFFFFFCC]">
            <p className="text-sm sm:text-base lg:text-2xl font-medium">
              Farm Size
            </p>
            <p className="text-sm sm:text-base lg:text-xl font-bold">930ha</p>
          </div>
        </div>
      </div>
    </section>
  );
}
