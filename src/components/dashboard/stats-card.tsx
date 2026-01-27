"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  subtitle?: string;
  trend?: string;
  trendColor?: "green" | "red";
  bgColor?: string;
  iconColor?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  trendColor = "green",
  bgColor = "bg-white",
  iconColor = "text-gray-500",
}: StatsCardProps) {
  return (
    <Card className={`${bgColor} border border-gray-200`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <p
                className={`text-xs mt-1 ${
                  trendColor === "green" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend}
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-gray-50">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
