"use client";

import { getAdminStats } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductStat {
  product: string;
  count: number;
}

export default function ProductTypeCards() {
  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getAdminStats(),
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Enquiries by Product Type</h2>
        <div className="grid grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-100 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Use productStats from the stats API
  const productStats: ProductStat[] = data?.productStats || [];

  // Sort by count descending and take top 3
  const topProducts = productStats.sort((a, b) => b.count - a.count).slice(0, 3);

  const productColors: Record<string, string> = {
    Potatoes: "border-l-green-500",
    Carrots: "border-l-orange-500",
    Livestock: "border-l-amber-600",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Enquiries by Product Type</h2>
      <div className="grid grid-cols-3 gap-5">
        {topProducts.map((product) => (
          <Card
            key={product.product}
            className={`border-l-4 ${
              productColors[product.product] || "border-l-gray-500"
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                {product.product}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {product.count}
              </p>
              <p className="text-xs text-muted-foreground">enquiries</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
