import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "WITKLIP Farm",
  description:
    "Manage your orders, track shipments, and configure products easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Topbar />
        <div className="flex h-screen bg-background">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
