"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/api";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";

const enquirySchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  companyName: z.string().min(2, "Company name is required"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  productInterest: z.string().min(2, "Product interest is required"),
  location: z.string().min(1, "Location is required"),
  volumeRequired: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

export default function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      enquiryType: "",
      productInterest: "",
      location: "",
      volumeRequired: "",
      message: "",
    },
  });

  async function onSubmit(values: EnquiryFormValues) {
    setIsSubmitting(true);
    try {
      const response = await submitEnquiry({
        ...values,
        volumeRequired: values.volumeRequired || "",
      });
      if (response.success) {
        toast.success(response.message);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white">
      <div className="">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 md:p-10">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex bg-gray-100 p-1 rounded-md mb-6">
              <Link href="/enquiry">
                <Button
                  variant="ghost"
                  className="bg-white shadow-sm hover:bg-white px-6"
                >
                  Enquiry
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-primary px-6"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
            <h2 className="title font-semibold">Send Us An Enquiry</h2>
            <p>
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          className="bg-primary/5 border-none h-12 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          className="bg-primary/5 border-none h-12 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          className="bg-primary/5 border-none h-12 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Company Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company Name"
                          className="bg-primary/5 border-none h-12 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enquiryType"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Enquiry Type *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-primary/5 border-none h-12! rounded-md cursor-pointer">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Purchase">Purchase</SelectItem>
                          <SelectItem value="Buyer Enquiry">
                            Buyer Enquiry
                          </SelectItem>
                          <SelectItem value="Supplier Enquiry">
                            Supplier Enquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productInterest"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Product Interest *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-primary/5 border-none h-12! rounded-md cursor-pointer">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Potatoes">Potatoes</SelectItem>
                          <SelectItem value="Carrots">Carrots</SelectItem>
                          <SelectItem value="Multiple Product">
                            Multiple Product
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Location *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Location"
                          className="bg-primary/5 border-none h-12 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="volumeRequired"
                  render={({ field }) => (
                    <FormItem className="lg:space-y-1">
                      <FormLabel className="font-medium text-[#1A2E05]">
                        Volume Required *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Volume Required"
                          className="bg-primary/5 border-none h-12 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="lg:space-y-1">
                    <FormLabel className="font-medium text-[#1A2E05]">
                      Message *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Details about your enquiry..."
                        className="bg-primary/5 border-none rounded-md min-h-30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                size={"lg"}
                className="bg-[#4AA251] hover:bg-[#3d8b42] text-white h-14 rounded-md flex items-center gap-4 text-lg"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
