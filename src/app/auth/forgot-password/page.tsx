"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

// Shadcn UI Imports
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

// API Import
import { forgotPassword } from "@/lib/api"; // Adjust the path as per your project structure
import { toast } from "sonner";
import Link from "next/link";

// 1. Define Form Schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. Initialize Form
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // 3. Form Submit Handler
  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);
      toast.success(res.message || "Verification code sent to your email");
      router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      form.setError("email", {
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF4EA] p-4 sm:p-6 lg:p-8 relative">
      {/* Exit Button */}
      <Link href="/">
        <button
          type="button"
          className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-red-500 shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <X size={20} strokeWidth={3} />
        </button>
      </Link>
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-2xl border border-gray-50">
        <div className="text-center mb-8">
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
              Reset Your Password
            </h1>
          </div>
          <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed mx-auto">
            Enter your email address and we&apos;ll send you code to reset your
            password.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1A1A] font-bold text-sm">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hello@example.com"
                      className="h-12 border-gray-200 focus-visible:ring-[#5A8D45] rounded-md placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#52A454] hover:bg-[#458e47] text-white h-12 rounded-lg text-base font-medium transition-all shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
