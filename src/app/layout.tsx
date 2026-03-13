import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { EmergencyButton } from "@/components/ui/EmergencyButton";
import { Chatbot } from "@/components/ui/Chatbot";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LET'S DRIVE – One Stop Travel Solution",
  description: "Experience premium car rental with LET'S DRIVE. Modern, fast, and reliable travel solution for your next adventure.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand-charcoal text-white`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <EmergencyButton />
          <Chatbot />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
