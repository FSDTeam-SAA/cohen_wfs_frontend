import { BadgeCheck, Heart, ShieldCheck } from "lucide-react";

export const WelfareData = [
  {
    title: "Agricultural Excellence",
    icon: <BadgeCheck className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />,
    description:
      "We follow Good Agricultural Practices (GAP) to ensure that every potato, carrot, and grain leaving our farm is safe, nutritious, and sustainably grown.",
    points: [
      { label: "Traceability", text: "Every harvest is fully traceable" },
      {
        label: "IPM",
        text: "Integrated Pest Management with biological controls",
      },
      { label: "Soil Health", text: "Continuous monitoring and testing" },
    ],
  },
  {
    title: "Animal Welfare",
    icon: <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />,
    description:
      "Our Merino sheep are more than just a commodity; they are a vital part of our farm's living ecosystem.",
    points: [
      {
        label: "Free-Range Grazing",
        text: "Hundreds of hectares of open veld",
      },
      {
        label: "Five Freedoms",
        text: "International animal welfare standards",
      },
      {
        label: "Expert Husbandry",
        text: "Low-stress handling and veterinary care",
      },
    ],
  },
  {
    title: "Compliance & Certification",
    icon: <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />,
    description: "Witklip Farm operates in full alignment with:",
    points: [
      { label: "Potatoes SA", text: "Industry's highest production standards" },
      { label: "Department of Agriculture", text: "National requirements" },
      { label: "B-BBEE Level 2", text: "Social ethics and transformation" },
    ],
  },
];
