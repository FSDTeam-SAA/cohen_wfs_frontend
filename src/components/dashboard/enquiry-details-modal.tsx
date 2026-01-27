"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleEnquiry, updateEnquiry } from "@/lib/api";
import { useState } from "react";
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
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

interface EnquiryDetailsModalProps {
  enquiryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusOptions = ["New", "In Progress", "Follow-up Required", "Completed"];
const priorityOptions = ["High", "Medium", "Low"];

const statusColors: Record<string, { bg: string; text: string }> = {
  New: { bg: "bg-blue-100", text: "text-blue-700" },
  "In Progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Follow-up Required": { bg: "bg-orange-100", text: "text-orange-700" },
  Completed: { bg: "bg-green-100", text: "text-green-700" },
};

const priorityColors: Record<string, string> = {
  High: "text-red-600 bg-red-50",
  Medium: "text-yellow-600 bg-yellow-50",
  Low: "text-green-600 bg-green-50",
};

export function EnquiryDetailsModal({
  enquiryId,
  open,
  onOpenChange,
}: EnquiryDetailsModalProps) {
  const queryClient = useQueryClient();
  const [localStatus, setLocalStatus] = useState<string>("");
  const [localPriority, setLocalPriority] = useState<string>("");

  const { data: enquiry, isLoading } = useQuery({
    queryKey: ["enquiry", enquiryId],
    queryFn: () => getSingleEnquiry(enquiryId),
    enabled: open && !!enquiryId,
  });

  const mutation = useMutation({
    mutationFn: () =>
      updateEnquiry(
        enquiryId,
        localStatus || undefined,
        localPriority || undefined,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiry", enquiryId] });
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("Enquiry updated successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update");
    },
  });

  if (!enquiry && !isLoading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enquiry Details - {enquiry?.enquiryId}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading enquiry details...</p>
          </div>
        ) : (
          enquiry && (
            <div className="space-y-6">
              {/* Status and Priority Section */}
              <div className="space-y-4 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${
                      statusColors[enquiry.status]?.bg || "bg-gray-100"
                    } ${statusColors[enquiry.status]?.text || "text-gray-700"}`}
                    variant="outline"
                  >
                    {enquiry.status}
                  </Badge>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      priorityColors[enquiry.priority] || "text-gray-600"
                    }`}
                  >
                    {enquiry.priority}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Status
                    </label>
                    <Select
                      value={localStatus || enquiry.status}
                      onValueChange={setLocalStatus}
                    >
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
                    <label className="text-sm font-semibold text-muted-foreground">
                      Priority
                    </label>
                    <Select
                      value={localPriority || enquiry.priority}
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

              {/* Company Information */}
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="font-semibold text-base">Company Information</h3>
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
              </div>

              {/* Contact Details */}
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="font-semibold text-base">Contact Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {enquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`tel:${enquiry.phoneNumber}`}
                      className="text-blue-600 hover:underline"
                    >
                      {enquiry.phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{enquiry.location}</span>
                  </div>
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="font-semibold text-base">Enquiry Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Product Interest
                    </label>
                    <p className="font-medium mt-1">
                      {enquiry.productInterest}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Type
                    </label>
                    <p className="font-medium mt-1">{enquiry.enquiryType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Volume Required
                    </label>
                    <p className="font-medium mt-1">{enquiry.volumeRequired}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3 border-b border-border pb-4">
                <h3 className="font-semibold text-base">Message</h3>
                <p className="text-sm bg-muted p-3 rounded-lg">
                  {enquiry.message}
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Date Received
                      </label>
                      <p className="font-medium">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Last Updated
                      </label>
                      <p className="font-medium">
                        {new Date(enquiry.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
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
          {(localStatus !== enquiry?.status ||
            localPriority !== enquiry?.priority) && (
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
