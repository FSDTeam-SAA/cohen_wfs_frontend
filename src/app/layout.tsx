import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
