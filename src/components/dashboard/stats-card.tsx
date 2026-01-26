import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  trend?: string;
  trendColor?: "green" | "red";
  bgColor?: string;
  iconColor?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendColor = "green",
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: StatsCardProps) {
  return (
    <Card className={bgColor}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <p
                className={`text-xs mt-2 ${
                  trendColor === "green" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
