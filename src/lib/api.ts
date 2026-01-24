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
