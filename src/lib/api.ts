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

export async function getAllEnquiries(
  page: number,
  limit: number,
  query: {
    searchTerm?: string;
    status?: string;
    productInterest?: string;
    priority?: string;
  },
) {
  try {
    const response = await api.get("/enquiry/get-all-enquiries", {
      params: {
        page,
        limit,
        searchTerm: query.searchTerm || undefined,
        status: query.status || undefined,
        product: query.productInterest || undefined,
        priority: query.priority || undefined,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch enquiries",
      );
    }
    throw new Error("An unexpected error occurred while fetching enquiries");
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
    const response = await api.patch(`/enquiry/${enquiryId}/status`, {
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

export async function exportEnquiries() {
  try {
    const response = await api.get("/enquiry/export", {
      responseType: "blob",
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to export enquiries",
    );
  }
}

// User enquiry API calls
export async function submitEnquiry(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  enquiryType: string;
  location: string;
  volumeRequired: string;
  message: string;
  productInterest: string;
}) {
  try {
    const response = await api.post("/enquiry/us", data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to submit enquiry",
    );
  }
}
