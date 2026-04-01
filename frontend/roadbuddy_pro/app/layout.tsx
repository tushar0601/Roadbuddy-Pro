import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { SerwistProvider } from "./serwist";

export const metadata: Metadata = {
  applicationName: "RoadBuddy",
  title: "RoadBuddy",
  description: "QR-based vehicle notification platform",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RoadBuddy",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <SerwistProvider swUrl="/serwist/sw.js">
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}