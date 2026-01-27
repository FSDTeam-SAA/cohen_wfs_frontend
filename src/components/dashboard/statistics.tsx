"use client";

import { getAdminStats } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StatsCard } from "./stats-card";
import { Inbox, Clock, TrendingUp, AlertTriangle } from "lucide-react";

export default function Statistics() {
  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getAdminStats(),
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-gray-100 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      <StatsCard
        icon={Inbox}
        label="Total Enquiries"
        value={data?.totalEnquiries || 0}
        subtitle="All time enquiries"
        trend="+12% from last month"
        trendColor="green"
        bgColor="bg-white"
        iconColor="text-gray-500"
      />
      <StatsCard
        icon={Clock}
        label="New Enquiries"
        value={data?.newEnquiriesCount || 0}
        subtitle="Requires attention"
        bgColor="bg-white"
        iconColor="text-gray-500"
      />
      <StatsCard
        icon={TrendingUp}
        label="In Progress"
        value={data?.inProgressCount || 0}
        subtitle="Currently being handled"
        bgColor="bg-white"
        iconColor="text-gray-500"
      />
      <StatsCard
        icon={AlertTriangle}
        label="High Priority"
        value={data?.highPriorityCount || 0}
        subtitle="Urgent enquiries"
        bgColor="bg-white"
        iconColor="text-gray-500"
      />
    </div>
  );
}
