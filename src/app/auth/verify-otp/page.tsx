"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Timer, X } from "lucide-react";

// Shadcn UI Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

// API Import
import { verifyOTP } from "@/lib/api";

const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // Get email from params

  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 second timer based on your image

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { pin: "" },
  });

  const onSubmit = async (data: OtpFormValues) => {
    if (!email) {
      form.setError("pin", {
        message: "Email is missing. Please restart the process.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyOTP(email, data.pin);
      router.push(`/reset-password?token=${encodeURIComponent(res.token)}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      form.setError("pin", { message: error.message || "Invalid code" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF4EA] p-4 sm:p-6 lg:p-8">
      {/* Exit Button */}
      <button
        type="button"
        className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-red-500 shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => window.history.back()}
      >
        <X size={20} strokeWidth={3} />
      </button>
      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-xl w-full max-w-xl border border-gray-50">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <Image
              width={120}
              height={60}
              src="/images/logo.png"
              alt="witklip logo"
              className="h-12 w-auto"
              priority
            />
            <h1 className="text-3xl font-bold text-[#5A8D45]">
              Verify Your Account
            </h1>
          </div>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-[320px] mx-auto">
            Enter the 6-digit code sent to your email to continue.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className="gap-2 sm:gap-4"
                    >
                      <InputOTPGroup className="gap-2 sm:gap-3">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-10 h-12 sm:w-14 sm:h-16 text-xl font-bold border-gray-200 rounded-lg data-[active=true]:border-[#5A8D45] data-[active=true]:ring-1 data-[active=true]:ring-[#5A8D45]"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timer and Resend Row */}
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center text-gray-500 text-sm font-medium">
                <Timer size={18} className="mr-2" />
                {`00:${timeLeft.toString().padStart(2, "0")}`}
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Didn&apos;t get a code? </span>
                <button
                  type="button"
                  disabled={timeLeft > 0}
                  className="text-[#5A8D45] font-bold hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  Resend
                </button>
              </div>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#52A454] hover:bg-[#458e47] text-white h-12 rounded-lg text-lg font-medium transition-all shadow-md active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
