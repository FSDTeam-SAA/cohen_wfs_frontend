"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreVertical } from "lucide-react";
import { getAllEnquiries } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors: Record<string, { bg: string; text: string }> = {
  New: { bg: "bg-blue-100", text: "text-blue-700" },
  "In Progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Follow-up Required": { bg: "bg-orange-100", text: "text-orange-700" },
  Completed: { bg: "bg-green-100", text: "text-green-700" },
};

const priorityColors: Record<string, string> = {
  High: "text-red-600",
  Medium: "text-yellow-600",
  Low: "text-green-600",
};

export function RecentEnquiries() {
  const { data, isLoading } = useQuery({
    queryKey: ["enquiries", 1, 5],
    queryFn: () =>
      getAllEnquiries(1, 5, {
        searchTerm: "",
        status: "",
        productInterest: "",
        priority: "",
      }),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading enquiries...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const enquiries = data?.data?.data || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Enquiries</CardTitle>
        <Link href="/dashboard/enquiries">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No enquiries yet
            </p>
          ) : (
            <div className="space-y-3">
              {enquiries.map(
                (enquiry: {
                  _id: string;
                  companyName: string;
                  fullName: string;
                  productInterest: string;
                  status: string;
                  priority: string;
                }) => (
                  <div
                    key={enquiry._id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-sm">
                            {enquiry.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {enquiry.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {enquiry.productInterest}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            statusColors[enquiry.status]?.bg || "bg-gray-100"
                          } ${statusColors[enquiry.status]?.text || "text-gray-700"}`}
                          variant="outline"
                        >
                          {enquiry.status}
                        </Badge>
                        <span
                          className={`text-xs font-semibold ${
                            priorityColors[enquiry.priority] || "text-gray-600"
                          }`}
                        >
                          {enquiry.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/enquiries/${enquiry._id}`}
                        className="p-2 hover:bg-muted rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
