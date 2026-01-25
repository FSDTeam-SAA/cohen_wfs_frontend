import { FileCheck, Award, Building2 } from "lucide-react";

export const CertificationsData = [
  {
    title: "Good Agricultural Practices",
    icon: <FileCheck className="w-8 h-8 text-primary" />,
    description:
      "Our potato and carrot production lines are managed in alignment with Good Agricultural Practices (GAP).",
    points: [
      {
        label: "Food Safety",
        text: "Rigorous controls over chemical residues and microbial contamination",
      },
      {
        label: "Traceability",
        text: "Comprehensive 'Seed-to-Shelf' record-keeping",
      },
      {
        label: "Environmental Integrity",
        text: "Soil and water conservation compliance",
      },
    ],
  },
  {
    title: "B-BBEE Level 2 Accreditation",
    icon: <Award className="w-8 h-8 text-primary" />,
    description:
      "Witklip Farm is a certified Level 2 B-BBEE Contributor, providing a 125% procurement recognition level.",
    points: [
      {
        label: "Verification",
        text: "Annual audits for continuous transformation",
      },
      { label: "Benefit to Partners", text: "Enhanced B-BBEE scorecards" },
      {
        label: "Economic Transformation",
        text: "Meaningful empowerment impact",
      },
    ],
  },
  {
    title: "Industry Affiliations",
    icon: <Building2 className="w-8 h-8 text-primary" />,
    description:
      "We operate under the guidance and standards of South Africa's leading agricultural bodies.",
    points: [
      {
        label: "Potatoes SA",
        text: "Pillars of Progress framework compliance",
      },
      {
        label: "Department of Agriculture (DALRRD)",
        text: "Agricultural Product Standards Act",
      },
      { label: "Land Bank", text: "Supported transformation partnership" },
    ],
  },
];
