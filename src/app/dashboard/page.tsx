import Statistics from "@/components/dashboard/statistics";
import ProductTypeCards from "@/components/dashboard/product-type-cards";
import { RecentEnquiries } from "@/components/dashboard/recent-enquiries";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your agricultural business management system
        </p>
      </div>

      {/* Stats Cards */}
      <Statistics />

      {/* Enquiries by Product Type */}
      <ProductTypeCards />

      {/* Recent Enquiries Table */}
      <RecentEnquiries />
    </div>
  );
}
