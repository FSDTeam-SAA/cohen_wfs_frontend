"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleEnquiry, updateEnquiry } from "@/lib/api";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  MessageSquare,
  Package,
} from "lucide-react";
import { toast } from "sonner";

interface EnquiryDetailsModalProps {
  enquiryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusOptions = [
  "New",
  "In Progress",
  "Follow-up Required",
  "Completed",
  "Archived",
];
const priorityOptions = ["High", "Medium", "Low"];

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

interface EnquiryData {
  _id: string;
  enquiryId: string;
  companyName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  productInterest: string;
  enquiryType: string;
  volumeRequired: string;
  message: string;
  status: string;
  priority: string;
  bbbeeLevel: string;
  complianceDocuments: string;
  createdAt: string;
  updatedAt: string;
}

export function EnquiryDetailsModal({
  enquiryId,
  open,
  onOpenChange,
}: EnquiryDetailsModalProps) {
  const queryClient = useQueryClient();
  const [localStatus, setLocalStatus] = useState<string>("");
  const [localPriority, setLocalPriority] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["enquiry", enquiryId],
    queryFn: () => getSingleEnquiry(enquiryId),
    enabled: open && !!enquiryId,
  });

  const enquiry: EnquiryData | undefined = data?.data || data;

  // Reset local state when enquiry data changes
  useEffect(() => {
    if (enquiry) {
      setLocalStatus(enquiry.status);
      setLocalPriority(enquiry.priority);
    }
  }, [enquiry]);

  const mutation = useMutation({
    mutationFn: () => updateEnquiry(enquiryId, localStatus, localPriority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiry", enquiryId] });
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
      toast.success("Enquiry updated successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update");
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!enquiry && !isLoading) return null;

  const hasChanges =
    enquiry &&
    (localStatus !== enquiry.status || localPriority !== enquiry.priority);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl">Enquiry Details</DialogTitle>
          {enquiry && (
            <p className="text-sm text-muted-foreground">
              Reference: {enquiry.enquiryId}
            </p>
          )}
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading enquiry details...</p>
          </div>
        ) : (
          enquiry && (
            <div className="space-y-6">
              {/* Tags Row */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`${
                    statusColors[enquiry.status]?.bg || "bg-gray-100"
                  } ${
                    statusColors[enquiry.status]?.text || "text-gray-700"
                  } border-0`}
                >
                  {enquiry.status}
                </Badge>
                <Badge
                  className={`${
                    priorityColors[enquiry.priority]?.bg || "bg-gray-100"
                  } ${
                    priorityColors[enquiry.priority]?.text || "text-gray-700"
                  } border-0`}
                >
                  {enquiry.priority} Priority
                </Badge>
                <Badge variant="outline">{enquiry.productInterest}</Badge>
                <Badge variant="outline">{enquiry.enquiryType}</Badge>
              </div>

              {/* Company Information */}
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-green-600" />
                  <h3 className="font-semibold text-base">
                    Company Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Company Name
                    </label>
                    <p className="font-medium mt-1">{enquiry.companyName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Contact Person
                    </label>
                    <p className="font-medium mt-1">{enquiry.fullName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-muted-foreground">⚖️</span>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        BBBEE Level
                      </label>
                      <p className="font-medium mt-1">
                        {enquiry.bbbeeLevel || "Level 2"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-muted-foreground">📄</span>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Compliance Documents
                      </label>
                      <p className="font-medium mt-1">
                        {enquiry.complianceDocuments || "Submitted"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="font-semibold text-base">Contact Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-green-600 hover:underline text-sm"
                    >
                      {enquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`tel:${enquiry.phoneNumber}`}
                      className="text-sm"
                    >
                      {enquiry.phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{enquiry.location}</span>
                  </div>
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <h3 className="font-semibold text-base">Enquiry Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Volume Required
                    </label>
                    <p className="font-medium mt-1">
                      {enquiry.volumeRequired || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Message
                    </label>
                    <div className="mt-2 p-4 bg-muted rounded-lg border">
                      <p className="text-sm">{enquiry.message}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <h3 className="font-semibold text-base">Timeline</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Date Received
                    </label>
                    <p className="font-medium mt-1">
                      {formatDate(enquiry.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Last Updated
                    </label>
                    <p className="font-medium mt-1">
                      {formatDate(enquiry.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Update Status/Priority */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Update Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Status
                    </label>
                    <Select value={localStatus} onValueChange={setLocalStatus}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Priority
                    </label>
                    <Select
                      value={localPriority}
                      onValueChange={setLocalPriority}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {hasChanges && (
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
