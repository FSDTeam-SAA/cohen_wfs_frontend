import { Droplets, Leaf, TrendingDown } from "lucide-react";

export const SustainabilityData = [
  {
    title: "Water Stewardship",
    icon: <Droplets className="w-8 h-8 text-blue-500" />,
    description:
      "In the semi-arid climate of the Western Cape, water is our most precious resource.",
    points: [
      {
        label: "Precision Irrigation",
        text: "Advanced technology for efficient water use",
      },
      {
        label: "Aquifer Protection",
        text: "Regular monitoring of water sources",
      },
      { label: "Natural Balance", text: "Preserving the local water table" },
    ],
  },
  {
    title: "Soil Regeneration",
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    description: "We do not just use the soil; we replenish it.",
    points: [
      { label: "Crop Rotation", text: "3-to-5-year cycles break pest cycles" },
      {
        label: "Natural Fertilization",
        text: "Merino flock returns nutrients",
      },
      {
        label: "Indigenous Preservation",
        text: "Protected West Coast veld areas",
      },
    ],
  },
  {
    title: "Minimal Footprint",
    icon: <TrendingDown className="w-8 h-8 text-emerald-600" />,
    description: "Maximum yield with a minimal environmental footprint.",
    points: [
      { label: "IPM", text: "Biological controls over synthetic chemicals" },
      {
        label: "Energy Efficiency",
        text: "Constant auditing and streamlining",
      },
      { label: "Carbon Reduction", text: "Reduced processing footprint" },
    ],
  },
];
