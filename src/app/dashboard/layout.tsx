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
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 md:w-[calc(100vw-108px)] pl-60 pr-5 py-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
