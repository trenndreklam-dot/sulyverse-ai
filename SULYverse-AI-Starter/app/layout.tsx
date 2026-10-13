import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SULYverse AI — Explore ideas. Discover possibilities.",
  description: "A thoughtful AI companion for ideas, technology, learning, and projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
