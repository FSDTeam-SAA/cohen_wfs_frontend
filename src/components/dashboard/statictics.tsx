"use client";

import { getAdminStats } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StatsCard } from "./stats-card";
import { Info, TrendingUp } from "lucide-react";

export default function Statictics() {
  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getAdminStats(),
    select: (data) => data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Stats data: ", data);

  return (
    <div className="grid grid-cols-4 gap-5">
      <StatsCard
        icon={TrendingUp}
        label="Total Enquiries"
        value={data?.totalEnquiries || 0}
        bgColor="white"
        iconColor="#717182"
      />
      <StatsCard
        icon={Info}
        label="New Enquiries"
        value={data?.newEnquiriesCount || 0}
        trendColor={data?.totalEnquiriesTrendColor}
        bgColor="white"
        iconColor="#717182"
      />
      <StatsCard
        icon={TrendingUp}
        label="Total Enquiries"
        value={data?.totalEnquiries || 0}
        trendColor={data?.totalEnquiriesTrendColor}
        bgColor="white"
        iconColor="#717182"
      />
      <StatsCard
        icon={TrendingUp}
        label="Total Enquiries"
        value={data?.totalEnquiries || 0}
        trendColor={data?.totalEnquiriesTrendColor}
        bgColor="white"
        iconColor="#717182"
      />
    </div>
  );
}
