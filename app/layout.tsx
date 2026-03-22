import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeScript } from "@/client/components/theme/ThemeScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
