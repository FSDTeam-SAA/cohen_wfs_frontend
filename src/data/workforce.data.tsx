import { Briefcase, Users, TrendingUp } from "lucide-react";

export const WorkforceStats = [
  {
    title: "12 Permanent Staff Members",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    description:
      "Our core team consists of 12 dedicated professionals who oversee the daily operations, technical management, and long-term stewardship of the farm. These permanent roles provide year-round financial security and specialized skills development for local families.",
  },
  {
    title: "100+ Seasonal Opportunities",
    icon: <Users className="w-6 h-6 text-primary" />,
    description:
      "During our peak planting and harvesting cycles, Witklip Farm scales up to support approximately 100 seasonal workers. This surge in employment provides a critical economic boost to the Graafwater community, offering essential income during the busiest times of the agricultural calendar.",
  },
  {
    title: "Level 2 B-BBEE Impact",
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    description:
      "Our 2025 transition into a Level 2 B-BBEE entity was a deliberate step toward a more inclusive economy.",
    subPoints: [
      "125% Procurement Recognition for partners",
      "Skills Transfer to the next generation",
    ],
  },
];
