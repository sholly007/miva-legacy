import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miva Legacy — Class of 2025",
  description: "The digital graduating portfolio of Miva University's Pioneer Class of 2025.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}