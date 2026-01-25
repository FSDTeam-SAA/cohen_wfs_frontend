"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { usePathname } from "next/navigation";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const pathname = usePathname();

  const isHidNavFooter = pathname.startsWith("/auth/");

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {!isHidNavFooter && <Navbar />}
        {children}
        {!isHidNavFooter && <Footer />}
        <Toaster position="top-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}
