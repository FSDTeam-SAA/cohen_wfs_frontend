"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, MoreVertical } from "lucide-react";
import { getAllEnquiries, exportEnquiries } from "@/lib/api";
import { Enquiry } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EnquiryDetailsModal } from "./enquiry-details-modal";

const statusColors: Record<string, { bg: string; text: string }> = {
  New: { bg: "bg-blue-100", text: "text-blue-700" },
  "In Progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Follow-up Required": { bg: "bg-orange-100", text: "text-orange-700" },
  Completed: { bg: "bg-green-100", text: "text-green-700" },
  Archived: { bg: "bg-gray-100", text: "text-gray-700" },
};

const priorityColors: Record<string, { bg: string; text: string }> = {
  High: { bg: "bg-red-100", text: "text-red-700" },
  Medium: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Low: { bg: "bg-green-100", text: "text-green-700" },
};

export function RecentEnquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "enquiries",
      1,
      5,
      searchTerm,
      statusFilter,
      productFilter,
      priorityFilter,
    ],
    queryFn: () =>
      getAllEnquiries(1, 5, {
        searchTerm,
        status: statusFilter === "all" ? "" : statusFilter,
        productInterest: productFilter === "all" ? "" : productFilter,
        priority: priorityFilter === "all" ? "" : priorityFilter,
      }),
  });

  const handleOpenModal = (enquiryId: string) => {
    setSelectedEnquiryId(enquiryId);
    setModalOpen(true);
  };

  const exportToCSV = async () => {
    try {
      const blob = await exportEnquiries();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `recent-enquiries-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      // You might want to add a toast notification here
    }
  };

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

  const enquiries: Enquiry[] = data?.data?.data || [];
  const totalCount = data?.data?.meta?.total || enquiries.length;

  return (
    <>
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
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by company, contact, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Follow-up Required">
                  Follow-up Required
                </SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="Potatoes">Potatoes</SelectItem>
                <SelectItem value="Carrots">Carrots</SelectItem>
                <SelectItem value="Livestock">Livestock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8">
                      <p className="text-muted-foreground">No enquiries found</p>
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleOpenModal(enquiry._id)}
                    >
                      <td className="py-4 text-sm font-medium">
                        {enquiry.enquiryId}
                      </td>
                      <td className="py-4 text-sm">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-ZA")}
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium">
                            {enquiry.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {enquiry.fullName}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm">{enquiry.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {enquiry.phoneNumber}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{enquiry.productInterest}</td>
                      <td className="py-4 text-sm">{enquiry.enquiryType}</td>
                      <td className="py-4">
                        <Badge
                          className={`${
                            statusColors[enquiry.status]?.bg || "bg-gray-100"
                          } ${
                            statusColors[enquiry.status]?.text || "text-gray-700"
                          } border-0`}
                        >
                          {enquiry.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge
                          className={`${
                            priorityColors[enquiry.priority]?.bg ||
                            "bg-gray-100"
                          } ${
                            priorityColors[enquiry.priority]?.text ||
                            "text-gray-700"
                          } border-0`}
                        >
                          {enquiry.priority}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal(enquiry._id);
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {enquiries.length} of {totalCount} enquiries
          </div>
        </CardContent>
      </Card>

      {/* Enquiry Details Modal */}
      {selectedEnquiryId && (
        <EnquiryDetailsModal
          enquiryId={selectedEnquiryId}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </>
  );
}
