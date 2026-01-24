"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn, SignInResponse } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";

// 1. Define Form Schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2. Initialize Form with Types
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 3. Type-safe Submit Handler
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result: SignInResponse | undefined = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Set to false to handle errors manually
      });

      if (result?.error) {
        // Handle specific auth errors (e.g., wrong password)
        console.error("Auth error:", result.error);
        form.setError("root", { message: "Invalid email or password" });
      } else if (result?.ok) {
        // Manual redirect if necessary
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF4EA] p-4 sm:p-6 lg:p-8 relative">
      {/* Exit Button */}
      <button
        type="button"
        className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-red-500 shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => window.history.back()}
      >
        <X size={20} strokeWidth={3} />
      </button>

      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-3">
            <Image
              width={100}
              height={100}
              src="/images/logo.png"
              alt="witklip logo"
              className="h-16 w-auto sm:h-20"
              priority
            />
            <h1 className="text-3xl font-bold text-[#5A8D45] tracking-tight">
              Welcome
            </h1>
          </div>
          <p className="text-gray-500 text-sm md:text-base mt-3 mx-auto">
            Manage your orders, track shipments, and configure products easily.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hello@example.com"
                      className="h-12 border-gray-200 focus-visible:ring-[#5A8D45]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className="h-12 border-gray-200 focus-visible:ring-[#5A8D45] pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between py-2">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onCheckedChange={(checked: boolean) =>
                        field.onChange(checked)
                      }
                      className="border-gray-300 data-[state=checked]:bg-[#5A8D45] data-[state=checked]:border-[#5A8D45]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                )}
              />
              <a
                href="/auth/forgot-password"
                className="text-sm text-[#5A8D45] font-semibold hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Root level error message for Auth failures */}
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#52A454] hover:bg-[#458e47] text-white h-12 rounded-lg text-base font-bold transition-all shadow-md active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
