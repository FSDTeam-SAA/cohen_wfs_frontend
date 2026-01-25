"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

export default function HeroHome() {
  // Animation variants for the container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual text/card elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section className="bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat relative z-20">
      <div className="absolute inset-0 bg-[#4AA251] opacity-60 -z-10"></div>
      <motion.div
        className="container mx-auto min-h-[calc(100vh-16rem)] flex flex-col justify-center items-center text-center px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="space-y-2 text-white">
          <motion.h1
            variants={itemVariants}
            className="font-extrabold text-4xl sm:text-5xl lg:text-7xl"
          >
            WITKLIP FARM
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl"
          >
            A Century and a Half of Stewardship
          </motion.h2>
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl"
          >
            160 Years of Agricultural Excellence in Graafwater
          </motion.h2>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-3 mt-6 text-[#5A6C3A]"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}
