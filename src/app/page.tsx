import HeritageSection from "@/components/home/heritage";
import HeroHome from "@/components/home/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WITKLIP FARM | Home",
  description: "A Century and a Half of Stewardship",
};

export default function Home() {
  return (
    <main>
      <HeroHome />
      <HeritageSection />
    </main>
  );
}
