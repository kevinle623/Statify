import type { Metadata } from "next";
import { ThemeScript } from "@/client/components/theme/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "Statify",
  description: "A refined Spotify stats dashboard built on Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
