// Enquiry Status enum
export enum EnquiryStatus {
  NEW = "New",
  IN_PROGRESS = "In Progress",
  FOLLOW_UP_REQUIRED = "Follow-up Required",
  COMPLETED = "Completed",
}

// Product Interest enum
export enum ProductInterest {
  POTATOES = "Potatoes",
  CARROTS = "Carrots",
  LIVESTOCK = "Livestock",
  MULTIPLE_PRODUCT = "Multiple Product",
}

// Priority enum
export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

// Enquiry Type enum
export enum EnquiryType {
  PURCHASE = "Purchase",
  PARTNERSHIP = "Partnership",
  DISTRIBUTION = "Distribution",
  INFORMATION = "Information",
}

// Color mappings
export const statusColorMap: Record<
  EnquiryStatus,
  { bg: string; text: string }
> = {
  [EnquiryStatus.NEW]: { bg: "bg-blue-100", text: "text-blue-700" },
  [EnquiryStatus.IN_PROGRESS]: { bg: "bg-yellow-100", text: "text-yellow-700" },
  [EnquiryStatus.FOLLOW_UP_REQUIRED]: {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  [EnquiryStatus.COMPLETED]: { bg: "bg-green-100", text: "text-green-700" },
};

export const priorityColorMap: Record<Priority, string> = {
  [Priority.HIGH]: "text-red-600",
  [Priority.MEDIUM]: "text-yellow-600",
  [Priority.LOW]: "text-green-600",
};

export const priorityBgColorMap: Record<Priority, string> = {
  [Priority.HIGH]: "bg-red-50",
  [Priority.MEDIUM]: "bg-yellow-50",
  [Priority.LOW]: "bg-green-50",
};
