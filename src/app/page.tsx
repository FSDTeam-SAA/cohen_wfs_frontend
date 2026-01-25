import CommunityDevelopment from "@/components/home/community-development";
import CorpProduction from "@/components/home/corp-production";
import AgroEcologicalPotential from "@/components/home/expansion";
import HeritageSection from "@/components/home/heritage";
import HeroHome from "@/components/home/hero";
import LiveStock from "@/components/home/livestock";
import MeetTheTeam from "@/components/home/meet-the-team";
import PartnershipSection from "@/components/home/partnership";
import Sustainability from "@/components/home/sustainability";
import ReusableInfo from "@/components/shared/info-reusable";
import { CertificationsData } from "@/data/certifications.data";
import { WelfareData } from "@/data/welfare.data";
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
      <section className="bg-[#F8FAF8] py-16 lg:py-24">
        <ReusableInfo
          title="Farming Standards and Welfare"
          subtitle="Commitment to Standards & Ethics"
          description='At Witklip Farm, our 160-year legacy is built on the principle of
              "doing things right." We adhere to the highest South
              African and international agricultural benchmarks to ensure food
              safety, environmental health, and the compassionate treatment of
              our livestock.'
          data={WelfareData}
        />
      </section>
      <Sustainability />
      <CommunityDevelopment />
      <section className="bg-[#F8FAF8] py-16 lg:py-24">
        <ReusableInfo
          title="Certifications & Industry Compliance"
          subtitle="Quality is Not a Promise It is a Verified Standard"
          description="Our operations are governed by strict adherence to South African agricultural regulations and international best practices, ensuring that every harvest is safe, traceable, and ethical."
          data={CertificationsData}
        />
      </section>
      <MeetTheTeam />
    </main>
  );
}
