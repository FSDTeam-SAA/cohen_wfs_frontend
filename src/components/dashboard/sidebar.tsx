"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getAllEnquiries } from "@/lib/api";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "All Enquiries",
    icon: FileText,
    href: "/dashboard/enquiries",
    showBadge: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ["enquiries-count"],
    queryFn: () =>
      getAllEnquiries(1, 1, {
        searchTerm: "",
        status: "",
        productInterest: "",
        priority: "",
      }),
  });

  const totalEnquiries = data?.data?.meta?.total || 0;

  return (
    <aside className="fixed left-0 h-[calc(100vh-96px)] flex flex-col w-56 border-r border-border bg-background">
      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-green-50 text-green-600 font-semibold"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.showBadge && totalEnquiries > 0 && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalEnquiries}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Compliance Notice */}
      <div className="border-t border-border p-4">
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
          <p className="text-xs text-green-700 font-semibold">
            POPIA Compliant
          </p>
          <p className="text-xs text-green-600 mt-1">
            All data is securely stored and audit-ready
          </p>
        </div>
      </div>
    </aside>
  );
}
