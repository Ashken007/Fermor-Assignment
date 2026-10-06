import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FERMOR — Make Smarter Money Decisions",
  description:
    "Understand your money, see the numbers, and plan what comes next. Fermor is a modern Indian personal finance and investing platform designed for clarity.",
  keywords: [
    "personal finance India",
    "investing platform",
    "SIP calculator",
    "wealth planning",
    "financial freedom India",
    "mutual funds",
    "Fermor",
  ],
  authors: [{ name: "FERMOR Technologies" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className="bg-[#FAF9F5] text-[#111827] font-sans antialiased selection:bg-[#ECFDF5] selection:text-[#047857]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
