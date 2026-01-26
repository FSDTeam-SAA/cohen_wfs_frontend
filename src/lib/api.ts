import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const TOKEN = session?.user?.accessToken;
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth API calls
export async function forgotPassword(email: string) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch approved properties",
    );
  }
}

export async function verifyOTP(email: string, otp: string) {
  try {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
}

export async function resetPassword(
  newPassword: string,
  confirmPassword: string,
  token: string,
) {
  try {
    const response = await api.post("/auth/reset-password", {
      newPassword,
      confirmPassword,
      accessToken: token,
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to reset password",
    );
  }
}

export async function resendOTP(email: string) {
  try {
    const response = await api.post("/auth/resend-otp", { email });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to resend OTP");
  }
}

// Admin API calls
export async function getAdminStats() {
  try {
    const response = await api.get("/enquiry/stats");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch admin stats",
    );
  }
}

export interface Enquiry {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  enquiryType: string;
  productInterest: string;
  location: string;
  volumeRequired: string;
  message: string;
  status: "New" | "In Progress" | "Follow-up Required" | "Completed";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  updatedAt: string;
  enquiryId: string;
}

export interface EnquiriesResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Enquiry[];
}

export async function getAllEnquiries(
  page: number,
  limit: number,
  query: {
    searchTerm?: string;
    status?: string;
    productInterest?: string;
    priority?: string;
  },
): Promise<EnquiriesResponse> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (query.searchTerm) params.append("searchTerm", query.searchTerm);
    if (query.status) params.append("status", query.status);
    if (query.productInterest)
      params.append("productInterest", query.productInterest);
    if (query.priority) params.append("priority", query.priority);

    const response = await api.get<EnquiriesResponse>(
      `/enquiry/get-all-enquiries?${params.toString()}`,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch enquiries");
  }
}

export async function getSingleEnquiry(enquiryId: string) {
  try {
    const response = await api.get(`/enquiry/${enquiryId}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch enquiry details",
    );
  }
}

export async function updateEnquiry(
  enquiryId: string,
  status?: string,
  priority?: string,
) {
  try {
    const response = await api.patch(`/enquiry/update-status/${enquiryId}`, {
      status,
      priority,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update enquiry status",
    );
  }
}
