import type { Metadata } from "next";
import { poppins, inter } from "@/fonts";
import AppShell from "./AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interactive AC RLC Circuit Analysis & Phasor Visualization Platform",
  description: "Created by Ritam Das",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%", margin: 0, padding: 0 }}>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
        style={{ height: "100%", margin: 0, padding: 0 }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
