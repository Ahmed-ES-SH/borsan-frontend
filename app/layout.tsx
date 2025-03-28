import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./_components/_website/ClientLayout";
import "./globals.css";
import Navbar from "./_components/_website/Navbar";
import Footer from "./_components/_website/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borsan Academy",
  description: "Borsan Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <Navbar />
          <div className="w-full mt-16">{children}</div>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
