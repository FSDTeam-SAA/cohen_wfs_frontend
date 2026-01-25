import CommunityDevelopment from "@/components/home/community-development";
import CorpProduction from "@/components/home/corp-production";
import AgroEcologicalPotential from "@/components/home/expansion";
import FarmingStandards from "@/components/home/farming-standards";
import HeritageSection from "@/components/home/heritage";
import HeroHome from "@/components/home/hero";
import LiveStock from "@/components/home/livestock";
import PartnershipSection from "@/components/home/partnership";
import Sustainability from "@/components/home/sustainability";
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
      <PartnershipSection />
      <CorpProduction />
      <LiveStock />
      <AgroEcologicalPotential />
      <FarmingStandards />
      <Sustainability />
      <CommunityDevelopment />
    </main>
  );
}
