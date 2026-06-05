import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.puzzleguide.org"),
  title: "PuzzleMaster | Game Walkthroughs, Level Guides & Puzzle Tips",
  description:
    "PuzzleMaster helps players find walkthroughs, solutions, level guides, and tips for popular puzzle games.",
  openGraph: {
    title: "PuzzleMaster",
    description:
      "Find puzzle game walkthroughs, solutions, level guides, and practical tips.",
    url: "/",
    siteName: "PuzzleMaster",
    type: "website"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
