"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/api";
import { toast } from "sonner";

// 1. Define Form Schema with Validation
const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetValues = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get OTP token from previous step
  const token = searchParams.get("token") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetValues) => {
    if (!token) {
      form.setError("root", { message: "Invalid session. Please try again." });
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(
        data.password,
        data.confirmPassword,
        token,
      );
      toast.success(response.message || "Password reset successfully");
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      form.setError("root", {
        message: error.message || "Failed to reset password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF4EA] p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-50">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <Image
              width={120}
              height={60}
              src="/images/logo.png"
              alt="witklip logo"
              className="h-20 w-auto"
              priority
            />
            <h1 className="text-3xl font-bold text-[#5A8D45]">
              Create a New Password
            </h1>
          </div>
          <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed mx-auto">
            Set a strong password to secure your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1A1A] font-bold text-sm">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? "text" : "password"}
                        placeholder="********"
                        className="h-12 border-gray-200 focus-visible:ring-[#5A8D45] pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1A1A] font-bold text-sm">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="********"
                        className="h-12 border-gray-200 focus-visible:ring-[#5A8D45] pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message for root failures */}
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive text-center">
                {form.formState.errors.root.message}
              </p>
            )}

            {/* Save Changes Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#52A454] hover:bg-[#458e47] text-white h-12 rounded-lg text-base font-medium transition-all shadow-md active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  <Suspense>
    <ResetPassword />
  </Suspense>;
};

export default ResetPasswordPage;
