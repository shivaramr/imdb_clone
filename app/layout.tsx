import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopNav from "@/components/TopNav";
import Providers from "@/lib/store/Provider";
import { ToastContainer } from 'react-toastify';
import "react-confirm-alert/src/react-confirm-alert.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IMDB Clone",
  description: "IMDB Clone for 4 junctions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <TopNav />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
